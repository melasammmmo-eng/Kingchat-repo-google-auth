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
  pages: {
    signIn: "/",
    error: "/",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        const discordId = account.provider === "discord" ? String(profile.id) : null;
        const googleEmail = account.provider === "google" ? user.email : null;

        // First check if user already exists
        let existing = null;

        if (discordId) {
          const { data } = await supabase
            .from("users")
            .select("*")
            .eq("discord_id", discordId)
            .maybeSingle();
          existing = data;
        }

        if (!existing && googleEmail) {
          const { data } = await supabase
            .from("users")
            .select("*")
            .eq("google_email", googleEmail)
            .maybeSingle();
          existing = data;
        }

        // If user is blacklisted → block login
        if (existing && existing.is_blacklisted) {
          return false;
        }

        // If user doesn't exist yet → create them
        if (!existing) {
          await supabase.from("users").insert({
            discord_id: discordId,
            google_email: googleEmail,
            is_blacklisted: false,
            is_global: false,
          });
        }

      } catch (err) {
        console.error("SignIn error:", err);
        // Don't block the login even if saving fails
      }

      return true; // Always allow login unless blacklisted
    },
  },
});

export { handler as GET, handler as POST };
