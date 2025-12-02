// src/app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions"; // Asegúrate que la ruta sea correcta

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };