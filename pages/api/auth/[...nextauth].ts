// import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import { compare } from "bcrypt";
// import GithubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// // import { PrismaAdapter } from '@auth/prisma-adapter'; // Correct import

// import prismadb from '../../../lib/prismadb';

// export default NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID || "",
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
//     }),
//     GithubProvider({
//       clientId: process.env.GITHUB_ID || "",
//       clientSecret: process.env.GITHUB_SECRET || "",
//     }),
//     Credentials({
//       id: "credentials",
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error("Email and password required");
//         }

//         const user = await prismadb.user.findUnique({
//           where: {
//             email: credentials.email,
//           },
//         });

//         if (!user || !user.hashedPassword) {
//           throw new Error("Email does not exist");
//         }

//         const isCorrectPassword = await compare(
//           credentials.password,
//           user.hashedPassword
//         );

//         if (!isCorrectPassword) {
//           throw new Error("Incorrect password");
//         }

//         return user;
//       },
//     }),
//   ],

//   pages: {
//     signIn: "/auth",
//   },
//   debug: process.env.NODE_ENV === "development",
//   adapter: PrismaAdapter(prismadb),
//   session: {
//     strategy: "jwt",
//   },
//   jwt: {
//     secret: process.env.NEXTAUTH_JWT_SECRET,
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// });

import NextAuth, { type NextAuthOptions, type User } from "next-auth";
import type { AdapterUser } from "next-auth/adapters";
// import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import type { Session } from "next-auth";
import type { JWT } from "next-auth/jwt";

import prismadb from "../../../lib/prismadb";

// Extended Session type
interface ExtendedSession extends Session {
  user?: {
    id: string;
    email: string;
    name?: string | null;
    image?: string | null;
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }

        const user = await prismadb.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.hashedPassword) {
          throw new Error("Email does not exist");
        }

        const isCorrectPassword = await compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Incorrect password");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  debug: process.env.NODE_ENV === "development",
  adapter: PrismaAdapter(prismadb),
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }): Promise<ExtendedSession> {
      if (session.user) {
        session.user.id = token.sub || token.id;
      }
      return session;
    },
    async jwt({ token, user }: { token: JWT; user?: User | AdapterUser }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  // callbacks: {
  //   async session({ session, token }) {
  //     if (session?.user) {
  //       session.user.id = token.sub; // Attach user ID to session
  //     }
  //     return session;
  //   },
  // },
};

export default NextAuth(authOptions);