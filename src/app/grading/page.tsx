import { RubricGradingForm } from "@/components/grading-form";

export default async function GradingPage() {
  // Server-rendered mock data fetching
  const mockSubmission = {
    submissionId: "sub_10293",
    studentId: "usr_882",
    studentName: "Alex Johnson",
    criteria: [
      { criterionId: "c1", name: "Thesis & Argument Structure", maxPoints: 25 },
      { criterionId: "c2", name: "Evidence & Academic Sources", maxPoints: 25 },
      { criterionId: "c3", name: "Formatting & Mechanics", maxPoints: 10 },
    ],
  };

  return (
    <main className="container max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Assignment Evaluation Portal</h1>
      <RubricGradingForm
        submissionId={mockSubmission.submissionId}
        studentId={mockSubmission.studentId}
        studentName={mockSubmission.studentName}
        initialCriteria={mockSubmission.criteria}
      />
    </main>
  );
}
