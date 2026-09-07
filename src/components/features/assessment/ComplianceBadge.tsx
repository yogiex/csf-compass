'use client';

import { Badge } from '@/components/ui/badge';
import { complianceStatusInfo, getComplianceStatus } from '@/lib/utils/getComplianceStatus';
import { cn } from 'cn';

interface ComplianceBadgeProps {
  gap: number;
  className?: string;
}

export function ComplianceBadge({ gap, className }: ComplianceBadgeProps) {
  const status = getComplianceStatus(gap);
  const info = complianceStatusInfo(status);

  return (
    <Badge className={cn(info.badgeClass, className)}>{info.label}</Badge>
  );
}
