



import { AppDataSource } from "../config/configDb.js";
import ProductComanda from "../entity/productcomanda.entity.js";
import Comanda from "../entity/comanda.entity.js";
import Turno from "../entity/turno.entity.js";
import User from "../entity/user.entity.js";
import { Between } from "typeorm";

//get data to send an email to the admin with the report of ventas, products solds, comandas, Turnos del dia.
// esto debe ser un servicio que se ejecute cada dia a las 12:00 am
// el servicio debe ser un servicio de node que se ejecute con cron
// si no hay comandas en ese dia, no se debe enviar el email
// si hay comandas en ese dia, se debe enviar el email con el reporte de ventas, products solds, comandas, Turnos del dia.

export async function getReportesDataService() {
    const productComandaRepository = AppDataSource.getRepository(ProductComanda);
    const comandaRepository = AppDataSource.getRepository(Comanda);
    const turnoRepository = AppDataSource.getRepository(Turno);
    const userRepository = AppDataSource.getRepository(User);
    // Obtener fecha actual
    const fechaActual = new Date();

    // Configurar fechaInicio (7 AM del día)
    const fechaInicio = new Date(fechaActual);
    fechaInicio.setDate(fechaInicio.getDate() - 1);
    fechaInicio.setHours(7, 0, 0, 0);

    // Configurar fechaFin (2 AM del día actual)
    const fechaFin = new Date(fechaActual);
    fechaFin.setDate(fechaFin.getDate());
    fechaFin.setHours(2, 0, 0, 0);
    try {
        const ventas = await productComandaRepository.find({
            where: {
                fechahoraentrega: Between(fechaInicio, fechaFin)
            }
        });
        //if (ventas.length === 0) return null;

        const comandas = await comandaRepository.find({
            where: {
                fecha: Between(fechaInicio, fechaFin)
            }
        });
        //if (comandas.length === 0) return null;
        //between 00:01 am and 11:59 pm


        const turnos = await turnoRepository.find({
            where: {
                datetimeInicio: Between(fechaInicio, fechaFin)
            }
        });
        //if (turnos.length === 0) return null;

        return { ventas, comandas, turnos, fecha };

    } catch (error) {
        console.error("Error al obtener los reportes:", error);
        return null;
    }
}