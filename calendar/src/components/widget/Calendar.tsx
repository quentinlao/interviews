import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { getListMeeting } from '../../actions/zoom';
import { useDispatch } from 'react-redux';

export const CALENDAR_ID = 'calendarId';

const Calendar = (): JSX.Element => {
    const dispatch = useDispatch();

    useEffect(() => {
        const data = dispatch(getListMeeting());
    }, []);
    return (
        <div id={CALENDAR_ID}>
            <FullCalendar
                plugins={[timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                editable={true}
                events={[
                    {
                        id: 'a',
                        start: '2021-09-01T10:30:00',
                        end: '2021-09-01T11:30:00',
                        title: 'my event',
                    },
                ]}
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
