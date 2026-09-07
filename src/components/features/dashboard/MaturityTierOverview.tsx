'use client';

import { OverallMaturityCard } from '@/components/features/dashboard/OverallMaturityCard';
import { FunctionMaturityGrid } from '@/components/features/dashboard/FunctionMaturityGrid';
import { TierDistributionChart } from '@/components/features/dashboard/TierDistributionChart';
import type { Assessment } from '@/lib/mock-data';

interface MaturityTierOverviewProps {
  assessments: Assessment[];
}

export function MaturityTierOverview({ assessments }: MaturityTierOverviewProps) {
  return (
    <div className="space-y-6" data-testid="maturity-tier-overview">
      <OverallMaturityCard assessments={assessments} />
      <FunctionMaturityGrid assessments={assessments} />
      <TierDistributionChart assessments={assessments} />
    </div>
  );
}
