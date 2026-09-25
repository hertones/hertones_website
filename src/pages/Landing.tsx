import { useEffect } from "react";
import StickyNav from "@/components/landing/StickyNav";
import HeroLanding from "@/components/landing/HeroLanding";
import SocialProofBar from "@/components/landing/SocialProofBar";
import ProblemSection from "@/components/landing/ProblemSection";
import SolutionSection from "@/components/landing/SolutionSection";
import AuthoritySection from "@/components/landing/AuthoritySection";
import CredibilitySection from "@/components/landing/CredibilitySection";
import ComparisonSection from "@/components/landing/ComparisonSection";
import HowItWorks from "@/components/landing/HowItWorks";
import TestimonialsLanding from "@/components/landing/TestimonialsLanding";
import OfferSection from "@/components/landing/OfferSection";
import FAQLanding from "@/components/landing/FAQLanding";
import FinalCTA from "@/components/landing/FinalCTA";
import FooterLanding from "@/components/landing/FooterLanding";

const Landing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <StickyNav />
      <HeroLanding />
      <SocialProofBar />
      <ProblemSection />
      <SolutionSection />
      <AuthoritySection />
      <CredibilitySection />
      <ComparisonSection />
      <HowItWorks />
      <TestimonialsLanding />
      <OfferSection />
      <FAQLanding />
      <FinalCTA />
      <FooterLanding />
    </div>
  );
};

export default Landing;
