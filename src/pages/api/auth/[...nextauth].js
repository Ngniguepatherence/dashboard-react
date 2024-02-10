import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";


export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_JS_PUBLIC_GOOGLE_CLIENT_ID,
            clientSecret: process.env.NEXT_JS_PUBLIC_GOOGLE_CLIENT_SECRET,
        }),
    ],
    session: {
        jwt: true,
        maxAge:  24 * 60 * 60, // Durée de la session en secondes (30 jours dans cet exemple)
      },
}

export default NextAuth(authOptions)