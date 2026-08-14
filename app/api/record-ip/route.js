import { NextResponse } from "next/server";

export async function POST(req) {
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
  
  // For now just log it (later we will save to database)
  console.log("IP recorded:", ip);

  return NextResponse.json({ success: true });
}
