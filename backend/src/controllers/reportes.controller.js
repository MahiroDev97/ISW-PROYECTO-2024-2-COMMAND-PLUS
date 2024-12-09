import { sendEmailCron } from "../services/cron.service.js";

import { handleErrorClient, handleSuccess } from "../handlers/responseHandlers.js";

export const sendEmailCronController = async (req, res) => {

    try {
        const [reportes, errorSendEmail] = await sendEmailCron();

        if (errorSendEmail) return handleErrorClient(res, errorSendEmail);

        handleSuccess(res, 200, "Email enviado correctamente", reportes);
    } catch (error) {
        handleErrorClient(res, 500, error.message);
    }

}