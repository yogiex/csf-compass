export type SeverityLevel = 'critical' | 'high' | 'medium' | 'low' | 'none';

export function getSeverity(gap: number): SeverityLevel {
  if (gap > 70) return 'critical';
  if (gap > 50) return 'high';
  if (gap > 30) return 'medium';
  if (gap > 0) return 'low';
  return 'none';
}

export const SEVERITY_LABEL: Record<SeverityLevel, string> = {
  critical: 'Kritis',
  high: 'Tinggi',
  medium: 'Sedang',
  low: 'Rendah',
  none: 'Terkendali',
};

export const SEVERITY_BADGE_VARIANT: Record<SeverityLevel, string> = {
  critical: 'destructive',
  high: 'secondary',
  medium: 'outline',
  low: 'outline',
  none: 'default',
};