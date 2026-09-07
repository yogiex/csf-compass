'use client';

import { Card } from '@/components/ui/card';
import { AlertTriangle, CheckCircle2, RefreshCw, XCircle } from 'lucide-react';
import { cn } from 'cn';
import { complianceSummary } from '@/lib/utils/getComplianceStatus';
import type { Assessment } from '@/lib/mock-data';

interface ComplianceOverviewProps {
  assessments: Assessment[];
}

export function ComplianceOverview({
  assessments,
}: ComplianceOverviewProps) {
  const summary = complianceSummary(assessments);
  const complianceRate =
    summary.total === 0
      ? 0
      : Math.round((summary.compliant / summary.total) * 100);

  const items = [
    {
      label: 'Compliant',
      value: summary.compliant,
      icon: CheckCircle2,
      chipClass:
        'bg-green-100/50 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    },
    {
      label: 'Partial',
      value: summary.partial,
      icon: AlertTriangle,
      chipClass:
        'bg-yellow-100/50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    },
    {
      label: 'Non-Compliant',
      value: summary.nonCompliant,
      icon: XCircle,
      chipClass:
        'bg-red-100/50 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    },
    {
      label: 'Not Assessed',
      value: summary.notAssessed,
      icon: RefreshCw,
      chipClass:
        'bg-gray-100/50 text-gray-500 dark:bg-gray-800 dark:text-gray-400',
    },
  ];

  return (
    <div
      data-testid="compliance-overview"
      className="space-y-2"
    >
      <p className="text-sm text-muted-foreground">
        Compliance rate:{' '}
        <span className="font-semibold text-foreground">{complianceRate}%</span>
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.label} className="shadow-sm">
              <div className="flex items-start justify-between p-6">
                <div className="space-y-2">
                  <div className="text-2xl font-bold">{item.value}</div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {item.label}
                  </p>
                </div>
                <span
                  className={cn(
                    'rounded-lg p-2',
                    item.chipClass
                  )}
                >
                  <Icon className="h-5 w-5" />
                </span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
