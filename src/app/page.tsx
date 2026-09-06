import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <div className="mx-auto flex w-full max-w-lg flex-col items-center text-center">
        <div className="mb-6 rounded-full bg-primary/10 p-4">
          <ShieldCheck className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">CSF Compass</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Dashboard Manajemen Risiko Siber — NIST CSF v2.0
        </p>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
          Petakan postur keamanan siber organisasi Anda terhadap 6 fungsi inti
          NIST CSF: Govern, Identify, Protect, Detect, Respond, dan Recover.
        </p>
        <div className="mt-8 flex gap-3">
          <Link href="/login" className={buttonVariants({ size: "lg" })}>
            Masuk ke Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}