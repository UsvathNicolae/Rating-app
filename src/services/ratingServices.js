import {get, post} from "./index";

export const createRatingService = async (data) => {
    return await post('/rating/create', data)
}

export const getRatings = async (filters) => {
    return await get('/rating/', filters)
}