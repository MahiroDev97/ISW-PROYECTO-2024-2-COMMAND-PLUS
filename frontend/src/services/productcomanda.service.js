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
    const user = JSON.parse(sessionStorage.getItem("usuario"));
    let endpoint;

    // Seleccionar el endpoint según el rol del usuario
    switch (user.rol) {
      case "cocinero":
        endpoint = `/cocinero/detail/?id=${data.id}`;
        break;
      case "administrador":
        endpoint = `/productcomanda/detail/?id=${data.id}`;
        break;
      default:
        throw new Error("No tienes permisos para realizar esta acción");
    }

    const response = await axios.patch(endpoint, {
      estadoproductocomanda: data.estadoproductocomanda,
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el producto de la comanda:", error);
    throw error;
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
