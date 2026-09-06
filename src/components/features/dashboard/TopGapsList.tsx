'use client';

import { Badge } from '@/components/ui/badge';
import { buildGaps } from '@/lib/utils/calculateGap';
import { getSeverity, SEVERITY_LABEL, SEVERITY_BADGE_VARIANT } from '@/lib/utils/getSeverity';
import { Assessment } from '@/lib/mock-data';

interface TopGapsListProps {
  assessments: Assessment[];
  limit?: number;
}

export function TopGapsList({ assessments, limit = 5 }: TopGapsListProps) {
  const gaps = buildGaps(assessments)
    .sort((a, b) => b.gap - a.gap)
    .slice(0, limit);

  if (gaps.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        Belum ada data yang tersedia.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {gaps.map(({ assessment, gap }) => {
        const severity = getSeverity(gap);
        return (
          <li key={assessment.id} className="space-y-1">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">
                  {assessment.subCategory}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {assessment.assetName} · {gap}%
                </p>
              </div>
              <Badge variant={SEVERITY_BADGE_VARIANT[severity] as never}>
                {SEVERITY_LABEL[severity]}
              </Badge>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-destructive"
                style={{ width: `${Math.min(gap, 100)}%` }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}