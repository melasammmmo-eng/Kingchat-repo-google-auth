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
      backgroundColor: "black",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      margin: 0,
      color: "white",
      fontFamily: "sans-serif",
      textAlign: "center",
      padding: "20px"
    }}>
      {!session ? (
        <>
          <button
            onClick={() => signIn()}
            style={{
              backgroundColor: "white",
              color: "black",
              border: "none",
              borderRadius: "50px",
              padding: "18px 50px",
              fontSize: "20px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Log in
          </button>

          <p style={{ color: "#ff5555", marginTop: "40px", fontSize: "14px", maxWidth: "300px" }}>
            ⚠️ Warning: By logging in, your IP address will be recorded for security purposes.
          </p>
        </>
      ) : (
        <div>
          <h2>You are logged in as</h2>
          <p style={{ color: "#aaa", marginTop: "10px", fontSize: "18px" }}>
            {session.user?.name || session.user?.email || "Unknown"}
          </p>

          <p style={{ 
            color: "#f1c40f", 
            marginTop: "25px", 
            fontSize: "16px",
            maxWidth: "320px",
            lineHeight: "1.5"
          }}>
            Please wait up to 5 minutes for the system to process your login.
          </p>

          <button
            onClick={() => signOut()}
            style={{
              marginTop: "35px",
              backgroundColor: "#333",
              color: "white",
              border: "none",
              borderRadius: "50px",
              padding: "12px 30px",
              cursor: "pointer"
            }}
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
