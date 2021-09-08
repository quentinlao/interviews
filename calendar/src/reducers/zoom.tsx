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
    switch (type) {
        case Meeting.MEETING_READ_SUCCESS:
            return {
                ...state,
                meetings: payload,
            };
        case Meeting.MEETING_CREATED_SUCCESS:
            return {
                ...state,
                meetings: [...state.meetings, ...payload],
            };
        case Meeting.MEETING_UPDATED_SUCCESS:
            return {
                meetings: payload,
            };
        case Meeting.MEETING_DELETED_SUCCESS:
            return {
                meetings: payload,
            };
        default:
            return { ...state, meetings: [] };
    }
}
