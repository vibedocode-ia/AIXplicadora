import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AIXplicadora — Tutoria Socrática Ativa Universal",
  description: "Aprenda qualquer matéria do Ensino Fundamental ao Doutorado explicando o seu próprio raciocínio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased selection:bg-brand-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
