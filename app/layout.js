"use client";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
