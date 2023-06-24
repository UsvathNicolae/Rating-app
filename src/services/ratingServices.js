import {get, post} from "./index";

export const createRatingService = async (data) => {
    return await post('/rating/create', data)
}

export const getRatingsService = async (filters) => {
    return await get('/rating/', filters)
}
export const updateRatingService = async (id, data) => {
    return await post('/rating/update/' + id, data)
}

export const likedRatingService = async (id, data) => {
    return await post('/rating/like/' + id, data)
}

export const setSeenRatingsService = async (data) => {
    return await post('/rating/setSeen', data)
}