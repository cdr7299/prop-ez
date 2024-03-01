import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { Toaster } from "~/components/ui/sonner";

import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "../lib/_providers/ThemeProvider";
import Navbar from "~/components/navbar";
import { getServerAuthSession } from "~/server/auth";
import Footer from "~/components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Trakr",
  description: "Track real estate easy",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${inter.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar session={session} />
          <TRPCReactProvider>
            {children}
            <Toaster duration={3000} />
          </TRPCReactProvider>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
