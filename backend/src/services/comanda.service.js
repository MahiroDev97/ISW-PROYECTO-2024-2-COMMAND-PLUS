"use strict";
import Comanda from "../entity/comanda.entity.js";
import { AppDataSource } from "../config/configDb.js";

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

    const comandas = await comandaRepository.find();

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