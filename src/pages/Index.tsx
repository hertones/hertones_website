import AnnouncementBar from "@/components/AnnouncementBar";
import HeroSection from "@/components/HeroSection";
import ProductShowcase from "@/components/ProductShowcase";
import RecoveryPhases from "@/components/RecoveryPhases";
import AllTonesPromo from "@/components/AllTonesPromo";
import PackOptions from "@/components/PackOptions";
import WhyCopperCondensed from "@/components/WhyCopperCondensed";
import ShopByTone from "@/components/ShopByTone";
import BestSellers from "@/components/BestSellers";
import MissionSection from "@/components/MissionSection";
import ReviewsSection from "@/components/ReviewsSection";
import FAQSection from "@/components/FAQSection";
import EmailSignup from "@/components/EmailSignup";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <AnnouncementBar />
    <HeroSection />
    <ProductShowcase />
    <div className="space-y-0">
      <RecoveryPhases />
      <AllTonesPromo />
      <PackOptions />
      <WhyCopperCondensed />
      <ShopByTone />
      <BestSellers />
      <MissionSection />
      <ReviewsSection />
      <FAQSection />
      <EmailSignup />
      <Footer />
    </div>
  </div>
);

export default Index;
