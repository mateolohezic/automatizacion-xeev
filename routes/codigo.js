const express = require('express');
const route = express.Router();
const { postData, getCodes, getCodeEspecifico, borrarCodePermanente, patchCode, renewCode, banCode, renewDateCode, deleteCode, renovarPostData } = require('../controllers/codigo');

route.post('/cargar-codigo', postData)
route.get('/get-codigo', getCodes)
route.post('/borrar-codigo-permanente', borrarCodePermanente)
route.post('/editar-codigo', patchCode)
route.patch('/recrear-codigo', renewCode)
route.patch('/renovar-codigo', renewDateCode)
route.post('/recrear-codigo-xeev', renovarPostData)
route.patch('/desactivar-codigo', banCode)
route.post('/borrar-xeev', deleteCode)

module.exports = route;