import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ProfileContainer } from './styled';
import { getMe } from '../../helpers/fetch';
import { useSelector, RootStateOrAny } from 'react-redux';

const Logout = ({}) => {
    const token = useSelector((state: RootStateOrAny) => state.token);

    useEffect(() => {
        const getProfile = async () => {
            try {
                await getMe(token).then((res) => {
                    console.log(res);
                });
            } catch (e) {
                console.log(e);
            }
        };

        getProfile();
    }, []);

    return (
        <ProfileContainer>
            <span>Profile</span>
        </ProfileContainer>
    );
};

export default Logout;
