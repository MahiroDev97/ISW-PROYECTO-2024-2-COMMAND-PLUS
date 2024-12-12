import nodemailer from "nodemailer";



export async function enviarEmailReporte(datos) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "dicodina03@gmail.com",
            pass: "gmab mufm eruo gljn"
        }
    });
    //to do: agregar el email del admin 
    const fechaFormateada = datos.fecha.split("-").reverse().join("/");
    // Procesar datos de ventas para crear el resumen
    const resumenVentas = datos.ventas.reduce((acc, venta) => {
        const producto = venta.product;
        if (!acc[producto.nombre]) {
            acc[producto.nombre] = {
                cantidad: 0,
                precio: producto.precio,
                total: 0
            };
        }
        acc[producto.nombre].cantidad += 1;
        acc[producto.nombre].total += producto.precio;
        return acc;
    }, {});

    // Calcular total general
    const totalGeneral = Object.values(resumenVentas)
        .reduce((sum, item) => sum + item.total, 0);

    // Crear tabla HTML
    const tablaHTML = `
        <table style="border-collapse: collapse; width: 100%;">
            <tr style="border: 1px solid black;">
                <th style="border: 1px solid black; padding: 8px;">Nombre</th>
                <th style="border: 1px solid black; padding: 8px;">Cantidad</th>
                <th style="border: 1px solid black; padding: 8px;">Precio</th>
                <th style="border: 1px solid black; padding: 8px;">Total</th>
            </tr>
            ${Object.entries(resumenVentas).map(([nombre, datos]) => `
                <tr style="border: 1px solid black;">
                    <td style="border: 1px solid black; padding: 8px;">${nombre}</td>
                    <td style="border: 1px solid black; padding: 8px;">${datos.cantidad}</td>
                    <td style="border: 1px solid black; padding: 8px;">$${datos.precio}</td>
                    <td style="border: 1px solid black; padding: 8px;">$${datos.total}</td>
                </tr>
            `).join("")}
            <tr style="border: 1px solid black; font-weight: bold;">
                <td colspan="3" style="border: 1px solid black; padding: 8px;">Total General</td>
                <td style="border: 1px solid black; padding: 8px;">$${totalGeneral}</td>
            </tr>
        </table>
    `;

    // Agrupar turnos por usuario
    const turnosUnicos = datos.turnos.reduce((acc, turno) => {
        const userId = turno.user.id;
        if (!acc[userId] || new Date(turno.datetimeInicio) > new Date(acc[userId].datetimeInicio)) {
            acc[userId] = turno;
        }
        return acc;
    }, {});

    // Crear tabla HTML para turnos
    const tablaTurnosHTML = `
        <table style="border-collapse: collapse; width: 100%; margin-top: 20px;">
            <tr style="border: 1px solid black;">
                <th style="border: 1px solid black; padding: 8px;">Nombre</th>
                <th style="border: 1px solid black; padding: 8px;">Rol</th>
                <th style="border: 1px solid black; padding: 8px;">Inicio</th>
                <th style="border: 1px solid black; padding: 8px;">Fin</th>
                <th style="border: 1px solid black; padding: 8px;">Total Horas</th>
            </tr>
            ${Object.values(turnosUnicos).map(turno => {
        const inicio = new Date(turno.datetimeInicio);
        const fin = turno.datetimeFin ? new Date(turno.datetimeFin) : new Date();
        const horasTrabajadas = ((fin - inicio) / (1000 * 60 * 60)).toFixed(2);

        return `
                    <tr style="border: 1px solid black;">
                        <td style="border: 1px solid black; padding: 8px;">${turno.user.nombreCompleto}</td>
                        <td style="border: 1px solid black; padding: 8px;">${turno.user.rol}</td>
                        <td style="border: 1px solid black; padding: 8px;">${inicio.toLocaleString()}</td>
                        <td style="border: 1px solid black; padding: 8px;">${turno.datetimeFin
                ? fin.toLocaleString() : "En turno"}</td>
                        <td style="border: 1px solid black; padding: 8px;">${horasTrabajadas}</td>
                    </tr>
                `;
    }).join("")}
        </table>
    `;

    // Procesar estados de comandas
    const resumenComandas = datos.comandas.reduce((acc, comanda) => {
        if (!acc[comanda.estado]) {
            acc[comanda.estado] = 0;
        }
        acc[comanda.estado]++;
        return acc;
    }, {});

    // Crear tabla HTML para resumen de comandas
    const tablaComandasHTML = `
        <table style="border-collapse: collapse; width: 50%; margin-top: 20px;">
            <tr style="border: 1px solid black;">
                <th style="border: 1px solid black; padding: 8px;">Estado</th>
                <th style="border: 1px solid black; padding: 8px;">Cantidad</th>
            </tr>
            ${Object.entries(resumenComandas).map(([estado, cantidad]) => `
                <tr style="border: 1px solid black;">
                    <td style="border: 1px solid black; padding: 8px;">${estado}</td>
                    <td style="border: 1px solid black; padding: 8px;">${cantidad}</td>
                </tr>
            `).join("")}
            <tr style="border: 1px solid black; font-weight: bold;">
                <td style="border: 1px solid black; padding: 8px;">Total Comandas</td>
                <td style="border: 1px solid black; padding: 8px;">${datos.comandas.length}</td>
            </tr>
        </table>
    `;

    const mailOptions = {
        from: "\"Sistema de Reportes\" <dicodina03@gmail.com>",
        to: "dicodinap03@gmail.com",
        subject: `Notificación: Tu Reporte Diario del día ${fechaFormateada} está listo :)`,
        html: `
            <h2>Reporte Diario ${fechaFormateada}</h2>

            <h3>Resumen de Comandas</h3>
            ${tablaComandasHTML}
            
            <h3>Resumen de Ventas</h3>
            ${tablaHTML}
            
            <h3>Resumen de Turnos</h3>
            ${tablaTurnosHTML}
            
            <p>Para mayor información ingresa a la app</p>
            <a href="http://localhost:5173/adminTables" style="display: 
            inline-block; padding: 10px 20px; background-color: #007bff; color: white;
             text-decoration: none; border-radius: 5px;">
            Ir a la app</a>

        `
    }

    return await transporter.sendMail(mailOptions);
}