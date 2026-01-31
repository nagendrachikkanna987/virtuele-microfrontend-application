import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { logout } from '@/store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  HelpCircle,
  Settings,
  User,
  LogOut,
  Menu,
  ChevronDown,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import { Button } from '@/app/components/ui/button';
import {
  loadCompanies,
  setSelectedCompany,
} from '@/store/companyAuth';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const { selectedCompany, companies, isLoading, error } = useSelector(
    (state: RootState) => state.companyAuth
  );
  const { selectedProject } = useSelector((state: RootState) => state.project);

  useEffect(() => {
    if (companies.length === 0 && !isLoading && !error) {
      dispatch(loadCompanies());
    }
  }, [companies.length, dispatch, error, isLoading]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Menu className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-900" />
            <div className="flex items-center gap-2 text-blue-600">
              <svg className="w-8 h-8" viewBox="0 0 100 100" fill="currentColor">
                <path d="M20 20 L50 10 L80 20 L50 90 Z" />
              </svg>
              <span className="text-xl font-bold">VIRTUELE</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-sm text-gray-600">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                  <span className="font-medium">
                    {selectedCompany?.companyName || 'Select Company'}
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {isLoading && (
                  <DropdownMenuItem className="cursor-default">
                    Loading companies...
                  </DropdownMenuItem>
                )}
                {error && (
                  <DropdownMenuItem className="cursor-default text-red-500">
                    {error}
                  </DropdownMenuItem>
                )}
                {!isLoading && !error && companies.length === 0 && (
                  <DropdownMenuItem className="cursor-default">
                    No companies available
                  </DropdownMenuItem>
                )}
                {!isLoading &&
                  !error &&
                  companies.map((company) => (
                    <DropdownMenuItem
                      key={company.companyId}
                      onClick={() => dispatch(setSelectedCompany(company))}
                    >
                      {company.companyName}
                    </DropdownMenuItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <span className="mx-2">/</span>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                  <span className="font-medium">
                    {selectedProject?.name || '16Oct2025_01'}
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>16Oct2025_01</DropdownMenuItem>
                <DropdownMenuItem>31Oct2025_01</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <span className="mx-2">/</span>
            <span className="text-gray-400">4Pro-01</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Bell className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-900" />
          <div className="flex items-center gap-2 text-blue-600">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <Settings className="w-5 h-5 cursor-pointer hover:text-blue-700" />
          </div>
          <HelpCircle className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-900" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  <User className="w-5 h-5" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="px-2 py-1.5 text-sm font-medium">
                {user?.name || 'User'}
              </div>
              <div className="px-2 py-1.5 text-xs text-gray-500">
                {user?.email || 'user@virtuele.com'}
              </div>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
