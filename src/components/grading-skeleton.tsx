import * as React from "react";

export function GradingSkeleton() {
  return (
    <div className="space-y-6 rounded-2xl border glass-card p-6 md:p-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/80">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-muted" />
          <div className="space-y-2">
            <div className="w-36 h-5 rounded-md bg-muted" />
            <div className="w-24 h-3.5 rounded-md bg-muted" />
          </div>
        </div>
        <div className="w-28 h-10 rounded-xl bg-muted" />
      </div>

      {/* Rubric Breakdown Skeleton */}
      <div className="space-y-4">
        <div className="w-32 h-4 rounded-md bg-muted" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-5 border rounded-xl space-y-3 bg-card/60">
            <div className="flex justify-between items-center">
              <div className="w-48 h-4 rounded-md bg-muted" />
              <div className="w-16 h-4 rounded-md bg-muted" />
            </div>
            <div className="w-full h-10 rounded-lg bg-muted" />
          </div>
        ))}
      </div>

      {/* Overall Comments Skeleton */}
      <div className="space-y-2">
        <div className="w-40 h-4 rounded-md bg-muted" />
        <div className="w-full h-28 rounded-xl bg-muted" />
      </div>

      {/* Submit Button Skeleton */}
      <div className="w-full h-12 rounded-xl bg-muted" />
    </div>
  );
}
