const db = require('../models/index')
const ChatUsersConnected = require('../models/mongo/ChatUsersConnected')
const Conversation = require('../models/mongo/Conversation')



module.exports = (server,sessionMiddleware) => {

  var io = require('socket.io')(server)

  //share session with socket io
  io.use(function(socket, next) {
    sessionMiddleware(socket.request, socket.request.res || {}, next);
  });
  
  io.on('connection', async function(socket){



    console.log('******** user connect to socket ******** ')
    
    if(socket.request.session && socket.request.session.passport && socket.request.session.passport.user){
      socket.user_id = socket.request.session.passport.user
    }


    

    let user = await db.users.findByPk(socket.user_id)

    let online_user = await ChatUsersConnected.findOne({
      user_id: socket.user_id
    })

    if(!online_user){
      //add user id and user socekt_id in mongo db
      let new_user_connected = new ChatUsersConnected({
        user_id: socket.user_id,
        socket_id : socket.id,
        user_data : JSON.stringify(user)
      })
      let mongo_save =  await new_user_connected.save()
    }else{
      await ChatUsersConnected.updateOne({ user_id: socket.user_id }, { socket_id : socket.id });
    }
    

    //disconnect
    socket.on('disconnect', async () => {

      //when disconnect delete user online from mongoDB
      // await ChatUsersConnected.deleteOne({
      //   _id : new_user_connected._id
      // })
      console.log('_______ user disconnect from socket _______')
    });


    socket.on('new_message',async data =>{

      if(data.to_user_id && data.message){
        var new_conv = new Conversation({
          from_user_id: socket.user_id,
          to_user_id: data.to_user_id ,
          message: data.message,
          seen : false,
        })
        let test = await new_conv.save()
        console.log(`az ${socket.user_id} be ${data.to_user_id} `)

        let destenation_user = await ChatUsersConnected.findOne({
          user_id: data.to_user_id
        })
        if(destenation_user){
          socket.to(destenation_user.socket_id).emit('message',{
            from_user_id: socket.user_id,
            to_user_id: data.to_user_id,
            message: data.message,
          })  
        }
        
      }
    })
  })

}