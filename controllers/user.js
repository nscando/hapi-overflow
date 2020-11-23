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

async function validateUser(req, h) {
     let result;
     try {
          result = await users.validateUser(req.payload)
     } catch (error) {
          return h.response('Problems with validate user!').code(500)
     }
     return result;
}

module.exports = {
     createUser: createUser,
     validateUser: validateUser,
}