'use strict'
const Boom = require('@hapi/boom');
const { users } = require('../models/index');

async function createUser(req, h) {
     let result
     try {
          result = await users.create({ ...req.payload })
     } catch (error) {
          console.error(error);
          return h.view('register', {
               title: 'Register',
               error: 'Create user error!'
          })
     }
     return h.view('register', {
          title: 'Register',
          succes: 'User created succes!'
     });
};

async function logout(req, h) {
     return h.redirect('/login').unstate('user')
}

async function validateUser(req, h) {
     let result;
     try {
          result = await users.validateUser(req.payload)
          if (!result) {
               return h.view('login', {
                    title: 'Login',
                    error: 'You entered an incorrect username or password. Please try again.'
               })
          }
     } catch (error) {
          return h.view('login', {
               title: 'Login',
               error: 'Validation fail.'
          })
     }

     return h.redirect('/').state('user', {
          name: result.name,
          email: result.email
     });
}

function failValidation(req, h, err) {
     return Boom.badRequest('Fail validation', req.payload, err)
}

module.exports = {
     createUser: createUser,
     validateUser: validateUser,
     logout: logout,
     failValidation: failValidation
}