'use client';

import { useMemo, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { assetDB } from '@/lib/db-client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

function AssetsPage() {
  const [reloadKey, setReloadKey] = useState(0);
  const assets = useMemo(() => assetDB.getAll(), [reloadKey]);

  const handleReset = () => {
    if (window.confirm('Reset semua data aset ke kondisi awal?')) {
      assetDB.reset();
      setReloadKey((key) => key + 1);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manajemen Aset</h1>
          <p className="text-sm text-muted-foreground">
            Kelola aset yang akan dinilai.
          </p>
        </div>
        <Button variant="outline" onClick={handleReset}>
          <RotateCcw />
          Reset Data
        </Button>
      </div>

      <Card className="shadow-sm">
        <CardContent className="pt-6">
          {assets.length === 0 ? (
            <Alert>
              <AlertTitle>Belum ada aset</AlertTitle>
              <AlertDescription>
                Tambahkan aset untuk mulai melakukan penilaian NIST CSF.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {assets.map((asset) => (
                <div
                  key={asset.id}
                  className="rounded-lg border p-4 transition-colors hover:bg-muted/50"
                >
                  <p className="font-medium">{asset.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {asset.description || 'Tidak ada deskripsi'}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default AssetsPage;