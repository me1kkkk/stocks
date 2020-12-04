import React, { useContext } from 'react';
import { LogoutContainer } from './styled';
import { useHistory } from 'react-router-dom';

const Logout = ({}) => {
    const history = useHistory();

    const handleLogout = async () => {
        await window.localStorage.removeItem('token');
        history.push('/login');
    };

    return (
        <LogoutContainer>
            <span>Logout</span>
            <button onClick={handleLogout}>Logout</button>
        </LogoutContainer>
    );
};

export default Logout;
