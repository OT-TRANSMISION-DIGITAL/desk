import axios from './axios.js';

export const roles = async () => {
    try {
        const response = await axios.get('roles');
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}
