'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TierBadge } from '@/components/features/assessment/TierBadge';
import { getTierDetails } from '@/lib/constants';
import { functionMaturity } from '@/lib/utils/calculateMaturity';
import { cn } from 'cn';
import type { Assessment } from '@/lib/mock-data';

interface FunctionMaturityGridProps {
  assessments: Assessment[];
}

export function FunctionMaturityGrid({
  assessments,
}: FunctionMaturityGridProps) {
  const rows = functionMaturity(assessments);

  return (
    <div
      data-testid="function-maturity-grid"
      className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
    >
      {rows.map((row) => {
        const tierDetails = getTierDetails(row.tier);
        return (
          <Card key={row.key} className="border shadow-sm">
            <CardContent className="space-y-3 p-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span aria-hidden="true">{row.icon}</span>
                  <span className="text-sm font-medium">{row.label}</span>
                </div>
                {row.count > 0 ? (
                  <TierBadge value={row.tier} />
                ) : (
                  <Badge variant="outline">N/A</Badge>
                )}
              </div>
              <Progress
                value={(row.tier / 4) * 100}
                className={cn(row.count === 0 && 'opacity-30')}
              />
              <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                <span>{row.count > 0 ? tierDetails.name : 'Belum dinilai'}</span>
                <span>{row.count} item</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
