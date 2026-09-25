import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface ProductAccordionProps {
  description?: string;
}

const ProductAccordion = ({ description }: ProductAccordionProps) => {
  return (
    <Tabs defaultValue="details" className="w-full">
      <TabsList className="w-full bg-transparent border-b border-border rounded-none h-auto p-0 gap-0">
        {["details", "fabric", "shipping"].map((tab) => (
          <TabsTrigger
            key={tab}
            value={tab}
            className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:font-semibold bg-transparent font-body text-[10px] tracking-[0.18em] uppercase text-muted-foreground data-[state=active]:text-foreground py-3 px-2"
          >
            {tab === "details" ? "The Fit" : tab === "fabric" ? "The Fabric" : "Care & Shipping"}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="details" className="mt-4">
        <div className="font-body text-sm text-muted-foreground leading-relaxed">
          {description && <p className="mb-4">{description}</p>}
          <ul className="space-y-2">
            <li>• Flattering silhouette designed around the body</li>
            <li>• Smooth seams and thoughtfully placed support</li>
            <li>• Soft waistband that sits without digging</li>
            <li>• Tagless construction for minimal irritation</li>
            <li>• Designed for everyday wear and movement</li>
          </ul>
        </div>
      </TabsContent>

      <TabsContent value="fabric" className="mt-4">
        <div className="font-body text-sm text-muted-foreground leading-relaxed">
          <p className="mb-3">
            <strong className="text-foreground">Material approach:</strong> hertones is Cotton-focused — a more considered material approach designed for softness, breathability, and reduced reliance on unnecessary synthetic fabrics.
          </p>
          <ul className="space-y-1.5">
            <li>• Cotton-led construction next to skin</li>
            <li>• Designed for softness and breathability</li>
            <li>• A considered spectrum of body-tone shades</li>
            <li>• Material transparency without the fine print</li>
          </ul>
          {/* TODO: replace with confirmed composition once approved */}
        </div>
      </TabsContent>

      <TabsContent value="shipping" className="mt-4">
        <div className="font-body text-sm text-muted-foreground leading-relaxed">
          <ul className="space-y-2">
            <li>• Wash cool with similar tones, gentle cycle</li>
            <li>• Use a mild detergent; skip fabric softener</li>
            <li>• Hang or low-tumble dry to preserve the cotton</li>
            <li>• Free standard shipping on US orders over $75</li>
            <li>• Standard shipping: 3–7 business days</li>
            <li>• International shipping calculated at checkout</li>
          </ul>
          {/* TODO: confirm care specifics and return window before final launch */}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ProductAccordion;
