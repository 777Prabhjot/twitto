import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authProviders = {
  // Configure one or more authentication provider
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // ...add more providers here
  ],
};
export default NextAuth(authProviders);
