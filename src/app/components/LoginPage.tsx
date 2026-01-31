import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Keycloak from 'keycloak-js';
import { setAuth } from '@/store/slices/authSlice';
import { Loader2 } from 'lucide-react';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const keycloakConfig = {
      url: import.meta.env.VITE_KEYCLOAK_URL || 'https://securedev.virtuele.us/',
      realm: import.meta.env.VITE_KEYCLOAK_REALM || 'virtuele-dev',
      clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID || 'web-infra',
    };

    const keycloak = new Keycloak(keycloakConfig);

    keycloak
      //.init({ onLoad: "check-sso", silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`, checkLoginIframe: false})
      .init({ onLoad: 'login-required', checkLoginIframe: false })
      .then((authenticated) => {
        if (authenticated && keycloak.token) {
          // Store token
          localStorage.setItem('token', keycloak.token);
          
          // Dispatch auth action
          dispatch(
            setAuth({
              user: {
                name: keycloak.tokenParsed?.name || 'User',
                email: keycloak.tokenParsed?.email || '',
              },
              token: keycloak.token,
            })
          );

          // Navigate to company selection
          navigate('/select-company');
        }
      })
      .catch((error) => {
        console.error('Keycloak initialization error:', error);
      });
  }, [dispatch, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white p-12 rounded-2xl shadow-2xl max-w-md w-full">
        <div className="flex flex-col items-center">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-blue-600">
              <svg className="w-10 h-10" viewBox="0 0 100 100" fill="currentColor">
                <path d="M20 20 L50 10 L80 20 L50 90 Z" />
              </svg>
              <span className="text-3xl font-bold">VIRTUELE</span>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold mb-2">Secure Login</h1>
            <p className="text-gray-600">Authenticating with Keycloak...</p>
          </div>

          <div className="flex items-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
            <span className="text-gray-600">Please wait</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
