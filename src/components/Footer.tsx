
import { Server, Shield, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">deploys.cloud</h3>
            <p className="text-gray-400 mb-6 max-w-md">
              Enterprise-grade server infrastructure providing reliable, secure, 
              and high-performance hosting solutions for modern applications.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center text-gray-400">
                <Server className="w-5 h-5 mr-2" />
                <span className="text-sm">24/7 Monitoring</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Shield className="w-5 h-5 mr-2" />
                <span className="text-sm">Enterprise Security</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Infrastructure</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Server Specifications</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Network Status</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Security Overview</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Performance Metrics</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Information</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Technical Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">System Status</a></li>
              <li className="flex items-center text-gray-400">
                <Mail className="w-4 h-4 mr-2" />
                <span>Contact</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 deploys.cloud. Professional server infrastructure.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
