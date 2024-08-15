import axios from './axios.js';
import {useGlobalState} from '../store/Loading.js'
const { establecerLoading } = useGlobalState()

export const ordenes = async (page) => {
    try {
        const response = await axios.get('ordenes?page=' + (page || 1));
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const orden = async (id) => {
    try {
        const response = await axios.get(`ordenes/${id}`);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const del = async (id) => {
    try {
        const response = await axios.patch(`ordenes/cancelar/${id}`);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const crear = async (visita) => {
    establecerLoading(true)
    try {
        const response = await axios.post('ordenes', visita);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }finally{
        establecerLoading(false)
    }
}

export const editar = async (id, visita) => {
    establecerLoading(true)
    try {
        const response = await axios.put(`ordenes/${id}`, visita);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }finally{
        establecerLoading(false)
    }
}

export const cancel  = async (id) => {
    establecerLoading(true)
    try {
        const response = await axios.patch(`ordenes/cancelar/${id}`);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }finally{
        establecerLoading(false)
    }
}

export const finalizar = async (id) => {
    establecerLoading(true)
    try {
        const response = await axios.patch(`ordenes/finalizar/${id}`);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }finally{
        establecerLoading(false)
    }
}

export const autorizar = async (id) => {
    establecerLoading(true)
    try {
        const response = await axios.patch(`ordenes/autorizar/${id}`);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }finally{
    establecerLoading(false)
    }
}

export const pdf = async (id) => {
    establecerLoading(true)
    try {
        const response = await axios.get(`ordeneServicios/generarPdf/${id}`, {
            responseType: 'blob'
        });
        return response;
    } catch (error) {
        return Promise.reject(error);
    }finally{
        establecerLoading(false)
    }
}