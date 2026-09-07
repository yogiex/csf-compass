'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Building2, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { assetDB, assessmentDB, projectDB } from '@/lib/db-client';
import { useProjectStore } from '@/store/useProjectStore';
import type { Project } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const INDUSTRIES = [
  'Perbankan',
  'E-commerce',
  'Telekomunikasi',
  'Kesehatan',
  'Pendidikan',
  'Pemerintahan',
  'Lainnya',
];

interface FormData {
  name: string;
  description: string;
  industry: string;
}

const EMPTY_FORM: FormData = { name: '', description: '', industry: '' };

function ProjectsPage() {
  const router = useRouter();
  const { setActiveProject } = useProjectStore();
  const [reloadKey, setReloadKey] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deletingProject, setDeletingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);

  const projects = useMemo(() => projectDB.getAll(), [reloadKey]);

  const reload = () => setReloadKey((key) => key + 1);

  const openCreate = () => {
    setEditingProject(null);
    setFormData(EMPTY_FORM);
    setDialogOpen(true);
  };

  const openEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      description: project.description ?? '',
      industry: project.industry ?? '',
    });
    setDialogOpen(true);
  };

  const openDelete = (project: Project) => {
    setDeletingProject(project);
    setDeleteOpen(true);
  };

  const goToProject = (id: string) => {
    setActiveProject(id);
    router.push('/dashboard');
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      toast.error('Nama proyek wajib diisi');
      return;
    }
    const payload = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      industry: formData.industry,
    };
    if (editingProject) {
      projectDB.update(editingProject.id, payload);
      toast.success('Proyek berhasil diperbarui');
    } else {
      projectDB.create(payload);
      toast.success('Proyek berhasil ditambahkan');
    }
    setDialogOpen(false);
    reload();
  };

  const handleDelete = () => {
    if (!deletingProject) return;
    const related = assetDB.getByProject(deletingProject.id).length;
    if (related > 0) {
      toast.error('Tidak bisa dihapus', {
        description: `Proyek ini memiliki ${related} aset terkait. Hapus aset terlebih dahulu.`,
      });
      setDeleteOpen(false);
      setDeletingProject(null);
      return;
    }
    projectDB.delete(deletingProject.id);
    toast.success('Proyek berhasil dihapus');
    setDeleteOpen(false);
    setDeletingProject(null);
    reload();
  };

  return (
    <div data-testid="projects-page" className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manajemen Proyek</h1>
          <p className="text-sm text-muted-foreground">
            Kelola perusahaan / proyek yang akan dinilai.
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus />
          Tambah Proyek
        </Button>
      </div>

      <div className="rounded-lg border bg-background shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Proyek</TableHead>
              <TableHead>Industri</TableHead>
              <TableHead>Deskripsi</TableHead>
              <TableHead>Aset</TableHead>
              <TableHead>Penilaian</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <p className="text-sm text-muted-foreground">Belum ada proyek</p>
                    <Button variant="outline" onClick={openCreate}>
                      <Plus />
                      Tambah Proyek
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              projects.map((project) => {
                const assetCount = assetDB.getByProject(project.id).length;
                const assessmentCount = assessmentDB.getByProject(project.id).length;
                return (
                  <TableRow key={project.id}>
                    <TableCell>
                      <button
                        type="button"
                        onClick={() => goToProject(project.id)}
                        className="flex cursor-pointer items-center gap-2 font-medium hover:underline"
                      >
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        {project.name}
                      </button>
                    </TableCell>
                    <TableCell>{project.industry || '-'}</TableCell>
                    <TableCell className="max-w-xs truncate text-muted-foreground">
                      {project.description || '-'}
                    </TableCell>
                    <TableCell>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveProject(project.id);
                          router.push('/assets');
                        }}
                        className="cursor-pointer font-medium text-primary hover:underline"
                      >
                        {assetCount}
                      </button>
                    </TableCell>
                    <TableCell>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveProject(project.id);
                          router.push('/assessments');
                        }}
                        className="cursor-pointer font-medium text-primary hover:underline"
                      >
                        {assessmentCount}
                      </button>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEdit(project)}
                          aria-label={`Edit ${project.name}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => openDelete(project)}
                          aria-label={`Hapus ${project.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingProject ? 'Edit Proyek' : 'Tambah Proyek'}
            </DialogTitle>
            <DialogDescription>
              {editingProject
                ? 'Perbarui detail proyek yang sedang dinilai.'
                : 'Tambahkan proyek baru untuk mulai melakukan penilaian.'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="project-name">Nama Proyek</Label>
              <Input
                id="project-name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Masukkan nama proyek"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-industry">Industri</Label>
              <Select
                value={formData.industry}
                onValueChange={(val) =>
                  setFormData((prev) => ({ ...prev, industry: val ?? '' }))
                }
              >
                <SelectTrigger id="project-industry" className="w-full">
                  <SelectValue placeholder="Pilih industri" />
                </SelectTrigger>
                <SelectContent>
                  {INDUSTRIES.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-description">Deskripsi</Label>
              <Textarea
                id="project-description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Deskripsi singkat proyek"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>Batal</DialogClose>
            <Button onClick={handleSave}>
              {editingProject ? 'Perbarui' : 'Simpan'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Proyek</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus proyek{' '}
              <span className="font-medium text-foreground">
                {deletingProject?.name}
              </span>
              ? Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default ProjectsPage;
