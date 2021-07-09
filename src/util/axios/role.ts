import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import configuration from '../../config';

export const roleHttp = axios.create({
    baseURL: `${configuration.authServer.protocol}://${configuration.roleServer.host}:${configuration.roleServer.port}`
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



roleHttp.interceptors.request.use(requestInterceptor, requestErrorInterceptor);
roleHttp.interceptors.response.use(responseInterceptor, responseErrorInterceptor);