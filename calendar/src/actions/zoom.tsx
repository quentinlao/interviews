import { Meeting } from './types';

import ZoomService, {
    IMeeting,
    IResponseAxios,
} from '../services/zoom.service';
import { IHTTPCode } from '../utils/IHttpInterface';
import { AxiosResponse } from 'axios';
import {
    deleteMeetingsFromId,
    updateMeetingsFromId,
} from '../utils/Meetings';

/**
 * function get all List Meeting
 * @param meetingEventState
 * @returns promise
 */
export const getListMeeting =
    (meetingEventState: IMeeting[]) => (dispatch: any) => {
        return ZoomService.getListMeeting().then(
            (data: void | AxiosResponse<IResponseAxios>) => {
                if (data) {
                    if (
                        (data as AxiosResponse<IResponseAxios>)
                            .status == IHTTPCode.SUCCESS
                    ) {
                        dispatch({
                            type: Meeting.MEETING_READ_SUCCESS,
                            payload: data.data,
                            meetings: meetingEventState,
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

/**
 * function createMeeting
 * @param client name string
 * @param startDate start_time
 * @param duration duration
 * @param meetingEventState current events
 * @returns promise
 */
export const createMeeting =
    (
        client: string,
        startDate: string,
        duration: string,
        meetingEventState: IMeeting[]
    ) =>
    (dispatch: any) => {
        return ZoomService.createMeeting(
            client,
            startDate,
            duration
        ).then(
            (data: void | AxiosResponse<IResponseAxios>) => {
                console.log(
                    '🚀 ~ file: auth.tsx ~ line 8 ~ getListMeeting ~ data',
                    data
                );
                if (data) {
                    /* if (
                        (data as AxiosResponse<IResponseAxios>)
                            .status == IHTTPCode.SUCCESS
                    ) { */
                    dispatch({
                        type: Meeting.MEETING_CREATED_SUCCESS,
                        payload: data.data,
                        meetings: meetingEventState,
                    });
                    /*  } */
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

export const updateMeeting =
    (
        client: string,
        startDate: string,
        duration: string,
        meetingEventState: IMeeting[],
        idMeeting: string
    ) =>
    (dispatch: any) => {
        return ZoomService.updateMeeting(
            client,
            startDate,
            duration,
            idMeeting
        ).then(
            (data: void | AxiosResponse<IResponseAxios>) => {
                console.log(
                    '🚀 ~ file: auth.tsx ~ line 8 ~ getListMeeting ~ data',
                    data
                );
                if (data) {
                    if (
                        (data as AxiosResponse<IResponseAxios>)
                            .status == IHTTPCode.NO_CONTENT
                    ) {
                        dispatch({
                            type: Meeting.MEETING_UPDATED_SUCCESS,
                            payload: updateMeetingsFromId(
                                idMeeting,
                                meetingEventState,
                                startDate,
                                duration,
                                client
                            ),
                            meetings: meetingEventState,
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

export const deleteMeeting =
    (meetingEventState: IMeeting[], idMeeting: string) =>
    (dispatch: any) => {
        return ZoomService.deleteMeeting(idMeeting).then(
            (data: void | AxiosResponse<IResponseAxios>) => {
                if (data) {
                    if (
                        (data as AxiosResponse<IResponseAxios>)
                            .status == IHTTPCode.NO_CONTENT
                    ) {
                        dispatch({
                            type: Meeting.MEETING_DELETED_SUCCESS,
                            payload: deleteMeetingsFromId(
                                idMeeting,
                                meetingEventState
                            ),
                            meetings: meetingEventState,
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
