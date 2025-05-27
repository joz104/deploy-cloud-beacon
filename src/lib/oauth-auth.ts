// OAuth authentication handler for Coolify
interface OAuthProvider {
  name: string;
  clientId: string;
  redirectUri: string;
  scope?: string;
}

interface OAuthConfig {
  github?: OAuthProvider;
  google?: OAuthProvider;
  microsoft?: OAuthProvider;
}

class OAuthAuth {
  private config: OAuthConfig;
  private coolifyBaseUrl: string;

  constructor() {
    this.coolifyBaseUrl = import.meta.env.VITE_COOLIFY_BASE_URL || 'http://localhost:8000';
    this.config = {
      github: {
        name: 'GitHub',
        clientId: import.meta.env.VITE_GITHUB_CLIENT_ID || '',
        redirectUri: `${window.location.origin}/auth/callback`,
        scope: 'user:email',
      },
      google: {
        name: 'Google',
        clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
        redirectUri: `${window.location.origin}/auth/callback`,
        scope: 'openid email profile',
      },
    };
  }

  // Start OAuth flow with Coolify
  initiateOAuthFlow(provider: keyof OAuthConfig): void {
    const oauthUrl = `${this.coolifyBaseUrl}/auth/${provider}`;
    window.location.href = oauthUrl;
  }

  // Handle OAuth callback
  async handleOAuthCallback(code: string, state?: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.coolifyBaseUrl}/auth/callback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, state }),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        if (data.token) {
          // Store the token for API calls
          localStorage.setItem('coolify_token', data.token);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('OAuth callback failed:', error);
      return false;
    }
  }

  // Get available OAuth providers
  getAvailableProviders(): Array<keyof OAuthConfig> {
    return Object.keys(this.config).filter(
      (key) => this.config[key as keyof OAuthConfig]?.clientId
    ) as Array<keyof OAuthConfig>;
  }
}

export const oauthAuth = new OAuthAuth(); 