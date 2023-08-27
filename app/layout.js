import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PathFinding Visualiser",
  description:
    "Visualizer for various path-finding algorithms to help see how these algorithms are actually working.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="winter">
      <body className={`${inter.className}`}>{children}</body>
    </html>
  );
}
