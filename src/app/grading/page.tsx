import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft, GraduationCap, FileCheck } from "lucide-react";
import { RubricGradingForm } from "@/components/grading-form";
import { GradingSkeleton } from "@/components/grading-skeleton";
import { ThemeToggle } from "@/components/theme-toggle";

export default async function GradingPage() {
  // Server-rendered mock data fetching
  const mockSubmission = {
    submissionId: "sub_10293",
    studentId: "usr_882",
    studentName: "KAVYA SAJJIT",
    criteria: [
      { criterionId: "c1", name: "Thesis & Argument Structure", maxPoints: 25 },
      { criterionId: "c2", name: "Evidence & Academic Sources", maxPoints: 25 },
      { criterionId: "c3", name: "Formatting & Mechanics", maxPoints: 10 },
    ],
  };

  return (
    <div className="min-h-screen bg-background text-foreground bg-grid-texture relative flex flex-col">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />

      {/* Header */}
      <header className="border-b bg-card/75 backdrop-blur-md sticky top-0 z-20 shadow-xs">
        <div className="container max-w-4xl mx-auto flex items-center justify-between h-16 px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="flex items-center gap-2 font-bold text-sm text-primary">
              <GraduationCap className="h-5 w-5" />
              <span className="font-serif">Grading Portal</span>
            </div>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1 container max-w-3xl mx-auto py-10 px-4 relative z-10">
        <div className="mb-6 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-900/10 text-amber-900 dark:text-amber-300">
            <FileCheck className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-serif tracking-tight">Assignment Evaluation Portal</h1>
            <p className="text-xs text-muted-foreground">
              Review submission details, assign rubric points, and publish official grades.
            </p>
          </div>
        </div>

        <Suspense fallback={<GradingSkeleton />}>
          <RubricGradingForm
            submissionId={mockSubmission.submissionId}
            studentId={mockSubmission.studentId}
            studentName={mockSubmission.studentName}
            initialCriteria={mockSubmission.criteria}
          />
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-xs text-muted-foreground bg-card/40 backdrop-blur-xs">
        Teacher Grading Portal &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}
