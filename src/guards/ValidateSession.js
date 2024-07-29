import { user } from '../services/usuarios.js';

async function verifyToken(to, from, next) {
    const token = localStorage.getItem('token');
    if (!token) { to.path === '/login' ? next() : next({name: 'Login'}); return;}
    try {
        const userResponse = await user();
        if (userResponse.status < 300) {
            to.path === '/login' ? next({name: 'Dashboard'}) : next();
            return;
        }else{
            console.log(userResponse);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            next({name: 'Login'});
            return;
        }
    } catch (error) {
        console.log(error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        next({name: 'Login'});
        return;
    }
}




export {
    verifyToken
}