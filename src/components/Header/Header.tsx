import React from 'react';
import { Header } from './styled';
import SearchbarComponent from '../Searchbar/Searchbar';
import { IInput, IButton } from '../../shared/types';
import { Button } from '@material-ui/core';
import ButtonComponent from '../Button/Button';

const HeaderComponent = ({
    onChange,
    onClick,
    label,
    color,
    variant,
}: IInput & IButton) => {
    return (
        <Header>
            <SearchbarComponent onChange={onChange} />
            <ButtonComponent
                onClick={onClick}
                label={label}
                color={color}
                variant={variant}
            />
        </Header>
    );
};

export default HeaderComponent;
