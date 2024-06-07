import GoogleProvider from "next-auth/providers/google";
interface ProviderOptions {
  clientId: string;
  clientSecret: string;
}
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    } as ProviderOptions),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    async session({ token, session }: any) {
      session.user.id = token.sub;
      return session;
    },
    async redirect({ url, baseUrl }: any) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
};
