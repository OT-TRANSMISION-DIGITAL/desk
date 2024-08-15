import axios from './axios.js';
import {useGlobalState} from '../store/Loading.js'
const { establecerLoading } = useGlobalState()
export const productos = async (page) => {
    try {
        const response = await axios.get('productos?page=' + (page || 1));
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
    establecerLoading(true)
    try {
        const response = await axios.put(`productos/${id}`, producto);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }finally{
        establecerLoading(false)
    }
}

export const crearProducto = async (producto) => {
    establecerLoading(true)
    try {
        const response = await axios.post('productos', producto);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }finally{
        establecerLoading(false)
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
