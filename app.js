const express = require('express')
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const cors = require('cors');
app.use(express.json());
require('./database/db');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });

const codigo = require('./routes/codigo');
const users = require('./routes/users');
const prueba = require('./routes/prueba');

app.use('/codigo', codigo);
app.use('/users', users);
app.use('/prueba', prueba);

app.listen(port, () =>  {
    console.log(`Estamos trabajando en el puerto ${port}`);
});