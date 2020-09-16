const mongoese = require('mongoose')

let schema = mongoese.Schema({
    user_id: Number,
    socket_id: String,
    user_data: String,
    date: {type: Date, default: Date.now},
})

module.exports = mongoese.model('ChatUsersConnected', schema)