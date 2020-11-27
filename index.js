'use strict'
const Hapi = require('@hapi/hapi');
const handlebars = require('./lib/helpers');
const inert = require('@hapi/inert');
const methods = require('./lib/methods');
const path = require('path');
const routes = require('./routes');
const site = require('./controllers/site');
const vision = require('@hapi/vision');




const server = Hapi.server({
  port: process.env.PORT || 3000,
  host: 'localhost',
  routes: {
    files: {
      relativeTo: path.join(__dirname, 'public')
    }
  }
});

async function init() {

  try {
    await server.register(inert);
    await server.register(vision);

    server.method('setAnswerRight', methods.setAnswerRight);

    server.state('user', {
      ttl: 1000 * 60 * 60 * 24 * 7, //time to live msec*sec*min*hs*day
      isSecure: process.env.NODE_ENV === 'prod',
      encoding: 'base64json'
    });

    server.views({
      engines: {
        hbs: handlebars
      },
      relativeTo: __dirname,
      path: 'views',
      layout: true,
      layoutPath: 'views'
    });

    server.ext('onPreResponse', site.fileNotFound)

    server.route(routes);

    await server.start();

  } catch (error) {
    console.error(error);
    process.exit(1)
  };
  console.log(`Server listening on port: ${server.info.uri}`);
};

process.on('unhandledRejection', error => {
  console.error('[UnhandledRejection]', error.message, error);
});

process.on('uncaughtException', error => {
  console.error('[UncaughtException]', error.message, error);
});

init();