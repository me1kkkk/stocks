import React, { useState } from 'react';
import { signup } from '../../helpers/fetch';
import { Headline, Form, FormContainer } from './styled';
import {
    TextField,
    Container,
    Button,
    Input,
    FormControl,
    InputLabel,
    InputAdornment,
    IconButton,
    Grid,
    Link,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useForm, Controller } from 'react-hook-form';
import { LinkContainer } from '../Login/styled';
import { useHistory } from 'react-router-dom';

interface IFormInput {
    username: string;
    password: string;
    re_password: string;
    email: string;
}

const Register = ({}) => {
    const history = useHistory();
    const { register, handleSubmit, errors, control } = useForm<IFormInput>();
    const [state, setState] = useState({
        username: '',
        password: '',
        re_password: '',
        email: '',
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setState({ ...state, showPassword: !state.showPassword });
    };

    const handleChange = (prop: string) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        console.log(event.target.value);
        setState({ ...state, [prop]: event.target.value });
    };

    const onSubmit = async () => {
        const { username, password, email } = state;
        try {
            await signup(password, username, email).then((res) => {
                console.log('register succesfull');
            });
        } catch (e) {
            console.error(e);
        }
    };

    const { email, password, username, showPassword, re_password } = state;

    return (
        <Container>
            <Grid>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormContainer>
                        <Headline>Register</Headline>
                        <Form>
                            <FormControl>
                                <InputLabel htmlFor="standard-adornment-username">
                                    Benutzername
                                </InputLabel>
                                <Input
                                    name="username"
                                    defaultValue=""
                                    type="text"
                                    onChange={handleChange('username')}
                                    fullWidth={true}
                                    error={!!errors.username}
                                    inputRef={register({
                                        required: true,
                                        minLength: 2,
                                    })}
                                />
                                {errors &&
                                    errors.username?.type === 'required' && (
                                        <span>This is Required</span>
                                    )}
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
                                        required: true,
                                        minLength: 5,
                                    })}
                                />
                                {errors &&
                                    errors.password?.type === 'required' && (
                                        <span>This is Required</span>
                                    )}
                            </FormControl>
                            <FormControl>
                                <InputLabel htmlFor="standard-adornment-password">
                                    Password wiederholen
                                </InputLabel>
                                <Input
                                    name="re_password"
                                    id="standard-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={re_password}
                                    onChange={handleChange('re_password')}
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
                                    error={!!errors.re_password}
                                    inputRef={register({
                                        required: true,
                                        minLength: 5,
                                    })}
                                />
                                {errors &&
                                    errors.re_password?.type === 'required' && (
                                        <span>This is Required</span>
                                    )}
                            </FormControl>
                            <FormControl>
                                <InputLabel htmlFor="standard-adornment-email">
                                    Email
                                </InputLabel>
                                <Input
                                    name="email"
                                    defaultValue=""
                                    type="text"
                                    onChange={handleChange('email')}
                                    fullWidth={true}
                                    error={!!errors.email}
                                    inputRef={register({
                                        required: true,
                                    })}
                                />
                                {errors &&
                                    errors.email?.type === 'required' && (
                                        <span>This is Required</span>
                                    )}
                            </FormControl>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Register
                            </Button>
                        </Form>
                    </FormContainer>
                </form>
            </Grid>
            <Grid>
                <LinkContainer>
                    <Link onClick={() => history.push('/login')}>
                        Zurück zu Login
                    </Link>
                </LinkContainer>
            </Grid>
        </Container>
    );
};

export default Register;
