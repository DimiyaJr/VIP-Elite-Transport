import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Star, Shield, Clock, Crown, ArrowRight, CheckCircle, Users, Award, Zap } from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: Crown,
      title: "Luxury Fleet",
      description: "Premium vehicles including limousines, luxury sedans, and exotic cars",
      color: "from-amber-500 to-yellow-600"
    },
    {
      icon: Shield,
      title: "Professional Drivers",
      description: "Experienced, licensed, and background-checked chauffeurs",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: Clock,
      title: "24/7 Service",
      description: "Round-the-clock availability for all your transportation needs",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: Star,
      title: "VIP Experience",
      description: "Personalized service tailored to your preferences and schedule",
      color: "from-purple-500 to-violet-600"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, Tech Corp",
      content: "Exceptional service and stunning vehicles. VIP Elite Transport never disappoints. The attention to detail is remarkable.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Michael Chen",
      role: "Wedding Planner",
      content: "Their attention to detail and professionalism made our special day perfect. Highly recommend for any special occasion.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Robert Davis",
      role: "Business Executive",
      content: "Reliable, luxurious, and always on time. My go-to for all business travel. The service quality is unmatched.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    }
  ];

  const stats = [
    { number: "10+", label: "Years Experience", icon: Award },
    { number: "5000+", label: "Happy Clients", icon: Users },
    { number: "50+", label: "Luxury Vehicles", icon: Crown },
    { number: "24/7", label: "Customer Support", icon: Clock }
  ];

  const services = [
    {
      title: "Airport Transfers",
      description: "Reliable and comfortable transportation to and from all major airports with flight tracking",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["Flight Tracking", "Meet & Greet", "Luggage Assistance"]
    },
    {
      title: "Corporate Events",
      description: "Professional transportation for business meetings and corporate functions with executive service",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["Executive Service", "WiFi Available", "Privacy Guaranteed"]
    },
    {
      title: "Special Events",
      description: "Make your special occasions memorable with our luxury vehicles and personalized service",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      features: ["Red Carpet Service", "Champagne Service", "Custom Decorations"]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center hero-image">
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="absolute inset-0 pattern-overlay opacity-20"></div>
        
        <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
          <div className="fade-in-up">
            <h1 className="text-white mb-8 font-bold">
              <span className="block text-gradient">VIP ELITE</span>
              <span className="block text-accent text-5xl md:text-6xl lg:text-7xl">TRANSPORT</span>
            </h1>
          </div>
          
          <div className="fade-in-up stagger-2">
            <p className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
              Experience luxury transportation like never before. Premium vehicles, 
              professional chauffeurs, and personalized service for the most discerning clients.
            </p>
          </div>
          
          <div className="fade-in-up stagger-3">
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/booking">
                <Button className="btn-primary text-lg px-10 py-6 hover:scale-105 transition-transform">
                  Book Your Ride
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
              <Link to="/fleet">
                <Button className="btn-secondary text-lg px-10 py-6 hover:scale-105 transition-transform">
                  View Our Fleet
                </Button>
              </Link>
            </div>
          </div>

          {/* Floating Stats */}
          <div className="fade-in-up stagger-4 mt-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="glass-morphism rounded-2xl p-6 text-center hover-lift">
                  <stat.icon className="h-8 w-8 text-accent mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-white/70 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-20">
            <div className="fade-in-up">
              <h2 className="text-gradient mb-6">Why Choose VIP Elite?</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                We provide unmatched luxury transportation services that exceed expectations 
                with attention to every detail
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className={`fade-in-up stagger-${index + 1}`}>
                <Card className="text-center hover-lift glass-card border-0 h-full">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-20">
            <div className="fade-in-up">
              <h2 className="text-gradient mb-6">Our Premium Services</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Tailored transportation solutions for every occasion with uncompromising quality
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className={`fade-in-up stagger-${index + 1}`}>
                <Card className="overflow-hidden hover-lift glass-card border-0 h-full">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
                    <div className="space-y-2 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-accent" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full hover:bg-accent hover:text-white transition-colors">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-20">
            <div className="fade-in-up">
              <h2 className="text-gradient mb-6">What Our Clients Say</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Don't just take our word for it - hear from our satisfied clients
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className={`fade-in-up stagger-${index + 1}`}>
                <Card className="hover-lift glass-card border-0 h-full">
                  <CardContent className="p-8">
                    <div className="flex mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                      ))}
                    </div>
                    <blockquote className="text-muted-foreground mb-6 italic leading-relaxed">
                      "{testimonial.content}"
                    </blockquote>
                    <div className="flex items-center space-x-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding luxury-gradient relative overflow-hidden">
        <div className="absolute inset-0 diagonal-lines opacity-20"></div>
        <div className="container-custom relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="fade-in-up">
              <h2 className="text-white mb-6">Ready for the VIP Treatment?</h2>
              <p className="text-xl text-white/90 mb-12 leading-relaxed">
                Book your luxury transportation experience today and discover what true VIP service feels like. 
                Join thousands of satisfied clients who trust us with their most important journeys.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link to="/booking">
                  <Button className="bg-accent text-luxury-navy hover:bg-accent/90 text-lg px-10 py-6 hover:scale-105 transition-transform">
                    Book Your Ride Now
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-luxury-navy text-lg px-10 py-6 hover:scale-105 transition-transform">
                    Get Custom Quote
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;