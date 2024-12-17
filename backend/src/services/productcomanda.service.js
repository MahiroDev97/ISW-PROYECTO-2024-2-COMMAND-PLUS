/* eslint-disable quotes */
"use strict";
import ProductComanda from "../entity/productcomanda.entity.js";
import { AppDataSource } from "../config/configDb.js";
import { Between, IsNull, LessThanOrEqual, MoreThanOrEqual, Not } from "typeorm";

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

    console.log("Product found:", product);
    console.log("Comanda found:", comanda);

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

    console.log("New ProductComanda created:", newProductComanda);
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
export async function getMesAnoDisponiblesService() {
  try {
    const productComandaRepository = AppDataSource.getRepository(ProductComanda);

    // Obtener todas las comandas que tengan fechahorarecepcion no nula
    const comandas = await productComandaRepository
      .createQueryBuilder("productComanda")
      .where("productComanda.fechahorarecepcion IS NOT NULL")
      .select("productComanda.fechahorarecepcion")
      .getMany();

    if (!comandas || comandas.length === 0) {
      return [null, "No hay comandas registradas"];
    }

    // Extraer meses y años únicos, filtrando valores nulos
    const mesAnoUnicos = [...new Set(comandas
      .filter(comanda => comanda.fechahorarecepcion) // Filtrar fechas nulas
      .map(comanda => {
        const fecha = new Date(comanda.fechahorarecepcion);
        return {
          mes: fecha.getMonth() + 1,
          ano: fecha.getFullYear()
        };
      })
      .map(fecha => JSON.stringify(fecha)))]
      .map(str => JSON.parse(str));

    // Ordenar por año y mes
    mesAnoUnicos.sort((a, b) => {
      if (a.ano !== b.ano) return b.ano - a.ano;
      return b.mes - a.mes;
    });

    return [mesAnoUnicos, null];
  } catch (error) {
    console.error("Error al obtener los meses y años disponibles:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getVentasTotalesService(query) {
  try {
    const { ano } = query;

    // Validar que el año existe y es válido
    if (!ano) {
      return [null, "El año es requerido"];
    }

    const anoNum = parseInt(ano);
    if (isNaN(anoNum)) {
      return [null, "El año debe ser un número válido"];
    }

    const productComandaRepository = AppDataSource.getRepository(ProductComanda);

    const ventasTotales = await productComandaRepository.find({
      where: {
        fechahoraentrega: Not(IsNull()),
        fechahoraentrega: Between(
          new Date(`${anoNum}-01-01T00:00:00.000Z`),
          new Date(`${anoNum}-12-31T23:59:59.999Z`)
        )
      },
      relations: ["product"]
    });

    if (!ventasTotales || ventasTotales.length === 0) {
      return [null, "No hay ventas totales"];
    }

    // Crear objeto para almacenar ventas por mes/año
    const ventasPorMesAno = ventasTotales.reduce((acc, venta) => {
      const fecha = new Date(venta.fechahoraentrega);
      const mes = fecha.getMonth() + 1;
      const ano = fecha.getFullYear();
      const key = `${mes}-${ano}`;

      if (!acc[key]) {
        acc[key] = {
          mes,
          ano,
          totalVentas: 0,
          productos: {}
        };
      }

      // Sumar venta al total del mes
      acc[key].totalVentas += venta.product.precio;

      // Contar productos
      if (!acc[key].productos[venta.product.id]) {
        acc[key].productos[venta.product.id] = {
          nombre: venta.product.nombre,
          cantidad: 1,
          precioUnitario: venta.product.precio,
          total: venta.product.precio
        };
      } else {
        acc[key].productos[venta.product.id].cantidad += 1;
        acc[key].productos[venta.product.id].total += venta.product.precio;
      }

      return acc;
    }, {});

    // Convertir el objeto a un array y ordenar por fecha
    const resumenVentas = Object.values(ventasPorMesAno)
      .sort((a, b) => {
        if (a.ano !== b.ano) return b.ano - a.ano;
        return b.mes - a.mes;
      })
      .map(mesAno => ({
        ...mesAno,
        productos: Object.values(mesAno.productos)
      }));

    return [resumenVentas, null];
  } catch (error) {
    console.error("Error al obtener las ventas totales:", error);
    return [null, "Error interno del servidor"];
  }
}