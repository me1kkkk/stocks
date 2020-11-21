import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, RootStateOrAny, connect } from 'react-redux';

const Home = ({}) => {
    const history = useHistory();
    const token = useSelector((state: RootStateOrAny) => state.token);

    useEffect(() => {
        //console.log(token);
    });

    const handleLogout = () => {
        window.localStorage.removeItem('token');
        history.push('/login');
    };

    const getToken = () => {
        console.log(token);
    };

    return (
        <div>
            <div>Home</div>
            <div>
                <button onClick={getToken}>GetToken</button>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default connect()(Home);
