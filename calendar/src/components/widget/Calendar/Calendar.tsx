import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { createMeeting, getListMeeting } from '../../../actions/zoom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../reducers';
import { IMeeting } from '../../../services/zoom.service';
import ModalView from '../Modal/ModalView';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-bootstrap';
import Typography from '../Typography/Typography';

export const CALENDAR_ID = 'calendarId';

function mapToFullCalendarEvent(
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
export interface IModalState {
    name: string;
    startDate: string;
    duration: string;
}

interface IModalPostMeeting {
    displayModal: boolean;
    setDisplayModal: React.Dispatch<React.SetStateAction<boolean>>;
    stateCalendar: string;
    meetingEventState: IMeeting[] | undefined;
}
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
    console.log(
        '🚀 ~ file: Calendar.tsx ~ line 44 ~ stateForm',
        stateForm
    );
    const handleClose = () => props.setDisplayModal(false);

    return (
        <ModalView
            title={t('createMeeting')}
            show={props.displayModal}
            displayModal={props.displayModal}
            setDisplayModal={props.setDisplayModal}
            handleSave={() => {
                console.log(
                    '🚀 ~ file: ModalView.tsx ~ line 31 ~ stateForm',
                    stateForm
                );
                dispatch(
                    createMeeting(
                        stateForm.name,
                        stateForm.startDate,
                        stateForm.duration,
                        props.meetingEventState
                    )
                );
                handleClose();
            }}
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
            </Form>
        </ModalView>
    );
};
function findUrl(meetings: IMeeting[] | undefined, topic: string) {
    if (meetings) {
        return meetings.find(
            (meeting: IMeeting) => topic === meeting.topic
        )?.join_url;
    } else {
        return 'no link';
    }
}
const Calendar = (): JSX.Element => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    // get my storage
    const zoom = useSelector((state: IRootState) => state.zoom);
    // event calendar display
    const [meetingEventState, setMeetingEventState] =
        useState<IMeeting[]>();
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

    const [stateCalendar, setStateCalendar] = useState('');
    const [displayModal, setDisplayModal] = useState(false);
    const [displaySum, setDisplaySum] = useState(false);
    const [focused, setFocused] = useState({
        topic: '',
    });
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
                handleSave={() => {
                    // todo PUT meeting to update a meeting
                }}
            >
                <Typography>{focused.topic}</Typography>
                <Typography>
                    {findUrl(meetingEventState, focused.topic)}
                </Typography>
            </ModalView>
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
                        setFocused({
                            topic: info.event.title,
                        });
                        setDisplaySum(true);
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
