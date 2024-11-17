"use strict";
import Product from "../entity/product.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function createProductService(body) {
  try {
    const productRepository = AppDataSource.getRepository(Product);

    const newProduct = productRepository.create(body);

    await productRepository.save(newProduct);

    return [newProduct, null];
  } catch (error) {
    console.error("Error al crear el producto:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getProductService(query) {
  try {
    const { id, nombre } = query;

    const productRepository = AppDataSource.getRepository(Product);

    const productFound = await productRepository.findOne({
      where: [{ id: id }, { nombre: nombre }],
    });

    if (!productFound) return [null, "Producto no encontrado"];

    return [productFound, null];
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getProductsService() {
  try {
    const productRepository = AppDataSource.getRepository(Product);

    const products = await productRepository.find();

    if (!products || products.length === 0) return [null, "No hay productos"];

    return [products, null];
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function updateProductService(query, body) {
  try {
    const { id } = query;

    const productRepository = AppDataSource.getRepository(Product);

    const productFound = await productRepository.findOne({ where: { id } });

    if (!productFound) return [null, "Producto no encontrado"];

    const updatedData = { ...productFound, ...body };

    await productRepository.update(productFound.id, updatedData);

    const updatedProduct = await productRepository.findOne({
      where: { id: productFound.id },
    });

    return [updatedProduct, null];
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function deleteProductService(query) {
  try {
    const { id } = query;

    const productRepository = AppDataSource.getRepository(Product);

    const productFound = await productRepository.findOne({ where: { id } });

    if (!productFound) return [null, "Producto no encontrado"];

    await productRepository.delete(productFound.id);

    return [productFound, null];
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    return [null, "Error interno del servidor"];
  }
}

