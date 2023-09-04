import http from "../utils/http-client";

const login = (data) => {
    return http.post('/auth/login', data, {
        transformResponse: [(result) => {
            const parsed = JSON.parse(result);
            localStorage.setItem('authUser', JSON.stringify(parsed));
            return parsed;
        }]
    });
}

const register = async (data) => {
    const response = await http.post('/users', {user: data});
    if(!response.data.error)
        localStorage.setItem('authUser', JSON.stringify(response.data));
    return response.data
}


const profile = async () => {
    const response = await http.get('/user');
    return response.data
}

const logout = () => {
    // return http.get('/auth/logout', null, {
    //     transformResponse: [(result) => {
    //         localStorage.removeItem('authUser');
    //         return JSON.parse(result);
    //     }]
    // });
    localStorage.removeItem('authUser');
    return true;
}

const getAuthUser = () => {
    return JSON.parse(localStorage.getItem('authUser'));
}  

const methods = { 
    login,
    register,
    profile,
    logout,
    getAuthUser
}

export default methods;