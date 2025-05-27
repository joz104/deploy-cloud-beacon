// Cloudflare Access authentication handler
export interface CloudflareUser {
  email: string;
  name?: string;
  groups?: string[];
  identity_nonce?: string;
  custom?: Record<string, any>;
}

export interface CloudflareAuthHeaders {
  'cf-access-authenticated-user-email'?: string;
  'cf-access-jwt-assertion'?: string;
  'x-forwarded-user'?: string;
  'x-forwarded-groups'?: string;
  'x-forwarded-name'?: string;
}

class CloudflareAuth {
  private serviceToken: string | null = null;

  constructor() {
    // Use a service account token for Coolify API calls
    this.serviceToken = import.meta.env.VITE_COOLIFY_SERVICE_TOKEN;
  }

  // Check if we're behind Cloudflare Access
  isCloudflareAccessEnabled(): boolean {
    return import.meta.env.VITE_CLOUDFLARE_ACCESS_ENABLED === 'true';
  }

  // Get user info from Cloudflare Access headers (server-side)
  async getUserFromHeaders(): Promise<CloudflareUser | null> {
    try {
      // In a real app, this would be called on your backend
      // The backend would read the Cloudflare headers and return user info
      const response = await fetch('/api/auth/user', {
        credentials: 'include',
      });

      if (response.ok) {
        const userData = await response.json();
        return userData;
      }
      return null;
    } catch (error) {
      console.error('Failed to get user from Cloudflare headers:', error);
      return null;
    }
  }

  // Validate JWT from Cloudflare Access
  async validateCloudflareJWT(token: string): Promise<boolean> {
    try {
      // This would typically be done on your backend
      const response = await fetch('/api/auth/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      return response.ok;
    } catch (error) {
      console.error('Failed to validate Cloudflare JWT:', error);
      return false;
    }
  }

  // Get Coolify service token for API calls
  getCoolifyServiceToken(): string | null {
    return this.serviceToken;
  }

  // Check if user is authenticated via Cloudflare
  async isAuthenticated(): Promise<boolean> {
    if (!this.isCloudflareAccessEnabled()) {
      return false;
    }

    try {
      const response = await fetch('/api/auth/status', {
        credentials: 'include',
      });
      return response.ok;
    } catch (error) {
      console.error('Failed to check auth status:', error);
      return false;
    }
  }

  // Logout by clearing Cloudflare session
  async logout(): Promise<void> {
    try {
      // Redirect to Cloudflare logout URL
      const logoutUrl = import.meta.env.VITE_CLOUDFLARE_LOGOUT_URL || '/cdn-cgi/access/logout';
      window.location.href = logoutUrl;
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  }
}

export const cloudflareAuth = new CloudflareAuth(); 