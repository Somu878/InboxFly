import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
interface Token {
  accessToken: string;
  accessTokenExpires: number;
  refreshToken: string;
  error?: string;
}

interface RefreshedTokens {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  error?: string;
}

const GOOGLE_AUTHORIZATION_URL =
  "https://accounts.google.com/o/oauth2/v2/auth?" +
  new URLSearchParams({
    prompt: "consent",
    access_type: "offline",
    response_type: "code",
    scope:
      "openid email profile https://www.googleapis.com/auth/gmail.readonly",
  }).toString();

async function refreshAccessToken(token: Token): Promise<Token> {
  try {
    const url =
      "https://oauth2.googleapis.com/token?" +
      new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      }).toString();

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    const refreshedTokens: RefreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

interface ProviderOptions {
  clientId: string;
  clientSecret: string;
  authorization: string;
}
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: GOOGLE_AUTHORIZATION_URL,
    } as ProviderOptions),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    async jwt({ token, account }: { token: JWT; account?: any }) {
      if (account) {
        if (account) {
          token = Object.assign({}, token, {
            access_token: account.access_token,
          });
        }
        // token.refreshToken = account?.refreshToken;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (session) {
        session = Object.assign({}, session, {
          access_token: token.access_token,
        });
        // console.log(session);
      }
      // session.refreshToken = user.refreshToken;
      session.user.id = token.sub;
      return session;
    },
    async redirect({ url, baseUrl }: any) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
};
