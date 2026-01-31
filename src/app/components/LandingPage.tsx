import Header from './Header';
import Footer from './Footer';
import ProjectListApp from './ProjectListApp';
import ProjectCardApp from './ProjectCardApp';

const LandingPage = () => {
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Fixed Header */}
      <Header />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Drawer - Project List */}
        <div className="w-80 flex-shrink-0">
          <ProjectListApp />
        </div>

        {/* Main Center Content Area */}
        {/* <div className="flex-1 bg-white overflow-auto">
          <div className="p-8">
            <div className="text-center py-12">
              <h1 className="text-3xl font-bold mb-4">Welcome to Virtuele</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Your enterprise-grade microfrontend platform for managing projects, 
                documents, and 3D models. Select a project from the left panel to view 
                available modules in the right drawer.
              </p>
            </div>
          </div>
        </div> */}

        {/* Right Drawer - Project Cards */}
        <div className="flex-1 min-w-0 w-full md:w-auto">
          <ProjectCardApp />
        </div>
      </div>

      {/* Fixed Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
