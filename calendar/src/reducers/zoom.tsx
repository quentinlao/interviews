import { Meeting } from '../actions/types';

const initialState = {};

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
        default:
            return { ...state, meetings: [] };
    }
}
