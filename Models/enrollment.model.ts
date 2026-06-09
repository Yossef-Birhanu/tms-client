import { Temporal } from "@js-temporal/polyfill";
export interface EnrollmentRecord {
readonly studentId: string;
readonly courseCode: string;
enrolledAt: Temporal.Instant;
}



// Define the Discriminated Union Type
export type EnrollmentStatus =
    | { status: "PENDING"; requestedAt: Temporal.Instant; studentId: string; courseId: string }
    | { status: "APPROVED"; approvedBy: string; studentId: string; courseId: string }
    | { status: "ACTIVE"; currentGrade?: string; studentId: string; courseId: string }
    | { status: "COMPLETED"; finalGrade: string; studentId: string; courseId: string }
    | { status: "DROPPED"; reason: string; studentId: string; courseId: string };

// The Describing Function
export function describeEnrollment(enrollment: EnrollmentStatus): string {
    switch (enrollment.status) {
        case "PENDING":
            return `Awaiting approval since ${enrollment.requestedAt}`;
        case "APPROVED":
            return `Approved by ${enrollment.approvedBy}`;
        case "ACTIVE":
            return enrollment.currentGrade !== undefined
                ? `In progress grade so far: ${enrollment.currentGrade}`
                : `In progress not yet graded`;
        case "COMPLETED":
            return `Finished with ${enrollment.finalGrade}`;
        case "DROPPED":
            return `Dropped: ${enrollment.reason}`;
        default: {
            // This never-check ensures complete exhaustiveness at compile time
            const _check: never = enrollment;
            throw new Error(`Unhandled status: ${JSON.stringify(_check)}`); // FIXED: Spaced 'new Error'
        }
    }
}