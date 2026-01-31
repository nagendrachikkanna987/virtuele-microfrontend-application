import Header from './Header';
import Footer from './Footer';
import { useCallback, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Project, setSelectedProject } from '@/store/slices/projectSlice';
import { getUserIdFromToken, parsePositiveNumber } from '@/utils/token';

const ProjectListRemote = lazy(() => import('projectList/ProjectListRemote'));
const ProjectCardRemote = lazy(() => import('projectCard/ProjectCardRemote'));

const LandingPage = () => {
  const dispatch = useDispatch();
  const { selectedProject } = useSelector((state: RootState) => state.project);
  const { selectedCompany } = useSelector((state: RootState) => state.companyAuth);

  const companyId = selectedCompany ? parsePositiveNumber(selectedCompany.companyId, 1) : undefined;
  const userId = getUserIdFromToken() ?? 16;

  const handleProjectSelect = useCallback(
    (project: Project) => {
      dispatch(setSelectedProject(project));
    },
    [dispatch]
  );

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Fixed Header */}
      <Header />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Drawer - Project List */}
        <div className="w-80 flex-shrink-0 bg-white border-r border-gray-200">
          <Suspense fallback={<div className="p-6 text-sm text-gray-500">Loading projects…</div>}>
            <ProjectListRemote
              companyId={companyId}
              userId={userId}
              selectedProjectId={selectedProject?.id}
              onProjectSelect={handleProjectSelect}
            />
          </Suspense>
        </div>

        {/* Right Drawer - Project Cards */}
        <div className="flex-1 min-w-0 w-full md:w-auto bg-white border-l border-gray-200">
          <Suspense fallback={<div className="p-6 text-sm text-gray-500">Loading project modules…</div>}>
            <ProjectCardRemote project={selectedProject} />
          </Suspense>
        </div>
      </div>

      {/* Fixed Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
