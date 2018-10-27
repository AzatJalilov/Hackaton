function mapRestaurant(response){
    return { 
        name: response.name,
        icon: response.icon,
        formattedAddress: response.formatted_address,
        placeId: response.place_id,
        priceLevel: response.price_level,
        rating: response.rating,
        types: response.types,
        location: response.geometry.location
    }
}

module.exports = mapRestaurant;