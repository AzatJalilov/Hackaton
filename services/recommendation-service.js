const { getRestaurants } = require('../stores/restaurants-store');
async function findAPlace(params) {
    let result = await getRestaurants(params);
    return result[0];
}

module.exports = { findAPlace }