import { Filter, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { CSF_CATEGORIES } from '@/lib/mock-data';

import type { Asset } from '@/lib/mock-data';

interface AssessmentFiltersProps {
  functionFilter: string;
  assetFilter: string;
  onFunctionChange: (value: string) => void;
  onAssetChange: (value: string) => void;
  onClear: () => void;
  assets: Asset[];
  resultCount: number;
}

export function AssessmentFilters({
  functionFilter,
  assetFilter,
  onFunctionChange,
  onAssetChange,
  onClear,
  assets,
  resultCount,
}: AssessmentFiltersProps) {
  const hasFilters = Boolean(functionFilter || assetFilter);

  return (
    <div
      data-testid="assessment-filters"
      className="flex flex-wrap items-center gap-2"
    >
      <Filter className="h-4 w-4 text-muted-foreground" />
      <Select
        value={functionFilter}
        onValueChange={(value) => onFunctionChange(value ?? '')}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Semua Fungsi" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">Semua Fungsi</SelectItem>
          {(Object.keys(CSF_CATEGORIES) as Array<keyof typeof CSF_CATEGORIES>).map(
            (key) => (
              <SelectItem key={key} value={key}>
                {CSF_CATEGORIES[key].icon} {CSF_CATEGORIES[key].label}
              </SelectItem>
            ),
          )}
        </SelectContent>
      </Select>

      <Select
        value={assetFilter}
        onValueChange={(value) => onAssetChange(value ?? '')}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Semua Aset" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">Semua Aset</SelectItem>
          {assets.map((asset) => (
            <SelectItem key={asset.id} value={asset.id}>
              {asset.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={onClear}>
          <X className="h-4 w-4" />
          Hapus Filter
        </Button>
      )}

      <span className="ml-auto text-sm text-muted-foreground">
        {resultCount} item
      </span>
    </div>
  );
}
