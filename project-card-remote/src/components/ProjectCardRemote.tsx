import { Card } from './card';
import { FileText, Box, Map, CheckCircle, Upload, Settings, FileImage, Workflow } from 'lucide-react';
import { Project } from '@shell/store/slices/projectSlice';

type Props = {
  project: Project | null;
};

const projectModules = [
  {
    icon: <FileText />,
    title: 'Documents',
    description:
      'Centralize project documentation, share externally, and manage revisions with tags and history.',
    color: '#e0f2fe',
  },
  {
    icon: <Box />,
    title: '3D Model Extraction',
    description: 'Detect model inaccuracies, compare versions, and export Revit models to Tekla.',
    color: '#ede9fe',
  },
  {
    icon: <Map />,
    title: 'Map UDAs',
    description: 'Map user-defined attributes (UDAs) to enrich workflows and downstream modules.',
    color: '#e0f2fe',
  },
  {
    icon: <CheckCircle />,
    title: 'Model Check',
    description: 'Improve data clarity by embedding custom UDAs straight into your models.',
    color: '#e0f2fe',
  },
  {
    icon: <Upload />,
    title: 'BIM Export',
    description:
      'Export clean, validated models from Revit to Tekla, compare versions, and download reports.',
    color: '#e0f2fe',
  },
  {
    icon: <Settings />,
    title: 'ABM Manager',
    description: 'Generate ABM reports, sync plates, and track changes with analytics.',
    color: '#ede9fe',
  },
  {
    icon: <FileImage />,
    title: 'Drawings',
    description:
      'Distribute shop drawings, link part sheets, and share via QR codes or external links.',
    color: '#e0f2fe',
  },
  {
    icon: <Workflow />,
    title: 'RFI Management',
    description: 'Automate RFIs, integrate with docs/models, and sync with Procore or BIM360.',
    color: '#ede9fe',
  },
];

const ProjectCardRemote = ({ project }: Props) => {
  return (
    <div className="card-shell">
      <div className="card-header">
        <h2>{project?.name ?? 'Project Modules'}</h2>
        <p>{project?.jobNumber ? `Job# ${project.jobNumber}` : 'Select a project to view modules'}</p>
      </div>
      <div className="tabs-row">
        <button type="button" className="tab active">
          Manage Project
        </button>
      </div>
      <div className="module-grid">
        {projectModules.map((module) => (
          <Card key={module.title} color={module.color}>
            <div className="module-icon">{module.icon}</div>
            <div>
              <h3>{module.title}</h3>
              <p>{module.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectCardRemote;
