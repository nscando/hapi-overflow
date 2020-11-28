'user strict'
const site = require('./controllers/site');
const user = require('./controllers/user');
const joi = require('@hapi/joi');
const question = require('./controllers/question');


module.exports =

  [
    {
      path: '/',
      method: 'GET',
      options: {
        cache: {
          expiresIn: 1000 * 30,
          privacy: 'private'
        }
      },
      handler: site.home
    },
    {
      path: '/register',
      method: 'GET',
      handler: site.register
    },
    {
      path: '/login',
      method: 'GET',
      handler: site.login
    },

    {
      path: '/question/{id}',
      method: 'GET',
      handler: site.viewQuestion
    },

    {
      path: '/logout',
      method: 'GET',
      handler: user.logout
    },

    {
      path: '/ask',
      method: 'GET',
      handler: site.ask,

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
      path: '/create-question',
      method: 'POST',
      options: {
        payload: {
          multipart: true,
          parse: true
        },
        validate: {
          payload: joi.object({
            title: joi.string().required(),
            description: joi.string().required(),
            image: joi.any().optional(),
          }),
          failAction: user.failValidation,
        },
      },
      handler: question.createQuestion,
    },

    {
      path: '/answer-question',
      method: 'POST',
      options: {
        validate: {
          payload: joi.object({
            answer: joi.string().required(),
            id: joi.string().required()
          }),
          failAction: user.failValidation
        }
      },
      handler: question.anwerQuestion
    },

    {
      method: 'GET',
      path: '/answer/{questionId}/{answerId}',
      handler: question.setAnswerRight
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

