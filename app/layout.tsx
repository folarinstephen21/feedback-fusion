import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { syncCurrentUser } from "@/lib/sync-user";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Feedback Fusion",
  description: "A platform for users to suggest and vote on features",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await syncCurrentUser();
  return (
    <ClerkProvider>
      <html lang="en" className={cn("font-sans", inter.variable)} suppressHydrationWarning>
        <body className={` min-h-screen flex flex-col`}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange >
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-8">
              {children}
            </main>
            <Footer />
            {/* The richColors attributes below beautifies the toater colors for success and failed responses */}
            <Toaster richColors />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
