import { post } from "./index";

export const loginService = async (data) => {
    return await post('/user/login', data)
}
export const registerService = async (data) => {
    return await post('/user/post', data)
}

export const updateUserService = async (id, data) => {
    return await post('/user/update/' + id, data)
}