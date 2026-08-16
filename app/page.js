"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session } = useSession();
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    fetch("/api/record-ip", { method: "POST" }).catch(() => {});
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      margin: 0,
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      background: "linear-gradient(to bottom, #0a2f1f 0%, #0d3b28 30%, #0a1a2f 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
      color: "white"
    }}>

      {/* Character Image - smaller + lower */}
      <img
        src="https://i.imgur.com/your-frog-image.png"   // ← Put your Imgur link here
        alt="KingChat"
        style={{
          position: "absolute",
          bottom: "-60px",
          right: "-40px",
          width: "380px",
          maxWidth: "55vw",
          opacity: 0.9,
          pointerEvents: "none",
          zIndex: 1,
          filter: "drop-shadow(0 15px 30px rgba(0,0,0,0.5))"
        }}
      />

      {/* Top Button - All about KingFrog */}
      <button
        onClick={() => setShowInfo(!showInfo)}
        style={{
          position: "absolute",
          top: "28px",
          left: "28px",
          background: "rgba(0, 255, 133, 0.15)",
          color: "#00FF85",
          padding: "11px 22px",
          borderRadius: "40px",
          fontWeight: "700",
          fontSize: "15px",
          letterSpacing: "0.5px",
          border: "2px solid #00FF85",
          backdropFilter: "blur(8px)",
          zIndex: 10,
          cursor: "pointer",
          transition: "all 0.25s ease"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(0, 255, 133, 0.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(0, 255, 133, 0.15)";
        }}
      >
        All about KingFrog
      </button>

      {/* Info Popup */}
      {showInfo && (
        <div style={{
          position: "absolute",
          top: "85px",
          left: "28px",
          background: "rgba(0, 0, 0, 0.85)",
          border: "1px solid #00FF85",
          borderRadius: "20px",
          padding: "20px 24px",
          maxWidth: "280px",
          zIndex: 20,
          backdropFilter: "blur(10px)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.4)"
        }}>
          <h3 style={{ margin: "0 0 10px 0", color: "#00FF85" }}>About KingFrog</h3>
          <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.5", color: "#ddd" }}>
            This is the official verification system for KingChat.<br /><br />
            Created to keep the community safe and stop alts / banned users from coming back.
          </p>
        </div>
      )}

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
              fontSize: "3.3rem",
              marginBottom: "8px",
              fontWeight: "800",
              textShadow: "0 4px 25px rgba(0,0,0,0.4)"
            }}>
              KingChat
            </h1>

            <p style={{
              color: "rgba(255,255,255,0.85)",
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
                boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#00FF85";
                e.currentTarget.style.color = "#000";
                e.currentTarget.style.transform = "translateY(-5px) scale(1.03)";
                e.currentTarget.style.boxShadow = "0 15px 35px rgba(0, 255, 133, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "white";
                e.currentTarget.style.color = "#111";
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
              }}
            >
              Log in
            </button>
          </>
        ) : (
          <div style={{
            background: "rgba(0, 0, 0, 0.65)",
            padding: "45px 55px",
            borderRadius: "32px",
            backdropFilter: "blur(14px)",
            border: "1px solid rgba(0, 255, 133, 0.25)",
            boxShadow: "0 15px 40px rgba(0,0,0,0.4)"
          }}>
            <h2 style={{ color: "white", marginBottom: "6px", fontSize: "1.8rem" }}>
              You are logged in as
            </h2>
            <p style={{ color: "#00FF85", fontSize: "1.3rem", marginBottom: "18px", fontWeight: "600" }}>
              {session.user?.name || session.user?.email || "Unknown"}
            </p>
            <p style={{ color: "#ccc", fontSize: "15px", marginBottom: "32px" }}>
              Please wait up to 5 minutes for the system to process your login.
            </p>

            <button
              onClick={() => signOut()}
              style={{
                backgroundColor: "transparent",
                color: "white",
                border: "2px solid rgba(255,255,255,0.7)",
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
