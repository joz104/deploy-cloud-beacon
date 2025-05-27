
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Hobby",
      price: "Free",
      period: "forever",
      description: "Perfect for personal projects and learning",
      features: [
        "100GB bandwidth",
        "10 deployments per day",
        "Community support",
        "Basic analytics",
        "SSL certificates"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Pro",
      price: "$20",
      period: "per month",
      description: "For professional developers and growing teams",
      features: [
        "1TB bandwidth",
        "Unlimited deployments",
        "Priority support",
        "Advanced analytics",
        "Custom domains",
        "Team collaboration",
        "Preview deployments"
      ],
      cta: "Start Pro Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      description: "For large teams with advanced requirements",
      features: [
        "Unlimited bandwidth",
        "Dedicated support",
        "SSO integration",
        "Advanced security",
        "Custom SLA",
        "On-premise option",
        "Custom integrations"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Start free and scale as you grow. No hidden fees, no surprises.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name}
              className={`relative hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${
                plan.popular 
                  ? 'border-2 border-blue-500 bg-white' 
                  : 'border border-gray-700 bg-gray-800'
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center pb-6">
                <CardTitle className={`text-2xl font-bold ${plan.popular ? 'text-gray-900' : 'text-white'}`}>
                  {plan.name}
                </CardTitle>
                <div className="mt-4">
                  <span className={`text-4xl font-bold ${plan.popular ? 'text-gray-900' : 'text-white'}`}>
                    {plan.price}
                  </span>
                  <span className={`text-lg ${plan.popular ? 'text-gray-600' : 'text-gray-400'}`}>
                    /{plan.period}
                  </span>
                </div>
                <p className={`mt-3 ${plan.popular ? 'text-gray-600' : 'text-gray-400'}`}>
                  {plan.description}
                </p>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className={`w-5 h-5 mr-3 ${plan.popular ? 'text-green-500' : 'text-green-400'}`} />
                      <span className={plan.popular ? 'text-gray-700' : 'text-gray-300'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white' 
                      : 'bg-gray-700 hover:bg-gray-600 text-white'
                  } transition-all duration-300`}
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-400">
            All plans include 99.9% uptime SLA and 24/7 monitoring
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
