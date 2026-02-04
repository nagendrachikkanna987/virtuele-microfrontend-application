import { useEffect, useState } from 'react';
import { fetchProjectList, type ProjectListPayload } from '../api/project';
import { Project } from '../store/slices/projectSlice';
import { Grid, Search, Star, MoreVertical } from 'lucide-react';
import '../main.css';

type Props = {
  companyId?: number;
  userId: number;
  selectedProjectId?: string;
  onProjectSelect: (project: Project) => void;
};

const ProjectListRemote = ({
  companyId,
  userId,
  selectedProjectId,
  onProjectSelect,
}: Props) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!companyId) {
      setProjects([]);
      setError(null);
      return;
    }

    let isMounted = true;
    setIsLoading(true);
    setError(null);

    const payload: ProjectListPayload = {
      companyId,
      userId,
      projectStatus: 'OPEN',
    };

    fetchProjectList(payload)
      .then((items) => {
        if (!isMounted) return;
        setProjects(items);
        if (!selectedProjectId && items.length > 0) {
          onProjectSelect(items[0]);
        }
      })
      .catch(() => {
        if (!isMounted) return;
        setError('Unable to load projects.');
      })
      .finally(() => {
        if (!isMounted) return;
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [companyId, userId, onProjectSelect]);

  const renderList = () => {
    if (!companyId) {
      return <div className="empty-state">Select a company to see open projects.</div>;
    }

    if (isLoading) {
      return <div className="empty-state">Loading projects…</div>;
    }

    if (error) {
      return <div className="empty-state error">{error}</div>;
    }

    if (projects.length === 0) {
      return <div className="empty-state">No open projects found.</div>;
    }

    return projects.map((project) => {
      const isActive = selectedProjectId === project.id;
      return (
        <button
          key={project.id}
          type="button"
          onClick={() => onProjectSelect(project)}
          className={`project-item ${isActive ? 'project-item-active' : ''}`}
        >
          <div className="project-item-content">
            <div>
              <div className="project-name">{project.name}</div>
              {project.jobNumber && (
                <div className="project-meta">Job# {project.jobNumber}</div>
              )}
            </div>
            <div className="project-icons">
              <Star className="icon-muted" />
              <MoreVertical className="icon-muted" />
            </div>
          </div>
        </button>
      );
    });
  };

  return (
    <div className="remote-shell">
      <div className="remote-header">
        <div className="remote-header-top">
          <h2>Projects</h2>
          <button type="button" className="btn-primary">
            New Project
          </button>
        </div>
        <div className="remote-search-row">
          <div className="remote-search">
            <Search className="remote-search-icon" />
            <input placeholder="Search" />
          </div>
          <button type="button" className="icon-button">
            <Grid className="icon-muted" />
          </button>
        </div>
      </div>
      <div className="remote-status-bar">Active Projects</div>
      <div className="remote-list">{renderList()}</div>
    </div>
  );
};

export default ProjectListRemote;
