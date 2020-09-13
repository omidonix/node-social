const {check,sanitize, validationResult} = require('express-validator')
const db = require('../models')


exports.validation = (method)=>{
    switch(method){
        case 'upload_attach_post':
            return[
                check('file').custom((value,{req}) =>{
                    switch (req.file.mimetype){
                        case 'audio/mpeg':
                        case 'image/jpeg':
                        case 'image/pjpeg':
                        case 'video/3gpp':
                        case 'video/mp4':
                            return true
                        default:
                            throw new Error('file type incorect')       

                    }
                }),
                check('file').custom((value, {req}) =>{
                    console.log()
                    if(req.file.size  < (20 * 1024 * 1024)){ // 20 mb 
                        return true
                    }else{
                        throw new Error('file size incorect max 20 MB'); 
                    }
                }),
            ]
            break
        case 'create':
            return [
                check('message').isAscii().isLength({ min: 5,max:1024 }).withMessage('must be min 5 and max 1024 character').escape(),
                check('attach_file_id').optional({checkFalsy: true}).toInt().isNumeric(),
                check('attach_file_id').custom(async (value,{req})=>{
                    if(value !== '' && value >= 1){
                        var file = await db.file.findOne({
                            where:{
                                id : value,
                                user_id : 22,
                            }
                        })

                        if(file){
                            return true
                        }

                        return Promise.reject('file not found')
                    }
                })
            ]
            break
            case 'create_comment':
                return[
                    check('message').isAscii().isLength({ min: 3,max:512 }).withMessage('must be min 3 and max 512 character').escape(),
                ]
                break
            case 'checkPostId':
                return [
                    check('post_id').toInt().isNumeric(),
                    check('post_id').custom(async (value,{req})=>{
                        if(value !== '' && value >= 1){
                            var post = await db.post.findOne({
                                where:{
                                    id : value,
                                }
                            })

                            if(post){
                                return true
                            }

                            return Promise.reject('post not found')
                        }
                    })
                ]
                break

            case 'load_post':
                return [
                    check('offset').toInt().isNumeric(),
                ]
        }

}
