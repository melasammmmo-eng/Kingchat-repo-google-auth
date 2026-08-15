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
  callbacks: {
    async signIn({ user, account, profile, req }) {
      try {
        // Try to get IP from the request
        let ip = "unknown";
        
        if (req?.headers) {
          const forwarded = req.headers["x-forwarded-for"];
          ip = forwarded ? forwarded.split(",")[0].trim() : 
               req.headers["x-real-ip"] || "unknown";
        }

        const discordId = account.provider === "discord" ? String(profile.id) : null;
        const googleEmail = account.provider === "google" ? user.email : null;

        await supabase.from("users").insert({
          discord_id: discordId,
          google_email: googleEmail,
          ip_address: ip,
          is_blacklisted: false,
          is_global: false,
        });

        console.log("Saved:", { discordId, googleEmail, ip });
      } catch (err) {
        console.error("Save error:", err);
      }

      return true;
    },
  },
});

export { handler as GET, handler as POST };
