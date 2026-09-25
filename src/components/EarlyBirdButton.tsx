import { useEffect, useState } from "react";
import { X } from "lucide-react";

const STORAGE_KEY = "hertones_early_bird_v1";
const SUBMITTED_KEY = "hertones_popup_submitted_at";
const SUBMIT_SUPPRESS_MS = 864e5; // 24 hours after a completed signup
const DISMISS_DAYS = 30;

const suppressedUntil = (key: string) => {
  const raw = localStorage.getItem(key);
  if (!raw) return 0;
  const value = Number(raw);
  return Number.isFinite(value) ? value : Number.MAX_SAFE_INTEGER;
};

const shouldSkip = () => {
  try {
    const submittedAt = suppressedUntil(SUBMITTED_KEY);
    if (submittedAt && Date.now() - submittedAt < SUBMIT_SUPPRESS_MS) return true;
    return Date.now() < suppressedUntil(STORAGE_KEY);
  } catch {
    return false;
  }
};

const remember = () => {
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now() + DISMISS_DAYS * 864e5));
  } catch {
    /* ignore */
  }
};

const EarlyBirdButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onSubmitted = () => setVisible(false);
    window.addEventListener("hertones:signup-submitted", onSubmitted);
    if (shouldSkip()) {
      return () => window.removeEventListener("hertones:signup-submitted", onSubmitted);
    }
    const timer = setTimeout(() => {
      if (!shouldSkip()) setVisible(true);
    }, 3000);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("hertones:signup-submitted", onSubmitted);
    };
  }, []);

  const openModal = () => {
    if (
      typeof window !== "undefined" &&
      "showSignupPopup" in window &&
      typeof (window as unknown as Record<string, () => void>)["showSignupPopup"] === "function"
    ) {
      (window as unknown as Record<string, () => void>)["showSignupPopup"]();
    }
  };

  const dismiss = () => {
    remember();
    setVisible(false);
  };

  return (
    <div
      className={`
        fixed bottom-5 right-5 z-[90]
        flex flex-col items-end gap-1.5
        transition-all duration-300
        ${visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"}
      `}
    >
      <div
        role="group"
        aria-label="Skip The Wait signup"
        className="
          flex items-center overflow-hidden
          rounded-full bg-mocha text-ivory
          shadow-xl shadow-espresso/25
          ring-1 ring-inset ring-ivory/20
          hover:shadow-2xl hover:shadow-espresso/30
          focus-within:ring-2 focus-within:ring-mocha focus-within:ring-offset-2
        "
      >
        <button
          onClick={openModal}
          className="flex h-11 items-center pl-4 pr-1 py-2 font-body text-sm font-semibold tracking-wider bg-[length:300%_100%] bg-gradient-to-r from-ivory via-gold via-caramel via-gold to-ivory bg-clip-text text-transparent animate-shimmer transition-colors hover:bg-mocha/90 focus-visible:outline-none"
        >
          Skip The Wait
        </button>
        <button
          onClick={dismiss}
          aria-label="Dismiss Skip The Wait"
          className="flex h-11 w-8 items-center justify-end pr-2 transition-colors hover:bg-mocha/90 focus-visible:outline-none"
        >
          <X size={16} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};

export default EarlyBirdButton;

