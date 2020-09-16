const mongoese = require('mongoose')

let schema = mongoese.Schema({
    from_user_id: Number,
    to_user_id: Number,
    message: String,
    seen : Boolean,
    date: {type: Date, default: Date.now},
})

module.exports = mongoese.model('Conversation', schema)