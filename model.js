'use strict';

const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1/mongoDBEjemploClase");
mongoose.Promise = global.Promise;

const TweetSchema = mongoose.Schema({
    created_at: String,
    id: String,
    text: String,
});
//si no hay conexion no se tiene que refenrencia. Luego de definir el esquema
const Tweet = mongoose.model('Tweet', TweetSchema);

exports.getTweets = () => {
    return Tweet.find({}).exec();
};

exports.getTweet = (id) => {
    return Tweet.findOne({id: id}).exec();
}

exports.getTweetsByFilter = (filter) => {
    return Tweet.findOne(filter).exec();
}

exports.saveTweet = (tweet) => {
    return (new Tweet(tweet)).save();
}