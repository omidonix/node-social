const db = require('../models/index')
const { validationResult } = require('express-validator');



module.exports.createUser = async function(req,res,next){

  // const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
  //   // Build your resulting errors however you want! String, object, whatever - it works!
  //   return `${param}: ${msg}`;
  // };
  // const err = validationResult(req).formatWith(errorFormatter);

  const err = validationResult(req);
  if (!err.isEmpty()) {
    res.render('pages/register', { hasError: true, err : err.mapped(), params : req.body});
  }

  try {
  
    var user = await db.users.create({
      fullname: req.body.fullname,
      username: req.body.username,
      email: req.body.email,
      password : db.users.hashPassword(req.body.password),
      gender : req.body.gender,
    })

    if(user){
      req.login(user, function(err) {
        return res.redirect('/');
      });

    }
  } catch(err) {
    console.log(err)
  }

}



module.exports.login = function(req,res,next){

  const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
    // Build your resulting errors however you want! String, object, whatever - it works!
    return `${param}: ${msg}`;
  };
  const err = validationResult(req).formatWith(errorFormatter);

  if(!err.isEmpty()){
    console.log( err.array())
    res.render('pages/login', { hasError: true, err : err.array(), params : req.body});
  }

 next()
}