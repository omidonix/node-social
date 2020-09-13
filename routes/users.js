var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')
const {validation} = require('../validations/userValidation');
var passport = require('passport')
const {isNotAuthenticated,isAuthenticated} = require('../middleware/authenticated')



//register router
router.get('/register',isNotAuthenticated,function(req, res, next) {
  res.render('pages/register', { title: 'Register',hasError : false });
});
router.post('/register',validation('createUser'),userController.createUser)




//login router
router.get('/login',isNotAuthenticated,function(req,res,next){
  var err = []
  var hasError = false
  var flash = req.flash().error
  if(typeof flash !== 'undefined' ){
    hasError = true
    err = flash
  }

  res.render('pages/login',{ title: 'Login',hasError, err });
});
router.post('/login',validation('login'),userController.login, passport.authenticate('local', { successRedirect: '/',
failureRedirect: 'login',
failureFlash: true }))




//logout router
router.get('/logout', isAuthenticated ,function(req, res){
  req.logout();
  res.redirect('/users/login');
});




module.exports = router;
