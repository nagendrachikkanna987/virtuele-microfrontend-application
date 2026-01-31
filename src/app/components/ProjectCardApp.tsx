import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { 
  FileText, 
  Box, 
  Map, 
  CheckCircle, 
  Upload, 
  Settings, 
  FileImage,
  Workflow,
  ToggleRight,
} from 'lucide-react';
import { ScrollArea } from '@/app/components/ui/scroll-area';

const ProjectCardApp = () => {
  const { selectedProject } = useSelector((state: RootState) => state.project);

  const projectModules = [
    {
      icon: <FileText className="w-8 h-8 text-blue-600" />,
      title: 'Documents',
      description: 'Centralize all project documentation. Implement folder-level access control, share documents externally via links, and manage document versions and history with tags and revisions.',
      color: 'bg-blue-50',
    },
    {
      icon: <Box className="w-8 h-8 text-purple-600" />,
      title: '3D Model Extraction',
      description: 'Check for errors and fix inaccuracies in your 3D models. Compare 3D model versions for changes, enhance data with custom UDAs, and export models from Revit to Tekla.',
      color: 'bg-purple-50',
    },
    {
      icon: <Map className="w-8 h-8 text-blue-600" />,
      title: 'Map UDAs',
      description: 'Map user defined attributes (UDAs) in your 3D models to enhance the utility of your workflows and modules.',
      color: 'bg-blue-50',
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-blue-600" />,
      title: 'Model Check',
      description: 'Enhance your 3D model data clarity and perform comprehensive error checks. Detect inaccuracies and augment your models with customized UDAs embedded with documents.',
      color: 'bg-blue-50',
    },
    {
      icon: <Upload className="w-8 h-8 text-blue-600" />,
      title: 'BIM Export',
      description: 'Export your 3D models from Revit to Tekla by performing comprehensive error checks and have data clarity. Amend errors and augment your models with customized UDAs embedded with documents. Compare models and download error reports.',
      color: 'bg-blue-50',
    },
    {
      icon: <Settings className="w-8 h-8 text-purple-600" />,
      title: 'ABM Manager',
      description: 'Automatically generate ABM reports tailored to your specifications. Optimize material usage by syncing versions and plates, and track changes through comprehensive report analysis.',
      color: 'bg-purple-50',
    },
    {
      icon: <FileImage className="w-8 h-8 text-blue-600" />,
      title: 'Drawings',
      description: 'Generate and distribute design drawing sets to team members. View Shop Drawings in the 3D Model and link Part sheets. Edms, SFPs, and Change Orders for enhanced accuracy and efficiency. Facilitate external sharing and real-time data viewing on portable devices via QR codes.',
      color: 'bg-blue-50',
    },
    {
      icon: <Workflow className="w-8 h-8 text-purple-600" />,
      title: 'RFI Management',
      description: 'Customize RFI workflows to align with project requirements. Integrate RFIs within documents and models, change updates externally through web links. Automate data exchanges with Procore and BIM360 platforms.',
      color: 'bg-purple-50',
    },
  ];

  return (
    <div className="h-full bg-white border-l border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold mb-1">
          {selectedProject?.name || 'Project Modules'}
        </h2>
        <p className="text-sm text-gray-500">
          {selectedProject?.jobNumber ? `Job# ${selectedProject.jobNumber}` : 'Select a project to view modules'}
        </p>
      </div>

      <Tabs defaultValue="manage" className="flex-1 flex flex-col">
        <div className="px-4 pt-4">
          <TabsList>
            <TabsTrigger value="setup">Setup Project</TabsTrigger>
            <TabsTrigger value="manage">Manage Project</TabsTrigger>
            <TabsTrigger value="accelerate">Accelerate Project</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="manage" className="flex-1 mt-0">
          <ScrollArea className="h-full">
            <div className="p-4 grid grid-cols-2 gap-4">
              {projectModules.map((module, index) => (
                <Card 
                  key={index} 
                  className="hover:shadow-lg transition-shadow cursor-pointer group"
                >
                  <CardHeader>
                    <div className={`w-14 h-14 rounded-lg ${module.color} flex items-center justify-center mb-3`}>
                      {module.icon}
                    </div>
                    <CardTitle className="text-base flex items-center gap-2">
                      {module.title}
                      {module.title === 'ABM Manager' || module.title === 'RFI Management' ? (
                        <ToggleRight className="w-5 h-5 text-blue-600" />
                      ) : null}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-xs leading-relaxed">
                      {module.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="setup" className="flex-1">
          <div className="p-4 text-center text-gray-500">
            Setup Project modules will be displayed here
          </div>
        </TabsContent>

        <TabsContent value="accelerate" className="flex-1">
          <div className="p-4 text-center text-gray-500">
            Accelerate Project modules will be displayed here
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectCardApp;
