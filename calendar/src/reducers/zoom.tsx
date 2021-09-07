import { Meeting } from '../actions/types';
import { IMeeting } from '../services/zoom.service';

/**
 * initial state
 */
const initialState = { meetings: [] as IMeeting[] };

/**
 * zoom reducer
 * @param state
 * @param action type enum meeting, payload Meeting
 * @returns
 */
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
        case Meeting.MEETING_UPDATED_SUCCESS:
            console.log(
                '🚀 ~ file: zoom.tsx ~ line 33 ~ Meeting.MEETING_UPDATED_SUCCESS',
                state,
                action
            );
            break;
        default:
            return { ...state, meetings: [] };
    }
}
