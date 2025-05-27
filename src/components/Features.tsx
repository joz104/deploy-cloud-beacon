
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Globe, Shield, GitBranch, Gauge, Cpu } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Zap,
      title: "Instant Deployments",
      description: "Deploy your code in seconds with our lightning-fast build pipeline and global CDN."
    },
    {
      icon: Globe,
      title: "Global Edge Network",
      description: "Serve your apps from 300+ locations worldwide for unmatched performance."
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Built-in DDoS protection, SSL certificates, and SOC 2 compliance."
    },
    {
      icon: GitBranch,
      title: "Git Integration",
      description: "Automatic deployments from GitHub, GitLab, and Bitbucket repositories."
    },
    {
      icon: Gauge,
      title: "Auto Scaling",
      description: "Handle millions of requests with automatic horizontal and vertical scaling."
    },
    {
      icon: Cpu,
      title: "Zero Config",
      description: "Deploy any framework without configuration. We handle the complexity."
    }
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Everything you need to ship faster
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built for modern development teams who demand speed, reliability, and simplicity.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md bg-white"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-8">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl w-fit mb-6">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
