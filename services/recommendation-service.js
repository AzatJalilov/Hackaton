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
    return result[Math.random(result.length)];
}

module.exports = { findAPlace }