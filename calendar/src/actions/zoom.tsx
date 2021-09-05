import { Meeting } from './types';

import ZoomService, {
    IResponseAxios,
} from '../services/zoom.service';
import { IHTTPCode } from '../utils/IHttpInterface';
import { AxiosResponse } from 'axios';

export const getListMeeting = () => (dispatch: any) => {
    return ZoomService.getListMeeting().then(
        (data: void | AxiosResponse<IResponseAxios>) => {
            console.log(
                '🚀 ~ file: auth.tsx ~ line 8 ~ getListMeeting ~ data',
                data
            );
            if (data) {
                if (
                    (data as AxiosResponse<IResponseAxios>).status ==
                    IHTTPCode.SUCCESS
                ) {
                    dispatch({
                        type: Meeting.MEETING_READ_SUCCESS,
                        payload: data.data,
                    });
                }
            }
            return Promise.resolve();
        },
        (error) => {
            dispatch({
                type: Meeting.MEETING_FAIL,
            });
            return Promise.reject();
        }
    );
};
