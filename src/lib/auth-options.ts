import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    CredentialsProvider({
      name: "Admin",
      credentials: {
        email: { label: "Correo", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);

        if (!parsed.success) {
          return null;
        }

        const adminEmail = process.env.ADMIN_EMAIL ?? "admin@qusqueandotravel.com";
        const adminPassword = process.env.ADMIN_PASSWORD ?? "change-me";

        if (parsed.data.email !== adminEmail || parsed.data.password !== adminPassword) {
          return null;
        }

        return {
          id: "admin",
          name: "Administrador",
          email: adminEmail,
        };
      },
    }),
  ],
};
