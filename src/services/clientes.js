import axios from './axios.js';

import {useGlobalState} from '../store/Loading.js'
const { establecerLoading } = useGlobalState()

export const clientes = async (page) => {
    try {
        const response = await axios.get('clientes?page=' + (page || 1));
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
    establecerLoading(true)
    try {
        const response = await axios.post('clientes', cliente);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }finally{
        establecerLoading(false)
    }
}

export const editarCliente = async (id, cliente) => {
    establecerLoading(true)
    try {
        const response = await axios.put(`clientes/${id}`, cliente);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }finally{
        establecerLoading(false)
    }
}