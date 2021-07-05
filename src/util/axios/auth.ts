import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import configuration from '../../config';

export const authHttp = axios.create({
    baseURL: `${configuration.authServer.protocol}://${configuration.authServer.host}:${configuration.authServer.port}`
})

export const requestInterceptor = (request: AxiosRequestConfig) => {
    // console.log(request.url);
    return request
}
export const requestErrorInterceptor = (error: unknown) => {
    // console.log(error);
    return Promise.reject(error)
}
export const responseInterceptor = (response: AxiosResponse) => {
    return response
}
export const responseErrorInterceptor = (error: unknown) => {
    // console.log(error);
    return Promise.reject(error)
}



authHttp.interceptors.request.use(requestInterceptor, requestErrorInterceptor);
authHttp.interceptors.response.use(responseInterceptor, responseErrorInterceptor);