const db = require('../models/index')



module.exports = (server,sessionMiddleware) => {

  var io = require('socket.io')(server)
  let user_id

  //share session with socket io
  io.use(function(socket, next) {
    sessionMiddleware(socket.request, socket.request.res || {}, next);
  });
  
  io.on('connection',function(socket){
    
    if(socket.request.session && socket.request.session.passport && socket.request.session.passport.user){
      user_id = socket.request.session.passport.user
    }
    else{
      user_id = 22
    }
    
  })


}