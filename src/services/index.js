import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080'
})

axiosInstance.interceptors.request.use(async (req) => {
    if(req.headers) {
        req.headers['Content-Type'] = 'application/json';
        const token = await AsyncStorage.getItem('token')
        req.headers['Authorization'] = `Bearer ${token}`
    }
    return req;
})

export const get = async(url, filters = {}, config = {}) => {
    const response = await axiosInstance.get(url, { params: filters, ...config })
    return response.data
}

export const patch = async(url, data) => {
    const response = await axiosInstance.patch(url, data)
    return response.data
}

export const post = async(url, data) => {
    const response = await axiosInstance.post(url,data)
    return response.data
}

export const destroy = async(url) => {
    const response = await axiosInstance.delete(url)
    return response.data
}