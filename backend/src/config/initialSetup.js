"use strict";
import User from "../entity/user.entity.js";
import Product from "../entity/product.entity.js";
import Comanda from "../entity/comanda.entity.js";
import ProductComanda from "../entity/productcomanda.entity.js";
import Turno from "../entity/turno.entity.js";
import { AppDataSource } from "./configDb.js";
import { encryptPassword } from "../helpers/bcrypt.helper.js";

async function createUsers() {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const count = await userRepository.count();
    if (count > 0) return;

    await Promise.all([
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Diego Alexis Salazar Jara",
          rut: "21.308.770-3",
          email: "administrador2024@gmail.cl",
          password: await encryptPassword("admin1234"),
          rol: "administrador",
        })
      ),
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Diego Sebastián Ampuero Belmar",
          rut: "21.151.897-9",
          email: "usuario1.2024@gmail.cl",
          password: await encryptPassword("user1234"),
          rol: "garzon",
        })
      ),
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Alexander Benjamín Marcelo Carrasco Fuentes",
          rut: "20.630.735-8",
          email: "usuario2.2024@gmail.cl",
          password: await encryptPassword("user1234"),
          rol: "garzon",
        })
      ),
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Pablo Andrés Castillo Fernández",
          rut: "20.738.450-K",
          email: "usuario3.2024@gmail.cl",
          password: await encryptPassword("user1234"),
          rol: "cocinero",
        })
      ),
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Felipe Andrés Henríquez Zapata",
          rut: "20.976.635-3",
          email: "usuario4.2024@gmail.cl",
          password: await encryptPassword("user1234"),
          rol: "cocinero",
        })
      ),
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Diego Alexis Meza Ortega",
          rut: "21.172.447-1",
          email: "usuario5.2024@gmail.cl",
          password: await encryptPassword("user1234"),
          rol: "cocinero",
        })
      ),
      userRepository.save(
        userRepository.create({
          nombreCompleto: "Juan Pablo Rosas Martin",
          rut: "20.738.415-1",
          email: "usuario6.2024@gmail.cl",
          password: await encryptPassword("user1234"),
          rol: "cocinero",
        })
      ),
    ]);
    console.log("* => Usuarios creados exitosamente");
  } catch (error) {
    console.error("Error al crear usuarios:", error);
  }
}

async function createProducts() {
  try {
    const productRepository = AppDataSource.getRepository(Product);
    const count = await productRepository.count();
    if (count > 0) return;

    const productos = [
      {
        categoria: "Entradas",
        nombre: "Empanadas de Pino",
        descripcion: "Empanadas tradicionales chilenas de carne",
        precio: 2500,
        disponibilidad: true,
      },
      {
        categoria: "Platos Principales",
        nombre: "Pastel de Choclo",
        descripcion: "Pastel tradicional chileno con choclo y carne",
        precio: 8900,
        disponibilidad: true,
      },
      {
        categoria: "Platos Principales",
        nombre: "Cazuela de Vacuno",
        descripcion: "Sopa tradicional chilena con verduras y carne",
        precio: 7500,
        disponibilidad: true,
      },
      {
        categoria: "Bebidas",
        nombre: "Pisco Sour",
        descripcion: "Coctel tradicional chileno",
        precio: 4500,
        disponibilidad: true,
      },
      {
        categoria: "Postres",
        nombre: "Leche Asada",
        descripcion: "Postre tradicional chileno",
        precio: 3500,
        disponibilidad: true,
      }
    ];

    await productRepository.save(productos);
    console.log("* => Productos creados exitosamente");
  } catch (error) {
    console.error("Error al crear productos:", error);
  }
}

