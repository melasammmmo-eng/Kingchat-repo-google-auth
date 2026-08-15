import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export async function POST(req) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || 
               req.headers.get("x-real-ip") || 
               "unknown";

    // Just record the IP for now (we will link it to the user after login)
    console.log("IP recorded:", ip);

    return NextResponse.json({ success: true, ip });
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
