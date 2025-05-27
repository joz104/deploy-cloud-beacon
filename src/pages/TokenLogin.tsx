import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Zap, ArrowLeft, AlertCircle, Loader2, Key } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { coolifyAPI } from "@/lib/coolify-api";
import { useAuth } from "@/hooks/use-auth";

const TokenLogin = () => {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { loginWithToken } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      if (!token.trim()) {
        setError("Please enter your API token");
        setIsSubmitting(false);
        return;
      }

      // Use the new loginWithToken method
      const success = await loginWithToken(token.trim());
      
      if (success) {
        // Redirect to dashboard
        navigate("/dashboard");
      } else {
        setError("Invalid API token. Please check your token and try again.");
      }
    } catch (error) {
      console.error("Token validation error:", error);
      setError("Failed to validate token. Please check your Coolify instance connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3b82f6,transparent)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_80%_50%,#8b5cf6,transparent)]"></div>
      
      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-4 w-full">
        <Link to="/" className="flex items-center space-x-2">
          <div className="p-2 bg-blue-500/20 rounded-full backdrop-blur-sm border border-blue-500/30">
            <Zap className="w-6 h-6 text-blue-400" />
          </div>
          <span className="text-white font-bold text-xl">Deploys Cloud</span>
        </Link>
        
        <div className="flex items-center space-x-3">
          <Link to="/login">
            <Button 
              variant="outline"
              className="bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              Email Login
            </Button>
          </Link>
          <Link to="/">
            <Button 
              className="bg-gradient-to-r from-purple-500/20 to-purple-600/30 border border-purple-400/40 text-white hover:from-purple-500/30 hover:to-purple-600/40 hover:border-purple-300/60 backdrop-blur-sm transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
        </div>
      </nav>

      {/* Login Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md animate-fade-in">
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-lg p-8">
            <div className="flex items-center justify-center mb-8">
              <div className="p-3 bg-blue-500/20 rounded-full backdrop-blur-sm border border-blue-500/30">
                <Key className="w-8 h-8 text-blue-400" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-white text-center mb-4">
              API Token Login
            </h1>
            
            <p className="text-gray-400 text-center mb-8 text-sm">
              Enter your Coolify API token to access the dashboard
            </p>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-3 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-400" />
                <span className="text-red-300 text-sm">{error}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="token" className="text-gray-300">Coolify API Token</Label>
                <Textarea
                  id="token"
                  placeholder="Enter your Coolify API token (e.g., 3|WaobqX9tJQshKPuQFHsyApxuOOggg4wOfvGc9xa233c376d7)"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  className="mt-2 bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 resize-none"
                  rows={3}
                  required
                  disabled={isSubmitting}
                />
                <p className="text-xs text-gray-400 mt-1">
                  Generate this token from your Coolify dashboard: Settings → Keys & Tokens → API tokens
                </p>
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Validating Token...
                  </>
                ) : (
                  <>
                    <Key className="w-4 h-4 mr-2" />
                    Connect to Coolify
                  </>
                )}
              </Button>
            </form>
            
            {/* How to get token info */}
            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <h3 className="text-blue-300 font-medium mb-2">How to get your API token:</h3>
              <ol className="text-blue-300 text-sm space-y-1 list-decimal list-inside">
                <li>Log into your Coolify dashboard</li>
                <li>Navigate to Settings → Keys & Tokens</li>
                <li>Click "Create New Token"</li>
                <li>Set permissions (recommend "read-only" for safety)</li>
                <li>Copy the generated token and paste it above</li>
              </ol>
            </div>
            
            <p className="text-center text-gray-400 mt-6">
              Don't have a Coolify instance?{" "}
              <a 
                href="https://coolify.io/docs/installation" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Install Coolify
              </a>
            </p>
          </div>
        </div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse delay-500"></div>
      </div>
    </section>
  );
};

export default TokenLogin; 