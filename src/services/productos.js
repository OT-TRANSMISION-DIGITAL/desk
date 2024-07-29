import axios from './axios.js';

export const productos = async () => {
    try {
        const response = await axios.get('productos');
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const deleteCliente = async (id) => {
    try {
        const response = await axios.delete(`productos/${id}`);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const crearCliente = async (producto) => {
    try {
        const response = await axios.post('productos', producto);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}