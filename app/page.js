"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function HomeContent() {
  const { data: session } = useSession();
  const [showInfo, setShowInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    fetch("/api/record-ip", { method: "POST" }).catch(() => {});
  }, []);

  const handleLogin = async (provider) => {
    setLoading(true);
    await signIn(provider);
  };

  return (
    <div style={{
      minHeight: "100vh",
      margin: 0,
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      background: "linear-gradient(to bottom, #0a2f1f 0%, #0d3b28 35%, #0a1a2f 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
      color: "white"
    }}>
      
      <img
        src="https://cdn.discordapp.com/attachments/1536454406889799776/1538552875578302564/IMG_0998.png?ex=6a831886&is=6a81c706&hm=1ee6f5cd55fa024e52d2256062c231feff3af8b846b88a3ad30761c576026d3c&"
        alt="KingChat"
        style={{
          position: "absolute",
          bottom: "-70px",
          right: "-50px",
          width: "360px",
          maxWidth: "55vw",
          opacity: 0.92,
          pointerEvents: "none",
          zIndex: 1,
          filter: "drop-shadow(0 15px 30px rgba(0,0,0,0.5))"
        }}
      />

      <button
        onClick={() => setShowInfo(!showInfo)}
        style={{
          position: "absolute",
          top: "28px",
          left: "28px",
          background: "rgba(0, 255, 133, 0.12)",
          color: "#00FF85",
          padding: "11px 22px",
          borderRadius: "40px",
          fontWeight: "700",
          fontSize: "15px",
          border: "2px solid #00FF85",
          zIndex: 10,
          cursor: "pointer"
        }}
      >
        All about KingFrog {showInfo ? "▲" : "▼"}
      </button>

      {showInfo && (
        <div style={{
          position: "absolute",
          top: "85px",
          left: "28px",
          background: "rgba(0, 0, 0, 0.88)",
          border: "1px solid #00FF85",
          borderRadius: "20px",
          padding: "18px 22px",
          width: "260px",
          zIndex: 20
        }}>
          <p style={{ margin: "0 0 12px 0", color: "#00FF85", fontWeight: "600" }}>Owner: KingFrog</p>
          <p style={{ margin: "0 0 12px 0", color: "#ddd", fontSize: "14px" }}>Current blacklisted people: View in bot</p>
          <a href="https://discord.gg/4bSFQDA3CZ" target="_blank" style={{ color: "#1E90FF", fontSize: "14px" }}>
            Join the Discord Server →
          </a>
        </div>
      )}

      <div style={{ zIndex: 5, textAlign: "center", padding: "20px" }}>
        {!session ? (
          <>
            <h1 style={{ color: "white", fontSize: "3.2rem", marginBottom: "8px", fontWeight: "800" }}>
              KingChat
            </h1>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "1.1rem", marginBottom: "30px" }}>
              Secure Access Portal
            </p>

            {error && (
              <div style={{
                backgroundColor: "#e74c3c",
                color: "white",
                padding: "14px 22px",
                borderRadius: "12px",
                marginBottom: "25px",
                fontSize: "15px",
                maxWidth: "340px",
                marginLeft: "auto",
                marginRight: "auto"
              }}>
                {error === "AccessDenied"
                  ? "You are blacklisted and cannot log in."
                  : "Something went wrong. Please try again."}
              </div>
            )}

            {loading ? (
              <div>
                <div style={{
                  width: "40px",
                  height: "40px",
                  border: "4px solid rgba(255,255,255,0.2)",
                  borderTop: "4px solid #00FF85",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                  margin: "0 auto"
                }} />
                <p style={{ marginTop: "15px", color: "#aaa" }}>Logging in...</p>
                <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
              </div>
            ) : (
              <>
                <button
                  onClick={() => handleLogin("google")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "12px",
                    backgroundColor: "#00FF85",
                    color: "#000",
                    border: "none",
                    borderRadius: "100px",
                    padding: "16px 42px",
                    fontSize: "17px",
                    fontWeight: "700",
                    cursor: "pointer",
                    marginBottom: "16px",
                    width: "280px"
                  }}
                >
                  <img src="https://www.google.com/favicon.ico" width="22" height="22" alt="Google" />
                  Continue with Google
                </button>

                <button
                  onClick={() => handleLogin("discord")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "12px",
                    backgroundColor: "#1E90FF",
                    color: "white",
                    border: "none",
                    borderRadius: "100px",
                    padding: "16px 42px",
                    fontSize: "17px",
                    fontWeight: "700",
                    cursor: "pointer",
                    width: "280px"
                  }}
                >
                  <img 
                    src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png" 
                    width="22" 
                    height="22" 
                    alt="Discord" 
                  />
                  Continue with Discord
                </button>
              </>
            )}
          </>
        ) : (
          <div style={{
            background: "rgba(0, 0, 0, 0.7)",
            padding: "40px 50px",
            borderRadius: "28px",
            border: "1px solid rgba(0, 255, 133, 0.25)"
          }}>
            <h2 style={{ color: "white", marginBottom: "8px" }}>You are logged in as</h2>
            <p style={{ color: "#00FF85", fontSize: "1.25rem", marginBottom: "16px", fontWeight: "600" }}>
              {session.user?.name || session.user?.email || "Unknown"}
            </p>
            <p style={{ color: "#bbb", fontSize: "14px", marginBottom: "28px" }}>
              Please wait up to 5 minutes for the system to process.
            </p>
            <button
              onClick={() => signOut()}
              style={{
                background: "transparent",
                color: "white",
                border: "2px solid #00FF85",
                borderRadius: "100px",
                padding: "11px 32px",
                fontSize: "15px",
                cursor: "pointer"
              }}
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div style={{ color: "white", textAlign: "center", marginTop: "50px" }}>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
