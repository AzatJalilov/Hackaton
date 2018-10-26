const mongojs = require('mongojs');
const db = mongojs('mongodb://admin:check24@ds159188.mlab.com:59188/lunch-bot', ['restaurants'])

async function insertRestaurants(restaurants) {
    db.restaurants.insert({ ...restaurants })
}

async function getRestaurants() {
    return new Promise((resolve) => {
        db.restaurants.find(function (err, doc) {
            resolve(doc)
        });
    });
}

module.exports = { insertRestaurants, getRestaurants }