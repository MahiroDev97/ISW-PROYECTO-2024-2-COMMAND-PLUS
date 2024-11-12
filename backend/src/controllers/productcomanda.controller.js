"use strict";

import {
  createProductComandaService,
  getProductComandaService,
  getProductComandasService,
  getProductComandaByComandaService,
  updateProductComandaService,
  deleteProductComandaService,
} from "../services/productcomanda.service.js";
import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess,
} from "../handlers/responseHandlers.js";

import {
  productComandaBodyValidation,
  productComandaQueryValidation,
} from "../validations/productcomanda.validation.js";

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
    console.log(body);
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
























// funcion que actualiza el estado de un producto de una comanda
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
