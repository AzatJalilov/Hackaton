const mongojs = require('mongojs');
const db = mongojs('mongodb://admin:check24@ds159188.mlab.com:59188/lunch-bot', ['restaurants', 'tokens'])

async function insertRestaurants(restaurants) {
    return new Promise((resolve) => {
        db.restaurants.insert({ ...restaurants }, function (err, doc) {
            resolve(doc)
        });
    });
}

async function updateRestaurantDetails(restaurant) {
    return new Promise((resolve) => {
        db.restaurants.update({ placeId: restaurant.placeId }, restaurant, function (err, doc) {
            resolve(doc);
        });
    });
}

async function saveToken(token) {
    return new Promise((resolve) => {
        db.tokens.insert({ token }, function (err, doc) {
            resolve(doc);
        });
    });
}

async function getToken() {
    return new Promise((resolve) => {
        db.tokens.find().sort({"_id": -1}, function (err, doc) {
            resolve(doc);
        });
    });
}
async function getRestaurants(params) {
    return new Promise((resolve) => {
        db.restaurants.find(params, function (err, docs) {
            resolve(docs)
        });
    });
}

module.exports = { insertRestaurants, getRestaurants, updateRestaurantDetails,saveToken,getToken }