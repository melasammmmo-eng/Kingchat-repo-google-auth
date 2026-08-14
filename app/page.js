"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

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
      fontFamily: "sans-serif"
    }}>
      {!session ? (
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
      ) : (
        <div style={{ textAlign: "center" }}>
          <h2>You are logged in as</h2>
          <p style={{ color: "#aaa", marginTop: "8px", fontSize: "18px" }}>
            {session.user?.email || "Unknown"}
          </p>
          <button
            onClick={() => signOut()}
            style={{
              marginTop: "30px",
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
