import axios from './axios.js';
import {useGlobalState} from '../store/Loading.js'
const { establecerLoading } = useGlobalState()

export const usuarios = async (page) => {
    try {
        const response = await axios.get('usuarios?page=' + (page || 1));
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const usuario = async (id) => {
    try {
        const response = await axios.get(`usuarios/${id}`);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const tecnicos = async () => {
    try {
        const response = await axios.get('tecnicos');
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const deleteUsuario = async (id) => {
    try {
        const response = await axios.delete(`usuarios/${id}`);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const crearUsuario = async (usuario) => {
    establecerLoading(true)
    try {
        const response = await axios.post('registrar', usuario);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }finally{
        establecerLoading(false)
    }
}

export const editarUsuario = async (id, usuario) => {
    establecerLoading(true)
    try {
        const response = await axios.put(`usuarios/${id}`, usuario);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }finally{
        establecerLoading(false)
    }
}

export const user = async () => {
    try {
        const response = await axios.get(`user`);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const updateImagen = (id, imagen) => {
    return axios.post(`usuarios/guardarImagen/${id}`, imagen);
}

export const fechasTecnico = (tecnico, fecha) => {
    return axios.get(`horarios?fecha=${fecha}&tecnico=${tecnico}`);
}