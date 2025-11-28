import Navbar from "@/components/Navbar";
import Hero3D from "@/components/Hero3D";
import TechStack from "@/components/TechStack";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import Work from "@/components/Work";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero3D />
      <TechStack />
      <Services />
      <Process />
      <Pricing />
      <Work />
      <Testimonials />
      <About />
      <FAQ />
      <Contact />
    </main>
  );
}
