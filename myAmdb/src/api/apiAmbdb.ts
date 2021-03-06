import axios from 'axios';
import { API_AMBD_API } from '../utils/constants/constants';

/**
 * create instance axios with header
 */
const apiAmbdb = axios.create({
    baseURL: API_AMBD_API,
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
    },
});
export default apiAmbdb;
