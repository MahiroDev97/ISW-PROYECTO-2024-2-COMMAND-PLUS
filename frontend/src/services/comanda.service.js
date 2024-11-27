import axios from './root.service.js';


export async function createComanda(data) {
    try {
        const response = await axios.post('/comanda', data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function getComanda(id) {
    try {
        const response = await axios.get(`/comanda/detail/?id=${id}`);
        return response.data.data;
    } catch (error) {
        console.error('Error', error);
    }

}

export async function getComandas() {
    try {
        const response = await axios.get('/comanda/');
        return response.data.data;
    } catch (error) {
        console.error('Error', error);
    }
}

export async function updateComanda(data, id) {
    try {
        const response = await axios.patch(`/comanda/detail/?id=${id}`, data);
        console.log(response);
        return response.data.data;
    } catch (error) {
        console.log(error);
        console.error('Error', error);
}
}


export async function deleteComanda(id) {
    try {
        const response = await axios.delete(`/comanda/detail/?id=${id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}