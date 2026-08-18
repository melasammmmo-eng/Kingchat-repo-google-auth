import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
  useSecureCookies: true,
  pages: {
    signIn: "/",
    error: "/",
  },
  cookies: {
    state: {
      name: `__Secure-next-auth.state`,
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
    pkceCodeVerifier: {
      name: `__Secure-next-auth.pkce.code_verifier`,
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
    callbackUrl: {
      name: `__Secure-next-auth.callback-url`,
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        const discordId = account?.provider === "discord" ? String(profile?.id) : null;
        const googleEmail = account?.provider === "google" ? user?.email : null;

        // Check if user is blacklisted
        let isBlacklisted = false;

        if (discordId) {
          const { data } = await supabase
            .from("users")
            .select("is_blacklisted")
            .eq("discord_id", discordId)
            .eq("is_blacklisted", true)
            .maybeSingle();

          if (data) isBlacklisted = true;
        }

        if (!isBlacklisted && googleEmail) {
          const { data } = await supabase
            .from("users")
            .select("is_blacklisted")
            .eq("google_email", googleEmail)
            .eq("is_blacklisted", true)
            .maybeSingle();

          if (data) isBlacklisted = true;
        }

        // Block login if blacklisted
        if (isBlacklisted) {
          return false; // This will show "AccessDenied" error
        }

        // Save / update user if not blacklisted
        await supabase.from("users").upsert({
          discord_id: discordId,
          google_email: googleEmail,
          is_blacklisted: false,
          is_global: false,
        });

      } catch (err) {
        console.log("Error in signIn:", err.message);
      }

      return true;
    },
  },
});

export { handler as GET, handler as POST };