import cron from "node-cron";
import { getReportesDataService } from "../services/reportes.service.js";
import { enviarEmailReporte } from "../services/email.service.js";
import { handleErrorClient } from "../handlers/responseHandlers.js";

export async function sendEmailCron() {
    const cronJob = cron.schedule("55 2 * * *", async () => {
        try {
            const reportes = await getReportesDataService();

            if (!reportes) {
                console.log("No hay datos para generar el reporte");
                return null;
            }

            const datosEmail = {
                ventas: reportes.ventas,
                comandas: reportes.comandas,
                turnos: reportes.turnos,
                fecha: new Date().toISOString().split("T")[0]
            };
            console.log(datosEmail);

            const resultado = await enviarEmailReporte(datosEmail);
            console.log("Reporte enviado exitosamente");
            return resultado;

        } catch (error) {
            console.error("Error al ejecutar el reporte programado:", error);
            throw error;
        }
    });

    cronJob.start();
}
