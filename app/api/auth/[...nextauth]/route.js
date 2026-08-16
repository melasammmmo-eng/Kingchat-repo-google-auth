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
      // We wrap everything in try/catch so NOTHING can make the login fail
      try {
        const discordId = account?.provider === "discord" ? String(profile?.id) : null;
        const googleEmail = account?.provider === "google" ? user?.email : null;

        if (discordId || googleEmail) {
          // Try to save, but if it fails we don't care
          await supabase.from("users").upsert({
            discord_id: discordId,
            google_email: googleEmail,
            is_blacklisted: false,
            is_global: false,
          }, {
            onConflict: discordId ? "discord_id" : "google_email"
          }).then(() => {}).catch(() => {});
        }
      } catch (e) {
        // Completely ignore any error
      }

      // Always return true so login succeeds
      return true;
    },
  },
});

export { handler as GET, handler as POST };
