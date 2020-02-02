export const USERS_COLLECTION = 'users'

export const getRandomCityLocation = (cities) => {
    return cities[Math.floor(Math.random() * cities.length)].location
}