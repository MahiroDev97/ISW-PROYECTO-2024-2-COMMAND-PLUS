"use strict";

import {
  createProductComandaService,
  deleteProductComandaService,
  getAvailableProductsService,
  getMesAnoDisponiblesService,
  getProductComandaByComandaService,
  getProductComandaService,
  getProductComandasService,
  getProductosPorMesService,
  getVentasTotalesService,
  updateProductComandaService,
} from "../services/productcomanda.service.js";
import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess,
} from "../handlers/responseHandlers.js";

import {
  availableProductsQueryValidation,
  productComandaBodyValidation,
  productComandaQueryValidation,
  productosPorMesQueryValidation,
} from "../validations/productcomanda.validation.js";

import { getComandasConProductosPorMesService } from "../services/comanda.service.js";

const validStatuses = [
  "recibido",
  "en revision",
  "cancelado",
  "en preparacion",
  "listo",
  "entregado",
];

export async function createProductComanda(req, res) {
  try {
    const { body } = req;
    if (!validStatuses.includes(body.estadoproductocomanda)) {
      return handleErrorClient(res, 400, "Invalid status");
    }

    const { error } = productComandaBodyValidation.validate(body);

    if (error) return handleErrorClient(res, 400, error.message);

    const [newProductComanda, errorProductComanda] =
      await createProductComandaService(body);

    if (errorProductComanda)
      return handleErrorClient(res, 400, errorProductComanda);

    handleSuccess(res, 201, "ProductComanda created", newProductComanda);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

// funcion que busca un productcomanda
export async function getProductComanda(req, res) {
  try {
    const { id } = req.query;

    const { error } = productComandaQueryValidation.validate({
      id,
    });

    if (error) return handleErrorClient(res, 400, error.message);

    const [productComanda, errorProductComanda] =
      await getProductComandaService({ id });

    if (errorProductComanda)
      return handleErrorClient(res, 404, errorProductComanda);

    handleSuccess(res, 200, "ProductComanda found", productComanda);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getProductComandas(req, res) {
  try {
    const [productComandas, errorProductComandas] =
      await getProductComandasService();

    if (errorProductComandas)
      return handleErrorClient(res, 404, errorProductComandas);

    productComandas.length === 0
      ? handleSuccess(res, 204)
      : handleSuccess(res, 200, "ProductComandas found", productComandas);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

// busca los productos de una comanda
export async function getProductComandaByComanda(req, res) {
  try {
    const { idComanda } = req.query;

    const { error } = productComandaQueryValidation.validate({
      idComanda,
    });

    if (error) return handleErrorClient(res, 400, error.message);

    const [productComanda, errorProductComanda] =
      await getProductComandaByComandaService({ idComanda });

    if (errorProductComanda)
      return handleErrorClient(res, 404, errorProductComanda);

    handleSuccess(res, 200, "ProductComanda found", productComanda);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function updateProductComanda(req, res) {
  try {
    const { id } = req.query;
    const { body } = req;

    if (body.status && !validStatuses.includes(body.status)) {
      return handleErrorClient(res, 400, "Invalid status");
    }

    const { error: queryError } = productComandaQueryValidation.validate({
      id,
    });

    if (queryError) {
      return handleErrorClient(res, 400, queryError.message);
    }

    const { error: bodyError } = productComandaBodyValidation.validate(body);

    if (bodyError) {
      return handleErrorClient(res, 400, bodyError.message);
    }

    const [updatedProductComanda, errorUpdate] =
      await updateProductComandaService({ id }, body);

    if (errorUpdate) {
      return handleErrorClient(res, 404, errorUpdate);
    }

    handleSuccess(res, 200, "ProductComanda updated", updatedProductComanda);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function deleteProductComanda(req, res) {
  try {
    const { id } = req.query;

    const { error } = productComandaQueryValidation.validate({ id });

    if (error) return handleErrorClient(res, 400, error.message);

    const [productComanda, errorProductComanda] =
      await deleteProductComandaService({ id });

    if (errorProductComanda)
      return handleErrorClient(res, 404, errorProductComanda);

    handleSuccess(res, 200, "ProductComanda deleted");
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getProductosPorMes(req, res) {
  try {
    const { mes, ano } = req.query;

    const { error } = productosPorMesQueryValidation.validate({ mes, ano });

    if (error) return handleErrorClient(res, 400, error.message);

    const [productos, errorProductos] = await getProductosPorMesService({
      mes,
      ano,
    });

    if (errorProductos) return handleErrorClient(res, 404, errorProductos);

    handleSuccess(res, 200, "Productos por mes", productos);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getAvailableProducts(req, res) {
  try {
    const { available } = req.query;

    const { error } = availableProductsQueryValidation.validate({ available });

    if (error) return handleErrorClient(res, 400, error.message);

    const [availableProducts, errorAvailableProducts] =
      await getAvailableProductsService();

    if (errorAvailableProducts)
      return handleErrorClient(res, 404, errorAvailableProducts);

    handleSuccess(
      res,
      200,
      "Productos disponibles encontrados",
      availableProducts,
    );
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getComandasConProductosPorMesAnio(req, res) {
  try {
    const { mes, ano } = req.query;

    const [comandas, error] = await getComandasConProductosPorMesService({
      mes,
      ano,
    });

    if (error) {
      return handleErrorClient(res, 500, error);
    }

    handleSuccess(res, 200, "Comandas con productos por mes y año", comandas);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}
export async function getMesAnoDisponibles(req, res) {
  try {
    const [mesAnoDisponibles, errorMesAnoDisponibles] =
      await getMesAnoDisponiblesService();

    if (errorMesAnoDisponibles)
      return handleErrorClient(res, 404, errorMesAnoDisponibles);

    handleSuccess(res, 200, "Meses y años disponibles", mesAnoDisponibles);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export const getVentasTotales = async (req, res) => {
  try {
    const [ventasTotales, errorVentasTotales] = await getVentasTotalesService(
      req.query,
    );

    if (errorVentasTotales) {
      return res.status(400).json({ message: errorVentasTotales });
    }

    return res.json(ventasTotales);
  } catch (error) {
    console.error("Error en getVentasTotales:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
