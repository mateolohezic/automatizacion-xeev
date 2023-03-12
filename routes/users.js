const express = require('express');
const route = express.Router();
const { crearUser, getUser, patchUser, deleteUser, getUserEspecifico, rolUser, loginUser, emailUser, restablecerContraseña, takeCredit, addCredits } = require('../controllers/users');
const { jwtValidator } = require('../middleware/jwt')


route.get('/obtener-users', getUser);
route.get('/:id', getUserEspecifico);
route.post('/crear-user', crearUser)
route.patch(`/editar-user`, patchUser);
route.patch(`/estado-user`, rolUser);
route.delete(`/eliminar-user`, deleteUser);
route.patch(`/agregar-creditos`, addCredits);
route.patch(`/restar-credito`, takeCredit);
route.post(`/login-user`, loginUser);
route.patch(`/restablecer-password`, restablecerContraseña);
route.post(`/restablecer-email`, emailUser)

module.exports = route;