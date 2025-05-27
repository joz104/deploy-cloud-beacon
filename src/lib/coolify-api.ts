// Coolify API client
const COOLIFY_BASE_URL = import.meta.env.VITE_COOLIFY_BASE_URL || 'http://localhost:8000';
const COOLIFY_API_URL = `${COOLIFY_BASE_URL}/api/v1`;

export interface CoolifyLoginCredentials {
  email: string;
  password: string;
}

export interface CoolifyAuthResponse {
  success: boolean;
  token?: string;
  user?: {
    id: number;
    name: string;
    email: string;
    team_id: number;
  };
  message?: string;
}

export interface CoolifyUser {
  id: number;
  name: string;
  email: string;
  team_id: number;
}

class CoolifyAPI {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string = COOLIFY_API_URL) {
    this.baseUrl = baseUrl;
    this.token = localStorage.getItem('coolify_token');
  }

  // Set authentication token
  setToken(token: string) {
    this.token = token;
    localStorage.setItem('coolify_token', token);
  }

  // Remove authentication token
  clearToken() {
    this.token = null;
    localStorage.removeItem('coolify_token');
  }

  // Get authentication headers
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  // Generic API request method
  private async request(endpoint: string, options: RequestInit = {}): Promise<any> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Login method (Note: Coolify doesn't have a direct login API, this is a conceptual implementation)
  async login(credentials: CoolifyLoginCredentials): Promise<CoolifyAuthResponse> {
    try {
      // Since Coolify doesn't have a direct login API endpoint,
      // we'll simulate the authentication flow
      // In a real implementation, you might need to:
      // 1. Use OAuth if configured
      // 2. Create an API token manually and store it
      // 3. Implement a custom authentication endpoint
      
      // For demonstration, we'll validate credentials and generate a token
      const response = await fetch(`${COOLIFY_BASE_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.token) {
          this.setToken(data.token);
        }
        return data;
      } else {
        return {
          success: false,
          message: 'Invalid credentials',
        };
      }
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Connection failed. Please check your Coolify instance URL.',
      };
    }
  }

  // Validate token with Coolify API
  async validateToken(): Promise<boolean> {
    try {
      const response = await this.request('/teams/current');
      return !!response;
    } catch (error) {
      console.error('Token validation failed:', error);
      this.clearToken();
      return false;
    }
  }

  // Get current user/team information
  async getCurrentTeam(): Promise<any> {
    return this.request('/teams/current');
  }

  // Get user teams
  async getTeams(): Promise<any> {
    return this.request('/teams');
  }

  // Get applications
  async getApplications(): Promise<any> {
    return this.request('/applications');
  }

  // Get servers
  async getServers(): Promise<any> {
    return this.request('/servers');
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${COOLIFY_BASE_URL}/api/health`);
      return response.ok;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }
}

export const coolifyAPI = new CoolifyAPI(); 