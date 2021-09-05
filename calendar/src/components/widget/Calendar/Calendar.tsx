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
import ModalView from '../Modal/ModalView';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-bootstrap';

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
export interface IModalState {
    name: string;
    startDate: string;
    duration: string;
}
const ModalPostMeeting = (
    displayModal: boolean,
    setDisplayModal: React.Dispatch<React.SetStateAction<boolean>>,
    stateCalendar: string
): JSX.Element => {
    const { t } = useTranslation();
    const [stateForm, setStateForm] = useState<IModalState>({
        name: '',
        startDate: stateCalendar.split(':00+')[0],
        duration: '',
    });
    useEffect(() => {
        setStateForm({
            ...stateForm,
            startDate: stateCalendar.split(':00+')[0],
        });
    }, [stateCalendar]);

    return (
        <ModalView
            title={t('createMeeting')}
            show={displayModal}
            setDisplayModal={setDisplayModal}
            stateForm={stateForm}
        >
            <Form>
                <Form.Group className="mb-3" controlId="form">
                    <Form.Label>{t('clientNameLabel')}</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder={t('clientName')}
                        value={stateForm.name}
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                            setStateForm({
                                ...stateForm,
                                name: event.target.value,
                            });
                        }}
                    />
                    <Form.Text className="text-muted">
                        {t('nameClientTopic')}
                    </Form.Text>
                </Form.Group>

                <Form.Label>{t('clientDateLabel')}</Form.Label>

                <Form.Control
                    type="datetime-local"
                    name="startDate"
                    value={stateForm.startDate}
                    onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                    ) => {
                        setStateForm({
                            ...stateForm,
                            startDate: event.target.value,
                        });
                    }}
                />

                <Form.Label>{t('clientDurationLabel')}</Form.Label>
                <Form.Control
                    type="number"
                    placeholder={t('duration')}
                    value={stateForm.duration}
                    onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                    ) => {
                        setStateForm({
                            ...stateForm,
                            duration: event.target.value,
                        });
                    }}
                />
                <Form.Text className="text-muted">
                    {t('durationMinute')}
                </Form.Text>
            </Form>
        </ModalView>
    );
};

const Calendar = (): JSX.Element => {
    const dispatch = useDispatch();
    // get my storage
    const zoom = useSelector((state: IRootState) => state.zoom);
    console.log('🚀 ~ file: Calendar.tsx ~ line 126 ~ zoom', zoom);
    // event calendar display
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
        if (zoom.meetings.length > 1) {
            setMeetingEventState(zoom.meetings);
        } else if (meetingEventState) {
            console.log(
                '🚀 ~ file: Calendar.tsx ~ line 146 ~ useEffect ~ meetingEventState',
                meetingEventState,
                zoom.meetings
            );

            setMeetingEventState([
                ...meetingEventState,
                ...zoom.meetings,
            ]);

            console.log(
                '🚀 ~ file: Calendar.tsx ~ line 158 ~ useEffect ~ meetingEventState',
                meetingEventState
            );
        }
    }, [zoom]);

    const [stateCalendar, setStateCalendar] = useState('');
    const [displayModal, setDisplayModal] = useState(false);
    return (
        <>
            {ModalPostMeeting(
                displayModal,
                setDisplayModal,
                stateCalendar
            )}
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
                        setDisplayModal(true);
                        setStateCalendar(info.dateStr);
                        console.log(
                            '🚀 ~ file: App.tsx ~ line 74 ~ App ~ info',
                            info
                        );
                    }}
                />
            </div>
        </>
    );
};

export default Calendar;
