// next auth
import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from 'next-auth/providers/google'
import { JWT } from "next-auth/jwt";

// jsonwebtoken
import jsonwebtoken from 'jsonwebtoken'

// tpyes
import { SessionInterface } from "@/common.types";

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
 /*  jwt: {
    encode: ({secret, token}) => {
      return ''
    },
    decode: async({secret, token}) => {
      return ''
    }
  }, */
  theme: {
    colorScheme: 'light',
    logo: '/logo.png'
  },
  callbacks: {
    async session ({ session }) {
      return session
    },
    async signIn ({ user }: { user: AdapterUser | User}) {
      try {
        console.log(user)
        return true
      } catch (err: any) {
        console.log(err)
        return false
      }
    }
  }
}

// utils
export async function getCurrentUser () {
  const session = await getServerSession(authOptions) as SessionInterface

  return session
}