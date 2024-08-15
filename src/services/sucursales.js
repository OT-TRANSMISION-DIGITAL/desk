import axios from './axios.js';
import {useGlobalState} from '../store/Loading.js'
const { establecerLoading } = useGlobalState()

export const sucursales = async (page) => {
    try {
        const response = await axios.get('sucursales?page=' + (page || 1));
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
    establecerLoading(true)
    try {
        const response = await axios.put(`sucursales/${id}`, sucursal);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }finally{
    establecerLoading(false)
    }
}

export const crearSucursal = async (sucursal) => {
    establecerLoading(true)
    try {
        const response = await axios.post('sucursales', sucursal);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }finally{
    establecerLoading(false)
    }
}