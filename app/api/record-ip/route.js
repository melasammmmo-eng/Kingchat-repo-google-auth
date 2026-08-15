import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export async function POST(request) {
  try {
    // Try multiple ways to get the real IP
    const headers = request.headers;
    
    let ip = 
      headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      headers.get("x-real-ip") ||
      headers.get("cf-connecting-ip") ||          // Cloudflare
      headers.get("true-client-ip") ||            // Some proxies
      headers.get("x-client-ip") ||
      headers.get("x-cluster-client-ip") ||
      "unknown";

    console.log("Detected IP:", ip);
    console.log("All headers:", Object.fromEntries(headers.entries()));

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
