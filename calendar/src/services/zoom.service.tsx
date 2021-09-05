import axios, { AxiosResponse } from 'axios';
import { IHTTPCode } from '../utils/IHttpInterface';
import authHeader from './auth-header';

const API_URL = 'http://localhost:9292';

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

export interface IResponseAxios {
    config: any;
    data: IMeeting[];
    headers: any;
    request: any;
    status: IHTTPCode;
}

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

export default {
    getListMeeting,
};
