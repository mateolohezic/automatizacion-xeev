const { Schema, model } = require('mongoose');

const code = new Schema({
    idXeev: String,
    code: String,
    name: String,
    number: Number,  
    seller: String,
    date: String,
    expire: String,
    status: String
})

module.exports = model (`Code`, code)