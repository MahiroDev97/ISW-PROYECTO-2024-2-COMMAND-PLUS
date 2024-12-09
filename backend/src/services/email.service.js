import nodemailer from "nodemailer";

export async function enviarEmailReporte(datos) {
    // Configura tu transportador de email
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "dicodina03@gmail.com",
            pass: "blfv ixoi czuk tjcn"
        }
    });

    // Crear el contenido del email
    const contenido = `
        Reporte Diario ${new Date().toLocaleDateString()}
        
        Total Ventas: 
        Total Comandas: 
        Total Turnos: 
    `;

    const mailOptions = {
        from: "\"Sistema de Reportes\" <dicodina03@gmail.com>",
        to: "dicodinap03@gmail.com",
        subject: `Reporte Diario ${new Date().toLocaleDateString()}`,
        text: contenido
    }

    // Enviar el email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return error;
        }
        console.log(info);
        return info;
    });

}