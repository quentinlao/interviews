import axios, { AxiosResponse } from 'axios';
import { IHTTPCode } from '../utils/IHttpInterface';
import authHeader from './auth-header';

const API_URL = 'http://localhost:9292';

/**
 *
 */
export interface IMeeting {
    uuid: string;
    id: number;
    host_id: string;
    topic: string;
    type: number;
    start_time: string;
    duration: number;
    timezone: string;
    created_at: string;
    join_url: string;
}

/**
 *
 */
export interface IResponseAxios {
    config: any;
    data: IMeeting[];
    headers: any;
    request: any;
    status: IHTTPCode;
}

/**
 * READ all meetings ZOOM API
 * @returns
 */
const getListMeeting = () => {
    return axios
        .get(API_URL + '/meetings')
        .then((response: AxiosResponse<IResponseAxios>) => {
            console.log(
                '🚀 ~ file: auth.service.tsx ~ line 32 ~ login ~ response',
                response
            );

            return Promise.resolve(response);
        })
        .catch((error) => {
            console.log(
                '🚀 ~ file: zoom.service.tsx ~ line 39 ~ .then ~ error',
                error
            );
        });
};

/**
 * POST a meeting ZOOM API
 * @param client
 * @param startDate
 * @param duration
 * @returns
 */
const createMeeting = (
    client: string,
    startDate: string,
    duration: string
) => {
    return axios
        .post(API_URL + '/meetings', {
            client,
            startDate,
            duration,
        })
        .then((response: AxiosResponse<IResponseAxios>) => {
            console.log(
                '🚀 ~ file: auth.service.tsx ~ line 32 ~ login ~ response',
                response
            );

            return Promise.resolve(response);
        })
        .catch((error) => {
            console.log(
                '🚀 ~ file: zoom.service.tsx ~ line 39 ~ .then ~ error',
                error
            );
        });
};

/**
 * POST a meeting ZOOM API
 * @param client
 * @param startDate
 * @param duration
 * @returns
 */
const updateMeeting = (
    client: string,
    startDate: string,
    duration: string,
    idMeeting: string
) => {
    return axios
        .patch(`${API_URL}/meetings`, {
            client,
            startDate,
            duration,
            idMeeting,
        })
        .then((response: AxiosResponse<IResponseAxios>) => {
            console.log(
                '🚀 ~ file: auth.service.tsx ~ line 32 ~ login ~ response',
                response
            );

            return Promise.resolve(response);
        })
        .catch((error) => {
            console.log(
                '🚀 ~ file: zoom.service.tsx ~ line 39 ~ .then ~ error',
                error
            );
        });
};

export default {
    getListMeeting,
    createMeeting,
    updateMeeting,
};
