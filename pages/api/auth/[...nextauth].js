import NextAuth from "next-auth/next";
import TwitterProvider from "next-auth/providers/twitter"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
    providers: [
      TwitterProvider({
        clientId: process.env.TWITTER_CONSUMER_KEY,
        clientSecret: process.env.TWITTER_CONSUMER_SECRET,
      })
    ],
    callbacks: {
      async jwt ({token, user, session, profile, account}) {
        if (user) {
          return {
            ...token,
            id: user.id,
            name: user.name,
            email: user.email,
            screenName: profile.screen_name,
          }
        }
        return token
      },
      async session({ session, token, user }) {
        session.uId = token.id
        session.screenName = token.screenName
        return session;
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV !== "production"
})