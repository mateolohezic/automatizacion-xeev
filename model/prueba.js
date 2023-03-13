const { Schema, model } = require('mongoose');

const prueba = new Schema({
    idXeev: String,
    code: String,
    name: String,
    number: Number,  
    seller: String,
    date: String,
    expire: String,
    status: String
})

module.exports = model (`Prueba`, prueba)