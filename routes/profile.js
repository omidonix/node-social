var express = require('express');
var router = express.Router();
var profileController = require('../controllers/profileController')
const {isNotAuthenticated,isAuthenticated} = require('../middleware/authenticated')


//chat view page
router.get('/chat',isAuthenticated,profileController.chat)

router.get('/conversation_list/:to_user_id',profileController.conversationList)


module.exports = router;
