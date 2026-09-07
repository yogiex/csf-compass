'use client';

import Link from 'next/link';

import { ChevronRight, ListChecks } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
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

export function ManualFunctionDetail({ fn }: { fn: ManualFunction }) {
  return (
    <Card data-testid="manual-function-detail">
      <CardHeader>
        <div className="flex items-start gap-4">
          <span className="text-4xl leading-none" aria-hidden="true">
            {fn.icon}
          </span>
          <div className="flex flex-col gap-1">
            <CardTitle className="text-2xl font-semibold tracking-tight">
              {fn.name}
            </CardTitle>
            <CardDescription className="leading-relaxed">
              {fn.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="rounded-lg bg-muted/30 p-4 text-sm leading-relaxed">
          <span className="font-medium text-foreground">Tujuan: </span>
          <span className="text-muted-foreground">{fn.purpose}</span>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="flex items-center gap-2 text-lg font-medium">
            <ListChecks className="size-5 text-muted-foreground" aria-hidden="true" />
            Sub-Kategori ({fn.subCategories.length})
          </h3>

          <Accordion>
            {fn.subCategories.map((sub) => (
              <AccordionItem key={sub.id} value={sub.id}>
                <AccordionTrigger>
                  <div className="flex flex-1 flex-col gap-1 pr-4 sm:flex-row sm:items-center sm:gap-3">
                    <span className="font-medium">{sub.name}</span>
                    <span className="text-xs text-muted-foreground">{sub.id}</span>
                    <Badge variant="outline" className="sm:ml-auto">
                      {fn.name}
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4">
                  <p className="leading-relaxed text-muted-foreground">
                    {sub.description}
                  </p>
                  <p className="leading-relaxed">
                    <span className="font-medium text-foreground">Tujuan: </span>
                    <span className="text-muted-foreground">{sub.purpose}</span>
                  </p>
                  <div className="rounded-lg bg-muted/30 p-4">
                    <p className="mb-2 font-medium text-foreground">
                      Pertanyaan Kunci untuk Penilaian:
                    </p>
                    <ul className="flex flex-col gap-1.5">
                      {sub.keyQuestions.map((question) => (
                        <li
                          key={question}
                          className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground"
                        >
                          <ChevronRight
                            className="mt-1 size-3 shrink-0 text-foreground"
                            aria-hidden="true"
                          />
                          <span>{question}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex justify-end">
                    <Link
                      href={`/assessments/new?function=${fn.id}&subCategory=${sub.id}`}
                      className={buttonVariants({ variant: 'link', size: 'sm' })}
                    >
                      Buat Penilaian untuk {sub.id}
                      <ChevronRight aria-hidden="true" />
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </CardContent>
    </Card>
  );
}
