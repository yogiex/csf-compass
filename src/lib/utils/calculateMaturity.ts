import { CSF_CATEGORIES } from '@/lib/mock-data';
import type { Assessment, FunctionKey } from '@/lib/mock-data';

export interface OverallMaturity {
  average: number;
  tier: number;
  count: number;
}

export interface FunctionMaturity {
  key: FunctionKey;
  label: string;
  icon: string;
  average: number;
  tier: number;
  count: number;
}

export interface TierDistribution {
  tier: number;
  count: number;
  percentage: number;
}

export function clampTier(n: number): number {
  return Math.min(4, Math.max(0, Math.round(n)));
}

export function averageScore(assessments: Assessment[]): number {
  if (assessments.length === 0) return 0;
  const total = assessments.reduce((sum, a) => sum + a.currentScore, 0);
  return total / assessments.length;
}

export function overallMaturity(assessments: Assessment[]): OverallMaturity {
  const average = averageScore(assessments);
  return {
    average,
    tier: clampTier(average),
    count: assessments.length,
  };
}

export function functionMaturity(
  assessments: Assessment[]
): FunctionMaturity[] {
  const keys = Object.keys(CSF_CATEGORIES) as FunctionKey[];
  return keys.map((key) => {
    const subset = assessments.filter((a) => a.functionKey === key);
    const average = averageScore(subset);
    return {
      key,
      label: CSF_CATEGORIES[key].label,
      icon: CSF_CATEGORIES[key].icon,
      average,
      tier: clampTier(average),
      count: subset.length,
    };
  });
}

export function tierDistribution(
  assessments: Assessment[]
): TierDistribution[] {
  const counts = [0, 0, 0, 0, 0];
  for (const assessment of assessments) {
    counts[clampTier(assessment.currentScore)] += 1;
  }
  const total = assessments.length;
  return counts.map((count, tier) => ({
    tier,
    count,
    percentage: total === 0 ? 0 : Math.round((count / total) * 100),
  }));
}
