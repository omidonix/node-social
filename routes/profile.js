var express = require('express');
var router = express.Router();
var profileController = require('../controllers/profileController')
const {isNotAuthenticated,isAuthenticated} = require('../middleware/authenticated')


//chat view page
router.get('/chat',profileController.chat)


module.exports = router;
