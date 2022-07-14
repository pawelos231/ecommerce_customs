import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      return { session, user, token };
    },
  },
  theme: {
    colorScheme: "dark",
  },
  adapter: MongoDBAdapter(clientPromise),
  /*
  pages: {
    signIn: "/signin",
  },
  CREATE CUSTOM SIGNIN PAGE WHEN I WILL HAVE ANY IDEA HOW TO STYLE IT XD
  */
  secret: process.env.JWT_SECRET,
});
