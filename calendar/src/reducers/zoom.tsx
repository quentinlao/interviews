import { Meeting } from '../actions/types';
import { IMeeting } from '../services/zoom.service';

const initialState = { meetings: [] as IMeeting[] };

export default function (
    state = initialState,
    action: { type: Meeting; payload: any }
) {
    const { type, payload } = action;
    console.log('🚀 ~ file: zoom.tsx ~ line 10 ~ action', action);

    switch (type) {
        case Meeting.MEETING_READ_SUCCESS:
            console.log(
                '🚀 ~ file: zoom.tsx ~ line 9 ~ state',
                state,
                payload
            );
            return {
                ...state,
                meetings: payload,
            };
        case Meeting.MEETING_CREATED_SUCCESS:
            console.log(
                '🚀 ~ file: zoom.tsx ~ line 33 ~ Meeting.MEETING_CREATED_SUCCESS',
                state,
                action
            );
            return {
                ...state,
                meetings: [...state.meetings, ...payload],
            };
        default:
            return { ...state, meetings: [] };
    }
}
