import { Meeting } from '../actions/types';

const initialState = {};

export default function (
    state = initialState,
    action: { type: Meeting; payload: any }
) {
    const { type, payload } = action;

    switch (type) {
        case Meeting.MEETING_READ_SUCCESS:
            console.log(
                '🚀 ~ file: zoom.tsx ~ line 9 ~ state',
                state,
                payload
            );
            return {
                ...state,
            };
        default:
            return state;
    }
}
