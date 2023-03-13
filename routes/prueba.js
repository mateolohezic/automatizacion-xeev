const express = require('express');
const route = express.Router();
const { postDataPrueba, getPruebas } = require('../controllers/prueba');

route.post('/cargar-prueba', postDataPrueba)
route.get('/get-prueba', getPruebas)

module.exports = route;