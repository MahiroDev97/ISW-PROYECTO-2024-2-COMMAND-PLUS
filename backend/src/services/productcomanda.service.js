/* eslint-disable quotes */
"use strict";
import ProductComanda from "../entity/productcomanda.entity.js";
import { AppDataSource } from "../config/configDb.js";
import { Between, LessThanOrEqual, MoreThanOrEqual } from "typeorm";

import Product from "../entity/product.entity.js";
import Comanda from "../entity/comanda.entity.js";

export async function createProductComandaService(body) {
  try {
    const productComandaRepository = AppDataSource.getRepository(ProductComanda);
    const productRepository = AppDataSource.getRepository(Product);
    const comandaRepository = AppDataSource.getRepository(Comanda);

    // Buscar las entidades relacionadas
    const product = await productRepository.findOne({ where: { id: body.productId } });
    const comanda = await comandaRepository.findOne({ where: { id: body.comandaId } });

    if (!product || !comanda) {
      return [null, "Producto o Comanda no encontrados"];
    }

    // Crear la nueva instancia de ProductComanda
    const newProductComanda = productComandaRepository.create({
      product: product,
      comanda: comanda,
      estadoproductocomanda: body.estadoproductocomanda,
      fechahorarecepcion: body.fechahorarecepcion,
      fechahoraentrega: body.fechahoraentrega,
    });

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

export async function getProductosPorMesService(query) {
  try {
    const { mes, ano } = query;
    const mesFormateado = mes.toString().padStart(2, '0');
    const ultimoDia = new Date(ano, mes, 0).getDate();

    const productComandaRepository = AppDataSource.getRepository(ProductComanda);

    const productos = await productComandaRepository
      .createQueryBuilder("productComanda")
      .leftJoinAndSelect("productComanda.product", "product")
      .where({
        fechahorarecepcion: Between(
          new Date(`${ano}-${mesFormateado}-01T00:00:00.000Z`),
          new Date(`${ano}-${mesFormateado}-${ultimoDia}T23:59:59.999Z`)
        )
      })
      .orderBy("productComanda.fechahorarecepcion", "ASC")
      .getMany();

    if (!productos || productos.length === 0) {
      return [null, "No se encontraron productos para el período especificado"];
    }

    // Opcional: Agregar conteo de productos más vendidos
    const productosContados = productos.reduce((acc, curr) => {
      const producto = curr.product;
      if (!acc[producto.id]) {
        acc[producto.id] = {
          id: producto.id,
          nombre: producto.nombre,
          categoria: producto.categoria,
          precio: producto.precio,
          cantidad: 1
        };
      } else {
        acc[producto.id].cantidad += 1;
      }
      return acc;
    }, {});

    const resumenProductos = {
      productos: productos,
      resumenVentas: Object.values(productosContados)
        .sort((a, b) => b.cantidad - a.cantidad)
    };

    return [resumenProductos, null];
  } catch (error) {
    console.error("Error al obtener los productos más vendidos por mes:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getAvailableProductsService() {
  try {
    const productComandaRepository = AppDataSource.getRepository(ProductComanda);

    const availableProducts = await productComandaRepository.find({
      where: { estadoproductocomanda: "disponible" },
    });

    if (!availableProducts || availableProducts.length === 0)
      return [null, "No hay productos disponibles"];

    return [availableProducts, null];
  } catch (error) {
    console.error("Error al obtener los productos disponibles:", error);
    return [null, "Error interno del servidor"];
  }
}
