import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { X, Loader2, Check } from "lucide-react";
import { toast } from "sonner";
import { subscribeEmail, subscribePhone } from "@/lib/newsletter.functions";
const popupImage = { url: "/images/popup/signup-popup.webp" };
const STORAGE_KEY = "hertones_signup_popup_v2";
const SUBMITTED_KEY = "hertones_popup_submitted_at";
const SUBMIT_SUPPRESS_MS = 864e5; // 24 hours after a completed signup
const DISMISS_SUPPRESS_MS = 30 * 60e3; // 30 minutes after closing
const DELAY_MS = 5000;

const PREFERENCES = [
  { value: "bikini", label: "Bikini" },
  { value: "boy-short", label: "Boy Short" },
  { value: "french-cut", label: "French Cut" },
  { value: "slip-dress", label: "Slip Dress" },
  { value: "everything", label: "Show me everything" },
];

const shouldSkip = () => {
  try {
    const submittedAt = Number(localStorage.getItem(SUBMITTED_KEY));
    if (Number.isFinite(submittedAt) && submittedAt > 0 && Date.now() - submittedAt < SUBMIT_SUPPRESS_MS) return true;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const until = Number(raw);
    if (!Number.isFinite(until)) return true;
    return Date.now() < until;
  } catch {
    return false;
  }
};

const remember = (suppressMs: number) => {
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now() + suppressMs));
  } catch {
    /* ignore */
  }
};

const rememberSubmission = () => {
  try {
    localStorage.setItem(SUBMITTED_KEY, String(Date.now()));
  } catch {
    /* ignore */
  }
  try {
    window.dispatchEvent(new CustomEvent("hertones:signup-submitted"));
  } catch {
    /* ignore */
  }
};

