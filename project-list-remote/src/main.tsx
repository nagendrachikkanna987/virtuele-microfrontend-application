import React from 'react';
import { createRoot } from 'react-dom/client';
import ProjectListRemote from './components/ProjectListRemote';
import './main.css';

createRoot(document.getElementById('root')!).render(
  <ProjectListRemote companyId={1} userId={16} onProjectSelect={() => {}} />
);
