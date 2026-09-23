import { z } from "zod";

export const rubricCriterionSchema = z.object({
  criterionId: z.string(),
  name: z.string(),
  maxPoints: z.number().positive(),
  assignedPoints: z
    .number({ invalid_type_error: "Points must be a number" })
    .min(0, "Points cannot be negative"),
  feedback: z.string().optional(),
});

export const gradeSubmissionSchema = z.object({
  submissionId: z.string().min(1, "Submission ID is required"),
  studentId: z.string().min(1, "Student ID is required"),
  overallComments: z
    .string()
    .min(10, "Overall feedback must be at least 10 characters long.")
    .max(1000, "Feedback cannot exceed 1000 characters."),
  criteria: z
    .array(rubricCriterionSchema)
    .min(1, "At least one rubric criterion must be evaluated."),
});

export type GradeSubmissionInput = z.infer<typeof gradeSubmissionSchema>;

export type ActionState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};
