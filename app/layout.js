import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Using Inter as a fallback for Aeonik
const aeonikFallback = Inter({
  variable: "--font-aeonik",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata = {
  title: "Arzuno - Web Development & Marketing Agency",
  description: "Arzuno is a premium agency for web development, marketing and SEO.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${aeonikFallback.variable} ${plexMono.variable} antialiased selection:bg-lusion-green selection:text-black font-aeonik`}>
        <Header />
        
        {children}
        
        <Footer />
      </body>
    </html>
  );
}
