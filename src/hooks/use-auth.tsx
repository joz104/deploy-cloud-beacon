import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { coolifyAPI, CoolifyLoginCredentials, CoolifyAuthResponse, CoolifyUser } from '@/lib/coolify-api';
import { cloudflareAuth, CloudflareUser } from '@/lib/cloudflare-auth';

type AuthMethod = 'token' | 'cloudflare' | 'oauth' | 'credentials';

interface AuthContextType {
  user: CoolifyUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  authMethod: AuthMethod | null;
  login: (credentials: CoolifyLoginCredentials) => Promise<CoolifyAuthResponse>;
  loginWithToken: (token: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CoolifyUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authMethod, setAuthMethod] = useState<AuthMethod | null>(null);

  const isAuthenticated = !!user;

  // Check authentication status on app start
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async (): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Priority 1: Check Cloudflare Access
      if (cloudflareAuth.isCloudflareAccessEnabled()) {
        const isCloudflareAuth = await cloudflareAuth.isAuthenticated();
        if (isCloudflareAuth) {
          const cloudflareUser = await cloudflareAuth.getUserFromHeaders();
          if (cloudflareUser) {
            // Use service token for Coolify API calls
            const serviceToken = cloudflareAuth.getCoolifyServiceToken();
            if (serviceToken) {
              coolifyAPI.setToken(serviceToken);
            }
            
            // Convert Cloudflare user to Coolify user format
            const userData: CoolifyUser = {
              id: 0, // Cloudflare users don't have Coolify IDs
              name: cloudflareUser.name || cloudflareUser.email.split('@')[0],
              email: cloudflareUser.email,
              team_id: 0, // Will be determined by service token permissions
            };
            
            setUser(userData);
            setAuthMethod('cloudflare');
            setIsLoading(false);
            return true;
          }
        }
      }

      // Priority 2: Check stored token
      const token = localStorage.getItem('coolify_token');
      if (token) {
        coolifyAPI.setToken(token);
        const isValid = await coolifyAPI.validateToken();
        if (isValid) {
          // Get user information from current team
          const teamData = await coolifyAPI.getCurrentTeam();
          if (teamData) {
            const userData: CoolifyUser = {
              id: teamData.id || 1,
              name: teamData.name || 'User',
              email: teamData.email || 'user@example.com',
              team_id: teamData.id || 1,
            };
            setUser(userData);
            setAuthMethod('token');
            setIsLoading(false);
            return true;
          }
        } else {
          // Token is invalid, clear it
          coolifyAPI.clearToken();
        }
      }
      
      // No valid authentication found
      setUser(null);
      setAuthMethod(null);
      setIsLoading(false);
      return false;
    } catch (error) {
      console.error('Auth check failed:', error);
      coolifyAPI.clearToken();
      setUser(null);
      setAuthMethod(null);
      setIsLoading(false);
      return false;
    }
  };

  const login = async (credentials: CoolifyLoginCredentials): Promise<CoolifyAuthResponse> => {
    setIsLoading(true);
    try {
      const response = await coolifyAPI.login(credentials);
      
      if (response.success && response.user) {
        setUser(response.user);
        setAuthMethod('credentials');
        setIsLoading(false);
        return response;
      } else {
        setIsLoading(false);
        return response;
      }
    } catch (error) {
      console.error('Login failed:', error);
      setIsLoading(false);
      return {
        success: false,
        message: 'Login failed. Please try again.',
      };
    }
  };

  const loginWithToken = async (token: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      coolifyAPI.setToken(token);
      const isValid = await coolifyAPI.validateToken();
      
      if (isValid) {
        const teamData = await coolifyAPI.getCurrentTeam();
        if (teamData) {
          const userData: CoolifyUser = {
            id: teamData.id || 1,
            name: teamData.name || 'User',
            email: teamData.email || 'user@example.com',
            team_id: teamData.id || 1,
          };
          setUser(userData);
          setAuthMethod('token');
          setIsLoading(false);
          return true;
        }
      }
      
      coolifyAPI.clearToken();
      setIsLoading(false);
      return false;
    } catch (error) {
      console.error('Token login failed:', error);
      coolifyAPI.clearToken();
      setIsLoading(false);
      return false;
    }
  };

  const logout = async () => {
    // Handle different logout methods
    if (authMethod === 'cloudflare') {
      await cloudflareAuth.logout();
    } else {
      coolifyAPI.clearToken();
      setUser(null);
      setAuthMethod(null);
      // Redirect to home or login page
      window.location.href = '/';
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        authMethod,
        login,
        loginWithToken,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 