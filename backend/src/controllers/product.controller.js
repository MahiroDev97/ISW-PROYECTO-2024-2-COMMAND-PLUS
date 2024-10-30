"use strict";
import {
  productBodyValidation,
  productQueryValidation,
} from "../validations/product.validation.js";
import {
  createProductService,
  deleteProductService,
  getProductService,
  getProductsService,
  updateProductService,
} from "../services/product.service.js";
import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess,
} from "../handlers/responseHandlers.js";

export async function createProduct(req, res) {
  try {
    const { body } = req;

    const { error } = productBodyValidation.validate(body); // Por Implementar

    if (error) return handleErrorClient(res, 400, error.message);

    const [newProduct, errorProduct] = await createProductService(body); //Por Implementar

    if (errorProduct) return handleErrorClient(res, 400, errorProduct);

    handleSuccess(res, 201, "Producto creado", newProduct);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getProduct(req, res) {
  try {
    const { id, nombre } = req.query;

    const { error } = productQueryValidation.validate({ id, nombre }); // Por Implementar

    if (error) return handleErrorClient(res, 400, error.message);

    const [product, errorProduct] = await getProductService({ id, nombre }); //Por Implementar

    if (errorProduct) return handleErrorClient(res, 404, errorProduct);

    handleSuccess(res, 200, "Producto encontrado", product);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getProducts(req, res) {
  try {
    const [products, errorProducts] = await getProductsService();

    if (errorProducts) return handleErrorClient(res, 404, errorProducts);

    products.length === 0
      ? handleSuccess(res, 204)
      : handleSuccess(res, 200, "Productos encontrados", products);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function updateProduct(req, res) {
  try {
    const { id } = req.query;
    const { body } = req;

    const { error: queryError } = productQueryValidation.validate({
      id,
    });

    if (queryError) {
      return handleErrorClient(res, 400, queryError.message);
    }

    const { error: bodyError } = productBodyValidation.validate(body);

    if (bodyError) {
      return handleErrorClient(res, 400, bodyError.message);
    }

    const [updatedProduct, errorUpdate] = await updateProductService(
      { id },
      body,
    );

    if (errorUpdate) {
      return handleErrorClient(res, 404, errorUpdate);
    }

    handleSuccess(res, 200, "Producto actualizado", updatedProduct);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function deleteProduct(req, res) {
  try {
    const { id } = req.query;

    const { error } = productQueryValidation.validate({ id });

    if (error) return handleErrorClient(res, 400, error.message);

    const [product, errorProduct] = await deleteProductService({ id });

    if (errorProduct) return handleErrorClient(res, 404, errorProduct);

    handleSuccess(res, 200, "Producto eliminado");
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}
