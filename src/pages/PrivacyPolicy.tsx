import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-ivory">
      <Navigation />
      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="font-display text-3xl font-semibold text-espresso mb-8">Privacy Policy</h1>
        <p className="font-body text-sm text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>

        <section className="space-y-4 mb-10">
          <h2 className="font-display text-xl font-medium text-espresso">Information We Collect</h2>
          <p className="font-body text-sm text-foreground/80 leading-relaxed">When you visit hertones.com or make a purchase, we collect personal information you provide such as your name, email address, shipping address, and payment details. We also automatically collect certain information about your device, including your browser type, IP address, and browsing behavior on our site.</p>
        </section>

        <section className="space-y-4 mb-10">
          <h2 className="font-display text-xl font-medium text-espresso">How We Use Your Information</h2>
          <p className="font-body text-sm text-foreground/80 leading-relaxed">We use the information we collect to fulfill orders, process payments, communicate with you about your purchases, and improve our products and services. With your consent, we may also send you promotional emails about new products, special offers, or other information we think you may find interesting.</p>
        </section>

        <section className="space-y-4 mb-10">
          <h2 className="font-display text-xl font-medium text-espresso">Cookies</h2>
          <p className="font-body text-sm text-foreground/80 leading-relaxed">We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand where our visitors come from. You can choose to disable cookies through your browser settings, though this may affect certain features of the site.</p>
        </section>

        <section className="space-y-4 mb-10">
          <h2 className="font-display text-xl font-medium text-espresso">Third-Party Services</h2>
          <p className="font-body text-sm text-foreground/80 leading-relaxed">We may share your information with trusted third-party service providers who assist us in operating our website, processing payments, and delivering orders. These parties are obligated to keep your information confidential and are prohibited from using it for any other purpose.</p>
        </section>

        <section className="space-y-4 mb-10">
          <h2 className="font-display text-xl font-medium text-espresso">Data Retention</h2>
          <p className="font-body text-sm text-foreground/80 leading-relaxed">We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law. You may request deletion of your personal data at any time by contacting us.</p>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-xl font-medium text-espresso">Contact Us</h2>
          <p className="font-body text-sm text-foreground/80 leading-relaxed">If you have any questions about this Privacy Policy or your personal data, please contact us at <span className="font-medium">hello@hertones.com</span>.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
