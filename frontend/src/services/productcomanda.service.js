import axios from './root.service.js';

export async function getProductComandaByComanda(req, res) 
{
  try {
    const { id } = req.params;

    const response = await axios.get(`/productcomanda/comanda/${id}`);

    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error al obtener los productos de la comanda:", error);
    return res.status(500).json("Error interno del servidor");
  }
}

export async function updateProductComanda(req, res) 
{
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

export async function getProductComanda(req, res)   
{
  try {
    const { id } = req.params;

    const response = await axios.get(`/productcomanda/${id}`);

    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error al obtener el producto de la comanda:", error);
    return res.status(500).json("Error interno del servidor");
  }
}