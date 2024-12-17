import axios from "./root.service.js";

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

export async function updateProductComanda(data) {
  try {
    const response = await axios.patch(
      `/productcomanda/detail/?id=${data.id}`,
      {
        estadoproductocomanda: data.estadoproductocomanda,
      }
    );
    return response.data; // Return just the response.data
  } catch (error) {
    console.error("Error al actualizar el producto de la comanda:", error);
    throw error; // Throw the error to be handled by the caller
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
    return { status: 400, data: { message: "Mes y año son requeridos" } };
  }

  try {
    const response = await axios.get(
      `/productcomanda/history/mes?mes=${mes}&ano=${ano}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener el historial de productos de la comanda:",
      error
    );
    return {
      status: error.response?.status || 500,
      data: error.response?.data || {},
    };
  }
}

export async function getMesAnoDisponibles() {
  try {
    const response = await axios.get("/productcomanda/getMesAnoDisponibles");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function getVentasTotales(ano) {
  try {
    const response = await axios.get(
      `/productcomanda/ventasTotales?ano=${ano}`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}
