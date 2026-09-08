import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/lib/redux/Provider";
import AuthListener from "@/lib/redux/AuthListener";
import AuthModal from "@/components/auth/AuthModal";

export const metadata: Metadata = {
  title: "Summarist",
  description: "Get unlimited access to many amazing books to read",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <ReduxProvider>
          <AuthListener />
          {children}
          <AuthModal />
        </ReduxProvider>
      </body>
    </html>
  );
}