const EmailSignupModal = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [preference, setPreference] = useState("everything");
  const [submitting, setSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");
  const submitEmail = useServerFn(subscribeEmail);
  const submitPhone = useServerFn(subscribePhone);


  useEffect(() => {
    // Manual trigger for testing: window.showSignupPopup()
    (window as unknown as Record<string, unknown>)["showSignupPopup"] = () => {
      setStep(0);
      setOpen(true);
    };
    if (shouldSkip()) return;
    const t = setTimeout(() => setOpen(true), DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const close = () => {
    remember(DISMISS_SUPPRESS_MS);
    setOpen(false);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    setEmailError("");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed) || trimmed.length > 255) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await submitEmail({
        data: { email: trimmed.toLowerCase(), preference, firstName: firstName.trim() },
      });
      if (!res.ok) {
        setSubmitting(false);
        if ("duplicate" in res && res.duplicate) {
          setEmailError("This email is already on our list.");
        } else {
          setEmailError("Something went wrong. Please try again.");
        }
        return;
      }
    } catch {
      setSubmitting(false);
      setEmailError("Something went wrong. Please try again.");
      return;
    }
    setSubmitting(false);
    setSubmittedEmail(trimmed.toLowerCase());
    remember(SUBMIT_SUPPRESS_MS);
    rememberSubmission();
    setStep(1);
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 15) {
      toast.error("Please enter a valid mobile number.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await submitPhone({ data: { email: submittedEmail, phone: digits } });
      if (!res.ok) throw new Error("failed");
    } catch {
      setSubmitting(false);
      toast.error("Something went wrong. Please try again.");
      return;
    }
    setSubmitting(false);
    setStep(2);

  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-4">
      <button
        aria-label="Close"
        onClick={close}
        className="absolute inset-0 bg-espresso/40 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="signup-modal-title"
        className="relative flex max-h-[92vh] max-h-[92dvh] w-full max-w-3xl flex-col overflow-hidden rounded-lg bg-background shadow-2xl animate-in fade-in zoom-in-95 duration-300 md:rounded-sm"
      >
        <button
          onClick={close}
          aria-label="Close signup"
          className="absolute right-3 top-3 z-10 rounded-full p-1.5 text-espresso/60 hover:text-espresso hover:bg-espresso/5 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="grid h-[85vh] h-[85dvh] max-h-full grid-cols-[45%_55%] md:h-[600px] md:grid-cols-2">
          <div className="h-full overflow-hidden bg-[#afa8a6]">
            <img
              src={popupImage.url}
              alt="hertones essentials in a deep espresso tone"
              className="h-full w-full object-cover object-top"
              decoding="async"
              width={642}
              height={1492}
            />
          </div>

          {/* Sliding steps track */}
          <div className="h-full overflow-hidden bg-background">
            <div
              className="flex h-full w-[300%] transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${step * (100 / 3)}%)` }}
            >
              {/* Step 1 — Email */}
              <div className="h-full w-1/3 overflow-y-auto px-4 pb-4 pt-3 md:px-9 md:pb-8 md:pt-5">
                <span className="font-display text-base md:text-xl font-semibold tracking-tight text-espresso">
                  hertones
                </span>

                <h2
                  id="signup-modal-title"
                  className="mt-1.5 font-display text-xl md:text-[2rem] leading-tight font-medium text-espresso"
                >
                  Be First To Know
                </h2>
                <p className="mt-1 font-body text-xs md:text-sm leading-relaxed text-muted-foreground">
                  Sign up for launch updates, early access, and exclusive offers.
                </p>

                <form onSubmit={handleEmailSubmit} className="mt-3 md:mt-4">
                  <fieldset>
                    <legend className="font-body text-[10px] md:text-xs uppercase tracking-[0.14em] text-espresso/60">
                      What are you shopping for?
                    </legend>
                    <div className="mt-2 space-y-1.5 md:space-y-2">
                      {PREFERENCES.map((p) => (
                        <label
                          key={p.value}
                          className="flex cursor-pointer items-center gap-2 md:gap-2.5 font-body text-xs md:text-sm text-espresso"
                        >
                          <input
                            type="radio"
                            name="preference"
                            value={p.value}
                            checked={preference === p.value}
                            onChange={() => setPreference(p.value)}
                            className="h-3.5 w-3.5 shrink-0 accent-[var(--espresso)] md:h-4 md:w-4"
                          />
                          {p.label}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    maxLength={64}
                    className="mt-3 h-9 md:h-11 w-full rounded-sm border border-border bg-background px-3 md:px-4 font-body text-xs md:text-sm text-espresso placeholder:text-espresso/40 focus:border-espresso focus:outline-none transition-colors"
                  />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError("");
                    }}
                    placeholder="Email Address"
                    maxLength={255}
                    required
                    aria-invalid={emailError ? true : undefined}
                    className={`mt-2 h-9 md:h-11 w-full rounded-sm border bg-background px-3 md:px-4 font-body text-xs md:text-sm text-espresso placeholder:text-espresso/40 focus:outline-none transition-colors ${
                      emailError ? "border-destructive focus:border-destructive" : "border-border focus:border-espresso"
                    }`}
                  />

                  {emailError && (
                    <p role="alert" className="mt-1.5 font-body text-[11px] md:text-xs text-destructive">
                      {emailError}
                    </p>
                  )}


                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-2 flex h-9 md:h-11 w-full items-center justify-center gap-2 rounded-sm bg-espresso font-body text-xs md:text-sm tracking-wide text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
                  >
                    {submitting && <Loader2 size={15} className="animate-spin" />}
                    Get On The List
                  </button>

                  <button
                    type="button"
                    onClick={close}
                    className="mt-1.5 h-8 w-full font-body text-[11px] md:text-xs tracking-wide text-espresso/50 underline underline-offset-4 hover:text-espresso transition-colors"
                  >
                    No Thanks
                  </button>

                  <p className="mt-2 font-body text-[10px] md:text-[11px] leading-relaxed text-muted-foreground">
                    By signing up you agree to our{" "}
                    <Link to="/terms-of-service" onClick={close} className="underline hover:text-espresso">
                      Terms
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy-policy" onClick={close} className="underline hover:text-espresso">
                      Privacy Policy
                    </Link>
                    . You can unsubscribe at any time.
                  </p>
                </form>
              </div>

              {/* Step 2 — Phone */}
              <div className="h-full w-1/3 overflow-y-auto px-4 pb-4 pt-3 md:px-9 md:pb-8 md:pt-5">
                <span className="inline-block rounded-full border border-espresso/20 px-2.5 py-1 font-body text-[9px] md:text-[10px] uppercase tracking-[0.14em] text-espresso/70">
                  Sign Up via Text for Offers
                </span>

                <div className="mt-2.5 md:mt-3">
                  <span className="font-display text-base md:text-xl font-semibold tracking-tight text-espresso">
                    hertones
                  </span>
                </div>

                <h2 className="mt-1.5 font-display text-xl md:text-[2rem] leading-tight font-medium text-espresso">
                  Get Texts. Get Offers.
                </h2>
                <p className="mt-1 font-body text-xs md:text-sm leading-relaxed text-muted-foreground">
                  Be the first to know about new drops.
                </p>

                <p className="mt-2 font-body text-[10px] md:text-[11px] leading-relaxed text-muted-foreground">
                  By providing your number you agree to receive recurring automated marketing texts from hertones.
                  Message &amp; data rates may apply. Reply STOP to opt out at any time. See our{" "}
                  <Link to="/terms-of-service" onClick={close} className="underline hover:text-espresso">
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy-policy" onClick={close} className="underline hover:text-espresso">
                    Privacy Policy
                  </Link>
                  .
                </p>

                <form onSubmit={handlePhoneSubmit} className="mt-3 md:mt-4">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Mobile Number"
                    maxLength={20}
                    className="h-9 md:h-11 w-full rounded-sm border border-border bg-background px-3 md:px-4 font-body text-xs md:text-sm text-espresso placeholder:text-espresso/40 focus:border-espresso focus:outline-none transition-colors"
                  />

                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-2 flex w-full flex-col items-center justify-center gap-0.5 rounded-sm bg-espresso px-3 py-2 md:py-2.5 font-body text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
                  >
                    <span className="flex items-center gap-2 text-xs md:text-sm font-semibold tracking-wide">
                      {submitting && <Loader2 size={15} className="animate-spin" />}
                      Notify Me
                    </span>
                    <span className="text-[9px] md:text-[10px] font-normal opacity-80">
                      when you sign up for email and texts
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="mt-1.5 h-8 w-full font-body text-[11px] md:text-xs tracking-wide text-espresso/50 underline underline-offset-4 hover:text-espresso transition-colors"
                  >
                    Skip
                  </button>
                </form>
              </div>

              {/* Step 3 — Confirmation */}
              <div className="flex h-full w-1/3 flex-col items-center justify-center overflow-y-auto px-4 pb-4 pt-3 text-center md:px-9 md:pb-8 md:pt-5">
                <span className="inline-block rounded-full border border-espresso/20 px-2.5 py-1 font-body text-[9px] md:text-[10px] uppercase tracking-[0.14em] text-espresso/70">
                  Sign Up via Text for Offers
                </span>

                <div className="mt-4 flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-espresso/10">
                  <Check size={24} className="text-espresso" />
                </div>

                <h2 className="mt-3 md:mt-4 font-display text-xl md:text-3xl leading-tight font-medium text-espresso">
                  You're On The List
                </h2>
                <p className="mt-2 font-body text-xs md:text-sm leading-relaxed text-muted-foreground">
                  Thank you for signing up — your info was submitted successfully. Launch updates and early access
                  are coming your way.
                </p>

                <button
                  type="button"
                  onClick={close}
                  className="mt-4 md:mt-6 flex h-9 md:h-11 w-full items-center justify-center rounded-sm bg-espresso font-body text-xs md:text-sm tracking-wide text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailSignupModal;
