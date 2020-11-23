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
      method: 'POST',
      options: {
        validate: {
          payload: joi.object({
            name: joi.string().required().min(3),
            email: joi.string().email().required(),
            password: joi.string().required().min(6)
          })
        }
      },
      path: '/create-user',
      handler: user.createUser
    },

    {
      method: 'GET',
      path: '/{param*}',
      handler: {
        directory: {
          path: '.',
          index: ['index.html']
        }
      }
    }
  ]

