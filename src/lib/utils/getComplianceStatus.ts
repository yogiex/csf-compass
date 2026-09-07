import type { Assessment } from '@/lib/mock-data';
import { calculateGap } from '@/lib/utils/calculateGap';

export type ComplianceStatus =
  | 'compliant'
  | 'partial'
  | 'non_compliant'
  | 'not_assessed';

export interface ComplianceStatusInfo {
  status: ComplianceStatus;
  label: string;
  description: string;
  badgeClass: string;
}

const COMPLIANCE_STATUS_MAP: Record<ComplianceStatus, ComplianceStatusInfo> = {
  compliant: {
    status: 'compliant',
    label: 'Compliant',
    description: 'Target tercapai sepenuhnya, tidak ada gap.',
    badgeClass:
      'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  },
  partial: {
    status: 'partial',
    label: 'Partial',
    description: 'Sebagian memenuhi target, masih ada gap kecil.',
    badgeClass:
      'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  },
  non_compliant: {
    status: 'non_compliant',
    label: 'Non-Compliant',
    description: 'Belum memenuhi target, gap signifikan.',
    badgeClass:
      'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  },
  not_assessed: {
    status: 'not_assessed',
    label: 'Not Assessed',
    description: 'Belum dilakukan penilaian.',
    badgeClass: 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400',
  },
};

export function getComplianceStatus(gap: number): ComplianceStatus {
  if (gap === 0) return 'compliant';
  if (gap <= 50) return 'partial';
  if (gap <= 100) return 'non_compliant';
  return 'not_assessed';
}

export function complianceStatusInfo(
  status: ComplianceStatus
): ComplianceStatusInfo {
  return COMPLIANCE_STATUS_MAP[status];
}

export interface ComplianceSummary {
  compliant: number;
  partial: number;
  nonCompliant: number;
  notAssessed: number;
  total: number;
}

export function complianceSummary(assessments: Assessment[]): ComplianceSummary {
  const summary: ComplianceSummary = {
    compliant: 0,
    partial: 0,
    nonCompliant: 0,
    notAssessed: 0,
    total: assessments.length,
  };

  for (const assessment of assessments) {
    const gap = calculateGap(
      assessment.currentScore,
      assessment.targetScore
    );
    const status = getComplianceStatus(gap);
    if (status === 'compliant') summary.compliant += 1;
    else if (status === 'partial') summary.partial += 1;
    else if (status === 'non_compliant') summary.nonCompliant += 1;
    else summary.notAssessed += 1;
  }

  return summary;
}
