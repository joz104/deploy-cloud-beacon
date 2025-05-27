
import { Button } from "@/components/ui/button";
import { LogIn, Zap } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3b82f6,transparent)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_80%_50%,#8b5cf6,transparent)]"></div>
      
      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-4 w-full">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-blue-500/20 rounded-lg backdrop-blur-sm border border-blue-500/30">
            <Zap className="w-6 h-6 text-blue-400" />
          </div>
          <span className="text-white font-bold text-xl">deploys.cloud</span>
        </div>
        
        <Button 
          variant="outline" 
          className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-300"
        >
          <LogIn className="w-4 h-4 mr-2" />
          Login
        </Button>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-blue-500/20 rounded-full backdrop-blur-sm border border-blue-500/30">
              <Zap className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Deploy with
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Lightning</span>
            <br />Speed
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            The fastest way to deploy your applications to the cloud. 
            Zero configuration, instant scaling, global edge network.
          </p>
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

export default Hero;
