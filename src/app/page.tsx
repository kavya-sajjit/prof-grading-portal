import Link from "next/link";
import { CheckCircle2, FileSpreadsheet, Save, ShieldCheck, ArrowRight, GraduationCap } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground bg-grid-texture relative">
      {/* Radial Glow Overlay */}
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />

      {/* Header / Navbar */}
      <header className="border-b bg-card/75 backdrop-blur-md sticky top-0 z-20 shadow-xs">
        <div className="container max-w-5xl mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2.5 font-bold text-lg text-primary">
            <div className="p-1.5 rounded-md bg-primary/10 text-primary">
              <GraduationCap className="h-6 w-6" />
            </div>
            <span className="tracking-tight font-serif text-xl">Teacher Grading Portal</span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/grading"
              className="inline-flex items-center gap-2 text-sm font-semibold bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-95 shadow-xs transition-all active:scale-[0.98]"
            >
              Launch Portal <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 container max-w-5xl mx-auto px-4 py-16 flex flex-col items-center text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-900/20 bg-amber-900/5 text-xs font-semibold text-amber-900 dark:text-amber-300 dark:bg-amber-400/10 mb-6">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          Zustand Draft Persistence & Server Action Validated
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight max-w-2xl mb-4 font-serif leading-tight">
          Streamline Rubric & Assignment Evaluations
        </h1>

        <p className="text-muted-foreground text-lg max-w-xl mb-10 leading-relaxed">
          Evaluate student work effortlessly with live criterion scoring, local draft autosave across browser tabs, and secure server-side validation.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link
            href="/grading"
            className="inline-flex items-center justify-center gap-2 font-semibold bg-primary text-primary-foreground px-6 py-3.5 rounded-xl text-base hover:opacity-95 shadow-md transition-all active:scale-[0.98]"
          >
            Open Evaluation Queue <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left w-full max-w-4xl">
          <div className="p-6 rounded-2xl glass-card shadow-xs transition-all hover:shadow-md hover:-translate-y-0.5">
            <div className="p-3 rounded-xl bg-slate-700/10 text-slate-800 dark:text-slate-200 w-fit mb-4">
              <FileSpreadsheet className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">Rubric Evaluation</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Granular point distribution with automated totals and per-criterion feedback support.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-card shadow-xs transition-all hover:shadow-md hover:-translate-y-0.5">
            <div className="p-3 rounded-xl bg-amber-900/10 text-amber-900 dark:text-amber-300 w-fit mb-4">
              <Save className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">Autosaved Drafts</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Never lose your grading progress. Draft scores sync seamlessly to browser storage via Zustand.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-card shadow-xs transition-all hover:shadow-md hover:-translate-y-0.5">
            <div className="p-3 rounded-xl bg-stone-700/10 text-stone-800 dark:text-stone-200 w-fit mb-4">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">Server Validation</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Strict Zod schemas verify that scores do not exceed rubric limits before finalizing grade submissions.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-xs text-muted-foreground bg-card/40 backdrop-blur-xs">
        Teacher Grading Portal &copy; {new Date().getFullYear()} — Built with Next.js, React Hook Form, Zod & Zustand
      </footer>
    </div>
  );
}
