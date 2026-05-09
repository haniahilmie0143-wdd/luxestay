import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/lib/query-provider";
import { Toaster } from "sonner";
import { Navbar } from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "LuxeStay — Premium Property Rentals",
  description:
    "Discover extraordinary properties around the world. Book your perfect getaway with LuxeStay.",
  keywords: ["luxury rentals", "property rental", "vacation homes", "travel"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <Navbar />
          <main>{children}</main>
          <Toaster
            theme="dark"
            toastOptions={{
              style: {
                background: "rgba(15,15,20,0.95)",
                border: "1px solid rgba(201,168,76,0.2)",
                color: "#f5f0e8",
              },
            }}
          />
        </QueryProvider>
      </body>
    </html>
  );
}
