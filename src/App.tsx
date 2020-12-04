import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './views/Login/Login';
import PrivateRoute from './components/ProtectedRoute/ProtectedRoute';
import Home from './views/Home/Home';
import Profile from './views/Profile/Profile';
import { useDispatch } from 'react-redux';
import Register from './views/Register/Register';
import Logout from './views/Logout/Logout';
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
                <PrivateRoute exact path="/">
                    <Home />
                </PrivateRoute>
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
            </Switch>
        </Router>
    );
}

export default App;
