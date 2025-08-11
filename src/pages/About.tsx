import { Card, CardContent } from "@/components/ui/card";
import { Shield, Award, Users, Clock } from "lucide-react";

const About = () => {
  const stats = [
    { number: "10+", label: "Years of Experience" },
    { number: "5000+", label: "Satisfied Clients" },
    { number: "50+", label: "Luxury Vehicles" },
    { number: "24/7", label: "Customer Support" }
  ];

  const values = [
    {
      icon: Shield,
      title: "Safety First",
      description: "All our vehicles undergo regular maintenance and safety inspections. Our drivers are thoroughly background-checked and professionally trained."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for perfection in every aspect of our service, from vehicle condition to customer interaction, ensuring an exceptional experience."
    },
    {
      icon: Users,
      title: "Personalized Service",
      description: "Every client receives personalized attention and customized service tailored to their specific needs and preferences."
    },
    {
      icon: Clock,
      title: "Reliability",
      description: "Punctuality and reliability are our hallmarks. We guarantee on-time service and are always available when you need us."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">About VIP Elite Transport</h1>
            <p className="text-xl max-w-3xl mx-auto opacity-90">
              For over a decade, we have been the premier choice for luxury transportation 
              services, setting the standard for excellence in the industry.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2010, VIP Elite Transport began with a simple vision: to provide 
                  unparalleled luxury transportation services that exceed expectations. What started 
                  as a small fleet of premium vehicles has grown into the region's most trusted 
                  name in VIP transportation.
                </p>
                <p>
                  Our founder, recognizing the need for truly exceptional transportation services, 
                  assembled a team of professionals who share the same commitment to excellence. 
                  Today, we continue to set new standards in the industry through innovation, 
                  attention to detail, and unwavering dedication to our clients.
                </p>
                <p>
                  Every member of our team, from our professional chauffeurs to our customer 
                  service representatives, is trained to deliver the VIP experience that has 
                  made us the preferred choice for discerning clients worldwide.
                </p>
              </div>
            </div>
            <div className="lg:pl-12">
              <Card className="overflow-hidden">
                <div className="h-96 bg-gradient-to-br from-primary via-accent to-secondary"></div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do and ensure that every client 
              receives the exceptional service they deserve.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <value.icon className="h-12 w-12 text-accent mb-4" />
                  <h3 className="text-2xl font-semibold mb-4">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Leadership Team</h2>
            <p className="text-xl text-muted-foreground">
              Meet the professionals who make VIP Elite Transport exceptional
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-32 h-32 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold mb-2">James Richardson</h3>
                <p className="text-accent font-medium mb-2">Founder & CEO</p>
                <p className="text-muted-foreground">
                  With over 15 years in luxury hospitality, James founded VIP Elite 
                  Transport to redefine premium transportation services.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-32 h-32 bg-gradient-to-br from-accent to-secondary rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold mb-2">Maria Santos</h3>
                <p className="text-accent font-medium mb-2">Operations Director</p>
                <p className="text-muted-foreground">
                  Maria ensures seamless operations and maintains our high standards 
                  of service quality across all departments.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-32 h-32 bg-gradient-to-br from-secondary to-primary rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold mb-2">David Chen</h3>
                <p className="text-accent font-medium mb-2">Fleet Manager</p>
                <p className="text-muted-foreground">
                  David oversees our luxury fleet maintenance and ensures every 
                  vehicle meets our pristine standards.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl opacity-90 leading-relaxed">
            "To provide an unparalleled luxury transportation experience that combines 
            safety, comfort, and elegance, while delivering personalized service that 
            exceeds our clients' expectations every time. We are committed to being 
            the premier choice for discerning individuals who value excellence."
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;