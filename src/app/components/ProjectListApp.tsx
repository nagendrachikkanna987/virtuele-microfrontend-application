import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Project, setProjects, setSelectedProject } from '@/store/slices/projectSlice';
import { fetchProjectList } from '@/api/project';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Search, Filter, Grid, MoreVertical, Star } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { ScrollArea } from '@/app/components/ui/scroll-area';

const parsePositiveNumber = (value: unknown, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const padBase64Url = (value: string) => {
  let normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  while (normalized.length % 4 !== 0) {
    normalized += '=';
  }
  return normalized;
};

const getUserIdFromToken = (): number | undefined => {
  if (typeof window === 'undefined') {
    return undefined;
  }

  const token = localStorage.getItem('token');
  if (!token) {
    return undefined;
  }

  const [, payloadSegment] = token.split('.');
  if (!payloadSegment) {
    return undefined;
  }

  try {
    const decoded = JSON.parse(atob(padBase64Url(payloadSegment))) as Record<string, unknown>;
    const candidate =
      decoded.userId ?? decoded.sub ?? decoded.uid ?? decoded.preferred_username ?? decoded.id;

    if (typeof candidate === 'number') {
      return candidate;
    }

    if (typeof candidate === 'string' && candidate.trim()) {
      const parsed = Number(candidate);
      if (!Number.isNaN(parsed)) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Unable to decode token payload', error);
  }

  return undefined;
};

const ProjectListApp = () => {
  const dispatch = useDispatch();
  const { projects, selectedProject } = useSelector((state: RootState) => state.project);
  const { selectedCompany } = useSelector((state: RootState) => state.companyAuth);
  const selectedCompanyId = selectedCompany?.companyId;

  useEffect(() => {
    if (!selectedCompanyId) {
      return;
    }

    const controller = new AbortController();
    let isActive = true;

    const companyId = parsePositiveNumber(selectedCompanyId, 1);
    const userId = getUserIdFromToken() ?? 16;

    const fetchProjects = async () => {
      try {
        const normalizedProjects = await fetchProjectList(
          { companyId, userId, projectStatus: 'OPEN' },
          controller.signal
        );

        if (!isActive) {
          return;
        }

        dispatch(setProjects(normalizedProjects));
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }
        console.error('Failed to load project list', error);
      }
    };

    fetchProjects();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [dispatch, selectedCompanyId]);

  const handleProjectSelect = (project: Project) => {
    dispatch(setSelectedProject(project));
  };

  return (
    <div className="h-full bg-white border-r border-gray-200 flex flex-col min-h-0 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Projects</h2>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            New Project
          </Button>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="active" className="flex-1">Active Projects</TabsTrigger>
            <TabsTrigger value="archived" className="flex-1">Archived Projects</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Search and Filters */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search"
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Filter className="w-4 h-4 mr-1" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Grid className="w-4 h-4" />
          </Button>
          <span className="text-xs text-gray-500">{projects.length}</span>
        </div>
      </div>

      {/* Project List */}
      <ScrollArea className="flex-1 min-h-0">
        <div className="p-2">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => handleProjectSelect(project)}
              className={`w-full text-left p-3 rounded-lg mb-1 transition-colors group ${
                selectedProject?.id === project.id
                  ? 'bg-blue-50 border-l-4 border-blue-600'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{project.name}</div>
                  {project.jobNumber && (
                    <div className="text-xs text-gray-500">Job# {project.jobNumber}</div>
                  )}
                </div>
                <div className="flex items-center gap-2 ml-2">
                  <Star className="w-4 h-4 text-gray-300 group-hover:text-yellow-400" />
                  <MoreVertical className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ProjectListApp;
