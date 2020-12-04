import React from 'react';
import { Button } from '@material-ui/core';
import { IButton } from '../../shared/types';

const ButtonComponent = ({ label, onClick, variant, color }: IButton) => {
    return (
        <Button variant={variant} color={color} onClick={onClick}>
            {label}
        </Button>
    );
};

export default ButtonComponent;
