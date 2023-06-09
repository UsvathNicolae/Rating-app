import { post } from "./index";

export const registerService = async (data) => {
    return await post('/user/post', data)
}