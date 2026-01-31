import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setProjects, setSelectedProject } from '@/store/slices/projectSlice';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Search, Filter, Grid, MoreVertical, Star } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { ScrollArea } from '@/app/components/ui/scroll-area';

const ProjectListApp = () => {
  const dispatch = useDispatch();
  const { projects, selectedProject } = useSelector((state: RootState) => state.project);

  useEffect(() => {
    // Mock project data
    const mockProjects = [
      { id: '1', name: 'ReactMarkup01', jobNumber: 'markup01', status: 'active' },
      { id: '2', name: '16Oct2025_01', jobNumber: 'Pro-01', status: 'active' },
      { id: '3', name: '31Oct2025_01', jobNumber: '311025-01', status: 'active' },
      { id: '4', name: 'Documents_Rules', jobNumber: 'docrules', status: 'active' },
      { id: '5', name: 'FM module test', jobNumber: 'Rishi', status: 'active' },
      { id: '6', name: 'MarkupTest_Virtuele', jobNumber: 'MT-VIR-1', status: 'active' },
      { id: '7', name: 'ReactMarkup04', jobNumber: 'markup04', status: 'active' },
      { id: '8', name: 'ReactMarkup05', jobNumber: 'markup05', status: 'active' },
      { id: '9', name: 'ReactMarkup06', jobNumber: 'markup06', status: 'active' },
      { id: '10', name: 'RolexTesting', jobNumber: '', status: 'active' },
    ];

    dispatch(setProjects(mockProjects));
  }, [dispatch]);

  const handleProjectSelect = (project: any) => {
    dispatch(setSelectedProject(project));
  };

  return (
    <div className="h-full bg-white border-r border-gray-200 flex flex-col">
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
          <span className="text-xs text-gray-500">16</span>
        </div>
      </div>

      {/* Project List */}
      <ScrollArea className="flex-1">
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
