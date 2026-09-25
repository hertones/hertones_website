import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { subscribeEmail } from "@/lib/newsletter.functions";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { toast } from "sonner";

const EmailSignup = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { ref, isVisible } = useScrollReveal();
  const subscribe = useServerFn(subscribeEmail);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;
    setIsSubmitting(true);
    try {
      const result = await subscribe({ data: { email, source: "homepage_footer" } });
      if (result.ok) {
        toast.success("Welcome to hertones", { description: "You'll hear from us soon." });
        setEmail("");
      } else if ("duplicate" in result && result.duplicate) {
        toast.error("This email is already on our list.");
      } else {
        toast.error("Something went wrong", { description: "Please try again." });
      }
    } catch {
      toast.error("Something went wrong", { description: "Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={ref} className="py-24 px-6 bg-espresso text-primary-foreground">
      <div className="max-w-xl mx-auto text-center">
        <div className={`transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h2 className="font-display text-3xl md:text-4xl font-medium mb-4">
            Join the hertones List
          </h2>
          <p className="font-body text-sm text-primary-foreground/60 mb-8 leading-relaxed">
            Be the first to hear about new tones, new cuts, and quiet drops of considered everyday essentials.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="flex-1 h-11 px-4 bg-primary-foreground/10 border border-primary-foreground/20 rounded-sm font-body text-sm text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:border-accent transition-colors"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="h-11 px-6 bg-accent text-accent-foreground font-body text-sm tracking-wide rounded-sm hover:bg-accent/90 transition-colors disabled:opacity-60"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EmailSignup;
