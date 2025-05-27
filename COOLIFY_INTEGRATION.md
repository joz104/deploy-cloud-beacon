# Coolify Integration Guide

This project now includes integration with **Coolify**, an open-source Platform-as-a-Service (PaaS) that allows you to self-host applications, databases, and services.

## 🚀 What's New

Your login page can now authenticate directly with a Coolify instance, providing:
- **Direct API Integration** with Coolify
- **Authentication Management** using Coolify credentials
- **Dashboard Integration** to view applications, servers, and teams
- **Real-time Data** from your Coolify instance

## 📋 Prerequisites

1. **Coolify Instance**: You need a running Coolify instance
2. **API Access**: Ensure your Coolify instance has API access enabled
3. **Authentication Token**: You'll need to generate an API token from Coolify

## ⚙️ Setup Instructions

### 1. Configure Environment Variables

Create a `.env.local` file in your project root (or add to your existing `.env` file):

```bash
# Coolify Configuration
VITE_COOLIFY_BASE_URL=http://your-coolify-domain.com:8000

# For local development:
# VITE_COOLIFY_BASE_URL=http://localhost:8000
```

### 2. Generate Coolify API Token

1. Log into your Coolify dashboard
2. Navigate to **Settings** → **Keys & Tokens** → **API tokens**
3. Click **Create New Token**
4. Give it a descriptive name (e.g., "deploys.cloud Integration")
5. Set appropriate permissions:
   - For full access: `*` (all permissions)
   - For read-only: `read-only`
   - For sensitive data access: `read:sensitive` or `view:sensitive`

⚠️ **Important**: Copy and save the token immediately - you won't see it again!

### 3. Coolify API Integration Options

Since Coolify doesn't have a traditional username/password login API, there are several integration approaches:

#### Option A: API Token Authentication (Recommended)
Modify the login form to accept an API token instead of email/password:

```typescript
// In your login component
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // Set the token directly
  coolifyAPI.setToken(apiToken);
  
  // Validate the token
  const isValid = await coolifyAPI.validateToken();
  if (isValid) {
    navigate("/dashboard");
  } else {
    setError("Invalid API token");
  }
};
```

#### Option B: OAuth Integration
If your Coolify instance has OAuth configured:

1. Configure OAuth providers in Coolify (GitHub, Google, GitLab, etc.)
2. Implement OAuth flow in your React app
3. Exchange OAuth tokens for Coolify API access

#### Option C: Custom Authentication Endpoint
Create a custom authentication service that:
1. Validates credentials against your user database
2. Returns appropriate Coolify API tokens
3. Manages user permissions and team access

## 🔧 Current Implementation

The current implementation includes:

### Components Created/Modified:

1. **`src/lib/coolify-api.ts`** - Coolify API client with authentication methods
2. **`src/hooks/use-auth.tsx`** - React context for authentication state management
3. **`src/pages/Login.tsx`** - Updated login form with authentication logic
4. **`src/pages/Dashboard.tsx`** - New dashboard displaying Coolify data
5. **`src/App.tsx`** - Updated with AuthProvider and dashboard route

### Features:

- ✅ API client for Coolify integration
- ✅ Authentication state management
- ✅ Login form with error handling
- ✅ Dashboard with Coolify data display
- ✅ Token storage and validation
- ✅ Logout functionality
- ✅ Real-time connection status

## 📱 Usage

### For Users:

1. **Navigate to Login**: Go to `/login` in your application
2. **Enter Credentials**: 
   - Email: Your Coolify account email
   - Password: Your Coolify account password (or API token)
3. **Access Dashboard**: Upon successful login, you'll be redirected to `/dashboard`
4. **View Data**: See your applications, servers, and teams from Coolify
5. **Direct Access**: Click "Open Coolify Dashboard" to access the full Coolify interface

### For Developers:

```typescript
// Use the authentication hook
import { useAuth } from "@/hooks/use-auth";

const MyComponent = () => {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  // Check if user is logged in
  if (!isAuthenticated) {
    return <LoginPrompt />;
  }
  
  // Access user data
  return <div>Welcome, {user.name}!</div>;
};
```

```typescript
// Direct API calls
import { coolifyAPI } from "@/lib/coolify-api";

// Get applications
const apps = await coolifyAPI.getApplications();

// Get servers
const servers = await coolifyAPI.getServers();

// Health check
const isHealthy = await coolifyAPI.healthCheck();
```

## 🔒 Security Considerations

1. **Environment Variables**: Never commit actual Coolify URLs or tokens to version control
2. **Token Storage**: Tokens are stored in localStorage - consider more secure options for production
3. **CORS Configuration**: Ensure your Coolify instance allows requests from your domain
4. **HTTPS**: Always use HTTPS in production for secure token transmission
5. **Token Permissions**: Use least-privilege principle when generating API tokens

## 🐛 Troubleshooting

### Common Issues:

1. **Connection Failed**
   - Check `VITE_COOLIFY_BASE_URL` environment variable
   - Verify Coolify instance is accessible
   - Check network connectivity and firewall settings

2. **Authentication Failed**
   - Verify API token is correct and not expired
   - Check token permissions in Coolify dashboard
   - Ensure API access is enabled in Coolify

3. **CORS Errors**
   - Configure CORS settings in your Coolify instance
   - Add your domain to allowed origins

4. **Data Not Loading**
   - Check API token has required permissions
   - Verify API endpoints are accessible
   - Check browser console for detailed error messages

### Debug Mode:

Enable debug logging by setting:
```bash
VITE_DEBUG=true
```

## 🔄 Development Workflow

1. **Start Development Server**:
   ```bash
   npm run dev
   ```

2. **Test Authentication**:
   - Go to `/login`
   - Test with your Coolify credentials
   - Verify dashboard loads with data

3. **API Testing**:
   - Use browser dev tools to monitor API calls
   - Check network tab for request/response data
   - Verify authentication headers are included

## 🚀 Deployment

1. **Set Environment Variables** in your hosting platform
2. **Configure CORS** in your Coolify instance to allow your domain
3. **Use HTTPS** for all communication
4. **Test Connection** after deployment

## 📚 API Reference

### CoolifyAPI Methods:

- `login(credentials)` - Authenticate with email/password
- `setToken(token)` - Set API token directly
- `validateToken()` - Check if current token is valid
- `getCurrentTeam()` - Get current team information
- `getApplications()` - Fetch all applications
- `getServers()` - Fetch all servers
- `getTeams()` - Fetch all teams
- `healthCheck()` - Check Coolify instance health

### Authentication Hook:

- `useAuth()` - Access authentication state and methods
- `user` - Current user information
- `isAuthenticated` - Boolean authentication status
- `isLoading` - Loading state
- `login(credentials)` - Login function
- `logout()` - Logout function
- `checkAuth()` - Validate current authentication

## 🤝 Contributing

To contribute to the Coolify integration:

1. Fork the repository
2. Create a feature branch
3. Test with a real Coolify instance
4. Submit a pull request with detailed description

## 📄 License

This integration follows the same license as the main project.

---

**Need Help?** Open an issue or check the [Coolify Documentation](https://coolify.io/docs/) for more information about Coolify's API and features. 