async function createComandas() {
  try {
    const comandaRepository = AppDataSource.getRepository(Comanda);
    const count = await comandaRepository.count();
    if (count > 0) return;

    const comandas = [
      {
        fecha: new Date("2023-06-15 12:00:00"), // 15 de junio de 2023
        mesa: 1,
        estado: "abierta",
      },
      {
        fecha: new Date("2023-09-22 14:30:00"), // 22 de septiembre de 2023
        mesa: 2,
        estado: "cerrada",
      },
      {
        fecha: new Date("2023-12-05 13:15:00"), // 5 de diciembre de 2023
        mesa: 3,
        estado: "cerrada",
      },
      {
        fecha: new Date("2024-01-10 15:45:00"), // 10 de enero de 2024
        mesa: 4,
        estado: "cerrada",
      },
      {
        fecha: new Date("2024-03-18 18:20:00"), // 18 de marzo de 2024
        mesa: 5,
        estado: "cerrada",
      },
      {
        fecha: new Date("2024-05-07 19:00:00"), // 7 de mayo de 2024
        mesa: 1,
        estado: "cerrada",
      },
      {
        fecha: new Date("2024-07-20 20:30:00"), // 20 de julio de 2024
        mesa: 2,
        estado: "cerrada",
      },
      {
        fecha: new Date("2024-08-03 17:45:00"), // 3 de agosto de 2024
        mesa: 3,
        estado: "cerrada",
      },
      {
        fecha: new Date("2024-09-12 16:15:00"), // 12 de septiembre de 2024
        mesa: 4,
        estado: "cerrada",
      },
      {
        fecha: new Date("2024-10-28 21:00:00"), // 28 de octubre de 2024
        mesa: 5,
        estado: "abierta",
      }
    ];

    await comandaRepository.save(comandas);
    console.log("* => Comandas creadas exitosamente");
  } catch (error) {
    console.error("Error al crear comandas:", error);
  }
}

async function createProductComandas() {
  try {
    const productComandaRepository = AppDataSource.getRepository(ProductComanda);
    const count = await productComandaRepository.count();
    if (count > 0) return;

    const productComandas = [
      {
        comandaId: 1,
        id_product: 1,
        estadoproductocomanda: "pendiente",
        fechahorarecepcion: new Date(),
      },
      {
        comandaId: 1,
        id_product: 2,
        estadoproductocomanda: "en preparación",
        fechahorarecepcion: new Date(),
      },
      {
        comandaId: 2,
        id_product: 3,
        estadoproductocomanda: "listo",
        fechahorarecepcion: new Date(),
        fechahoraentrega: new Date(),
      }
    ];

    await productComandaRepository.save(productComandas);
    console.log("* => Productos de comandas creados exitosamente");
  } catch (error) {
    console.error("Error al crear productos de comandas:", error);
  }
}

async function createTurnos() {
  try {
    const turnoRepository = AppDataSource.getRepository(Turno);
    const count = await turnoRepository.count();
    if (count > 0) return;

    const fechaHoy = new Date();
    const turnos = [
      {
        datetimeInicio: new Date(fechaHoy.setHours(9, 0, 0)),
        datetimeFin: new Date(fechaHoy.setHours(17, 0, 0)),
        id_user: 2, // ID de un garzón
      },
      {
        datetimeInicio: new Date(fechaHoy.setHours(17, 0, 0)),
        datetimeFin: new Date(fechaHoy.setHours(23, 0, 0)),
        id_user: 3, // ID de otro garzón
      },
      {
        datetimeInicio: new Date(fechaHoy.setHours(9, 0, 0)),
        datetimeFin: new Date(fechaHoy.setHours(17, 0, 0)),
        id_user: 6, // ID de un cocinero
      }
    ];

    await turnoRepository.save(turnos);
    console.log("* => Turnos creados exiztosamente");
  } catch (error) {
    console.error("Error al crear turnos:", error);
  }
}

export async function createInitialSetup() {
  try {
    await createUsers();
    await createProducts();
    await createComandas();
    await createProductComandas();
    await createTurnos();
  } catch (error) {
    console.error("Error al crear datos iniciales:", error);
  }
}
