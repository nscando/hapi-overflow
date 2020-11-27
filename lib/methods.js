'use strict'

const { questions } = require('../models/index');

async function setAnswerRight(questionId, answerId, user) {
  let result
  try {
    result = await questions.setAnswerRight(questionId, answerId, user)
  } catch (error) {
    console.error(error)
    return false
  }
  console.log('[Methods-setAnswerRight] Method executed!');
  return result
};

async function getLast(amount) {
  let data;
  try {
    data = await questions.getLast(10)
  } catch (error) {
    console.error(error);
  }
  console.log('[Methods-getLast] Method executed!');
  return data;
};


module.exports = {
  getLast: getLast,
  setAnswerRight: setAnswerRight,
};