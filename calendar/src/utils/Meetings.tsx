import { IMeeting } from '../services/zoom.service';

/**
 * function map event from zoom records to calendar event
 * @param meetingEventState current states
 * @returns calendar event
 */
export function mapToFullCalendarEvent(
    meetingEventState: IMeeting[]
) {
    return meetingEventState?.map((meeting: IMeeting) => {
        return {
            id: meeting.id.toString(),
            start: meeting.start_time,
            title: meeting.topic,
        };
    });
}

/**
 * find url in a list of meetings from a topic
 * @param meetings events meetings
 * @param topic title
 * @returns string url event
 */
export function findUrl(meetings: IMeeting[], topic: string) {
    if (meetings) {
        return meetings.find(
            (meeting: IMeeting) => topic === meeting.topic
        )?.join_url;
    } else {
        return 'no link';
    }
}

export function updateMeetingsFromId(
    idMeeting: string,
    meetings: IMeeting[],
    start_time: string,
    duration: string,
    topic: string
) {
    return meetings?.map((meeting: IMeeting) => {
        if (meeting.id === Number(idMeeting)) {
            return { ...meeting, start_time, duration, topic };
        } else {
            return meeting;
        }
    });
}

export function deleteMeetingsFromId(
    idMeeting: string,
    meetings: IMeeting[]
) {
    return meetings?.filter((meeting: IMeeting) => {
        return meeting.id !== Number(idMeeting);
    });
}
