import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// plugin calendar
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

// component
import { Form } from 'react-bootstrap';
import Typography from '../Typography/Typography';
import ModalView from '../Modal/ModalView';

import {
    createMeeting,
    deleteMeeting,
    getListMeeting,
    updateMeeting,
} from '../../../actions/zoom';
import { IRootState } from '../../../reducers';
import { IMeeting } from '../../../services/zoom.service';

// utils
import * as Meeting from '../../../utils/Meetings';
import moment from 'moment';

// constantes
export const CALENDAR_ID = 'calendarId';

export interface IModalState {
    name: string;
    startDate: string;
    duration: string;
}

/**
 * interface IModalPostMeeting
 * displayModal         -
 * setDisplayModal      -
 * stateCalendar        -
 * meetingEventState    -
 */
interface IModalPostMeeting {
    displayModal: boolean;
    setDisplayModal: React.Dispatch<React.SetStateAction<boolean>>;
    stateCalendar: string;
    meetingEventState: IMeeting[] | undefined;
}

/**
 * Create modal on click event date for POST Meeting ZOOM
 * @param props interface modal post props
 * @returns component
 */
const ModalPostMeeting = (props: IModalPostMeeting): JSX.Element => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [stateForm, setStateForm] = useState<IModalState>({
        name: '',
        startDate: props.stateCalendar.split(':00+')[0],
        duration: '',
    });

    useEffect(() => {
        setStateForm({
            ...stateForm,
            startDate: props.stateCalendar.split(':00+')[0],
        });
    }, [props.stateCalendar]);

    const handleClose = () => props.setDisplayModal(false);
    const handleSave = () => {
        dispatch(
            createMeeting(
                stateForm.name,
                stateForm.startDate,
                stateForm.duration,
                props.meetingEventState
            )
        );
        handleClose();
    };
    const alertComponent = (
        <div className="alert alert-warning" role="alert">
            {t('warningDate')}
        </div>
    );
    let displayWarning = false;
    if (stateForm.startDate) {
        const hourmi = stateForm.startDate.split('T')[1];
        const hour = Number(hourmi.split(':')[0]);

        displayWarning = hour >= 13 && hour <= 14;
    }

    return (
        <ModalView
            title={t('createMeeting')}
            show={props.displayModal}
            displayModal={props.displayModal}
            setDisplayModal={props.setDisplayModal}
            handleSave={handleSave}
        >
            <Form>
                <Form.Group className="mb-3" controlId="form">
                    <Form.Label>{t('clientNameLabel')}</Form.Label>
                    <Form.Control
                        id={'clientName'}
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
                    id={'startDate'}
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
                    id={'duration'}
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
                {displayWarning && alertComponent}
            </Form>
        </ModalView>
    );
};

/**
 *
 * @returns
 */
const CalendarView = (): JSX.Element => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const [stateCalendar, setStateCalendar] = useState('');
    const [displayModal, setDisplayModal] = useState(false);
    const [displaySum, setDisplaySum] = useState(false);
    const [focused, setFocused] = useState({
        topic: '',
        id: '',
    });
    // event calendar display
    const [meetingEventState, setMeetingEventState] =
        useState<IMeeting[]>();

    // get my storage
    const zoom = useSelector((state: IRootState) => state.zoom);

    /**
     * Initialization component
     * update calendar events
     */
    useEffect(() => {
        dispatch(getListMeeting(meetingEventState));
    }, []);

    /**
     * Subscribe to each change storage zoom
     * MeetingEvents setted
     */
    useEffect(() => {
        if (zoom.meetings.length > 1) {
            setMeetingEventState(zoom.meetings);
        } else if (meetingEventState) {
            setMeetingEventState([
                ...meetingEventState,
                ...zoom.meetings,
            ]);
        }
    }, [zoom]);

    return (
        <>
            <ModalPostMeeting
                displayModal={displayModal}
                setDisplayModal={setDisplayModal}
                stateCalendar={stateCalendar}
                meetingEventState={meetingEventState}
            />
            <ModalView
                title={t('sumMeeting')}
                show={displaySum}
                displayModal={displaySum}
                setDisplayModal={setDisplaySum}
                deleteEvent={true}
                handleSave={() => {
                    // DELETE a meeting
                    dispatch(
                        deleteMeeting(meetingEventState, focused.id)
                    );
                    setDisplaySum(false);
                }}
            >
                <Typography>
                    <h3>{focused.topic}</h3>
                </Typography>
                <Typography>
                    <a
                        href={Meeting.findUrl(
                            meetingEventState,
                            focused.topic
                        )}
                    >
                        {t('linkMeeting')}
                    </a>
                </Typography>
            </ModalView>
            <div id={CALENDAR_ID}>
                <FullCalendar
                    plugins={[timeGridPlugin, interactionPlugin]}
                    initialView="timeGridWeek"
                    editable={true}
                    events={Meeting.mapToFullCalendarEvent(
                        meetingEventState
                    )}
                    droppable={true}
                    eventDrop={(info) => {
                        // update on drop event to calendar
                        dispatch(
                            updateMeeting(
                                info.event.title,
                                info.event.startStr,
                                '60',
                                meetingEventState,
                                info.event.id
                            )
                        );
                    }}
                    eventClick={(info) => {
                        // handle click event to display summerize
                        console.log(
                            '🚀 ~ file: App.tsx ~ line 64 ~ App ~ info',
                            info.event.title,
                            info.jsEvent.pageX,
                            info.jsEvent.pageY,
                            info.view.type
                        );
                        setFocused({
                            topic: info.event.title,
                            id: info.event.id,
                        });
                        setDisplaySum(true);
                    }}
                    dateClick={(info) => {
                        // handle click to display a modal to add event
                        setDisplayModal(true);
                        setStateCalendar(info.dateStr);
                    }}
                />
            </div>
        </>
    );
};

export default CalendarView;
