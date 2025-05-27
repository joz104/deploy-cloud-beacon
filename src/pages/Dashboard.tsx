import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { coolifyAPI } from "@/lib/coolify-api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, LogOut, Server, Database, Layers, Users, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user, logout, isLoading: authLoading } = useAuth();
  const [dashboardData, setDashboardData] = useState({
    applications: [],
    servers: [],
    teams: [],
    isLoading: true,
    error: null as string | null,
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setDashboardData(prev => ({ ...prev, isLoading: true, error: null }));
      
      const [applications, servers, teams] = await Promise.allSettled([
        coolifyAPI.getApplications(),
        coolifyAPI.getServers(),
        coolifyAPI.getTeams(),
      ]);

      setDashboardData({
        applications: applications.status === 'fulfilled' ? applications.value : [],
        servers: servers.status === 'fulfilled' ? servers.value : [],
        teams: teams.status === 'fulfilled' ? teams.value : [],
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      setDashboardData(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to load data from Coolify',
      }));
    }
  };

  const handleLogout = () => {
    logout();
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-800/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/20 rounded-full backdrop-blur-sm border border-blue-500/30">
                <Zap className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Deploys Cloud</h1>
                <p className="text-sm text-gray-400">Coolify Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-white">{user?.name || user?.email}</p>
                <p className="text-xs text-gray-400">Team ID: {user?.team_id}</p>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome to your Coolify Dashboard</h2>
          <p className="text-gray-400">Manage your applications, servers, and deployments.</p>
        </div>

        {dashboardData.error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
            <p className="text-red-300">{dashboardData.error}</p>
            <Button
              onClick={loadDashboardData}
              variant="outline"
              size="sm"
              className="mt-2 border-red-500/50 text-red-300 hover:bg-red-500/10"
            >
              Retry
            </Button>
          </div>
        )}

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-white">
                <Layers className="w-5 h-5 mr-2 text-blue-400" />
                Applications
              </CardTitle>
              <CardDescription className="text-gray-400">
                Deployed applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {dashboardData.isLoading ? '...' : dashboardData.applications.length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-white">
                <Server className="w-5 h-5 mr-2 text-green-400" />
                Servers
              </CardTitle>
              <CardDescription className="text-gray-400">
                Connected servers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {dashboardData.isLoading ? '...' : dashboardData.servers.length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-white">
                <Users className="w-5 h-5 mr-2 text-purple-400" />
                Teams
              </CardTitle>
              <CardDescription className="text-gray-400">
                Available teams
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {dashboardData.isLoading ? '...' : dashboardData.teams.length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
              <CardDescription className="text-gray-400">
                Common tasks and operations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                className="w-full justify-start bg-blue-500/20 border border-blue-500/30 text-blue-300 hover:bg-blue-500/30"
                onClick={loadDashboardData}
                disabled={dashboardData.isLoading}
              >
                <Database className="w-4 h-4 mr-2" />
                Refresh Data
              </Button>
              <Button
                className="w-full justify-start bg-purple-500/20 border border-purple-500/30 text-purple-300 hover:bg-purple-500/30"
                asChild
              >
                <a 
                  href={`${import.meta.env.VITE_COOLIFY_BASE_URL || 'http://localhost:8000'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open Coolify Dashboard
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Integration Status</CardTitle>
              <CardDescription className="text-gray-400">
                Connection to your Coolify instance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-300">Connected to Coolify</span>
              </div>
              <p className="text-sm text-gray-400 mt-2">
                API Base URL: {import.meta.env.VITE_COOLIFY_BASE_URL || 'http://localhost:8000'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Applications */}
        {!dashboardData.isLoading && dashboardData.applications.length > 0 && (
          <Card className="mt-6 bg-slate-800/30 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Recent Applications</CardTitle>
              <CardDescription className="text-gray-400">
                Your deployed applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {dashboardData.applications.slice(0, 5).map((app: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <div>
                      <p className="text-white font-medium">{app.name || `Application ${index + 1}`}</p>
                      <p className="text-sm text-gray-400">{app.description || 'No description'}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded">
                        Active
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Dashboard; 