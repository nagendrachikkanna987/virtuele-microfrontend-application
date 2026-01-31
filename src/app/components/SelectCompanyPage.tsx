import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/store/store';
import { Button } from '@/app/components/ui/button';
import { Check } from 'lucide-react';
import { loadCompanies, setSelectedCompany } from '@/store/companyAuth';

const SelectCompanyPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { companies, selectedCompany, isLoading, error } = useSelector(
    (state: RootState) => state.companyAuth
  );

  useEffect(() => {
    if (companies.length === 0 && !isLoading && !error) {
      dispatch(loadCompanies());
    }
  }, [companies.length, dispatch, error, isLoading]);

  const handleContinue = () => {
    if (!selectedCompany) return;
    navigate('/landing');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center">
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
        <div className="mb-6 flex justify-center">
          <div className="flex items-center gap-2 text-blue-600">
            <svg className="w-8 h-8" viewBox="0 0 100 100" fill="currentColor">
              <path d="M20 20 L50 10 L80 20 L50 90 Z" />
            </svg>
            <span className="text-2xl font-bold">VIRTUELE</span>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Select Company</h2>
          <p className="text-gray-600 text-sm">My Company</p>
        </div>

        <div className="space-y-3 mb-6">
          {isLoading && <p className="text-sm text-gray-500">Loading companies...</p>}
          {error && <p className="text-sm text-red-500">{error}</p>}
          {!isLoading && !error && companies.length === 0 && (
            <p className="text-sm text-gray-500">No companies found.</p>
          )}

          {!isLoading &&
            !error &&
            companies.map((company) => {
              const avatarText = company.logo ?? company.companyName?.charAt(0) ?? '';
              return (
                <button
                  key={company.companyId}
                  type="button"
                  onClick={() => dispatch(setSelectedCompany(company))}
                  className={`w-full flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                    selectedCompany?.companyId === company.companyId
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 bg-white hover:border-blue-300'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-2xl">
                    {avatarText}
                  </div>
                  <span className="flex-1 text-left font-medium">{company.companyName}</span>
                  {selectedCompany?.companyId === company.companyId && (
                    <Check className="w-5 h-5 text-blue-600" />
                  )}
                </button>
              );
            })}
        </div>

        <Button
          onClick={handleContinue}
          disabled={!selectedCompany || isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default SelectCompanyPage;
