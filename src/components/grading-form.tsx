"use client";

import * as React from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Award, CheckCircle2, User, Save, Send } from "lucide-react";

import { gradeSubmissionSchema, type GradeSubmissionInput, type ActionState } from "@/lib/schemas/grading";
import { submitGradeAction } from "@/app/actions/grading";
import { useGradingStore } from "@/store/use-grading-store";

const initialState: ActionState = { success: false, message: "" };

interface Props {
  submissionId: string;
  studentId: string;
  studentName: string;
  initialCriteria: { criterionId: string; name: string; maxPoints: number }[];
}

export function RubricGradingForm({ submissionId, studentId, studentName, initialCriteria }: Props) {
  const [isPending, startTransition] = React.useTransition();
  const drafts = useGradingStore((state) => state.drafts);
  const setCriterionScore = useGradingStore((state) => state.setCriterionScore);
  const clearDraft = useGradingStore((state) => state.clearDraft);

  // Check if saved draft exists in Zustand store for this submission
  const savedDraft = drafts[submissionId];

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GradeSubmissionInput>({
    resolver: zodResolver(gradeSubmissionSchema),
    defaultValues: {
      submissionId,
      studentId,
      overallComments: "",
      criteria: initialCriteria.map((c) => ({
        criterionId: c.criterionId,
        name: c.name,
        maxPoints: c.maxPoints,
        assignedPoints: savedDraft?.[c.criterionId]?.assignedPoints ?? 0,
        feedback: savedDraft?.[c.criterionId]?.feedback ?? "",
      })),
    },
  });

  const { fields } = useFieldArray({ control, name: "criteria" });
  const watchedCriteria = useWatch({ control, name: "criteria" }) || [];

  // Total points calculation
  const totalAssigned = watchedCriteria.reduce((acc, c) => acc + (Number(c?.assignedPoints) || 0), 0);
  const totalMax = initialCriteria.reduce((acc, c) => acc + c.maxPoints, 0);

  const onSubmit = (data: GradeSubmissionInput) => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("submissionId", data.submissionId);
      formData.append("studentId", data.studentId);
      formData.append("overallComments", data.overallComments);
      formData.append("criteria", JSON.stringify(data.criteria));

      const response = await submitGradeAction(initialState, formData);

      if (response.success) {
        toast.success(response.message);
        clearDraft(submissionId);
        reset();
      } else {
        toast.error(response.message);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 rounded-2xl border glass-card p-6 md:p-8 shadow-sm">
      {/* Student & Submission Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border/80">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-primary/10 text-primary">
            <User className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-serif tracking-tight">{studentName}</h3>
            <p className="text-xs text-muted-foreground font-mono">Submission ID: {submissionId}</p>
          </div>
        </div>

        {/* Total Score Badge */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-900/10 dark:bg-amber-400/10 border border-amber-900/20 text-amber-900 dark:text-amber-300 w-fit">
          <Award className="h-5 w-5 text-amber-700 dark:text-amber-400" />
          <div className="text-right">
            <div className="text-xs font-semibold uppercase tracking-wider">Total Grade</div>
            <div className="text-base font-extrabold font-mono">
              {totalAssigned} / {totalMax} pts
            </div>
          </div>
        </div>
      </div>

      {/* Rubric Criteria List */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <span>Rubric Breakdown</span>
          {savedDraft && (
            <span className="text-xs font-normal text-amber-800 dark:text-amber-300 bg-amber-900/10 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Save className="h-3 w-3" /> Draft Autosaved
            </span>
          )}
        </h4>

        {fields.map((field, index) => {
          const criterionError = errors.criteria?.[index]?.assignedPoints;
          return (
            <div
              key={field.id}
              className="p-5 border rounded-xl space-y-3 bg-card/60 hover:bg-card/90 transition-all shadow-2xs"
            >
              <div className="flex justify-between items-center">
                <label className="font-semibold text-sm text-foreground flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-mono">
                    {index + 1}
                  </span>
                  {field.name}
                </label>
                <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-muted text-muted-foreground font-medium">
                  Max: {field.maxPoints} pts
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2">
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  max={field.maxPoints}
                  {...register(`criteria.${index}.assignedPoints` as const, {
                    valueAsNumber: true,
                    onChange: (e) => {
                      const val = parseFloat(e.target.value) || 0;
                      setCriterionScore(submissionId, field.criterionId, val);
                    },
                  })}
                  className="w-full rounded-lg border border-input bg-background px-3.5 py-2 text-sm font-mono focus:ring-2 focus:ring-ring focus:outline-none"
                  placeholder={`0 - ${field.maxPoints}`}
                />
                {criterionError && (
                  <p className="text-xs text-destructive mt-1">{criterionError.message}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Overall Feedback */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-foreground">
          Overall Feedback & Comments <span className="text-destructive">*</span>
        </label>
        <textarea
          {...register("overallComments")}
          rows={4}
          className="w-full rounded-xl border border-input bg-background p-3.5 text-sm focus:ring-2 focus:ring-ring focus:outline-none"
          placeholder="Provide detailed, constructive summary comments for the student..."
        />
        {errors.overallComments && (
          <p className="text-xs text-destructive">{errors.overallComments.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl font-semibold text-sm shadow-md hover:opacity-95 transition-all active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
      >
        {isPending ? (
          <>Publishing Grade...</>
        ) : (
          <>
            <Send className="h-4 w-4" /> Submit & Publish Grade
          </>
        )}
      </button>
    </form>
  );
}
