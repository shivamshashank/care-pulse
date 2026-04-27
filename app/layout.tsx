import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import SOSButton from "@/app/components/SOSButton";
import { Suspense } from "react";
import Chatbot from "@/app/components/Chatbot";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 flex flex-col min-h-screen">

        <Navbar />

        <main className="flex-1 max-w-7xl mx-auto w-full px-8 py-10">
          {children}
        </main>

        <Footer />

        <Suspense fallback={null}>
          <Chatbot />
        </Suspense>

        <SOSButton />

      </body>
    </html>
  );
}