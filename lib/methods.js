'use strict'

const { questions } = require('../models/index');

async function setAnswerRight(questionId, answerId, user) {
  let result;
  try {
    result = await questionId.setAnswerRight(questionId, answerId, user)
  } catch (error) {
    console.error(error);
    return false
  }
  return result;
};

module.exports = {
  setAnswerRight: setAnswerRight,
};