const { Schema, model } = require('mongoose');

const user = new Schema({
    username: String,
    name: String,
    surname: String,
    email: String,  
    password: String,
    rol: String,
    costumers: Array,
})

module.exports = model (`User`, user)