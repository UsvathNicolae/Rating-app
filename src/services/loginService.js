import { post } from "./index";

export const loginService = async (data) => {
    return await post('/user/login', data)
}