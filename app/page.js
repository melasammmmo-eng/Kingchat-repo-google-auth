"use client";
import { signIn, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div style={{
      backgroundColor: "black",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: 0
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
        <h1 style={{ color: "white" }}>
          Logged in as {session.user?.name}
        </h1>
      )}
    </div>
  );
}
