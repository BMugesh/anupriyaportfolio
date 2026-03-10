import { useState, lazy, Suspense } from "react";
import CustomCursor from "@/components/CustomCursor";
import BootSequence from "@/components/BootSequence";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import { useLenis } from "@/hooks/useLenis";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const [booted, setBooted] = useState(false);
  const isMobile = useIsMobile();

  useLenis();

  return (
    <div className="bg-background text-foreground min-h-screen cursor-none">
      {!isMobile && <CustomCursor />}
      {!booted && <BootSequence onComplete={() => setBooted(true)} />}
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </div>
  );
};

export default Index;
