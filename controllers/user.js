'use strict'

function createUser(req, h) {
     console.log(req.payload);
     return 'Usuario creado con exito'
}

module.exports = {
     createUser: createUser,
}