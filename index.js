'use strict'

const Hapi = require('@hapi/hapi');

const server = Hapi.server({
     port: process.env.PORT || 3000,
     host: 'localhost'
});

async function init() {
     server.route({
          method: 'GET',
          path: '/',
          handler: (req, h) => {
               return h.response('hola nico')
          }
     });

     try {
          await server.start()
     } catch (error) {
          console.error(error);
          process.exit(1)
     }
     console.log(`Server listening on port: ${server.info.uri}`);
};

init();