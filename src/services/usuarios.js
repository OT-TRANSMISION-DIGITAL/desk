import axios from './axios.js';

export const usuarios = async () => {
    try {
        const response = await axios.get('usuarios');
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
    try {
        const response = await axios.post('registrar', usuario);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const editarUsuario = async (id, usuario) => {
    try {
        const response = await axios.put(`usuarios/${id}`, usuario);
        return response;
    } catch (error) {
        return Promise.reject(error);
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