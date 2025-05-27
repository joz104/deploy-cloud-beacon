
import { Card, CardContent } from "@/components/ui/card";
import { Server, Shield, Gauge, Network, Database, Cpu } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Server,
      title: "Dedicated Hardware",
      description: "High-performance dedicated servers with enterprise-grade components and redundant systems."
    },
    {
      icon: Network,
      title: "Global Network",
      description: "Multi-location infrastructure with low-latency connections and redundant network paths."
    },
    {
      icon: Shield,
      title: "Advanced Security",
      description: "Multi-layered security with DDoS protection, firewalls, and continuous monitoring."
    },
    {
      icon: Database,
      title: "Data Redundancy",
      description: "Multiple backup systems and real-time replication across geographically distributed locations."
    },
    {
      icon: Gauge,
      title: "Performance Monitoring",
      description: "Real-time performance metrics with automated alerting and proactive maintenance."
    },
    {
      icon: Cpu,
      title: "Scalable Architecture",
      description: "Containerized deployment with automatic scaling and load balancing capabilities."
    }
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Infrastructure Built for Performance
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Enterprise-grade server infrastructure designed for reliability, security, and optimal performance.
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
