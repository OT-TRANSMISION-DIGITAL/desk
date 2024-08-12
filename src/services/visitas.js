import axios from './axios.js';

export const visitas = async () => {
    try {
        const response = await axios.get('visitas');
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const visita = async (id) => {
    try {
        const response = await axios.get(`visitas/${id}`);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const del = async (id) => {
    try {
        const response = await axios.delete(`visitas/${id}`);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const crear = async (visita) => {
    try {
        const response = await axios.post('visitas', visita);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const editar = async (id, visita) => {
    try {
        const response = await axios.put(`visitas/${id}`, visita);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}



export const cancel  = async (id) => {
    try {
        const response = await axios.patch(`visitas/cancelar/${id}`);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const finalizar = async (id) => {
    try {
        const response = await axios.patch(`visitas/finalizar/${id}`);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const autorizar = async (id) => {
    try {
        const response = await axios.patch(`visitas/autorizar/${id}`);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}