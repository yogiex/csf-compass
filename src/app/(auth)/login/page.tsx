'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, ADMIN_EMAIL, ADMIN_PASSWORD } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { AlertCircle, ShieldCheck } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState(ADMIN_PASSWORD);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 600));

    const success = login(email, password);
    if (success) {
      router.push('/dashboard');
    } else {
      setError('Email atau password salah. Gunakan kredensial yang tertera.');
    }
    setIsLoading(false);
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-1 text-center">
        <div className="mb-2 flex justify-center">
          <div className="rounded-full bg-primary/10 p-3">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight">
          CSF Compass
        </CardTitle>
        <CardDescription>
          Dashboard Manajemen Risiko Siber — NIST CSF v2.0
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Alamat Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@nist.csf"
              required
              autoComplete="email"
              className="h-10"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Kata Sandi</Label>
              <span className="text-xs text-muted-foreground">
                (MVP: hardcoded)
              </span>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
              className="h-10"
            />
          </div>

          {error && (
            <Alert variant="destructive" className="border-destructive/50">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="h-10 w-full" disabled={isLoading}>
            {isLoading ? 'Memproses...' : 'Masuk ke Dashboard'}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col space-y-2 border-t pt-4 text-xs text-muted-foreground">
        <p className="text-center">
          🧪 <strong>Mode MVP</strong> — Kredensial telah terisi otomatis.
        </p>
        <p className="text-center">
          Email: <code className="rounded bg-muted px-1 py-0.5">admin@nist.csf</code>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          Password: <code className="rounded bg-muted px-1 py-0.5">admin-csf</code>
        </p>
      </CardFooter>
    </Card>
  );
}
