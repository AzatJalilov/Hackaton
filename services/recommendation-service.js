const { getRestaurants } = require('../stores/restaurants-store');
async function findAPlace(params) {
    let query = {};
    if (params.price) {
        const intPrice = parseInt(params.price);
        if(intPrice !== NaN){
            query.priceLevel = { $lte: intPrice }
        };
    }
    if (params.rating) {
        const intRating = parseInt(params.rating);
        if(intRating !== NaN){
            query.rating = { $gte: intRating}
        };
    }
    let result = await getRestaurants(query) || [];
    
    if (result.length === 0){
        return null;
    }
    return result[getRandomInt(result.length - 1)];
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

module.exports = { findAPlace }