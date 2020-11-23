'use strict'
const { users } = require('../models/index');

async function createUser(req, h) {
     let result

     try {
          result = await users.create({ ...req.payload })
     } catch (error) {
          console.error(error);
          return h.response('Problems with create user!').code(500)
     }
     return h.response(`User created ID: ${result}`);
};

async function logout(req, h) {
     return h.redirect('/login').unstate('user')
}

async function validateUser(req, h) {
     let result;
     try {
          result = await users.validateUser(req.payload)
          if (!result) {
               return h.response(`Error, wrong email or password!`).code(401)
          }
     } catch (error) {
          return h.response('Problems with validate user!').code(500)
     }

     return h.redirect('/').state('user', {
          name: result.name,
          email: result.email
     });
}

module.exports = {
     createUser: createUser,
     validateUser: validateUser,
     logout: logout
}