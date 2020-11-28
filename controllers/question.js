'use strict'

const { writeFile } = require('fs');
const { promisify } = require('util');
const { join } = require('path');
const { questions } = require('../models/index');
const { v1: uuid } = require('uuid');

const write = promisify(writeFile);

async function createQuestion(req, h) {
     if (!req.state.user) {
          return h.redirect('/login')
     }
     let result, filename;

     try {
          if (Buffer.isBuffer(req.payload.image)) {
               filename = `${uuid()}.png`
               await write(join(__dirname, '..', 'public', 'uploads', filename), req.payload.image)
          }
          result = await questions.create(req.payload, req.state.user, filename)
          console.log(`Question created - ID: ${result}`);
     } catch (error) {
          console.error(`An error has ocurred: ${error}`);

          return h.view('ask', {
               title: 'Create question',
               error: 'Error on create question.'
          }).code(500).takeover();
     }
     console.log(filename);
     return h.redirect(`/question/${result}`)
};

async function anwerQuestion(req, h) {
     if (!req.state.user) {
          return h.redirect('/login')
     }

     let result;

     try {
          result = await questions.answer(req.payload, req.state.user);
          console.log(`Respuesta creada con exito ID: ${result}`);
     } catch (error) {
          console.error(error);
     }
     return h.redirect(`/question/${req.payload.id}`)
};

async function setAnswerRight(req, h) {
     if (!req.state.user) {
          return h.redirect('/login')
     }

     let result
     try {
          result = await req.server.methods.setAnswerRight(req.params.questionId, req.params.answerId, req.state.user)
          console.log(result)
     } catch (error) {
          console.error(error)
     }

     return h.redirect(`/question/${req.params.questionId}`)
}

module.exports = {
     createQuestion: createQuestion,
     anwerQuestion: anwerQuestion,
     setAnswerRight: setAnswerRight
}