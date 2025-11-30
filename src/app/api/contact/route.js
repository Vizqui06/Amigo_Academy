import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Contact from '@/models/Contact';
import nodemailer from 'nodemailer';

// Configurar transportador de email
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req) {
  try {
    await connectDB();
    
    const { name, email, message } = await req.json();
    
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }
    
    // Guardar en base de datos
    const contact = await Contact.create({
      name,
      email,
      message,
    });
    
    // Enviar email si está configurado
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
          to: process.env.EMAIL_TO || 'elamigoacademy@gmail.com',
          subject: `Nuevo mensaje de contacto - ${name}`,
          html: `
            <h2>Nuevo mensaje de contacto</h2>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Mensaje:</strong></p>
            <p>${message}</p>
            <hr>
            <p><small>Enviado desde Amigo Academy</small></p>
          `,
          text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`,
        });
        
        console.log('✅ Email enviado exitosamente');
      } catch (emailError) {
        console.error('❌ Error enviando email:', emailError);
        // No fallar la petición si el email falla
      }
    }
    
    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error en /api/contact:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await connectDB();
    
    const contacts = await Contact.find().sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, contacts }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}