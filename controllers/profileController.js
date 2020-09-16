const db = require('../models/index')
const { Op } = require("sequelize");
const { validationResult } = require('express-validator');
const ChatUsersConnected = require('../models/mongo/ChatUsersConnected');
const Conversation = require('../models/mongo/Conversation');

let nima = 0;

module.exports.chat = async function(req,res){
nima++;
  var self_user = req.user
  console.log(self_user)

  if(!self_user){
    self_user = await db.users.findByPk(22)
  }
  var users = await db.users.findAll(
    {
      where: {
        id:{
          [Op.not] : self_user.id
        }
      }
    }
  )

  var users_online = await ChatUsersConnected.find()

  //user with status socket
  let new_users = users.map( user => {
    for(let i = 0, l = users_online.length; i < l; i++ ){
      if(user.id == users_online[i].user_id){
        user.online = true
        break
      }else{
        user.online = false
      }
    }
    return user
  })

  res.render('pages/profile_chat',{
    self_user,
    users: new_users
  });
}

module.exports.conversationList = async function(req,res){

  let user_id = 22
  if(req.user && req.user.id){
    user_id = req.user.id
  }

  // var new_conv = new Conversation({
  //   from_user_id: user_id,
  //   to_user_id: req.params.to_user_id,
  //   message: 'az onix be test',
  //   seen : false,
  // })
  // let test = await new_conv.save()

  // new_conv = new Conversation({
  //   from_user_id: req.params.to_user_id,
  //   to_user_id: user_id,
  //   message: 'az test be onix',
  //   seen : false,
  // })
  // test = await new_conv.save()
  
  
  let list_conversation = await Conversation.find({
    $or: [
      {
        from_user_id : user_id,
        to_user_id: req.params.to_user_id
      },
      {
        from_user_id : req.params.to_user_id,
        to_user_id: user_id 
      },
    ]
    
  }).sort({ date: 1 })

  res.end(JSON.stringify({
    hasError: false,
    cu: user_id, //current user
    data: list_conversation
  }))
  
  
}