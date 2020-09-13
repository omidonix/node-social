const db = require('../models/index')
const fs = require('fs')
const { validationResult } = require('express-validator');
const _ejs = require('ejs');
const { sequelize } = require('../models/index');

///upload file for post
module.exports.uploadAttachPost = function(req,res,next){
  res.setHeader('Content-Type', 'application/json');


  const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
    // Build your resulting errors however you want! String, object, whatever - it works!
    return `${msg}`;
  };
  
  const err = validationResult(req).formatWith(errorFormatter);
  
  if(!err.isEmpty()){
    res.end(responseObj(true,err.array()))
    return
  }

  
  let new_filename = Date.now()+'_'+req.file.originalname
  fs.rename(req.file.path,__dirname + '/../upload_dir/posts/'+new_filename,(err) => { 
    if (err) { 
      res.end(responseObj(true,err.message));
    }
    else {
      db.file.create({
        user_id: 22,
        name: new_filename,
        extention: req.file.mimetype,
        tags: 'post'
      }).then(user=>{
        res.end(responseObj(false, user.id));
      }).catch(err=>{
        res.end(responseObj(true, err.message));
      })
    } 
  })
}


function responseObj(hasErr,data){
  return JSON.stringify({
    'hasError' : hasErr,
    'data' : data
  })
}


module.exports.create = (req,res,next) =>{
  const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
    // Build your resulting errors however you want! String, object, whatever - it works!
    return `${param}: ${msg}`;
  };
  
  const err = validationResult(req).formatWith(errorFormatter);
  
  if(!err.isEmpty()){
    req.session.hasError = true,
    req.session.messages = err.array()
    req.session.params = {
      message : req.body.message,
      attach_file_id : req.body.attach_file_id
    }
    res.redirect('/');
    return
  }

  db.post.create({
    content : req.body.message,
    user_id : 22,
    file_id : req.body.attach_file_id ? req.body.attach_file_id : null
  }).then(post => {
    req.session.hasError = false,
    req.session.messages = ['success to submit post']
    res.redirect('/');
  }).catch(err => {
    console.log(err)
    req.session.hasError = true,
    req.session.messages = ['problem to submit post']
    res.redirect('/');
  })
}


module.exports.createComment = async function(req,res,next) {
  const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
    // Build your resulting errors however you want! String, object, whatever - it works!
    return `${msg}`;
  };
  
  const err = validationResult(req).formatWith(errorFormatter);
  
  if(!err.isEmpty()){
    res.setHeader('Content-Type', 'application/json');
    res.status(400).end(responseObj(true,err.array()))
    return
  }


  db.comment.create({
    content: req.body.message,
    user_id: 22,
    post_id: req.body.post_id
  }).then(async comment =>{
    comment.users = await comment.getUsers()
    res.render('components/comment_items', { 
      comment: comment
    })
  }).catch(err =>{
    res.setHeader('Content-Type', 'application/json');
    res.status(500).end(responseObj(true,[err.message]))
  })

}


//get list commmet ///behtarin mesal baraye check kardane mamole va await baraye check litfan consol haaro az comment dar biar ta  ejra shan va khate await foreacho bardaro bezar ta befahmi
//toye har do halat a stack darim ke . brtib rushva bade vaghteshiad birun
module.exports.listComment = async function(req,res,next){

  console.time('comments')
  let commanets = await db.comment.findAll({
    where:{
      post_id: req.params.post_id
    },
    order: [['id','DESC']],
    include: ['users']
  })
  var views= [];

  console.timeLog('comments','2')



  if(commanets && commanets.length > 0){
    for(let i = 0 , n = commanets.length; i < n; i++){
      let comment = commanets[i]
      console.timeLog('comments','3',i)
      let view = await _ejs.renderFile(__dirname+'/../views/components/comment_items.ejs', { 
        comment: comment
      })
      views.push(view)
      console.timeLog('comments','4',i)
    }
  }
  console.timeLog('comments','5')
  res.setHeader('Content-Type', 'application/json');
  res.end(responseObj(false,views))
}


module.exports.likePost = async function(req,res,next){

  const err = validationResult(req);
  
  if(err.isEmpty()){
    res.setHeader('Content-Type', 'application/json');


    var post = await db.post.findByPk(req.params.post_id)
  
    var likeCount = post.like_count
    var dislikeCount = post.dislike_count
  
    var oldLike = await post.getLikes({
      where :{
        user_id: 22
      }
    })
    var oldDislike = await post.getDislikes({
      where :{
        user_id: 22
      }
    })
  
    if(oldLike.length <= 0){ // ghablan like nakarde
  
      if(oldDislike.length > 0){// ghblan like nakarde vali dislike karde
        oldDislike[0].destroy()
        dislikeCount = dislikeCount -1
      }
  
      var like = await post.createLike({
        user_id : 22
      })
  
      likeCount = likeCount + 1
    }
  
  
    res.end(responseObj(false,{
      type : 'like',
      likeCount: likeCount,
      dislikeCount: dislikeCount
    }))
  }
  res.end(responseObj(false,false))
}




module.exports.dislikePost = async function(req,res,next){

  const err = validationResult(req);
  
  if(err.isEmpty()){
    res.setHeader('Content-Type', 'application/json');


    var post = await db.post.findByPk(req.params.post_id)
    
    var likeCount = post.like_count
    var dislikeCount = post.dislike_count

    var oldLike = await post.getLikes({
      where :{
        user_id: 22
      }
    })
    var oldDislike = await post.getDislikes({
      where :{
        user_id: 22
      }
    })

    if(oldDislike.length <= 0){ // ghablan dislike nakarde

      if(oldLike.length > 0){// ghblan sidlike nakarde vali like karde
        oldLike[0].destroy()
        likeCount = likeCount - 1
      }

      var like = await post.createDislike({
        user_id : 22
      })

      dislikeCount = dislikeCount + 1
    }


    res.end(responseObj(false,{
      type : 'dislike',
      likeCount: likeCount,
      dislikeCount: dislikeCount
    }))
  }

  res.end(responseObj(false,false))

}


module.exports.loadPost = async function(req, res, next){
  res.setHeader('Content-Type', 'application/json');
  const err = validationResult(req);
  
  if(!err.isEmpty()){
    res.end(responseObj(false,[]))
  }

  let posts = await db.post.list(req.params.offset)

  var views= [];
  if(posts && posts.length > 0){

    //awaito bardaro bezar ta befahmi nodejs chetori kar mikone stackesh
     await posts.forEach(async post =>{
      // console.log('1')
      let view = _ejs.renderFile(__dirname+'/../views/components/post_item.ejs', { 
        post: post
      }).then(view => [
        views.push(view)
      ]);
      
      // console.log('2')
    })

  }
  console.log(views)

  // console.log('3',views)
  res.end(responseObj(false,views))
}