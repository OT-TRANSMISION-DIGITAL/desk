import axios from './axios.js';

export const login = async (correo, password) => {
    try {
        const response = await axios.post('login', { correo, password });
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const logout = async () => {
    try {
        const response = await axios.post('/logout');
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}