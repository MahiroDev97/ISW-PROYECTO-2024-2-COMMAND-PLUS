import axios from './root.service.js';



export async function createTurno() {
    try {

        const user = JSON.parse(sessionStorage.getItem('usuario'));
        if (!user) {
            return [null, "Usuario no autenticado"];
        }

        const response = await axios.post(`/turno/create`, {
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
        const response = await axios.patch(`/turno/finishTurno/${user.id}`);
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
        const response = await axios.get(`/turno/getTurnosDia?day=${day}`);
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
        const response = await axios.get(`/turno/getTurnosMesAno?mes=${mes}&ano=${ano}`);
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
        const response = await axios.get(`/turno/getDateTurnosDisponibles`);
        console.log("response", response);
        return response.data;
    } catch (error) {
        console.log("error", error);
        return error.response.data;
    }
}