'use strict';
const Twitter = require('twitter');
const { saveTweet} = require('./model.js');

//require('dotenv').config();

const client = new Twitter({
    consumer_key:'dhjq6bFxtMn6DUBAFq5JssPpx',
    consumer_secret: 'BtoB7tOElgQmLpoSjO4JUuWpv5s4yrPBuXKuCaDRF3Uh2ty8XC',
    access_token_key: '97982716-Np00WMPPvU8Xw61LyY7RBAQBO6S4CO0LCXMjeTa4z',
    access_token_secret: 'LmuplfM4lksA0GvOJisAKqE1FZOGx2bMNEaSsQRplZUJg'
});

let stream = undefined;
let status = 'STOP';

 function onTweet(data) {
    //  console.log(data.text);
    //  setTimeout(()=> stream.once('data', onTweet), 1000);
     saveTweet(data).then(()=> {
         setTimeout(() => stream.once('data', onTweet), 1000);
     });
 }

//con el on establecemos un listener
process.on('message', (msg)=> {
    if (msg.cmd ==='START' && status === 'STOP') {
        stream = client.stream('statuses/filter', {track: msg.filter});
        stream.once('data', onTweet);
        status = msg.cmd;
    }
    if (msg.cmd === 'STOP' && status === 'START') {
        stream.destroy();
        stream = undefined;
        status = msg.cmd;
    }
});