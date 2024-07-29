import axios from './axios.js';

export const clientes = async () => {
    try {
        const response = await axios.get('clientes');
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const cliente = async (id) => {
    try {
        const response = await axios.get(`cliente/${id}`);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const deleteCliente = async (id) => {
    try {
        const response = await axios.delete(`clientes/${id}`);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const crearCliente = async (cliente) => {
    try {
        const response = await axios.post('clientes', cliente);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const editarCliente = async (id, cliente) => {
    try {
        const response = await axios.put(`clientes/${id}`, cliente);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}