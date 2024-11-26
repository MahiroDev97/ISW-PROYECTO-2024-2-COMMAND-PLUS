import User from "../entity/user.entity.js";
import { AppDataSource } from "../config/configDb.js";
import {
  handleErrorClient,
  handleErrorServer,
} from "../handlers/responseHandlers.js";
import { isUserInTurno } from "../services/turno.service.js";

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
        "Se requiere un rol de administrador para realizar esta acción.",
      );
    }
    next();
  } catch (error) {
    handleErrorServer(res, 500, error.message);
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
        "Se requiere un rol de garzón para realizar esta acción.",
      );
    }
    next();
  } catch (error) {
    handleErrorServer(res, 500, error.message);
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
      return handleErrorClient(
        res,
        404,
        "Usuario no encontrado en la base de datos",
      );
    }

    const rolUser = userFound.rol;

    if (rolUser !== "cocinero" && rolUser !== "garzón") {
      return handleErrorClient(
        res,
        403,
        "Acceso denegado. Solo usuarios cocineros o garzones pueden acceder.",
      );
    }
    next();
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
};

export const isGarzonOrAdmin = async (req, res, next) => {
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

    if (rolUser !== "garzón" && rolUser !== "administrador") {
      return handleErrorClient(
        res,
        403,
        "Acceso denegado. Solo usuarios garzones o administradores pueden acceder.",
      );
    }

    // Verificar horario laboral y de cocina
    const currentHour = new Date().getHours();
    if (currentHour < 9 || currentHour > 23) {
      return handleErrorClient(res, 403, "Acceso denegado. Solo disponible en horario laboral y de cocina.");
    }

    // Verificar si el usuario está en turno
    const inTurno = await isUserInTurno(req.user.id);
    if (!inTurno) {
      console.log(`Usuario con ID ${req.user.id} no está en turno`);
      return handleErrorClient(res, 403, "El usuario no está en turno");
    }

    next();
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
};
