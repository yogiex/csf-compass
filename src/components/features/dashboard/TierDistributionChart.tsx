'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from 'cn';
import { CSF_TIERS, getTierDetails } from '@/lib/constants';
import { tierDistribution } from '@/lib/utils/calculateMaturity';
import type { Assessment } from '@/lib/mock-data';

interface TierDistributionChartProps {
  assessments: Assessment[];
}

export function TierDistributionChart({
  assessments,
}: TierDistributionChartProps) {
  const distribution = tierDistribution(assessments).map((item) => ({
    tier: getTierDetails(item.tier),
    count: item.count,
    percentage: item.percentage,
  }));

  return (
    <Card data-testid="tier-distribution-chart">
      <CardHeader>
        <CardTitle>Distribusi Tier</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-5 gap-2 items-end">
          {distribution.map(({ tier, count, percentage }) => (
            <div
              key={tier.value}
              className="flex flex-col items-center gap-1"
            >
              <div
                role="img"
                aria-label={`Tier ${tier.value}: ${count} penilaian (${percentage}%)`}
                className={cn(
                  'rounded-t-lg transition-all w-full',
                  count > 0 ? tier.color : 'bg-muted opacity-30'
                )}
                style={{ height: `${16 + percentage}px`, minHeight: '16px' }}
              />
              <span className="text-sm font-bold">{count}</span>
              <span className="text-[10px] text-muted-foreground">
                {tier.label}
              </span>
              <span className="font-mono text-[10px] text-muted-foreground">
                {percentage}%
              </span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-3 text-xs text-muted-foreground">
          {CSF_TIERS.map((tier) => (
            <div key={tier.value} className="flex items-center gap-1">
              <span className={cn('h-2 w-2 rounded-full', tier.color)} />
              <span>{tier.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
