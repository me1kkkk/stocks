import React, { useState } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface IPrivateRoute extends RouteProps {
    token?: string;
}

const PrivateRoute = ({ children, ...rest }: IPrivateRoute) => {
    const token = window.localStorage.getItem('token');
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
