import React, { useState } from 'react';
import { LoginContainer } from './styled';
import { login } from '../../helpers/fetch';
import { useHistory } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';
import tokenSlice from '../../redux/tokenReducer';
import store from '../../redux/store';

const Login = ({}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [state, setState] = useState({
        username: '',
        password: '',
    });
    const { actions } = tokenSlice;

    const handleLogin = (username: string, password: string) => {
        login(username, password).then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    window.localStorage.setItem('token', data.token);
                    const token = window.localStorage.getItem('token');
                    dispatch(actions.setToken(token));
                    history.push('/');
                });
            }
        });
    };

    return (
        <LoginContainer>
            <span>Login</span>
            <input
                type="text"
                placeholder="username"
                onChange={(e) =>
                    setState({ ...state, username: e.target.value })
                }
            />
            <input
                type="text"
                placeholder="password"
                onChange={(e) =>
                    setState({ ...state, password: e.target.value })
                }
            />
            <button onClick={() => handleLogin(state.username, state.password)}>
                Login
            </button>
        </LoginContainer>
    );
};

export default connect()(Login);
