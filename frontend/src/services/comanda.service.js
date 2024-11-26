import axios from './root.service.js';
import { formatUserData } from '@helpers/formatData.js';

export async function getComanda(id) {
    try {
        const { data } = await axios.get(`/comanda/detail/?id=${id}`);
        return data.data;
    } catch (error) {
        return error.response.data;
    }

}

export async function getComandas() {
    try {
        const { data } = await axios.get('/comanda/');
        const formattedData = data.data.map(formatUserData);
        return formattedData;
    } catch (error) {
        return error.response.data;
    }
}

export async function updateComanda(data, id) {
    try {
        const response = await axios.patch(`/comanda/detail/?id=${id}`, data);
        console.log(response);
        return response.data.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
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