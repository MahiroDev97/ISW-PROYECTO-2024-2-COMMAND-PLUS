"use strict";
import Turno from "../entity/turno.entity.js";
import User from "../entity/user.entity.js";
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

export async function updateTurnoService(body) {
    try {
        const turnoRepository = AppDataSource.getRepository(Turno);

        const turno = await turnoRepository.findOne({ where: { id: body.id } });

        if (!turno) {
            return [null, "No se encontró un turno con el id proporcionado"];
        }

        if (body.datetimeFin) {
            turno.datetimeFin = new Date(body.datetimeFin);
        }

        if (body.datetimeInicio) {
            turno.datetimeInicio = new Date(body.datetimeInicio);
        }



        await turnoRepository.save(turno);

        return [turno, null];
    } catch (error) {
        console.error("Error al actualizar el turno:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function deleteTurnoService(id) {
    try {
        console.log("Service - ID recibido:", id); // Debug
        const turnoRepository = AppDataSource.getRepository(Turno);

        // Verificar si el turno existe primero
        const turno = await turnoRepository.findOne({
            where: { id: id }
        });

        console.log("Service - Turno encontrado:", turno); // Debug

        if (!turno) {
            console.log("Service - Turno no encontrado"); // Debug
            return [null, "No se encontró un turno con el id proporcionado"];
        }

        // Si existe, lo eliminamos
        await turnoRepository.remove(turno);
        console.log("Service - Turno eliminado exitosamente"); // Debug

        return [turno, null];
    } catch (error) {
        console.error("Service - Error:", error); // Debug
        return [null, "Error interno del servidor"];
    }
}

export async function finishTurnoService(id_user) {
    try {
        const turnoRepository = AppDataSource.getRepository(Turno);
        const userRepository = AppDataSource.getRepository(User);

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

        // Actualizar estado active del usuario
        const user = await userRepository.findOne({ where: { id: id_user } });
        if (user) {
            user.active = false;
            await userRepository.save(user);
        }

        return [turnoActivo, null];
    } catch (error) {
        console.error("Error al finalizar el turno:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function isUserInTurno(id_user) {
    try {
        const turnoRepository = AppDataSource.getRepository(Turno);
        console.log(`Verificando turno para el usuario con ID ${id_user}`);
        const turnoActivo = await turnoRepository.findOne({
            where: {
                id_user: id_user,
                datetimeFin: null
            }
        });
        const inTurno = turnoActivo !== null;
        console.log(`Resultado de la verificación de turno para el usuario con ID ${id_user}: ${inTurno}`);
        return inTurno;
    } catch (error) {
        console.error("Error al verificar el turno del usuario:", error);
        return false;
    }
}