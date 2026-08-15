import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export async function POST(request) {
  try {
    // Better way to get IP on Vercel
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : 
               request.headers.get("x-real-ip") || 
               "unknown";

    console.log("Recording IP:", ip);

    await supabase.from("users").insert({
      ip_address: ip,
      is_blacklisted: false,
      is_global: false,
    });

    return NextResponse.json({ success: true, ip });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
