import { Link } from "@tanstack/react-router";
import LazyVideo from "@/components/LazyVideo";
const bikiniEspressoModel = { url: "/images/models/bikini-espresso-model.jpg" };
const frenchCutMochaModel = { url: "/images/models/french-cut-mocha-model.webp" };
const boyShortCaramelModel = { url: "/images/models/boy-short-caramel-asian-rear-straight-ahead-v3.webp" };
const bikiniEspressoTurn = { url: "/videos/bikini-espresso-turn-v4-muted.mp4" };
import { mapToneHandle } from "@/lib/productCatalog";

interface ModelLook {
  shape: string;
  cutKey: string;
  tone: string;
  toneKey: string;
  image: string;
  isVideo?: boolean;
}

const MODEL_LOOKS: ModelLook[] = [
  { shape: "Bikini", cutKey: "brazilian-bikini", tone: "Espresso", toneKey: "espresso", image: bikiniEspressoTurn.url, isVideo: true },
  { shape: "French Cut", cutKey: "high-rise-french-cut", tone: "Mocha", toneKey: "mocha", image: frenchCutMochaModel.url },
  { shape: "Boy Short", cutKey: "boy-short", tone: "Caramel", toneKey: "caramel", image: boyShortCaramelModel.url },
];

const ProductShowcase = () => {
  return (
    <section className="py-10 bg-ivory">
      <div className="max-w-6xl mx-auto px-4">
        <div className="animate-fade-in">
          <p className="text-xs tracking-[0.25em] uppercase text-accent font-body mb-3 text-center">
            The Foundation Collection
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-medium text-espresso text-center mb-3">
            Three Essential Cuts. Six Considered Tones.
          </h2>
          <p className="font-body text-sm text-muted-foreground text-center max-w-xl mx-auto mb-6">
            From barely there to softly sculpted, discover everyday silhouettes made with Cotton and designed in shades inspired by real skin tones.
          </p>

          {/* Model imagery: one look per cut — mobile: horizontal slider, desktop: grid */}
          <div className="mt-10 -mx-4 px-4 flex gap-3 overflow-x-auto scrollbar-hide md:mx-0 md:px-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible">
            {MODEL_LOOKS.map((look) => (
              <Link
                key={look.shape}
                to="/product/$handle"
                params={{ handle: mapToneHandle(look.toneKey, look.cutKey) }}
                className="group block w-[240px] shrink-0 md:w-auto"
              >
                <div className="aspect-[3/4] bg-sand/40 overflow-hidden relative">
                  {look.isVideo ? (
                    <LazyVideo
                      src={look.image}
                      poster="/images/video-posters/bikini-espresso-turn.jpg"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      ariaLabel={`hertones ${look.shape} in ${look.tone} on model`}
                    />
                  ) : (
                    <img
                      src={look.image}
                      alt={`hertones ${look.shape} in ${look.tone} on model`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      decoding="async"
                      width={928}
                      height={1152}
                    />
                  )}
                </div>
                <div className="pt-2.5 pb-1">
                  <p className="font-body text-[10px] tracking-[0.2em] uppercase text-accent mb-0.5">
                    Cotton
                  </p>
                  <p className="font-display text-sm font-medium text-espresso">
                    {look.shape} | {look.tone}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
