import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, RootStateOrAny, connect } from 'react-redux';
import { getQuotes } from '../../helpers/fetch';

interface IStock {
    c: string;
    h: string;
    l: string;
    o: string;
    pc: string;
    t: string;
}

const Home = ({}) => {
    const history = useHistory();
    const [inputValue, setInputValue] = useState<string>('');
    const [state, setState] = useState({
        stock: {
            c: '',
            h: '',
            l: '',
            o: '',
            pc: '',
            t: '',
        },
    });
    const token = useSelector((state: RootStateOrAny) => state.token.token);

    useEffect(() => {
        //console.log(token);
    });

    const handleLogout = () => {
        window.localStorage.removeItem('token');
        history.push('/login');
    };

    const getStock = () => {
        getQuotes(token, inputValue).then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    const res = JSON.parse(data);
                    setState({ ...state, stock: res });
                });
            }
        });
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value },
        } = event;

        setInputValue(value);
    };

    const { stock } = state;
    return (
        <div>
            <div>Home</div>
            <div>{stock.c}</div>
            <div>
                <button onClick={handleLogout}>Logout</button>
                <button onClick={getStock}>Get Stock</button>
                <input
                    type="text"
                    placeholder="Symbol"
                    onChange={(e) => onChange(e)}
                />
            </div>
        </div>
    );
};

export default connect()(Home);
