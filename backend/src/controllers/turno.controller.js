"use strict";
import {
    createTurnoService,
    deleteTurnoService,
    finishTurnoService,
    getTurnosDia,
    getTurnoService,
    getTurnosUsuarioService,
    updateTurnoService,
} from "../services/turno.service.js";
import {
    turnoBodyValidation,
    turnoDeleteValidation,
    turnoGetDiaValidation,
    turnoQueryValidation
} from "../validations/turno.validation.js";
import { handleErrorClient, handleErrorServer, handleSuccess } from "../handlers/responseHandlers.js";


export const createTurno = async (req, res) => {
    try {

        const { body } = req;

        const { error } = turnoBodyValidation.validate(body);

        if (error) return handleErrorClient(res, 400, error.message);

        const [newTurno, errorTurno] = await createTurnoService(body);

        if (errorTurno) return handleErrorClient(res, 400, errorTurno);

        handleSuccess(res, 201, "Turno creado", newTurno);




    } catch (error) {

        handleErrorServer(res, 500, error.message);

    }
};

export async function getTurno(req, res) {

    try {

        const { id } = req.query;

        const { error } = turnoQueryValidation.validate({ id });

        if (error) return handleErrorClient(res, 400, error.message);

        const [turno, errorTurno] = await getTurnoService(id);

        if (errorTurno) return handleErrorClient(res, 404, errorTurno);

        handleSuccess(res, 200, "Turno encontrado", turno);

    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }

}

export async function getTurnos(req, res) { //get Turnos x usuario


    try {

        const { id_user } = req.query;

        const { error } = turnoQueryValidation.validate({ id_user });

        if (error) return handleErrorClient(res, 400, error.message);

        const [turnos, errorTurnos] = await getTurnosUsuarioService(id_user);

        if (errorTurnos) return handleErrorClient(res, 404, errorTurnos);

        handleSuccess(res, 200, "Turnos encontrados", turnos);

    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }

}

export async function updateTurno(req, res) {
    try {

        const { body } = req;

        const { error } = turnoBodyValidation.validate(body);

        if (error) return handleErrorClient(res, 400, error.message);


        const [updatedTurno, errorUpdatedTurno] = await updateTurnoService(body);

        if (errorUpdatedTurno) return handleErrorClient(res, 400, errorUpdatedTurno);

        handleSuccess(res, 200, "Turno actualizado", updatedTurno);

    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }

}

export async function deleteTurno(req, res) {
    try {
        const { id } = req.params;

        const { error } = turnoDeleteValidation.validate({ id: parseInt(id) });
        if (error) {
            return handleErrorClient(res, 400, error.message);
        }

        const [turno, errorTurno] = await deleteTurnoService(parseInt(id));

        if (errorTurno) {
            return handleErrorClient(res, 404, errorTurno);
        }

        handleSuccess(res, 200, "Turno eliminado", turno);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function finishTurno(req, res) {
    try {
        const { id } = req.params;

        const { error } = turnoQueryValidation.validate({ id });

        if (error) return handleErrorClient(res, 400, error.message);

        const [turno, errorTurno] = await finishTurnoService(id);

        if (errorTurno) return handleErrorClient(res, 400, errorTurno);

        handleSuccess(res, 200, "Turno finalizado", turno);


    } catch (error) {
        handleErrorServer(res, 500, error.message);

    }
}

export async function getTurnosDiaController(req, res) {
    try {
        const { day } = req.query;
        const { error } = turnoGetDiaValidation.validate({ day });
        if (error) return handleErrorClient(res, 400, error.message);

        const [turnos, errorTurnos] = await getTurnosDia(day);

        if (errorTurnos) return handleErrorClient(res, 404, errorTurnos);

        handleSuccess(res, 200, "Turnos encontrados", turnos);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}