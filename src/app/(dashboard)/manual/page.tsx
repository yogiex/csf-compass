'use client';

import { useMemo, useState } from 'react';

import { BookOpen, Search } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import { ManualFunctionDetail } from '@/components/features/manual/ManualFunctionDetail';
import { ManualFunctionNav } from '@/components/features/manual/ManualFunctionNav';
import { ManualSearchResults } from '@/components/features/manual/ManualSearchResults';

import { withAuthGuard } from '@/lib/auth-guard';
import { NIST_CSF_DATA, TOTAL_MANUAL_SUBCATEGORIES } from '@/lib/nist-csf-data';
import { filterManualData } from '@/lib/utils/filterManual';

import type { FunctionKey } from '@/lib/mock-data';

function ManualPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFunction, setActiveFunction] = useState<FunctionKey>('govern');

  const trimmedTerm = searchTerm.trim();

  const results = useMemo(
    () => filterManualData(NIST_CSF_DATA, searchTerm),
    [searchTerm],
  );

  const active =
    NIST_CSF_DATA.find((fn) => fn.id === activeFunction) ?? NIST_CSF_DATA[0];

  return (
    <div className="space-y-6 p-6" data-testid="manual-page">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
            <BookOpen className="h-6 w-6" />
            User Manual: NIST CSF v2.0
          </h1>
          <p className="text-sm text-muted-foreground">
            Panduan lengkap untuk memahami setiap fungsi dan sub-kategori dalam
            kerangka NIST CSF v2.0
          </p>
        </div>
        <Badge variant="outline">{TOTAL_MANUAL_SUBCATEGORIES} Sub-Kategori</Badge>
      </div>

      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Cari fungsi, sub-kategori, atau deskripsi..."
          aria-label="Cari fungsi, sub-kategori, atau deskripsi"
          className="pl-9"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <ManualFunctionNav
            functions={NIST_CSF_DATA}
            activeId={activeFunction}
            onSelect={setActiveFunction}
          />
        </div>
        <div className="lg:col-span-3">
          {trimmedTerm ? (
            <ManualSearchResults term={trimmedTerm} results={results} />
          ) : active ? (
            <ManualFunctionDetail fn={active} />
          ) : null}
        </div>
      </div>

      <Card className="border-dashed bg-muted/20">
        <CardContent className="space-y-1 p-4 text-sm text-muted-foreground">
          <p>
            Data ini berdasarkan NIST Cybersecurity Framework (CSF) versi 2.0.
            Gunakan halaman ini sebagai referensi saat melakukan penilaian.
          </p>
          <p>
            Total {TOTAL_MANUAL_SUBCATEGORIES} sub-kategori yang tersebar di 6
            fungsi utama.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default withAuthGuard(ManualPage);
