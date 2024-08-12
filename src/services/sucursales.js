import axios from './axios.js';

export const sucursales = async () => {
    try {
        const response = await axios.get('sucursales');
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}
export const sucursal = async (id) => {
    try {
        const response = await axios.get(`sucursales/${id}`);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const deleteSucursal = async (id) => {
    try {
        const response = await axios.delete(`sucursales/${id}`);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const updateSucursal = async (id, sucursal) => {
    try {
        const response = await axios.put(`sucursales/${id}`, sucursal);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const crearSucursal = async (sucursal) => {
    try {
        const response = await axios.post('sucursales', sucursal);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}