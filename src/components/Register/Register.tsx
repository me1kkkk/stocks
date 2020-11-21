import React, { useState } from 'react';
import { signup } from '../../helpers/fetch';

const Register = ({}) => {
    const [state, setState] = useState({
        username: '',
        password: '',
        email: '',
    });

    const handleRegister = (
        username: string,
        password: string,
        email: string
    ) => {
        signup(password, username, email).then((res) => {
            console.log('register succesfull');
        });
    };

    const { email, password, username } = state;

    return (
        <div>
            <div>Register</div>
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
            <input
                type="text"
                placeholder="email"
                onChange={(e) => setState({ ...state, email: e.target.value })}
            />
            <button onClick={() => handleRegister(username, password, email)}>
                Login
            </button>
        </div>
    );
};

export default Register;
