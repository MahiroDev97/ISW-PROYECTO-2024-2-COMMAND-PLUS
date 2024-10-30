"use strict";
import Turno from "../entity/turno.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function createTurnoService(body) {
    try {
        const turnoRepository = AppDataSource.getRepository(Turno);

        // Verificar si el usuario ya tiene un turno activo (sin datetimeFin)
        const turnoActivo = await turnoRepository.findOne({
            where: {
                id_user: body.id_user,
                datetimeFin: null
            }
        });

        if (turnoActivo) {
            return [null, "El usuario ya tiene un turno activo"];
        }

        const newTurno = turnoRepository.create({
            id_user: body.id_user,
            datetimeInicio: new Date(),
            datetimeFin: null
        });

        await turnoRepository.save(newTurno);

        return [newTurno, null];
    } catch (error) {
        console.error("Error al crear el turno:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function finalizarTurnoService(id_user) {
    try {
        const turnoRepository = AppDataSource.getRepository(Turno);

        const turnoActivo = await turnoRepository.findOne({
            where: {
                id_user: id_user,
                datetimeFin: null
            }
        });

        if (!turnoActivo) {
            return [null, "No se encontró un turno activo para este usuario"];
        }

        turnoActivo.datetimeFin = new Date();
        await turnoRepository.save(turnoActivo);

        return [turnoActivo, null];
    } catch (error) {
        console.error("Error al finalizar el turno:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function getTurnoActivoService(id_user) {
    try {
        const turnoRepository = AppDataSource.getRepository(Turno);

        const turnoActivo = await turnoRepository.findOne({
            where: {
                id_user: id_user,
                datetimeFin: null
            }
        });

        if (!turnoActivo) {
            return [null, "No hay turno activo para este usuario"];
        }

        return [turnoActivo, null];
    } catch (error) {
        console.error("Error al obtener el turno activo:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function getTurnosUsuarioService(id_user) {
    try {
        const turnoRepository = AppDataSource.getRepository(Turno);

        const turnos = await turnoRepository.find({
            where: { id_user: id_user },
            order: { datetimeInicio: "DESC" }
        });

        if (!turnos || turnos.length === 0) {
            return [null, "No se encontraron turnos para este usuario"];
        }

        return [turnos, null];
    } catch (error) {
        console.error("Error al obtener los turnos del usuario:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function getTurnoService(id) {
    try {
        const turnoRepository = AppDataSource.getRepository(Turno);

        const turno = await turnoRepository.findOne({ where: { id } });

        if (!turno) {
            return [null, "No se encontró un turno con el id proporcionado"];
        }

        return [turno, null];
    } catch (error) {
        console.error("Error al obtener el turno:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function updateDatetimeFinTurnoService(body) {
    try {
        const turnoRepository = AppDataSource.getRepository(Turno);

        const turno = await turnoRepository.findOne({ where: { id: body.id } });

        if (!turno) {
            return [null, "No se encontró un turno con el id proporcionado"];
        }

        if (turno.datetimeFin) {
            return [null, "El turno ya ha sido finalizado"];
        }

        turno.datetimeFin = new Date();
        await turnoRepository.save(turno);

        return [turno, null];
    } catch (error) {
        console.error("Error al actualizar el turno:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function deleteTurnoService(id) {
    try {
        const turnoRepository = AppDataSource.getRepository(Turno);

        const turno = await turnoRepository.findOne({ where: { id } });

        if (!turno) {
            return [null, "No se encontró un turno con el id proporcionado"];
        }

        await turnoRepository.delete(id);

        return [turno, null];
    } catch (error) {
        console.error("Error al eliminar el turno:", error);
        return [null, "Error interno del servidor"];
    }
}