import axios from './axios.js';

export const visitas = async () => {
    try {
        const response = await axios.get('sucursales');
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const deleteCliente = async (id) => {
    try {
        const response = await axios.delete(`sucursales/${id}`);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const crearCliente = async (sucursal) => {
    try {
        const response = await axios.post('sucursales', sucursal);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}