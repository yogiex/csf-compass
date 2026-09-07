'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { AlertTriangle, Database, History, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { withAuthGuard } from '@/lib/auth-guard';
import { assessmentDB, assetDB, projectDB } from '@/lib/db-client';
import { useProjectStore } from '@/store/useProjectStore';

interface DataCounts {
  projects: number;
  assets: number;
  assessments: number;
}

const EMPTY_COUNTS: DataCounts = { projects: 0, assets: 0, assessments: 0 };

function SettingsPage() {
  const router = useRouter();
  const [counts, setCounts] = useState<DataCounts>(EMPTY_COUNTS);

  useEffect(() => {
    setCounts({
      projects: projectDB.getAll().length,
      assets: assetDB.getAll().length,
      assessments: assessmentDB.getAll().length,
    });
  }, []);

  const handleReset = () => {
    try {
      projectDB.reset();
      assetDB.reset();
      assessmentDB.reset();
      useProjectStore.getState().clearProject();
      toast.success('Berhasil', {
        description: 'Semua data telah direset ke default.',
      });
      router.push('/dashboard');
    } catch {
      toast.error('Gagal', {
        description: 'Terjadi kesalahan saat mereset data.',
      });
    }
  };

  return (
    <div className="space-y-6 p-6" data-testid="settings-page">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Pengaturan</h1>
        <p className="text-sm text-muted-foreground">
          Kelola konfigurasi dan data aplikasi.
        </p>
      </div>

      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-destructive" />
            Reset Data
          </CardTitle>
          <CardDescription>
            Mengembalikan seluruh data proyek, aset, dan penilaian ke data
            default aplikasi.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border p-3">
              <p className="text-xs text-muted-foreground">Proyek</p>
              <p className="text-2xl font-semibold">{counts.projects}</p>
            </div>
            <div className="rounded-lg border p-3">
              <p className="text-xs text-muted-foreground">Aset</p>
              <p className="text-2xl font-semibold">{counts.assets}</p>
            </div>
            <div className="rounded-lg border p-3">
              <p className="text-xs text-muted-foreground">Penilaian</p>
              <p className="text-2xl font-semibold">{counts.assessments}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <AlertDialog>
            <AlertDialogTrigger render={<Button variant="destructive" />}>
              <RefreshCw />
              Reset Semua Data
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  Konfirmasi Reset Data
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Seluruh data proyek ({counts.projects}), aset ({counts.assets}
                  ), dan penilaian ({counts.assessments}) akan dikembalikan ke
                  data default. Tindakan ini tidak dapat dibatalkan.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleReset}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Ya, Reset Semua Data
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5 text-muted-foreground" />
            Info Aplikasi
          </CardTitle>
          <CardDescription>Informasi versi dan penyimpanan data.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex items-center justify-between gap-4">
            <span className="text-muted-foreground">Aplikasi</span>
            <span className="font-medium">CSF Compass v2.0 (MVP)</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-muted-foreground">Penyimpanan</span>
            <span className="font-medium">localStorage browser</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-muted-foreground">Akun Admin</span>
            <span className="font-medium">
              <code className="rounded bg-muted px-1 py-0.5">admin@nist.csf</code>{' '}
              /{' '}
              <code className="rounded bg-muted px-1 py-0.5">admin-csf</code>
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default withAuthGuard(SettingsPage);
