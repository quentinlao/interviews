import React from 'react';

import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import * as Typestyle from 'typestyle';
import styles from './ModalView.css';

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
    deleteEvent?: boolean;
}

/**
 *
 * @param props
 * @returns
 */
const ModalView = (props: IModal): JSX.Element => {
    const { t } = useTranslation();
    const handleClose = () => props.setDisplayModal(false);

    return (
        <Modal
            id={'MODAL_ID'}
            show={props.show}
            onHide={handleClose}
            className={Typestyle.classes(styles.red)}
        >
            <Modal.Header closeButton>
                <Modal.Title
                    className={Typestyle.classes(styles.red)}
                >
                    {props.title}
                </Modal.Title>
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
                    variant={props.deleteEvent ? 'danger' : 'primary'}
                    onClick={props.handleSave}
                >
                    {props.deleteEvent ? t('Delete') : t('Save')}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalView;
