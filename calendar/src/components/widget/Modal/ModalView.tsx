import React from 'react';

import { Button, Modal } from 'react-bootstrap';

import './ModalView.css';

/**
 * interface IModal
 */
interface IModal {
    title: string;
    show: boolean;
    displayModal: boolean;
    setDisplayModal: React.Dispatch<React.SetStateAction<boolean>>;
    children: React.ReactNode;
    handleSave: () => void;
}

/**
 *
 * @param props
 * @returns
 */
const ModalView = (props: IModal): JSX.Element => {
    const handleClose = () => props.setDisplayModal(false);

    return (
        <Modal id={'MODAL_ID'} show={props.show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.children}</Modal.Body>
            <Modal.Footer>
                <Button
                    id={'CLOSE'}
                    variant="secondary"
                    onClick={handleClose}
                >
                    Close
                </Button>
                <Button
                    id={'SAVE'}
                    variant="primary"
                    onClick={props.handleSave}
                >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalView;
