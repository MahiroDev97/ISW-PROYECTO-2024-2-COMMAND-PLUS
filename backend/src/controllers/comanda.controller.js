"use strict";
import {
  comandaBodyValidation,
  comandaQueryValidation,
} from "../validations/comanda.validation.js";
import {
  confirmComandaService,
  createComandaService,
  deleteComandaService,
  getComandaService,
  getComandasPorMesAnoService,
  getComandasService,
  updateComandaService,
  cancelComandaService,
} from "../services/comanda.service.js";
import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess,
} from "../handlers/responseHandlers.js";

export async function createComanda(req, res) {
  try {
    const { body } = req;

    const { error } = comandaBodyValidation.validate(body);

    if (error) return handleErrorClient(res, 400, error.message);

    const [newComanda, errorComanda] = await createComandaService(body);

    if (errorComanda) return handleErrorClient(res, 400, errorComanda);

    handleSuccess(res, 201, "Comanda creada", newComanda);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getComanda(req, res) {
  try {
    const { id } = req.query;

    const { error } = comandaQueryValidation.validate({ id });

    if (error) return handleErrorClient(res, 400, error.message);

    const [comanda, errorComanda] = await getComandaService({ id });

    if (errorComanda) return handleErrorClient(res, 404, errorComanda);

    handleSuccess(res, 200, "Comanda encontrada", comanda);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getComandas(req, res) {
  try {
    const [comandas, errorComandas] = await getComandasService();

    if (errorComandas) return handleErrorClient(res, 404, errorComandas);

    handleSuccess(res, 200, "Comandas encontradas", comandas);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function updateComanda(req, res) {
  try {
    const { id } = req.query;
    const { body } = req;

    const { error: queryError } = comandaQueryValidation.validate({ id });

    if (queryError) return handleErrorClient(res, 400, error.message);

    const { error: bodyError } = comandaBodyValidation.validate(body);

    if (bodyError) return handleErrorClient(res, 400, error.message);

    const [updateComanda, errorUpdate] = await updateComandaService(
      { id },
      body,
    );

    if (errorUpdate) return handleErrorClient(res, 404, errorUpdate);

    handleSuccess(res, 200, "Comanda actualizada", updateComanda);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function deleteComanda(req, res) {
  try {
    const { id } = req.params;
    const { error } = comandaQueryValidation.validate({ id });

    if (error) return handleErrorClient(res, 400, error.message);

    const [comanda, errorComanda] = await deleteComandaService(id);

    if (errorComanda) return handleErrorClient(res, 404, errorComanda);

    handleSuccess(res, 200, "Comanda eliminada", comanda);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function confirmComanda(req, res) {
  try {
    const { id } = req.query;
    const { error } = comandaQueryValidation.validate({ id });

    if (error) return handleErrorClient(res, 400, error.message);

    const [comanda, errorComanda] = await confirmComandaService({ id });

    if (errorComanda) return handleErrorClient(res, 404, errorComanda);

    handleSuccess(res, 200, "Comanda confirmada", comanda);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function getComandasPorMesAno(req, res) {
  try {
    const { mes, ano } = req.query;

    const [comandas, errorComandas] = await getComandasPorMesAnoService({
      mes,
      ano,
    });

    if (errorComandas) return handleErrorClient(res, 404, errorComandas);

    handleSuccess(res, 200, "Comandas encontradas", comandas);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function cancelComanda(req, res) {
  try {
    const { id, reason } = req.query;

    const { error: queryError } = comandaQueryValidation.validate({ id });
    if (queryError) return handleErrorClient(res, 400, queryError.message);

    const [comanda, errorComanda] = await cancelComandaService({ id, reason });
    if (errorComanda) return handleErrorClient(res, 404, errorComanda);

    handleSuccess(res, 200, "Comanda cancelada", comanda);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}
