import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap, ArrowLeft, AlertCircle, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await login({ email, password });
      
      if (response.success) {
        // Redirect to dashboard or main app
        navigate("/dashboard");
      } else {
        setError(response.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An unexpected error occurred. Please try again.");
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
        
        <Link to="/">
          <Button 
            className="bg-gradient-to-r from-purple-500/20 to-purple-600/30 border border-purple-400/40 text-white hover:from-purple-500/30 hover:to-purple-600/40 hover:border-purple-300/60 backdrop-blur-sm transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
      </nav>

      {/* Login Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md animate-fade-in">
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-lg p-8">
            <div className="flex items-center justify-center mb-8">
              <div className="p-3 bg-blue-500/20 rounded-full backdrop-blur-sm border border-blue-500/30">
                <Zap className="w-8 h-8 text-blue-400" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-white text-center mb-8">
              Welcome back
            </h1>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-3 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-400" />
                <span className="text-red-300 text-sm">{error}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400"
                  required
                  disabled={isSubmitting}
                />
              </div>
              
              <div>
                <Label htmlFor="password" className="text-gray-300">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400"
                  required
                  disabled={isSubmitting}
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
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

export default Login;

