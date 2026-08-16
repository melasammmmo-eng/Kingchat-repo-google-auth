"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Home() {
  const { data: session } = useSession();

  useEffect(() => {
    fetch("/api/record-ip", { method: "POST" }).catch(() => {});
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      margin: 0,
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      background: "linear-gradient(to bottom, #00FF85 0%, #00FF85 40%, #1E90FF 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden"
    }}>

      {/* Character Image - using direct link */}
      <img
        src="https://cdn.discordapp.com/attachments/1536454406889799776/1538552875578302564/IMG_0998.png?ex=6a831886&is=6a81c706&hm=1ee6f5cd55fa024e52d2256062c231feff3af8b846b88a3ad30761c576026d3c&"   // ← Replace this later
        alt="KingChat"
        style={{
          position: "absolute",
          bottom: "-20px",
          right: "-30px",
          width: "480px",
          maxWidth: "65vw",
          opacity: 0.95,
          pointerEvents: "none",
          zIndex: 1,
          filter: "drop-shadow(0 10px 25px rgba(0,0,0,0.3))"
        }}
      />

      {/* Soft stamp logo */}
      <div style={{
        position: "absolute",
        top: "28px",
        left: "28px",
        background: "rgba(0, 0, 0, 0.55)",
        color: "#00FF85",
        padding: "10px 22px",
        borderRadius: "40px",
        fontWeight: "700",
        fontSize: "17px",
        letterSpacing: "1.5px",
        border: "2px solid #00FF85",
        backdropFilter: "blur(6px)",
        zIndex: 10
      }}>
        KINGCHAT
      </div>

      {/* Main Content */}
      <div style={{
        zIndex: 5,
        textAlign: "center",
        padding: "20px"
      }}>
        {!session ? (
          <>
            <h1 style={{
              color: "white",
              fontSize: "3.4rem",
              marginBottom: "8px",
              fontWeight: "800",
              textShadow: "0 4px 20px rgba(0,0,0,0.25)"
            }}>
              KingChat
            </h1>

            <p style={{
              color: "rgba(255,255,255,0.92)",
              fontSize: "1.15rem",
              marginBottom: "45px",
              fontWeight: "500"
            }}>
              Secure Access Portal
            </p>

            <button
              onClick={() => signIn()}
              style={{
                backgroundColor: "white",
                color: "#111",
                border: "none",
                borderRadius: "100px",
                padding: "19px 60px",
                fontSize: "20px",
                fontWeight: "700",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 10px 30px rgba(0,0,0,0.22)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#00FF85";
                e.currentTarget.style.color = "#000";
                e.currentTarget.style.transform = "translateY(-5px) scale(1.03)";
                e.currentTarget.style.boxShadow = "0 15px 35px rgba(0, 255, 133, 0.55)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "white";
                e.currentTarget.style.color = "#111";
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.22)";
              }}
            >
              Log in
            </button>
          </>
        ) : (
          <div style={{
            background: "rgba(0, 0, 0, 0.55)",
            padding: "45px 55px",
            borderRadius: "32px",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.18)",
            boxShadow: "0 15px 40px rgba(0,0,0,0.25)"
          }}>
            <h2 style={{ color: "white", marginBottom: "6px", fontSize: "1.8rem" }}>
              You are logged in as
            </h2>
            <p style={{ color: "#00FF85", fontSize: "1.3rem", marginBottom: "18px", fontWeight: "600" }}>
              {session.user?.name || session.user?.email || "Unknown"}
            </p>
            <p style={{ color: "#e0e0e0", fontSize: "15px", marginBottom: "32px" }}>
              Please wait up to 5 minutes for the system to process your login.
            </p>

            <button
              onClick={() => signOut()}
              style={{
                backgroundColor: "transparent",
                color: "white",
                border: "2px solid rgba(255,255,255,0.8)",
                borderRadius: "100px",
                padding: "12px 36px",
                fontSize: "16px",
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
