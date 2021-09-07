import { IMeeting } from '../services/zoom.service';

/**
 * function map event from zoom records to calendar event
 * @param meetingEventState current states
 * @returns calendar event
 */
export function mapToFullCalendarEvent(
    meetingEventState: IMeeting[] | undefined
) {
    return meetingEventState?.map((meeting: IMeeting) => {
        return {
            id: meeting.id.toString(),
            start: meeting.start_time.replace(':00Z', ':00+02:00'),

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
export function findUrl(
    meetings: IMeeting[] | undefined,
    topic: string
) {
    if (meetings) {
        return meetings.find(
            (meeting: IMeeting) => topic === meeting.topic
        )?.join_url;
    } else {
        return 'no link';
    }
}
