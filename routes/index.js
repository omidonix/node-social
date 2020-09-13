var express = require('express');
var router = express.Router();
var {isAuthenticated} = require('../middleware/authenticated')
var fs = require('fs');
var db = require('../models')
var multer = require('multer')
var session = require('express-session')




/* GET home page. */
router.get('/' ,async function(req, res, next) {

  let posts = await db.post.list(0)
  
  //manage session
  let hasError = req.session.hasError ? req.session.hasError : false
  let messages =  req.session.messages ? req.session.messages : []
  let params = req.session.params ? req.session.params : {}
  delete req.session.hasError
  delete req.session.messages
  delete req.session.params

  res.render('pages/index', { 
    hasError: hasError,
    messages: messages,
    params: params,
    posts: posts,
    title: 'Home' 
  });
});

// router.get('/' ,  function(req, res, next) {
//   console.log('start app sync')
//   setTimeout(()=>{
//     console.log('end time oute1')
//   },0)
//   setTimeout(()=>{
//     console.log('end time oute2')
//   },0)
//   setTimeout(()=>{
//     console.log('end time oute3')
//   },1)
//   fs.readFile(__dirname + '/../package.json',(data)=>{
//     console.log('file tamome')
//   })
//   console.log('end app')
// });





module.exports = router;
