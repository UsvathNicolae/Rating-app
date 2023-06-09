import { post } from "./index";

export const login = async (data) => {
    return await post('/user/login', data)
}