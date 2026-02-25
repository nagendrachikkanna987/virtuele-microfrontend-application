import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Project {
  id: string;
  name: string;
  jobNumber: string;
  status?: string;
}

interface ProjectState {
  projects: Project[];
  selectedProject: Project | null;
}

const initialState: ProjectState = {
  projects: [],
  selectedProject: null,
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
      // Auto-select first project if none selected
      if (!state.selectedProject && action.payload.length > 0) {
        state.selectedProject = action.payload[0];
      }
    },
    setSelectedProject: (state, action: PayloadAction<Project>) => {
      state.selectedProject = action.payload;
    },
  },
});

export const { setProjects, setSelectedProject } = projectSlice.actions;
export default projectSlice.reducer;
