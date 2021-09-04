import { Meeting } from './types';

import ZoomService from '../services/zoom.service';

export const getListMeeting = () => (dispatch: any) => {
    return ZoomService.getListMeeting().then(
        (data) => {
            console.log(
                '🚀 ~ file: auth.tsx ~ line 8 ~ getListMeeting ~ data',
                data
            );
            dispatch({
                type: Meeting.MEETING_READ_SUCCESS,
            });
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
