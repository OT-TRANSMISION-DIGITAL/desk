import axios from './axios.js';
import {useGlobalState} from '../store/Loading.js'
const { establecerLoading } = useGlobalState()

export const visitas = async (page) => {
    try {
        const response = await axios.get('visitas?page=' + (page || 1));
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
    establecerLoading(true)
    try {
        const response = await axios.post('visitas', visita);
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
        const response = await axios.put(`visitas/${id}`, visita);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }finally{
        establecerLoading(false)
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
    establecerLoading(true)
    try {
        const response = await axios.patch(`visitas/finalizar/${id}`);
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
        const response = await axios.patch(`visitas/autorizar/${id}`);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }finally{
        establecerLoading(false)
    }
}