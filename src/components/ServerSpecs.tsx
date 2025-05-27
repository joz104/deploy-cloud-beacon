
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cpu, HardDrive, Zap, Wifi } from "lucide-react";

const ServerSpecs = () => {
  const specs = [
    {
      icon: Cpu,
      title: "Processing Power",
      specs: [
        "Intel Xeon E5-2690 v4 processors",
        "28 cores / 56 threads per server",
        "2.6GHz base, 3.5GHz boost",
        "35MB smart cache"
      ]
    },
    {
      icon: HardDrive,
      title: "Storage & Memory",
      specs: [
        "256GB DDR4 ECC registered RAM",
        "NVMe SSD primary storage",
        "10TB+ total storage capacity",
        "RAID 10 configuration"
      ]
    },
    {
      icon: Wifi,
      title: "Network Infrastructure",
      specs: [
        "10 Gbps dedicated bandwidth",
        "99.9% network uptime SLA",
        "DDoS protection up to 1 Tbps",
        "BGP routing with redundancy"
      ]
    },
    {
      icon: Zap,
      title: "Power & Cooling",
      specs: [
        "Redundant UPS systems",
        "N+1 power configuration",
        "Precision cooling systems",
        "Environmental monitoring"
      ]
    }
  ];

  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Technical Specifications
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Enterprise hardware specifications designed for maximum performance and reliability.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {specs.map((spec, index) => (
            <Card 
              key={spec.title}
              className="bg-gray-800 border-gray-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mr-4">
                    <spec.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-white">
                    {spec.title}
                  </CardTitle>
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3">
                  {spec.specs.map((item, idx) => (
                    <li key={idx} className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServerSpecs;
