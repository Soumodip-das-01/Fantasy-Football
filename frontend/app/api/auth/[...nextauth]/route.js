import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"


export const authOptions = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials) {
                try {
                    const res = await fetch("http://localhost:5000/auth/login", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password,
                        }),
                    })

                    if (!res.ok) {
                        return null
                    }

                    const user = await res.json()
                    return {
                        id: user.id || user._id,
                        email: user.email,
                        name: user.name,
                        image: user.avatar || null
                    }
                } catch (error) {
                    console.error("Authorize error:", error)
                    return null
                }
            },
        }),
    ],


    session: {
        strategy: "jwt",
    },

    callbacks:{
        async jwt({token, user}){
            if (user){
                token.id = user.id,
                token.email = user.email,
                token.name = user.name,
                token.image = user.image
            }

            return token
        },

        async session({session, token}){
            session.user.id = token.id,
            session.user.email = token.email,
            session.user.name = token.name,
            session.user.image = token.image

            return session
        }
    },

    pages: {
        signIn: "/login",
    },

    secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }


