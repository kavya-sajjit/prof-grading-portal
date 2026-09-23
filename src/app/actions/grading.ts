"use server";

import { gradeSubmissionSchema, ActionState } from "@/lib/schemas/grading";
import { revalidatePath } from "next/cache";

export async function submitGradeAction(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const rawCriteria = formData.get("criteria");
  const rawData = {
    submissionId: formData.get("submissionId"),
    studentId: formData.get("studentId"),
    overallComments: formData.get("overallComments"),
    criteria: rawCriteria ? JSON.parse(rawCriteria.toString()) : [],
  };

  // Validate backend payload independently
  const validated = gradeSubmissionSchema.safeParse(rawData);

  if (!validated.success) {
    return {
      success: false,
      message: "Validation failed. Please review rubric point limits.",
      errors: validated.error.flatten().fieldErrors,
    };
  }

  // Calculate total points scored vs max total score server-side
  const totalAwarded = validated.data.criteria.reduce((acc, c) => acc + c.assignedPoints, 0);
  const totalMax = validated.data.criteria.reduce((acc, c) => acc + c.maxPoints, 0);

  if (totalAwarded > totalMax) {
    return {
      success: false,
      message: `Invalid total score: Awarded ${totalAwarded} exceeds total maximum of ${totalMax}.`,
    };
  }

  // Simulate Database Save
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Purge dynamic cache tags for the grading queue
  revalidatePath("/grading");

  return {
    success: true,
    message: `Grade (${totalAwarded}/${totalMax}) published successfully!`,
  };
}
