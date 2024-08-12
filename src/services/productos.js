import axios from './axios.js';

export const productos = async () => {
    try {
        const response = await axios.get('productos');
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}
export const producto = async (id) => {
    try {
        const response = await axios.get(`productos/${id}`);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const deleteProducto = async (id) => {
    try {
        const response = await axios.delete(`productos/${id}`);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const updateProducto = async (id, producto) => {
    try {
        const response = await axios.put(`productos/${id}`, producto);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const crearProducto = async (producto) => {
    try {
        const response = await axios.post('productos', producto);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const imagenProducto = async (id, imagen) => {
    try {
        const response = await axios.post(`productos/guardarImagen/${id}`, imagen);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}
