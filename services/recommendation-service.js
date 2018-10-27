const { getRestaurants } = require('../stores/restaurants-store');
async function findAPlace(params) {
    let query = {};
    if (params && params.price) {
        const intPrice = parseInt(params.price);
        if(intPrice !== NaN){
            query.priceLevel = { $lte: intPrice }
        };
    }
    if (params && params.rating) {
        const intRating = parseInt(params.rating);
        if(intRating !== NaN){
            query.rating = { $gte: intRating}
        };
    }
    const now = new Date();
    const dayOfWeek = now.getDay();
    const hours = now.getHours() * 100;
    const minutes = now.getMinutes();
    const time = hours + minutes;
    query[`openningHours.periods.${dayOfWeek}.close.day`] ={ $gte: dayOfWeek };
    query[`openningHours.periods.${dayOfWeek}.close.time`] ={ $gte: `${time}` };
    query[`openningHours.periods.${dayOfWeek}.open.day`] ={ $lte: dayOfWeek }
    query[`openningHours.periods.${dayOfWeek}.open.time`] = { $lte: `${time}` };
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