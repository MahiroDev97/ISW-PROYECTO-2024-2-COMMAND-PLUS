"use strict";
import Comanda from "../entity/comanda.entity.js";
import ProductComanda from "../entity/productcomanda.entity.js";
import { AppDataSource } from "../config/configDb.js";
import { Between } from "typeorm";

export async function createComandaService(body) {
  try {
    const comandaRepository = AppDataSource.getRepository(Comanda);

    const newComanda = comandaRepository.create(body);

    await comandaRepository.save(newComanda);

    return [newComanda, null];
  } catch (error) {
    console.error("Error al crear la comanda:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getComandaService(query) {
  try {
    const { id } = query;

    const comandaRepository = AppDataSource.getRepository(Comanda);

    const comandaFound = await comandaRepository.findOne({
      where: { id },
      relations: ["productcomandas"],
    });

    if (!comandaFound) return [null, "Comanda no encontrada"];

    return [comandaFound, null];
  } catch (error) {
    console.error("Error al obtener la comanda:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getComandasService() {
  try {
    const comandaRepository = AppDataSource.getRepository(Comanda);

    const comandas = await comandaRepository.find(
      { relations: ["productcomandas"] }
    );

    if (!comandas || comandas.length === 0) return [null, "No hay comandas"];

    return [comandas, null];
  } catch (error) {
    console.error("Error al obtener las comandas:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function updateComandaService(query, body) {
  try {
    const { id } = query;

    const comandaRepository = AppDataSource.getRepository(Comanda);

    const comandaFound = await comandaRepository.findOne({ where: { id } });

    if (!comandaFound) return [null, "Comanda no encontrada"];

    comandaRepository.merge(comandaFound, body);

    await comandaRepository.save(comandaFound);

    return [comandaFound, null];
  } catch (error) {
    console.error("Error al actualizar la comanda:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function deleteComandaService(query) {
  try {
    const { id } = query;

    const comandaRepository = AppDataSource.getRepository(Comanda);

    const comandaFound = await comandaRepository.findOne({ where: { id } });

    if (!comandaFound) return [null, "Comanda no encontrada"];

    await comandaRepository.remove(comandaFound);

    return [comandaFound, null];
  } catch (error) {
    console.error("Error al eliminar la comanda:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getComandasPorMesService(query) {
  try {
    const { mes } = query;

    const comandaRepository = AppDataSource.getRepository(Comanda);
    // Buscar las comandas por el mes 
    const comandas = await comandaRepository.find({ where: { fecha: mes } });

    if (!comandas || comandas.length === 0) return [null, "No hay comandas en el mes seleccionado"];

    return [comandas, null];
  } catch (error) {
    console.error("Error al obtener las comandas por mes:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function confirmComandaService(query) {
  try {
    const { id } = query;

    const comandaRepository = AppDataSource.getRepository(Comanda);

    const comandaFound = await comandaRepository.findOne({ where: { id } });

    if (!comandaFound) return [null, "Comanda no encontrada"];

    comandaFound.estado = "confirmada"; // Actualizar el estado de la comanda

    await comandaRepository.save(comandaFound);

    return [comandaFound, null];
  } catch (error) {
    console.error("Error al confirmar la comanda:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getComandasConProductosPorMesService(query) {
  try {
    const { mes, ano } = query;
    const mesFormateado = mes.toString().padStart(2, "0");
    const ultimoDia = new Date(ano, mes, 0).getDate();

    const comandaRepository = AppDataSource.getRepository(Comanda);
    const productComandaRepository = AppDataSource.getRepository(ProductComanda);

    const comandas = await comandaRepository
      .createQueryBuilder("comanda")
      .leftJoinAndSelect("comanda.productComandas", "productComanda")
      .where({
        fechahorarecepcion: Between(
          new Date(`${ano}-${mesFormateado}-01T00:00:00.000Z`),
          new Date(`${ano}-${mesFormateado}-${ultimoDia}T23:59:59.999Z`)
        )
      })
      .getMany();

    if (!comandas || comandas.length === 0) {
      return [null, "No se encontraron comandas para el período especificado"];
    }

    return [comandas, null];
  } catch (error) {
    console.error("Error al obtener las comandas con productos por mes:", error);
    return [null, "Error interno del servidor"];
  }
}


//get comandas por mes y ano para el analisis de comandas

export async function getComandasPorMesAnoService(query) {
  try {
    const { mes, ano } = query;
    const mesFormateado = mes.toString().padStart(2, "0");
    const ultimoDia = new Date(ano, mes, 0).getDate();


    const comandaRepository = AppDataSource.getRepository(Comanda);

    //buscar con between para el mes y ano
    //get solo las comandas confirmadas
    // get solo atributo fecha 
    const comandas = await comandaRepository.find({
      select: ["fecha"],
      where: {
        fecha: Between(
          new Date(`${ano}-${mesFormateado}-01T00:00:00.000Z`),
          new Date(`${ano}-${mesFormateado}-${ultimoDia}T23:59:59.999Z`)
        ),
        estado: "completada",
      },
    });

    return [comandas, null];
  } catch (error) {
    console.error("Error al obtener las comandas por mes y ano:", error);
    return [null, "Error interno del servidor"];
  }
}
