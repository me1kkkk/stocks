const finnhubToken = 'breeeofrh5rckh45b320';

export const login = async (password: string, username: string) => {
    return await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            password,
            username,
        }),
    });
};

export const signup = async (
    password: string,
    username: string,
    email: string
) => {
    return await fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            password,
            username,
            email,
        }),
    });
};

export const getMe = async (token: string) => {
    return await fetch('/test', {
        method: 'GET',
        headers: { Authorization: 'bearer ' + token },
    }).then(async (response) => {
        const data = await response.json();
        console.error(data);
        return data;
    });
};

export const getQuotes = async (token: string, quote: string) => {
    return await fetch('/quotes', {
        method: 'POST',
        headers: {
            Authorization: 'bearer ' + token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            quote,
        }),
    });
};

export const getCompanyProfile = async (token: string, symbol: string) => {
    return await fetch('/companyprofile', {
        method: 'POST',
        headers: {
            Authorization: 'bearer ' + token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            symbol,
        }),
    });
};

export const addStock = async (token: string, symbol: string) => {
    return await fetch('/add', {
        method: 'POST',
        headers: {
            Authorization: 'bearer ' + token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            symbol,
        }),
    });
};

export const getAllStocks = async (token: string) => {
    return await fetch('/getStocks', {
        method: 'POST',
        headers: {
            Authorization: 'bearer ' + token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token,
        }),
    });
};
