import axios from 'axios';

const API_URL = 'http://127.0.0.1:3000/api';

export async function createTurno() {
    try {

        const user = JSON.parse(sessionStorage.getItem('usuario'));
        if (!user) {
            return [null, "Usuario no autenticado"];
        }
        console.log('user', user);
        console.log('new Date().toISOString()', new Date().toISOString());
        console.log('user Id:', user.id);
        console.log('user rol:', user.rol);
        const response = await axios.post(`${API_URL}/turno/create`, {
            "id_user": user.id,
            "datetimeInicio": new Date().toISOString()
        });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function finishTurno() {
    try {
        const user = JSON.parse(sessionStorage.getItem('usuario'));
        if (!user) {
            return [null, "Usuario no autenticado"];
        }
        const response = await axios.patch(`${API_URL}/turno/finishTurno/${user.id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function getTurnos() {
    try {
        const response = await axios.get('/turno/getTurnos');
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function getTurnosDia(day) {
    try {
        const response = await axios.get(`${API_URL}/turno/getTurnosDia/${day}`);
        if (response.data.length === 0) {
            return [null, "No hay turnos para el día especificado"];
        }
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}   