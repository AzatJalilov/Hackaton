function mapRestaurant(response){
    return { 
        name: response.name,
        icon: response.icon,
        formattedAddress: response.formatted_address,
        placeId: response.place_id,
        priceLevel: response.price_level,
        rating: response.rating,
        types: response.types,
        location: response.geometry.location,
        phoneNumber: response.formatted_phone_number,
        openningHours: { periods: mapOpenningHours(response.opening_hours.periods), weekdayText: response.opening_hours.weekday_text },
        photos: response.photos, 
        url: response.url,
        reviews: response.reviews
    }
}
function mapOpenningHours(periods) {
    if(periods && Array.isArray(periods)) {
        return periods.map((period) => {
            return {
                close: {
                    day: period.close.day,
                    time: Number(period.close.time)
                }
            };
        })
    }
    return periods;
}

module.exports = mapRestaurant;