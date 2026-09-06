'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { CSF_TIERS, getTierDetails } from '@/lib/constants';
import { cn } from 'cn';

interface TierSelectProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
  id: string;
  disabled?: boolean;
  className?: string;
}

export function TierSelect({
  value,
  onChange,
  label,
  id,
  disabled = false,
  className,
}: TierSelectProps) {
  const selectedTier = getTierDetails(value);

  return (
    <div className={cn('space-y-2', className)}>
      <Label htmlFor={id}>{label}</Label>
      <Select
        value={String(value)}
        onValueChange={(val) => onChange(Number(val))}
        disabled={disabled}
      >
        <SelectTrigger id={id} className="w-full">
          <SelectValue>
            {selectedTier && (
              <span className="flex items-center gap-2">
                <span className={cn('h-3 w-3 rounded-full', selectedTier.color)} />
                <span>
                  {selectedTier.label} - {selectedTier.name}
                </span>
              </span>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {CSF_TIERS.map((tier) => (
            <SelectItem key={tier.value} value={String(tier.value)}>
              <div className="flex items-center gap-2">
                <span className={cn('h-3 w-3 rounded-full', tier.color)} />
                <span className="font-medium">{tier.label}</span>
                <span className="text-muted-foreground">-</span>
                <span className="text-sm text-muted-foreground">{tier.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}