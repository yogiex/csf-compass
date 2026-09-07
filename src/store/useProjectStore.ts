import { create } from 'zustand';

interface ProjectState {
  activeProjectId: string;
  setActiveProject: (id: string) => void;
  clearProject: () => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  activeProjectId: '',
  setActiveProject: (id) => set({ activeProjectId: id }),
  clearProject: () => set({ activeProjectId: '' }),
}));
