import { useState } from "react";
import CustomCursor from "@/components/CustomCursor";
import SchemaDiveTransition from "@/components/SchemaDiveTransition";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import { useLenis } from "@/hooks/useLenis";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();
  useLenis();

  return (
    <div className="bg-[#060610] text-foreground min-h-screen cursor-none">
      {!isMobile && <CustomCursor />}

      {/* Cinematic Schematic Dive Entry Sequence */}
      <SchemaDiveTransition>
        {/* Hero Section with Glassmorphic HUD */}
        <HeroSection />

        {/* Portfolio Content — reveal on scroll */}
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </SchemaDiveTransition>
    </div>
  );
};

export default Index;
