import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

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

      </body>
    </html>
  );
}