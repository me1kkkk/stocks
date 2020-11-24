import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';
import PrivateRoute from './components/ProtectedRoute/ProtectedRoute';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import { useDispatch } from 'react-redux';
import Register from './components/Register/Register';
import Logout from './components/Logout/Logout';
import tokenSlice from './redux/tokenReducer';

function App() {
    const dispatch = useDispatch();
    const { actions } = tokenSlice;

    useEffect(() => {
        const token = window.localStorage.getItem('token');
        dispatch(actions.setToken(token));
    }, []);

    return (
        <Router>
            <Switch>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path="/register">
                    <Register />
                </Route>
                <Route exact path="/logout">
                    <Logout />
                </Route>
                <PrivateRoute exact path="/profile">
                    <Profile />
                </PrivateRoute>
                <PrivateRoute exact path="/">
                    <Home />
                </PrivateRoute>
            </Switch>
        </Router>
    );
}

export default App;
