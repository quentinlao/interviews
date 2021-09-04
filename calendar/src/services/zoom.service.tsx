import axios, { AxiosResponse } from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://api.zoom.us/v2';

interface IMeeting {
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

interface IResponseAuth {
    page_size: number;
    total_records: number;
    next_page_token: string;
    meetings: IMeeting[];
}

const getListMeeting = () => {
    return axios
        .get(API_URL + '/users/me/meetings', {
            headers: authHeader(),
        })
        .then((response: AxiosResponse<IResponseAuth>) => {
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
