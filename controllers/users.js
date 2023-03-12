const User = require('../model/users');
const jwt = require('jsonwebtoken');
const axios = require('axios');
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
    const { username, name, surname, email, password, role } = req.body;
    const credits = 0;
    const date = new Date();
    const expire = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
    const saltRound = 15; 
    const passwordEncripted = bcrypt.hashSync(password, saltRound);
    const nuevoUser = new User({
        username,
        name,
        surname,
        email,
        password: passwordEncripted,
        credits,
        expire: expire.toLocaleDateString('es-ES'),
        role
    })
    await nuevoUser.save()
    res.status(200).send(`Se creo el usuario con éxito.`)
}

const deleteUser = async (req, res) => {
    const { id } = req.body
    if (id) {
        await User.findByIdAndDelete(id);
        res.status(200).send(`Se elimino el usuario con éxito.`)
    } else{
        res.status(500).send(`No id.`)
    }

}

const takeCredit = async (req, res) => {
    const { id, credits } = req.body
    await User.findByIdAndUpdate(id, {
        credits,
    })
    res.status(200).send(`Se resto el crédito con éxito.`)
};

const removeCredits = async (id) => {
    const credits = 0;
    await User.findByIdAndUpdate(id, {
        credits,
    })
};

const addCredits = async (req, res) => {
    const { id, credits } = req.body
    const date = new Date();
    const expire = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
    await User.findByIdAndUpdate(id, {
        credits,
        expire: expire.toLocaleDateString('es-ES')
    })
    res.status(200).send(`Se actualizaron los créditos con éxito.`)
};

const patchUser = async (req, res) => {
    const { id, username, name, surname, email, password, role } = req.body
    await User.findByIdAndUpdate(id, {
        username,
        name,
        surname,
        email,
        password,
        role
    })
    res.status(200).send(`Se actualizo el usuario con éxito.`)
};

const rolUser = async (req, res) => {
    const { id, role  } = req.body
    await User.findByIdAndUpdate(id, {
        role
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

const checkUsers = async () => {
    const users = await User.find({})
    const now = new Date();
    for (const user of users) {
      const expireDate = new Date(user.expire.split('/').reverse().join('-'));
      if (now > expireDate) {
        await removeCredits(user.id);
      }
    }
  };

  setInterval(() => {
    checkUsers();
  }, 5 * 60 * 1000);

module.exports = { crearUser, getUser, deleteUser, patchUser, getUserEspecifico, rolUser, loginUser, emailUser, restablecerContraseña, takeCredit, addCredits }