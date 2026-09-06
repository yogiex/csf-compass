'use client';

import { Badge } from '@/components/ui/badge';
import { getTierDetails } from '@/lib/constants';
import { cn } from 'cn';

interface TierBadgeProps {
  value: number;
  showLabel?: boolean;
  className?: string;
}

export function TierBadge({
  value,
  showLabel = true,
  className,
}: TierBadgeProps) {
  const tier = getTierDetails(value);

  const colorMap: Record<string, string> = {
    'bg-gray-400': 'bg-gray-400 text-white hover:bg-gray-500',
    'bg-red-500': 'bg-red-500 text-white hover:bg-red-600',
    'bg-orange-500': 'bg-orange-500 text-white hover:bg-orange-600',
    'bg-yellow-500': 'bg-yellow-500 text-black hover:bg-yellow-600',
    'bg-green-500': 'bg-green-500 text-white hover:bg-green-600',
  };

  const bgClass = colorMap[tier.color] || 'bg-gray-400 text-white';

  return (
    <Badge className={cn(bgClass, 'font-mono', className)}>
      {showLabel ? tier.label : `Tier ${value}`}
    </Badge>
  );
}