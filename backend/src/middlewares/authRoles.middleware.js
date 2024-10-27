import { AppDataSource } from "../config/configDb.js";
import User from "../entity/user.entity.js";

export const verifyGarzon = async (req, res, next) => {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({
            where: { id: req.user.id }
        });

        if (user && (user.rol === "garzon" || user.rol === "administrador")) {
            return next();
        }

        return res.status(403).json({
            status: "error",
            message: "Acceso denegado - Se requiere rol de garzón"
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Error al verificar rol",
            error: error.message
        });
    }
};