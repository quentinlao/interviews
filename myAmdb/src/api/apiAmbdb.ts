import axios from 'axios';
import { API_AMBD_API } from '../utils/constants/constants';

const apiAmbdb = axios.create({
    baseURL: API_AMBD_API,
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
    },
});
export default apiAmbdb;
