const User = require('../model/users');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const claveToken = process.env.CLAVE;
const bcrypt = require('bcrypt');

const getUser = async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).send(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

const getUserEspecifico = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id)
    res.status(200).send(user);
}

const crearUser = async (req, res) => {
    const { username, name, surname, email, password, rol } = req.body;

    const saltRound = 15; 
    const passwordEncripted = bcrypt.hashSync(password, saltRound);
    const nuevoUser = new User({
        username,
        name,
        surname,
        email,
        password: passwordEncripted,
        rol,
        costumers: []
    })
    await nuevoUser.save()
    res.status(200).send(`Se creo el usuario con éxito.`)
}

const deleteUser = async (req, res) => {
    const { id } = req.body
    await User.findByIdAndDelete(id);
    res.status(200).send(`Se elimino el usuario con éxito.`)
}

const patchUser = async (req, res) => {
    const { id, username, name, surname, email, password, rol } = req.body


    await User.findByIdAndUpdate(id, {
        username,
        name,
        surname,
        email,
        password,
        rol
    })
    res.status(200).send(`Se actualizo el usuario con éxito.`)
};

const rolUser = async (req, res) => {
    const { id, rol  } = req.body
    await User.findByIdAndUpdate(id, {
        rol
    })
    res.status(200).send(`Se actualizo el usuario con éxito.`)
};

const agregarCodigoUser = async (req, res) => {
    const { id, costumers  } = req.body
    await User.findByIdAndUpdate(id, {
        costumers
    })
    res.status(200).send(`Se actualizo el usuario con éxito.`)
};

const loginUser = async (req, res) => {
    const { email, password } = req.body

    try{
        const user = await User.findOne({"email": email})
        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                const token = jwt.sign({user}, claveToken , { expiresIn : "1h"})
                res.status(200).json({user,token})
          
              } else {
                res.status(206).send({message : 'Contraseña incorrecta'})
              }
            } else {
              res.status(206).send({message : 'E-mail no encontrado'})
        }
    }
    catch(error){
        console.error(error);
    }
};

const emailUser = async (req, res) => {
    const { email } = req.body

    try{
        const user = await User.findOne({"email": email})
        if (user) {
                res.status(200).send(user)
            } else {
                res.status(206).send({message : 'Usuario no encontrado'})
        }
    }
    catch(error){
        console.error(error);
    }
};

const restablecerContraseña = async (req, res) => {
    
    const { id, password  } = req.body

    const saltRound = 15; 
    const passwordEncripted = bcrypt.hashSync(password, saltRound);
    await User.findByIdAndUpdate(id, {
        password: passwordEncripted
    })
    res.status(200).send(`Se actualizo la contraseña con éxito.`)
};

module.exports = { crearUser, getUser, deleteUser, patchUser, getUserEspecifico, rolUser, loginUser, agregarCodigoUser, emailUser, restablecerContraseña }