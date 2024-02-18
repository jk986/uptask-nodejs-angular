// ## MAiltrap para testear envio de emails

import nodemailer from "nodemailer";

export const emailResgistro = async(datos) => {
    const { email, nombre, token } = datos;
    // TODO: Mover hacia variables de entorno
    // configurar cliente para enviar email
    let transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      // Informacion del email
      const info = await transport.sendMail({
        from:'"UpTask - Administrador de Proyectos" <cuentas@uptask.com>',
        to:email,
        subject:"Uptask - Confirma tu cuenta",
        text:"Confirma tu cuenta en UpTask",
        html: 
        `
        <p>Hola, ${nombre} confirma tu cuenta en UpTask</p>
        <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace: </p>
        <a href="${process.env.FRONTEND_URL}/auth/confirmar-cuenta/${token}" >Comprobar Cuenta</a>
        <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
        `
      });

    console.log(datos);
};

export const emailOlvidePassw = async(datos) => {
  const { email, nombre, token } = datos;
  
  // configurar cliente para enviar email
  let transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

    // Informacion del email
    const info = await transport.sendMail({
      from:'"UpTask - Administrador de Proyectos" <cuentas@uptask.com>',
      to:email,
      subject:"Uptask - Reestablece tu Password",
      text:"Reestablece tu password",
      html: 
      `
      <p>Hola, ${nombre} has solicitado reestablecer tu password</p>
      <p>Sigue el siguiente enlace para generar un nuevo password: </p>
      <a href="${process.env.FRONTEND_URL}/auth/olvide-password/${token}" >Reestablecer Password</a>
      <p>Si tu no solicitaste este email, puedes ignorar este mensaje</p>
      `
    });

  console.log(datos);
};