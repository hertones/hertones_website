import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-ivory">
      <Navigation />
      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="font-display text-3xl font-semibold text-espresso mb-8">Terms of Service</h1>
        <p className="font-body text-sm text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>

        <section className="space-y-4 mb-10">
          <h2 className="font-display text-xl font-medium text-espresso">Acceptance of Terms</h2>
          <p className="font-body text-sm text-foreground/80 leading-relaxed">By accessing or using hertones.com, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions, you may not access or use our services.</p>
        </section>

        <section className="space-y-4 mb-10">
          <h2 className="font-display text-xl font-medium text-espresso">Products & Pricing</h2>
          <p className="font-body text-sm text-foreground/80 leading-relaxed">All prices are listed in USD and are subject to change without notice. We make every effort to display accurate product descriptions and images, but we do not guarantee that colors, dimensions, or other details are entirely precise due to variations in screens and displays.</p>
        </section>

        <section className="space-y-4 mb-10">
          <h2 className="font-display text-xl font-medium text-espresso">Orders & Payments</h2>
          <p className="font-body text-sm text-foreground/80 leading-relaxed">By placing an order, you represent that the information you provide is accurate and that you are authorized to use the payment method. We reserve the right to cancel or refuse any order for any reason, including suspected fraud or unauthorized transactions.</p>
        </section>

        <section className="space-y-4 mb-10">
          <h2 className="font-display text-xl font-medium text-espresso">Shipping</h2>
          <p className="font-body text-sm text-foreground/80 leading-relaxed">Shipping times and costs vary depending on your location and the shipping method selected. hertones is not responsible for delays caused by carriers or customs processing. Please refer to our Shipping & Returns page for detailed information.</p>
        </section>

        <section className="space-y-4 mb-10">
          <h2 className="font-display text-xl font-medium text-espresso">Returns & Exchanges</h2>
          <p className="font-body text-sm text-foreground/80 leading-relaxed">We accept returns within 30 days of delivery for unworn, unwashed items in their original packaging. Due to the intimate nature of our products, items that have been worn or washed cannot be returned for hygiene reasons. Please see our Shipping & Returns page for full details.</p>
        </section>

        <section className="space-y-4 mb-10">
          <h2 className="font-display text-xl font-medium text-espresso">Intellectual Property</h2>
          <p className="font-body text-sm text-foreground/80 leading-relaxed">All content on this site — including text, graphics, logos, images, and software — is the property of hertones and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.</p>
        </section>

        <section className="space-y-4 mb-10">
          <h2 className="font-display text-xl font-medium text-espresso">Limitation of Liability</h2>
          <p className="font-body text-sm text-foreground/80 leading-relaxed">hertones shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our site or products. Our total liability shall not exceed the amount you paid for the product(s) giving rise to the claim.</p>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-xl font-medium text-espresso">Governing Law</h2>
          <p className="font-body text-sm text-foreground/80 leading-relaxed">These Terms of Service shall be governed by and construed in accordance with the laws of the United States. Any disputes arising under these terms shall be resolved in the courts of competent jurisdiction.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
