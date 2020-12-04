import React from 'react';
import Modal from '@material-ui/core/Modal';
import { IModal, IStockCard, IButton } from '../../shared/types';
import { makeStyles } from '@material-ui/core';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import ButtonComponent from '../Button/Button';

const ModalComponent = ({
    open,
    onClose,
    name,
    currentPrice,
    openPrice,
    highPrice,
    lowPrice,
    closePrice,
    isLoading,
    onClick,
    label,
    color,
    variant,
}: IModal & IStockCard & IButton) => {
    function getModalStyle() {
        const top = 50;
        const left = 50;

        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }

    const useStyles = makeStyles((theme) => ({
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
    }));

    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

    const body = (
        <div style={modalStyle} className={classes.paper}>
            {isLoading ? (
                <LoadingIndicator />
            ) : (
                <div>
                    <div>
                        <div>{name}</div>
                        <div>{currentPrice}</div>
                        <div>{openPrice}</div>
                        <div>{highPrice}</div>
                        <div>{lowPrice}</div>
                        <div>{closePrice}</div>
                    </div>
                    <ButtonComponent
                        onClick={onClick}
                        label={label}
                        color={color}
                        variant={variant}
                    />
                </div>
            )}
        </div>
    );

    return (
        <Modal open={open} onClose={onClose}>
            {body}
        </Modal>
    );
};

export default ModalComponent;
