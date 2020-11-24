'user strict'
const site = require('./controllers/site');
const user = require('./controllers/user');
const joi = require('@hapi/joi');


module.exports =

  [
    {
      method: 'GET',
      path: '/',
      handler: site.home
    },
    {
      method: 'GET',
      path: '/register',
      handler: site.register
    },
    {
      method: 'GET',
      path: '/login',
      handler: site.login
    },
    {
      method: 'GET',
      path: '/logout',
      handler: user.logout
    },

    {
      path: '/validate-user',
      method: 'POST',
      options: {
        validate: {
          payload: joi.object({
            email: joi.string().email().required(),
            password: joi.string().required().min(6).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
          }),
          failAction: user.failValidation
        }
      },
      handler: user.validateUser
    },

    {
      path: '/create-user',
      method: 'POST',
      options: {
        validate: {
          payload: joi.object({
            name: joi.string().required().min(3),
            email: joi.string().email().required(),
            password: joi.string().required().min(6).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
          }),
          failAction: user.failValidation
        }
      },
      handler: user.createUser
    },
    {
      method: 'GET',
      path: '/assets/{param*}',
      handler: {
        directory: {
          path: '.',
          index: ['index.html']
        }
      }
    },
    {
      method: ['GET', 'POST'],
      path: '/{any*}',
      handler: site.notFound
    }
  ];

