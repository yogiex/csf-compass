'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TierBadge } from '@/components/features/assessment/TierBadge';
import { getTierDetails } from '@/lib/constants';
import { overallMaturity } from '@/lib/utils/calculateMaturity';
import { cn } from 'cn';
import type { Assessment } from '@/lib/mock-data';

interface OverallMaturityCardProps {
  assessments: Assessment[];
}

export function OverallMaturityCard({ assessments }: OverallMaturityCardProps) {
  const { average, tier: tierValue, count: total } = overallMaturity(assessments);
  const tier = getTierDetails(tierValue);
  const progressValue = (tierValue / 4) * 100;
  const circleTextClass =
    tier.color === 'bg-yellow-500' ? 'text-black' : 'text-white';

  return (
    <Card data-testid="overall-maturity-card" className="shadow-sm">
      <CardHeader>
        <CardTitle>Tingkat Kematangan (Maturity Tier)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div
              className={cn(
                'flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-full shadow-lg',
                tier.color,
                circleTextClass
              )}
            >
              <span className="text-3xl font-bold leading-none">
                {tierValue}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider">
                TIER
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-semibold">{tier.name}</h3>
                <TierBadge value={tierValue} />
              </div>
              <p className="text-sm text-muted-foreground">{tier.description}</p>
              <p className="text-sm text-muted-foreground">
                Berdasarkan {total} penilaian · Skor rata-rata:{' '}
                {average.toFixed(1)} / 4.0
              </p>
            </div>
          </div>
          <div className="w-full space-y-2 md:max-w-xs">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Tier 0</span>
              <span>Tier 4</span>
            </div>
            <Progress value={progressValue} className="w-full" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Tidak Dinilai</span>
              <span>Adaptif</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
