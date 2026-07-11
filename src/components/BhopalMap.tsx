import { useState, useEffect, Suspense, lazy } from "react";
import { BHOPAL_AREAS } from "@/lib/bhopal-data";

type MarkerData = {
  lat: number | null;
  lng: number | null;
  color: string;
  label?: string;
  kind: "report" | "work";
};

const BhopalMapCore = lazy(() => import("./BhopalMapCore"));

export function BhopalMap({
  markers = [],
  areas = BHOPAL_AREAS,
  filters = { showAqi: true, showReports: true, showWorks: true },
}: {
  markers?: MarkerData[];
  areas?: typeof BHOPAL_AREAS;
  filters?: { showAqi: boolean; showReports: boolean; showWorks: boolean };
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border bg-muted/20 shadow-[var(--shadow-elegant)] z-0 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 opacity-50">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-r-transparent" />
          <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Loading Map...</div>
        </div>
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border bg-muted/20 shadow-[var(--shadow-elegant)] z-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 opacity-50">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-r-transparent" />
            <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Initializing Map...</div>
          </div>
        </div>
      }
    >
      <BhopalMapCore markers={markers} areas={areas} filters={filters} />
    </Suspense>
  );
}