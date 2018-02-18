'use strict';
const express = require('express');
const { getTweets, getTweetsByFilter, getTweet } = require('./model.js') ;
const router = express.Router();

router.get('/', (req, res) => {
    let data = {
        routes: {
            '/tweets':  {
                methods: ['GET', 'POST']
            },
            '/tweets/find': {
                methods: ['POST']
            }
        }
    };
    res.json(data);
});

router.post('/tweets', (req, res) => {
    let data = req.body;
    req.app.get('child').send(data);
    res.json(data);
});

module.exports = router;

router.get('/tweets', (req, res) => {
    getTweets().then((data)=> {
        res.json(data);
    });
});

router.get('/tweets/:id', (req, res) => {
    let id = req.params.id;
    getTweet(id).then((data) => {
        res.json(data);
    });
});

router.post('/tweets/find', (req, res) => {
    let filter = req.body;
    getTweetsByFilter(filter).then((data)=> {
        res.json(data);
    });
});
