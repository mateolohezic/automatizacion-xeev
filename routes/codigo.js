const express = require('express');
const route = express.Router();
const { cargarCodigo } = require('../controllers/codigo');
const { postData } = require('../controllers/codigoPost');

route.post('/agregar-codigo', cargarCodigo);
route.post('/post-codigo', postData)

module.exports = route;