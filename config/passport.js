var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
const db = require('../models')


passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
passport.deserializeUser(function(id, done) {
    db.users.findOne({
        where:{
            id: id
        }
    }).then((user)=> {
        return done(null, user);
    }).catch((err) =>{
        return done(err, null);
    })
})


exports.configPassport = new LocalStrategy(
    function(username, password, done) {
        console.log(username,password)
      db.users.findOne({
          where:{
              username: username
          }
      }).then((user)=> {

        if(user){
            if (!user.validPassword(password,user.password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        }else{
            console.log({ message: 'Incorrect username.' })
            return done(null, false, { message: 'Incorrect username.' });
        }
 
      }).catch((err)=>{
        console.log(err)
        return done(null, false, { message: 'try agin.' });
      })

  }
);