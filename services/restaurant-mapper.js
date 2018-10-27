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
        openningHours: { periods: response.opening_hours.periods, weekdayText: response.opening_hours.weekday_text },
        photos: response.photos, 
        url: response.url,
        reviews: response.reviews
    }
}

module.exports = mapRestaurant;