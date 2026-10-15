/**
 * Database Seeding & Mock Data Script (Unit IV)
 * Generates realistic student submission records, rubric criteria, and evaluation timestamps.
 */

export interface StudentRecord {
  studentId: string;
  studentName: string;
  email: string;
  submissionId: string;
  assignmentTitle: string;
  submittedAt: string;
  criteria: {
    criterionId: string;
    name: string;
    maxPoints: number;
  }[];
}

export function generateSeedData(): StudentRecord[] {
  return [
    {
      studentId: "usr_882",
      studentName: "KAVYA SAJJIT",
      email: "kavya@university.edu",
      submissionId: "sub_10293",
      assignmentTitle: "Advanced Web Systems Architecture Essay",
      submittedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      criteria: [
        { criterionId: "c1", name: "Thesis & Argument Structure", maxPoints: 25 },
        { criterionId: "c2", name: "Evidence & Academic Sources", maxPoints: 25 },
        { criterionId: "c3", name: "Formatting & Mechanics", maxPoints: 10 },
      ],
    },
    {
      studentId: "usr_883",
      studentName: "Marcus Vance",
      email: "marcus.v@university.edu",
      submissionId: "sub_10294",
      assignmentTitle: "Distributed Microservices Case Study",
      submittedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      criteria: [
        { criterionId: "c1", name: "System Topology Diagram", maxPoints: 30 },
        { criterionId: "c2", name: "Fault Tolerance Analysis", maxPoints: 20 },
        { criterionId: "c3", name: "Code Cleanliness", maxPoints: 10 },
      ],
    },
    {
      studentId: "usr_884",
      studentName: "Elena Rostova",
      email: "elena.r@university.edu",
      submissionId: "sub_10295",
      assignmentTitle: "Frontend Hydration & State Optimization",
      submittedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
      criteria: [
        { criterionId: "c1", name: "Component De-duplication", maxPoints: 20 },
        { criterionId: "c2", name: "Zustand State Slicing", maxPoints: 20 },
        { criterionId: "c3", name: "LCP & CLS Optimization", maxPoints: 20 },
      ],
    },
  ];
}

// CLI Execution runner
if (require.main === module) {
  console.log("🌱 [Seed Script] Initializing mock data generation...");
  const seedRecords = generateSeedData();
  console.log(`✅ Successfully generated ${seedRecords.length} student submission records:`);
  console.dir(seedRecords, { depth: null });
}
