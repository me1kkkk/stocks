import React, { useState } from 'react';
import { login } from '../../helpers/fetch';
import { useHistory } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';
import tokenSlice from '../../redux/tokenReducer';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { FormContainer, Form, InputContainer } from '../Register/styled';
import { object, string } from 'yup';
import { useForm, Controller } from 'react-hook-form';
import {
    FormControl,
    InputLabel,
    Input,
    InputAdornment,
    IconButton,
    Container,
    Button,
    LinearProgress,
    Grid,
    Link,
} from '@material-ui/core';
import { LinkContainer, ButtonContainer } from './styled';

interface IState {
    username: string;
    password: string;
    showPassword: boolean;
    isLoading: boolean;
}

interface IFormInput {
    username: string;
    password: string;
}

const Login = ({}) => {
    const { register, handleSubmit, errors, setError } = useForm<IFormInput>();

    const history = useHistory();
    const dispatch = useDispatch();
    const [state, setState] = useState<IState>({
        username: '',
        password: '',
        showPassword: false,
        isLoading: false,
    });
    const { actions } = tokenSlice;

    const handleLogin = async (username: string, password: string) => {
        const { isLoading } = state;
        setState({ ...state, isLoading: !isLoading });
        try {
            await login(password, username).then((res) => {
                if (res.status === 200) {
                    res.json().then((data) => {
                        window.localStorage.setItem('token', data.token);
                        const token = window.localStorage.getItem('token');
                        dispatch(actions.setToken(token));
                        history.push('/');
                        setState({ ...state, isLoading: false });
                    });
                } else {
                    res.json().then((data) => {
                        console.log(data.message);
                        setError('password', { message: data.message });
                        setState({ ...state, isLoading: false });
                    });
                }
            });
        } catch (e) {
            console.error(e);
        }
    };

    const onSubmit = async () => {
        const { username, password } = state;
        await handleLogin(username, password);
    };

    const handleChange = (prop: string) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setState({ ...state, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setState({ ...state, showPassword: !state.showPassword });
    };

    const { showPassword, password, isLoading } = state;

    return (
        <Container>
            {isLoading && <LinearProgress />}
            <Grid>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormContainer>
                        <h1>Login</h1>
                        <Form>
                            <FormControl>
                                <InputLabel htmlFor="standard-adornment-username">
                                    Benutzername
                                </InputLabel>
                                <Input
                                    name="username"
                                    type="text"
                                    onChange={handleChange('username')}
                                    fullWidth={true}
                                    error={!!errors.username}
                                    inputRef={register({
                                        required: 'Benutzername ungültig.',
                                    })}
                                />
                                {errors && errors.username?.message}
                            </FormControl>

                            <FormControl>
                                <InputLabel htmlFor="standard-adornment-password">
                                    Password
                                </InputLabel>
                                <Input
                                    name="password"
                                    id="standard-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={handleChange('password')}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={
                                                    handleClickShowPassword
                                                }
                                            >
                                                {showPassword ? (
                                                    <Visibility />
                                                ) : (
                                                    <VisibilityOff />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    fullWidth={true}
                                    error={!!errors.password}
                                    inputRef={register({
                                        required: 'Passwort ungültig',
                                    })}
                                />
                                {errors && errors.password?.message}
                            </FormControl>

                            <ButtonContainer>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth={true}
                                >
                                    Login
                                </Button>
                            </ButtonContainer>
                            <ButtonContainer>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    fullWidth={true}
                                    onClick={() => history.push('register')}
                                >
                                    Registrieren
                                </Button>
                            </ButtonContainer>
                        </Form>
                    </FormContainer>
                </form>
            </Grid>
        </Container>
    );
};

export default connect()(Login);
