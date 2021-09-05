import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { getListMeeting } from '../../../actions/zoom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../reducers';
import { IMeeting } from '../../../services/zoom.service';
import moment from 'moment';

export const CALENDAR_ID = 'calendarId';

function mapToFullCalendarEvent(
    meetingEventState: IMeeting[] | undefined
) {
    return meetingEventState?.map((meeting: IMeeting) => {
        return {
            id: meeting.id.toString(),
            start: meeting.start_time,
            end: moment(meeting.start_time)
                .add(meeting.duration, 'm')
                .toDate()
                .toString(),

            title: meeting.topic,
        };
    });
}

const Calendar = (): JSX.Element => {
    const dispatch = useDispatch();
    const zoom = useSelector((state: IRootState) => state.zoom);
    const [meetingEventState, setMeetingEventState] =
        useState<IMeeting[]>();
    /**
     * Initialization component
     * update calendar events
     */
    useEffect(() => {
        dispatch(getListMeeting());
    }, []);

    /**
     * Subscribe to each change storage zoom
     * MeetingEvents setted
     */
    useEffect(() => {
        setMeetingEventState(zoom.meetings);
    }, [zoom]);

    return (
        <div id={CALENDAR_ID}>
            <FullCalendar
                plugins={[timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                editable={true}
                events={mapToFullCalendarEvent(meetingEventState)}
                droppable={true}
                drop={(event) => {
                    console.log(
                        '🚀 ~ file: App.tsx ~ line 57 ~ App ~ event',
                        event
                    );
                }}
                eventClick={(info) => {
                    // handle click event to display summerize
                    // TODO : Create a modal with my event summerize and a link to launch meeting
                    console.log(
                        '🚀 ~ file: App.tsx ~ line 64 ~ App ~ info',
                        info.event.title,
                        info.jsEvent.pageX,
                        info.jsEvent.pageY,
                        info.view.type
                    );
                }}
                dateClick={(info) => {
                    // handle click to display a modal to add event
                    // TODO : Create a modal to create a event
                    console.log(
                        '🚀 ~ file: App.tsx ~ line 74 ~ App ~ info',
                        info
                    );
                }}
            />
        </div>
    );
};

export default Calendar;
