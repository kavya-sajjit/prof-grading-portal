"use client";

import * as React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

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
  const clearDraft = useGradingStore((state) => state.clearDraft);

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
        assignedPoints: 0,
        feedback: "",
      })),
    },
  });

  const { fields } = useFieldArray({ control, name: "criteria" });

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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 rounded-lg border p-6 bg-card">
      <div>
        <h3 className="text-lg font-bold">Grading Submission: {studentName}</h3>
        <p className="text-xs text-muted-foreground">ID: {submissionId}</p>
      </div>

      {/* Rubric Criteria List */}
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="p-4 border rounded-md space-y-2 bg-background">
            <div className="flex justify-between items-center">
              <label className="font-semibold text-sm">{field.name}</label>
              <span className="text-xs text-muted-foreground">Max: {field.maxPoints} pts</span>
            </div>
            
            <input
              type="number"
              step="0.5"
              {...register(`criteria.${index}.assignedPoints` as const, { valueAsNumber: true })}
              className="w-full rounded-md border px-3 py-1.5 text-sm"
              placeholder="Enter score"
            />
          </div>
        ))}
      </div>

      {/* Overall Feedback */}
      <div>
        <label className="block text-sm font-medium mb-1">Overall Feedback</label>
        <textarea
          {...register("overallComments")}
          rows={4}
          className="w-full rounded-md border p-3 text-sm bg-background"
          placeholder="Provide summary comments for the student..."
        />
        {errors.overallComments && (
          <p className="text-xs text-destructive mt-1">{errors.overallComments.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-primary text-primary-foreground py-2 rounded-md font-medium text-sm disabled:opacity-50"
      >
        {isPending ? "Publishing Grade..." : "Submit & Publish Grade"}
      </button>
    </form>
  );
}
