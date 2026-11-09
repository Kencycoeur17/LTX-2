import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Braintechken AI Video Studio", description: "LTX-2.5 video creation studio — UI preview" };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="fr"><body>{children}</body></html>; }
