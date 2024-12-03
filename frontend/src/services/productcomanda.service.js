import axios from './root.service.js';

export async function getProductComandaByComanda(req, res) {
  try {
    const { id } = req.params;

    const response = await axios.get(`/productcomanda/comanda/${id}`);

    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error al obtener los productos de la comanda:", error);
    return res.status(500).json("Error interno del servidor");
  }
}

export async function updateProductComanda(req, res) {
  try {
    const { id } = req.params;
    const { body } = req;

    const response = await axios.patch(`/productcomanda/${id}`, body);

    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error al actualizar el producto de la comanda:", error);
    return res.status(500).json("Error interno del servidor");
  }
}

export async function getProductComanda(req, res) {
  try {
    const { id } = req.params;

    const response = await axios.get(`/productcomanda/${id}`);

    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error al obtener el producto de la comanda:", error);
    return res.status(500).json("Error interno del servidor");
  }
}


export async function getProductComandaHistory(mes, ano) {
  if (!mes || !ano) {
    return { status: 400, data: { message: 'Mes y año son requeridos' } };
  }
  console.log("mes", mes);
  console.log("ano", ano);

  try {
    const response = await axios.get(`/productcomanda/history/mes?mes=${mes}&ano=${ano}`);
    return response.data;
  } catch (error) {

    console.error("Error al obtener el historial de productos de la comanda:", error);
    return { status: error.response?.status || 500, data: error.response?.data || {} };
  }
}

export async function getMesAnoDisponibles() {
  try {
    const response = await axios.get('/productcomanda/getMesAnoDisponibles');
    console.log('response.data', response.data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function getVentasTotales(ano) {
  try {
    const response = await axios.get(`/productcomanda/ventasTotales?ano=${ano}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}