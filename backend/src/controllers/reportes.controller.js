import { sendEmailCron } from "../services/cron.service.js";

import { handleErrorClient, handleSuccess } from "../handlers/responseHandlers.js";

export const sendEmailCronController = async (req, res) => {

    try {
        const resultado = sendEmailCron();

        if (!resultado) {
            return handleErrorClient(res, "No hay datos para generar el reporte");
        }
        if (resultado == null) {
            return handleErrorClient(res, 400, "No hay datos para generar el reporte");
        }

        handleSuccess(res, 200, "Email enviado correctamente", resultado);
    } catch (error) {
        handleErrorClient(res, 500, error.message);
    }

}