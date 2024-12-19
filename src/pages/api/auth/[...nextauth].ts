import NextAuth, { DefaultUser } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: {
      role: string;
      name?: string | null;
      first_name?: string | null;
      email?: string | null;
      image?: string | null;
      token?: string; // Add the token property here
      loginTime?: string; // Add loginTime to the session
    } & DefaultUser;
    loginTime?: string; // Optional at the session level
  }
}

export default NextAuth({
  providers: [
    LinkedInProvider({
      clientId: "7771k810ggdohd", // PII kept here
      clientSecret: "WPL_AP1.MOowm5usHAuKMsjI.Kcf9Pg==", // PII kept here
      issuer: "https://www.linkedin.com/oauth", // Updated issuer to avoid jwks_uri issues
      jwks_endpoint: "https://www.linkedin.com/oauth/openid/jwks",
      authorization: {
        url: "https://www.linkedin.com/oauth/v2/authorization",
        params: {
          response_type: "code",
          scope: "openid profile email", // OpenID Connect scopes
        },
      },
      token: {
        url: "https://www.linkedin.com/oauth/v2/accessToken",
      },
      userinfo: {
        url: "https://api.linkedin.com/v2/me",
        async request({ tokens }) {
          // Fetch user profile
          const res = await fetch("https://api.linkedin.com/v2/userinfo", {
            headers: {
              Authorization: `Bearer ${tokens.access_token}`,
            },
          });
          const profile = await res.json();
          return profile;
        },
      },
      profile(profile) {
        return {
          id: profile.sub, // Use the combined ID or LinkedIn ID if available
          name: `${profile.name}`,
          email: profile.email,
          image: profile.picture,
        };
      },
      checks: ["state"], // Use "state" check only, skip jwks_uri validation
    }),

    // Google provider
    GoogleProvider({
      clientId: `${process.env.GOOGLE_CLIENT_ID}`, // PII kept here
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`, // PII kept here
    }),

    // Credentials provider
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        // Call your backend for authentication and token generation
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_NEXT_URL}api/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.username,
              password: credentials.password,
            }),
          }
        );

        const user = await res.json();

        if (!res.ok || !user?.result) {
          throw new Error(user?.message || "Invalid credentials");
        }

        // Return user object including the system-generated token
        return {
          id: user.result._id,
          _id: user.result._id,
          role: user.result.role,
          email: user.result.email,
          token: user.result.token, // System-generated token
          user: user.result.user,
        };
      },
    }),
  ],

  callbacks: {
    // Sign in callback for Google and LinkedIn
    async signIn({ user, account, profile }: any) {
      if (account.provider === "google" || account.provider === "linkedin") {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_NEXT_URL}api/auth/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: profile.email,
                username: profile.email,
                password: "SocialLoginDefaultPassword",
                isSocial: true,
              }),
            }
          );

          const result = await res.json();

          if (res.ok && result?.result) {
            user.token = result.result.token;
            user.user = result.result.user;
            user.role = result.result.role;
            return true;
          }
        } catch (error) {
          console.error("Error during social login", error);
          return false;
        }
      }
      return true;
    },

    // JWT callback to modify the token
    async jwt({ token, user }: any) {
      if (user) {
        token.accessToken = user.token;
        token.user = user.user;
      }
      return token;
    },

    // Session callback to modify the session object
    async session({ session, token }: any) {
      session.user = token?.user || null;
      session.token = token?.accessToken || null;
      return session;
    },
  },

  debug: true,

  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin?error=true",
  },
  secret: "auth", // PII kept here
});
