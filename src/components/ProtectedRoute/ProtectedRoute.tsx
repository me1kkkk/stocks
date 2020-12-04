import React, { useState } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import tokenSlice from '../../redux/tokenReducer';

interface IPrivateRoute extends RouteProps {
    token?: string;
}

const PrivateRoute = ({ children, ...rest }: IPrivateRoute) => {
    const dispatch = useDispatch();
    const { actions } = tokenSlice;
    const token = window.localStorage.getItem('token');
    dispatch(actions.setToken(token));
    return (
        <Route
            {...rest}
            render={({ location }) =>
                token ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;
