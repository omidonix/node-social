var express = require('express');
var router = express.Router();
var postController = require('../controllers//postController')
const {validation} = require('../validations/postValidation');
const multer = require('multer')
const {isNotAuthenticated,isAuthenticated} = require('../middleware/authenticated')



var upload = multer({ dest: __dirname + '/../upload_dir/temp/' })


//uplaod file for post
router.post('/upload_attach_post',upload.single('post_file'),validation('upload_attach_post'),postController.uploadAttachPost);

//create post
router.post('/create',validation('create'),postController.create)


///create comemnt
router.post('/create_comment',validation('create_comment'),validation('checkPostId'),postController.createComment)

//list comment
router.get('/list_comment/:post_id',postController.listComment)

//like post
router.get('/like_post/:post_id',validation('checkPostId'),postController.likePost)

//dislike post
router.get('/dislike_post/:post_id',validation('checkPostId'),postController.dislikePost)

//loadmore posts
router.get('/load/:offset',validation('load_post'),postController.loadPost)

module.exports = router;
