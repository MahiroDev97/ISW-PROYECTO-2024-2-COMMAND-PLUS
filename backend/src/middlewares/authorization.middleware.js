import User from "../entity/user.entity.js";
import { AppDataSource } from "../config/configDb.js";
import {
    handleErrorClient,
    handleErrorServer,
} from "../handlers/responseHandlers.js";

export async function isAdmin(req, res, next) {
    try {
        const userRepository = AppDataSource.getRepository(User);

        const userFound = await userRepository.findOneBy({ email: req.user.email });

        if (!userFound) {
            return handleErrorClient(
                res,
                404,
                "Usuario no encontrado en la base de datos",
            );
        }

        const rolUser = userFound.rol;

        if (rolUser !== "administrador") {
            return handleErrorClient(
                res,
                403,
                "Error al acceder al recurso",
                "Se requiere un rol de administrador para realizar esta acción."
            );
        }
        next();
    } catch (error) {
        handleErrorServer(
            res,
            500,
            error.message,
        );
    }
}

export async function isGarzon(req, res, next) {
    try {
        const userRepository = AppDataSource.getRepository(User);

        const userFound = await userRepository.findOneBy({ email: req.user.email });

        if (!userFound) {
            return handleErrorClient(
                res,
                404,
                "Usuario no encontrado en la base de datos",
            );
        }

        const rolUser = userFound.rol;

        if (rolUser !== "garzón") {
            return handleErrorClient(
                res,
                403,
                "Error al acceder al recurso",
                "Se requiere un rol de garzón para realizar esta acción."
            );
        }
        next();
    } catch (error) {
        handleErrorServer(
            res,
            500,
            error.message,
        );
    }
}

export const isCocinero = async (req, res, next) => {
    try {
        const userRepository = AppDataSource.getRepository(User);


        const userFound = await userRepository.findOneBy({ email: req.user.email });

        if (!userFound) {
            return handleErrorClient(
                res,
                404,
                "Usuario no encontrado en la base de datos",
            );
        }

        const rolUser = userFound.rol;

        if (rolUser !== "cocinero") {
            return handleErrorClient(
                res,
                403,
                "Acceso denegado. Solo usuarios cocineros pueden acceder.",
            );
        }

        next();
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
};

export const isCocineroOrGarzon = async (req, res, next) => {
    try {
        const userRepository = AppDataSource.getRepository(User);

        const userFound = await userRepository.findOneBy({ email: req.user.email });

        if (!userFound) {
            return handleErrorClient(res, 404, "Usuario no encontrado en la base de datos");
        }

        const rolUser = userFound.rol;

        if (rolUser !== "cocinero" && rolUser !== "garzón") {
            return handleErrorClient(res, 403, "Acceso denegado. Solo usuarios cocineros o garzones pueden acceder.");
        }
        next();

    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
};