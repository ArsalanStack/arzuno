import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

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
  title: {
    default: "Software Development & Digital Marketing Agency Pakistan | Arzuno",
    template: "%s | Arzuno Software Agency Pakistan",
  },
  description:
    "We build high performance websites, custom software, and data driven marketing campaigns for businesses across Pakistan.",
  keywords: [
    "software development agency Pakistan",
    "digital marketing agency Pakistan",
    "marketing agency Pakistan",
    "software agency Quetta",
    "marketing agency Quetta",
    "software house Quetta",
    "web design Quetta",
    "ecommerce website developers Pakistan",
    "custom software development Pakistan",
    "SEO agency Pakistan",
    "software agency Pakistan",
    "web development agency Pakistan",
    "IT company Quetta",
    "website design Pakistan",
  ],
  openGraph: {
    title: "Software Development & Digital Marketing Agency Pakistan | Arzuno",
    description: "Premium web design and growth marketing for businesses across Pakistan.",
    type: "website",
    url: "https://arzuno.com",
    siteName: "Arzuno",
  },
  twitter: {
    card: "summary_large_image",
    title: "Software Development & Digital Marketing Agency Pakistan | Arzuno",
    description: "Premium web design and growth marketing for businesses across Pakistan.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Arzuno",
  url: "https://arzuno.com",
  telephone: "+923333479586",
  email: "arzunoteam@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Sariab Road",
    addressLocality: "Quetta",
    addressCountry: "PK",
  },
  description:
    "Premium software development and digital marketing agency based in Quetta, Pakistan.",
  areaServed: "PK",
  priceRange: "$$",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${aeonikFallback.variable} ${plexMono.variable} antialiased selection:bg-lusion-green selection:text-black font-aeonik`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
