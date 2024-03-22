import NextAuth from "next-auth/next";
import { nextAuthOptions } from "@/shared/configs/next-auth-options";

const handlers = NextAuth(nextAuthOptions);

export { handlers as GET, handlers as POST };
