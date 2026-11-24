import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { MethodDemo } from "@/components/landing/MethodDemo";
import { AudienceSelector } from "@/components/landing/AudienceSelector";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <Hero />
        <MethodDemo />
        <AudienceSelector />
        <HowItWorks />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
