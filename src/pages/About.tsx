import { Card, CardContent } from "@/components/ui/card";
import { Shield, Award, Users, Clock, Star, CheckCircle, Crown, Zap } from "lucide-react";

const About = () => {
  const stats = [
    { number: "10+", label: "Years of Experience", icon: Award },
    { number: "5000+", label: "Satisfied Clients", icon: Users },
    { number: "50+", label: "Luxury Vehicles", icon: Crown },
    { number: "24/7", label: "Customer Support", icon: Clock }
  ];

  const values = [
    {
      icon: Shield,
      title: "Safety First",
      description: "All our vehicles undergo regular maintenance and safety inspections. Our drivers are thoroughly background-checked and professionally trained with years of experience.",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for perfection in every aspect of our service, from vehicle condition to customer interaction, ensuring an exceptional experience that exceeds expectations.",
      color: "from-amber-500 to-yellow-600"
    },
    {
      icon: Users,
      title: "Personalized Service",
      description: "Every client receives personalized attention and customized service tailored to their specific needs and preferences, making each journey unique.",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: Clock,
      title: "Reliability",
      description: "Punctuality and reliability are our hallmarks. We guarantee on-time service and are always available when you need us, 24 hours a day.",
      color: "from-purple-500 to-violet-600"
    }
  ];

  const milestones = [
    {
      year: "2010",
      title: "Company Founded",
      description: "Started with a vision to provide unparalleled luxury transportation"
    },
    {
      year: "2015",
      title: "Fleet Expansion",
      description: "Expanded our fleet to include exotic cars and luxury SUVs"
    },
    {
      year: "2018",
      title: "5000+ Clients",
      description: "Reached milestone of serving over 5000 satisfied clients"
    },
    {
      year: "2024",
      title: "Industry Leader",
      description: "Recognized as the premier luxury transport service in the region"
    }
  ];

  const team = [
    {
      name: "James Richardson",
      role: "Founder & CEO",
      description: "With over 15 years in luxury hospitality, James founded VIP Elite Transport to redefine premium transportation services.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "Maria Santos",
      role: "Operations Director",
      description: "Maria ensures seamless operations and maintains our high standards of service quality across all departments.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "David Chen",
      role: "Fleet Manager",
      description: "David oversees our luxury fleet maintenance and ensures every vehicle meets our pristine standards.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative section-padding about-bg">
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="absolute inset-0 pattern-overlay opacity-20"></div>
        
        <div className="container-custom relative z-10">
          <div className="text-center text-white">
            <div className="fade-in-up">
              <h1 className="mb-8">About VIP Elite Transport</h1>
              <p className="text-xl md:text-2xl max-w-4xl mx-auto opacity-90 leading-relaxed">
                For over a decade, we have been the premier choice for luxury transportation 
                services, setting the standard for excellence in the industry with unmatched 
                dedication to our clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className={`text-center fade-in-up stagger-${index + 1}`}>
                <div className="glass-card rounded-2xl p-8 hover-lift">
                  <div className="w-16 h-16 bg-gradient-to-r from-accent to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-accent mb-2">{stat.number}</div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="fade-in-up slide-in-left">
              <h2 className="text-gradient mb-8">Our Story</h2>
              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
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
            <div className="fade-in-up slide-in-right">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1590178828415-4edc35b8faac?q=80&w=818&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Luxury vehicle interior"
                  className="rounded-2xl shadow-2xl w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-20">
            <div className="fade-in-up">
              <h2 className="text-gradient mb-6">Our Journey</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Key milestones that shaped our company and defined our commitment to excellence
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-accent to-yellow-500"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative fade-in-up stagger-${index + 1}`}>
                  <div className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                      <Card className="glass-card border-0 hover-lift">
                        <CardContent className="p-6">
                          <div className="text-3xl font-bold text-accent mb-2">{milestone.year}</div>
                          <h3 className="text-xl font-bold mb-3">{milestone.title}</h3>
                          <p className="text-muted-foreground">{milestone.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-accent rounded-full border-4 border-white shadow-lg"></div>
                    <div className="w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-20">
            <div className="fade-in-up">
              <h2 className="text-gradient mb-6">Our Core Values</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                These principles guide everything we do and ensure that every client 
                receives the exceptional service they deserve
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className={`fade-in-up stagger-${index + 1}`}>
                <Card className="hover-lift glass-card border-0 h-full">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                      <value.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-20">
            <div className="fade-in-up">
              <h2 className="text-gradient mb-6">Leadership Team</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Meet the professionals who make VIP Elite Transport exceptional
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className={`fade-in-up stagger-${index + 1}`}>
                <Card className="text-center hover-lift glass-card border-0 overflow-hidden">
                  <div className="relative">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                    <p className="text-accent font-semibold mb-4">{member.role}</p>
                    <p className="text-muted-foreground leading-relaxed">
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="section-padding luxury-gradient relative overflow-hidden">
        <div className="absolute inset-0 diagonal-lines opacity-20"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-5xl mx-auto text-center text-white">
            <div className="fade-in-up">
              <Crown className="h-16 w-16 text-accent mx-auto mb-8" />
              <h2 className="text-white mb-8">Our Mission</h2>
              <blockquote className="text-xl md:text-2xl opacity-90 leading-relaxed italic">
                "To provide an unparalleled luxury transportation experience that combines 
                safety, comfort, and elegance, while delivering personalized service that 
                exceeds our clients' expectations every time. We are committed to being 
                the premier choice for discerning individuals who value excellence."
              </blockquote>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;