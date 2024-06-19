import axios from 'axios';
import { getToken } from 'utilities/Function/GetLocalStorage';

import config from '../config/ServerConfig';

const USER_API_PREFIX = 'user';
const url = `${config.hostname}:${config.backend_port}/${USER_API_PREFIX}`;
const axiosInstance = axios.create({
    baseURL: url
});

axiosInstance.interceptors.request.use(
    (config) => {
        if (getToken()) {
            config.headers.token = getToken();
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default class UserService {
    login(values: any) {
        return axiosInstance.post(`${url}/login`, values).then((res) => res.data);
    }

    verifyToken(token: string) {
        return axiosInstance.post(`${url}/verifyToken`, { token }).then((res) => res.data);
    }

    forgetPassword(values: any) {
        return axiosInstance.post(`${url}/forgetPassword`, values).then((res) => res.data);
    }

    resetPassword(values: any) {
        return axiosInstance.post(`${url}/resetPassword`, values).then((res) => res.data);
    }

    changeEmail(values: any) {
        return axiosInstance.post(`${url}/changeEmail`, values).then((res) => res.data);
    }

    changePassword(values: any) {
        return axiosInstance.post(`${url}/changePassword`, values).then((res) => res.data);
    }

    changeProfilePic(values: any) {
        return axiosInstance.post(`${url}/changeProfilePic`, values).then((res) => res.data);
    }

    getBookmarks(userId: number) {
        return axiosInstance.post(`${url}/getBookmarks`, { userId }).then((res) => res.data);
    }

    getBookmarksByUserId(values: any) {
        return axiosInstance.post(`${url}/getBookmarksByUserId`, values).then((res) => res.data);
    }

    getPoints(userId: number) {
        return axiosInstance.post(`${url}/getPoints`, { userId }).then((res) => res.data);
    }

    getUserPostStatus(userId: number) {
        return axiosInstance.post(`${url}/getUserPostStatus`, { userId }).then((res) => res.data);
    }

    getProfilePicByUserId(userId: number) {
        return axiosInstance.post(`${url}/getProfilePicByUserId`, { userId }).then((res) => res.data);
    }

    getRoleByUserId(userId: number) {
        return axiosInstance.post(`${url}/getRoleByUserId`, { userId }).then((res) => res.data);
    }

    getPendingPostByUserId(values: any) {
        return axiosInstance.post(`${url}/getPendingPostByUserId`, values).then((res) => res.data);
    }

    getUserDetailsByUserId(userId: number) {
        return axiosInstance.post(`${url}/getUserDetailsByUserId`, { userId }).then((res) => res.data);
    }
}
