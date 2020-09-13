const { body } = require('express-validator')
const db = require('./../models')

exports.validation = (method) => {
    switch(method) {
        case 'createUser':
            return [
                body('fullname','must be min 5 charecters').isLength({ min: 5 }),
                body('username').not().isEmpty().isAlphanumeric(),
                body('email').isEmail(),
                body('email').custom(async (value)=>{                   
                    let user = await db.users.findOne({
                      where : {
                        email : value
                      }
                    })
                    if(user){
                      throw new Error('email alearly exist')
                    }
                }),
                body('password').isAscii(),
                body('repassword').custom((value,req)=>{
                  if (value !== req.req.body.password) {
                    throw new Error('Password confirmation does not match password');
                  }
                  return true
                }),
                body('gender').isIn(['Male','Female'])
            ]
        case 'login':
          return [
            body('username').not().isEmpty().isAlphanumeric(),
            body('password').isAscii(),
          ]  
    }
}