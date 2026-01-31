import React from 'react';
import { createRoot } from 'react-dom/client';
import ProjectCardRemote from './components/ProjectCardRemote';
import './main.css';

createRoot(document.getElementById('root')!).render(
  <ProjectCardRemote project={null} />
);
