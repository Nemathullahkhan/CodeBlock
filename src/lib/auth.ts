import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/auth/signin"
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      
      credentials: {
        username: {
          label: "User Name",
          type: "text",
          placeholder: "Your User Name"
        },
        password: {
          label: "Password",
          type: "password",
        }
      },
      
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.username
          }
        });
        if (!user) throw new Error("User name or password is incorrect");
        if (!credentials?.password) throw new Error("Please provide your password")
        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordCorrect) throw new Error("UserName or password is incorrect..Please try again");
        
        // Exclude password from user object
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userWithoutPass } = user;
        return userWithoutPass as Omit<typeof user, 'password'>;
      }
    })
  ],
  
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user as User;
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user;
      }
      return session;
    },
  }
};