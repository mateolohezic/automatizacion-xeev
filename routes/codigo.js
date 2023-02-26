const express = require('express');
const route = express.Router();
const { cargarCodigo } = require('../controllers/codigo');

route.post('/agregar-codigo', cargarCodigo);

module.exports = route;