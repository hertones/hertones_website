import { useState } from "react";
import { Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SIZE_CHART, formatRange, type SizeUnit } from "@/lib/sizeChart";

const SizeChartDialog = () => {
  const [unit, setUnit] = useState<SizeUnit>("in");

  return (
    <Dialog>
      <DialogTrigger className="inline-flex items-center gap-1.5 font-body text-xs text-foreground underline underline-offset-4 hover:text-espresso">
        <Ruler className="h-3.5 w-3.5" />
        Size chart
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-[calc(100vw-2rem)] max-h-[90dvh] overflow-y-auto rounded-sm p-6 md:p-10">
        <div className="grid gap-8 md:grid-cols-[2fr_3fr]">
          <img
            src="/images/models/bikini-espresso-model.webp"
            alt="Model wearing the Hertones bikini"
            className="hidden md:block w-full h-full max-h-[520px] object-cover bg-oat"
          />
          <div className="flex flex-col">
            <DialogTitle className="font-body text-lg md:text-xl font-normal text-foreground mb-4">
              Compare your measurements with this chart.
            </DialogTitle>
            <table className="w-full text-center font-body text-sm">
              <thead>
                <tr className="border-b border-border">
                  {["Size", "Waist", "Hip"].map((h) => (
                    <th key={h} className="py-3 font-normal text-foreground">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SIZE_CHART.map((row) => (
                  <tr key={row.size} className="border-b border-border/60 last:border-0">
                    <td className="py-4 text-foreground">{row.size}</td>
                    <td className="py-4 text-foreground/80">{formatRange(row.waist, unit)}</td>
                    <td className="py-4 text-foreground/80">{formatRange(row.hip, unit)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-8 flex items-center gap-3 font-body text-sm">
              <span className="text-foreground/80">Measurements:</span>
              {(["cm", "in"] as const).map((u) => (
                <Button
                  variant="outline"
                  key={u}
                  onClick={() => setUnit(u)}
                  aria-pressed={unit === u}
                  className={`h-10 w-16 rounded-sm border transition-colors ${
                    unit === u ? "border-espresso bg-espresso text-primary-foreground" : "border-border text-foreground/60 hover:border-espresso/40"
                  }`}
                >
                  {u}
                </Button>
              ))}
            </div>
            <p className="mt-4 font-body text-xs text-muted-foreground">Reference measurements; Hertones sizing confirmation pending.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SizeChartDialog;
