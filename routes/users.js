const express = require('express');
const route = express.Router();
const { crearUser, getUser, patchUser, deleteUser, getUserEspecifico, rolUser, loginUser, agregarCodigoUser, emailUser, restablecerContraseña } = require('../controllers/users');
const { jwtValidator } = require('../middleware/jwt')


route.get('/obtener-users', getUser);
route.get('/:id', getUserEspecifico);
route.post('/crear-user', crearUser)
route.patch(`/editar-user`, patchUser);
route.patch(`/estado-user`, jwtValidator, rolUser);
route.delete(`/eliminar-user`, jwtValidator, deleteUser);
route.post(`/login-user`, loginUser);
route.patch(`/restablecer-password`, restablecerContraseña);
route.post(`/restablecer-email`, emailUser)

module.exports = route;