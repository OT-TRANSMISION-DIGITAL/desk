import axios from './axios.js';

export const agenda = async (data = {
    tipo: '',
    tecnico: '',
}) => {
    try {
        // send data query params
        const response = await axios.get('/agenda', { params: data });
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}