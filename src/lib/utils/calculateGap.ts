import { Assessment } from '@/lib/mock-data';

export function calculateGap(current: number, target: number): number {
  if (target === 0) return 100;
  return Math.round(((target - current) / target) * 100);
}

export interface GapResult {
  assessment: Assessment;
  gap: number;
}

export function buildGaps(assessments: Assessment[]): GapResult[] {
  return assessments.map((assessment) => ({
    assessment,
    gap: calculateGap(assessment.currentScore, assessment.targetScore),
  }));
}

export function averageScore(assessments: Assessment[]): number {
  if (assessments.length === 0) return 0;
  const total = assessments.reduce(
    (sum, a) => sum + a.currentScore,
    0
  );
  return total / assessments.length;
}