//centeralized API setup

import axios from 'axios';
import qs from 'qs';

export const axiosInstance = axios.create({
    baseURL: "https://homelyhubintership501.onrender.com/api",
    withCredentials: true,
    paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }),
})

