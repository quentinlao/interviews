import React from 'react';

import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { createMeeting, getListMeeting } from '../../../actions/zoom';
import { IModalState } from '../Calendar/Calendar';

import './ModalView.css';

/**
 *
 */
interface IModal {
    title: string;
    show: boolean;
    setDisplayModal: React.Dispatch<React.SetStateAction<boolean>>;
    children: React.ReactNode;
    stateForm: IModalState;
}

/**
 *
 * @param props
 * @returns
 */
const ModalView = (props: IModal): JSX.Element => {
    const dispatch = useDispatch();
    const { stateForm } = props;
    const handleClose = () => props.setDisplayModal(false);

    const handleSave = () => {
        dispatch(
            createMeeting(
                stateForm.name,
                stateForm.startDate,
                stateForm.duration
            )
        );
        handleClose();
        dispatch(getListMeeting());
    };
    return (
        <Modal show={props.show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.children}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalView;
