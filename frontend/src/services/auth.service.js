import api from './api';

const signup = (signupRequest) => {
    return api.post('/auth/signup', signupRequest);
};

const login = (loginRequest) => {
    return api.post('/auth/signin', loginRequest)
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem('user');
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

const AuthService = {
    signup,
    login,
    logout,
    getCurrentUser,
};

export default AuthService;
