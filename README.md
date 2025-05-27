# Deploy Cloud Beacon

A React-based project for cloud deployment monitoring and management with **Coolify integration**.

## Features

- Built with React 18 and TypeScript
- Vite for fast development and building
- Tailwind CSS for styling
- Shadcn/ui components
- React Query for data fetching
- React Router for navigation
- **🚀 Coolify Integration** - Direct authentication and API integration with Coolify PaaS

## 🔗 Coolify Integration

This project now includes full integration with [Coolify](https://coolify.io/), an open-source Platform-as-a-Service (PaaS). Features include:

- **🌟 Multiple Authentication Methods** - Cloudflare Zero Trust, OAuth, Token-based, and more
- **🔐 Enterprise Security** - Cloudflare Access with 2FA, device policies, and SSO
- **Dashboard Integration** - View applications, servers, and teams from your Coolify instance
- **Real-time Data** - Live connection to your Coolify API
- **Zero Token Management** - Users never handle tokens manually (with Cloudflare Access)

📖 **[Complete Coolify Integration Guide](./COOLIFY_INTEGRATION.md)**  
🔐 **[Authentication Methods Guide](./AUTHENTICATION_GUIDE.md)** ⭐ **Addresses token concerns!**

## 🎯 **Quick Authentication Setup**

### **Recommended: Cloudflare Zero Trust** (No manual tokens!)

```bash
# 1. Configure Cloudflare Access for your domain
# 2. Set environment variables:
VITE_CLOUDFLARE_ACCESS_ENABLED=true
VITE_COOLIFY_SERVICE_TOKEN=your_service_token_here

# 3. Users login with Google/GitHub/etc. - no tokens needed!
```

### **Alternative: Token Login** (Current implementation)

```bash
# Configure Coolify instance
VITE_COOLIFY_BASE_URL=http://your-coolify-domain.com:8000

# Visit /token-login and enter your Coolify API token
```

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or bun
- **Coolify Instance** (for authentication features)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   bun install
   ```

3. **Configure Authentication**:
   Create a `.env.local` file with your preferred auth method:
   ```bash
   # Option 1: Cloudflare Zero Trust (Recommended)
   VITE_CLOUDFLARE_ACCESS_ENABLED=true
   VITE_COOLIFY_SERVICE_TOKEN=your_service_token_here
   VITE_COOLIFY_BASE_URL=https://coolify.yourdomain.com
   
   # Option 2: Direct Coolify Access
   VITE_COOLIFY_BASE_URL=http://your-coolify-domain.com:8000
   ```

### Development

Start the development server:

```bash
npm run dev
```
or
```bash
bun dev
```

The application will be available at `http://localhost:8080`

### Building

To build the project for production:

```bash
npm run build
```
or
```bash
bun build
```

### Project Structure

```
src/
├── components/     # Reusable UI components
├── hooks/         # Custom React hooks (including auth)
├── lib/           # Utility functions and API clients
│   ├── coolify-api.ts      # Coolify API integration
│   ├── cloudflare-auth.ts  # Cloudflare Zero Trust auth
│   └── oauth-auth.ts       # OAuth authentication
└── pages/         # Page components (Login, Dashboard, etc.)
```

## 🚀 **Authentication Routes**

- **`/login`** - Traditional email/password login
- **`/token-login`** - API token authentication
- **`/dashboard`** - Coolify data dashboard
- **`/`** - Main landing page

**Note:** With Cloudflare Zero Trust, users are automatically redirected to the dashboard after authentication!

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Pre-built accessible components
- **React Query** - Server state management
- **React Router** - Client-side routing
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Coolify API** - PaaS integration and authentication
- **Cloudflare Access** - Zero Trust authentication (optional)

## License

This project is private and proprietary.
