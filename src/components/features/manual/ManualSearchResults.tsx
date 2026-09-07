'use client';

import Link from 'next/link';
import { HelpCircle } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import type { ManualFunction } from '@/lib/nist-csf-data';

interface ManualSearchResultsProps {
  term: string;
  results: ManualFunction[];
}

export function ManualSearchResults({ term, results }: ManualSearchResultsProps) {
  return (
    <div className="space-y-4" data-testid="manual-search-results">
      <p className="text-sm text-muted-foreground">
        Hasil pencarian untuk &quot;{term}&quot;
      </p>

      {results.length === 0 ? (
        <Card>
          <CardContent className="flex h-40 flex-col items-center justify-center gap-2 text-center">
            <HelpCircle className="size-12 opacity-20" />
            <p className="font-medium">Tidak ada hasil yang ditemukan</p>
            <p className="text-sm text-muted-foreground">Coba kata kunci lain</p>
          </CardContent>
        </Card>
      ) : (
        results.map((fn) => (
          <Card key={fn.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>{fn.icon}</span>
                <span>{fn.name}</span>
              </CardTitle>
              <CardDescription>{fn.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {fn.subCategories.map((sub) => (
                <div key={sub.id} className="rounded-lg border bg-muted/30 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-medium">{sub.name}</p>
                      <p className="text-sm text-muted-foreground">{sub.id}</p>
                    </div>
                    <Badge variant="outline">{fn.name}</Badge>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed">{sub.description}</p>
                  <p className="mt-2 text-sm">
                    <span className="font-medium">Tujuan:</span> {sub.purpose}
                  </p>
                  <div className="mt-2">
                    <p className="text-sm font-medium">Pertanyaan Kunci:</p>
                    <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                      {sub.keyQuestions.map((question) => (
                        <li key={question}>{question}</li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    href={`/assessments/new?function=${fn.id}&subCategory=${sub.id}`}
                    className={buttonVariants({ variant: 'link', size: 'sm' })}
                  >
                    Buat Penilaian
                  </Link>
                </div>
              ))}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
