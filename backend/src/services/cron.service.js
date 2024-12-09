import cron from "node-cron";
import { getReportesDataService } from "../services/reportes.service.js";
import { enviarEmailReporte } from "../services/email.service.js"; // Necesitarás crear este servicio

// Ejecutar todos los días a las 12:00 AM
// cron.schedule("0 0 * * *", async () =>

const sendEmailCron = async () => {
    try {
        const reportes = await getReportesDataService();


        if (reportes) {
            // Procesar los datos para el email
            const datosEmail = {
                ventas: reportes.ventas,
                comandas: reportes.comandas,
                turnos: reportes.turnos,
                fecha: new Date().toISOString().split("T")[0]
            };

            // Enviar el email
            await enviarEmailReporte(datosEmail);
            console.log("Reporte diario enviado exitosamente");
        } else {
            console.log("No hay datos para generar el reporte del día");
        }
    } catch (error) {

        console.error("Error al ejecutar el reporte programado:", error);
    }
}

export { sendEmailCron };
