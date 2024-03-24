import { AuthOptions, User } from "next-auth";

import Credentials from "next-auth/providers/credentials";
import { DOMAIN_NAME, PROTOCOL } from "./config";

export const nextAuthOptions: AuthOptions = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Почта", type: "email", required: true },
        password: { label: "Пароль", type: "password", required: true },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const url = `${PROTOCOL}://${DOMAIN_NAME}/api/v1/auth/signin?email=${credentials.email}&password=${credentials.password}`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const res = (await response.json()) as User;

          return res;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;

      return session;
    },
  },
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/signin",
  },
};
