'use strict'


const firebase = require('firebase-admin');
const serviceAcount = require('../config/firebase.json');

firebase.initializeApp({
     credential: firebase.credential.cert(serviceAcount),
     databaseURL: 'https://hapioverflow-32eee.firebaseio.com/'
})

const db = firebase.database();
const Users = require('./users');
const Questions = require('./questions');


module.exports = {
     users: new Users(db),
     questions: new Questions(db),
}