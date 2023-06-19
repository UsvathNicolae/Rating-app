import {post} from "./index";

export const createRatingService = async (data) => {
    return await post('/rating/create', data)
}