'use strict'

const { questions } = require('../models/index');

async function createQuestion(req, h) {
     let result;

     try {
          result = await questions.create(req.payload, req.state.user)
          console.log(`Question created - ID: ${result}`);
     } catch (error) {
          console.error(`An error has ocurred: ${error}`);

          return h.view('ask', {
               title: 'Create question',
               error: 'Error on create question.'
          }).code(500).takeover();
     }

     return h.response(`Question created - ID: ${result}`)
};

async function anwerQuestion(req, h) {
     let result;

     try {
          result = await questions.answer(req.payload, req.state.user);
          console.log(`Respuesta creada con exito ID: ${result}`);
     } catch (error) {
          console.error(error);
     }
     return h.redirect(`/question/${req.payload.id}`)
}

module.exports = {
     createQuestion: createQuestion,
     anwerQuestion: anwerQuestion
}