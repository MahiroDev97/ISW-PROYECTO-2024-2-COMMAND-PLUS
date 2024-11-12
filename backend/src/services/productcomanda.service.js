"use strict";
import ProductComanda from "../entity/productcomanda.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function createProductComandaService(body) {
  try {
    const productComandaRepository =
      AppDataSource.getRepository(ProductComanda);

    const newProductComanda = productComandaRepository.create(body);

    await productComandaRepository.save(newProductComanda);

    return [newProductComanda, null];
  } catch (error) {
    console.error("Error al crear el producto de la comanda:", error);
    return [null, "Error interno del servidor"];
  }
}

// funcion 
export async function getProductComandaService(query) {
  try {
    const { id } = query;

    const productComandaRepository =
      AppDataSource.getRepository(ProductComanda);

    const productComandaFound = await productComandaRepository.findOne({
      where: [{ id: id }],
    });

    if (!productComandaFound)
      return [null, "Producto de la comanda no encontrado"];

    return [productComandaFound, null];
  } catch (error) {
    console.error("Error al obtener el producto de la comanda:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getProductComandasService() {
  try {
    const productComandaRepository =
      AppDataSource.getRepository(ProductComanda);

    const productComandas = await productComandaRepository.find();

    if (!productComandas || productComandas.length === 0)
      return [null, "No hay productos de la comanda"];

    return [productComandas, null];
  } catch (error) {
    console.error("Error al obtener los productos de la comanda:", error);
    return [null, "Error interno del servidor"];
  }
}
// funcion que actualiza un productcomanda
export async function updateProductComandaService(query, body) {
  try {
    const { id } = query;

    const productComandaRepository =
      AppDataSource.getRepository(ProductComanda);

    const productComandaFound = await productComandaRepository.findOne({
      where: { id },
    });

    if (!productComandaFound)
      return [null, "Producto de la comanda no encontrado"];

    productComandaRepository.merge(productComandaFound, body);

    await productComandaRepository.save(productComandaFound);

    return [productComandaFound, null];
  } catch (error) {
    console.error("Error al actualizar el producto de la comanda:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function deleteProductComandaService(query) {
  try {
    const { id } = query;

    const productComandaRepository =
      AppDataSource.getRepository(ProductComanda);

    const productComandaFound = await productComandaRepository.findOne({
      where: { id },
    });

    if (!productComandaFound)
      return [null, "Producto de la comanda no encontrado"];

    await productComandaRepository.delete(productComandaFound);

    return [productComandaFound, null];
  } catch (error) {
    console.error("Error al eliminar el producto de la comanda:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function deleteProductComandasService() {
  try {
    const productComandaRepository =
      AppDataSource.getRepository(ProductComanda);

    const productComandas = await productComandaRepository.find();

    if (!productComandas || productComandas.length === 0)
      return [null, "No hay productos de la comanda"];

    await productComandaRepository.delete(productComandas);

    return [productComandas, null];
  } catch (error) {
    console.error("Error al eliminar los productos de la comanda:", error);
    return [null, "Error interno del servidor"];
  }
}
// Funcion para obtener todos los productos de una comanda
export async function getProductComandaByComandaService(query) {
  try {
    const { comandaId } = query;

    const productComandaRepository =
      AppDataSource.getRepository(ProductComanda);

    const productComandas = await productComandaRepository.find({
      where: { comandaId },
    });

    if (!productComandas || productComandas.length === 0)
      return [null, "No hay productos de la comanda"];

    return [productComandas, null];
  } catch (error) {
    console.error("Error al obtener los productos de la comanda:", error);
    return [null, "Error interno del servidor"];
  }
}
// Funcion para eliminar todos los productos de una comanda
export async function deleteProductComandaByComandaService(query) {
  try {
    const { comandaId } = query;

    const productComandaRepository =
      AppDataSource.getRepository(ProductComanda);

    const productComandas = await productComandaRepository.find({
      where: { comandaId },
    });

    if (!productComandas || productComandas.length === 0)
      return [null, "No hay productos de la comanda"];

    await productComandaRepository.delete(productComandas);

    return [productComandas, null];
  } catch (error) {
    console.error("Error al eliminar los productos de la comanda:", error);
    return [null, "Error interno del servidor"];
  }
}
