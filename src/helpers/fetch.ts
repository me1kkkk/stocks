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
        console.log(data);
        return data;
    });
};
