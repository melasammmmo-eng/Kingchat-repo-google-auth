import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY  // Using service key now
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
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        const discordId = account.provider === "discord" ? String(profile.id) : null;
        const googleEmail = account.provider === "google" ? user.email : null;

        const { data, error } = await supabase.from("users").insert({
          discord_id: discordId,
          google_email: googleEmail,
          is_blacklisted: false,
          is_global: false,
        }).select();

        if (error) {
          console.error("Supabase error:", error.message);
        } else {
          console.log("Successfully saved user:", data);
        }
      } catch (err) {
        console.error("Callback error:", err);
      }

      return true;
    },
  },
});

export { handler as GET, handler as POST };
