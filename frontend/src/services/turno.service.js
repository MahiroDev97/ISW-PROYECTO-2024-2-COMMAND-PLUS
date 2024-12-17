import axios from './root.service.js';

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
        //query params day is the date in the format YYYY-MM-DD
        console.log("day", day);
        const response = await axios.get(`${API_URL}/turno/getTurnosDia?day=${day}`);
        if (response.data.length === 0) {
            return [null, "No hay turnos para el día especificado"];
        }
        return response.data;
    } catch (error) {
        console.log("error encontrando Turnos para el dia:" + day, ":", error);
        return error.response.data;
    }
}

export async function getTurnosMesAno(mes, ano) {
    try {
        const response = await axios.get(`${API_URL}/turno/getTurnosMesAno?mes=${mes}&ano=${ano}`);
        if (response.data.length === 0) {
            return [null, "No hay turnos para el mes y año especificado"];
        }
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function getTurnosDate() {
    try {
        const response = await axios.get(`${API_URL}/turno/getDateTurnosDisponibles`);
        console.log("response", response);
        return response.data;
    } catch (error) {
        console.log("error", error);
        return error.response.data;
    }
}