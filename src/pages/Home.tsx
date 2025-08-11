import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Star, Shield, Clock, Crown, ArrowRight } from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: Crown,
      title: "Luxury Fleet",
      description: "Premium vehicles including limousines, luxury sedans, and exotic cars"
    },
    {
      icon: Shield,
      title: "Professional Drivers",
      description: "Experienced, licensed, and background-checked chauffeurs"
    },
    {
      icon: Clock,
      title: "24/7 Service",
      description: "Round-the-clock availability for all your transportation needs"
    },
    {
      icon: Star,
      title: "VIP Experience",
      description: "Personalized service tailored to your preferences and schedule"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, Tech Corp",
      content: "Exceptional service and stunning vehicles. VIP Elite Transport never disappoints.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Wedding Planner",
      content: "Their attention to detail and professionalism made our special day perfect.",
      rating: 5
    },
    {
      name: "Robert Davis",
      role: "Business Executive",
      content: "Reliable, luxurious, and always on time. My go-to for all business travel.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-primary to-accent text-white">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            VIP ELITE
            <span className="block text-accent">TRANSPORT</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Experience luxury transportation like never before. Premium vehicles, 
            professional chauffeurs, and personalized service for the most discerning clients.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking">
              <Button size="lg" className="bg-accent text-primary hover:bg-accent/90 text-lg px-8 py-4">
                Book Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/fleet">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4"
              >
                View Fleet
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose VIP Elite?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We provide unmatched luxury transportation services that exceed expectations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <feature.icon className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Premium Services</h2>
            <p className="text-xl text-muted-foreground">
              Tailored transportation solutions for every occasion
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-primary to-accent"></div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Airport Transfers</h3>
                <p className="text-muted-foreground mb-4">
                  Reliable and comfortable transportation to and from all major airports
                </p>
                <Button variant="outline" className="w-full">Learn More</Button>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-accent to-secondary"></div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Corporate Events</h3>
                <p className="text-muted-foreground mb-4">
                  Professional transportation for business meetings and corporate functions
                </p>
                <Button variant="outline" className="w-full">Learn More</Button>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-secondary to-primary"></div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Special Events</h3>
                <p className="text-muted-foreground mb-4">
                  Make your special occasions memorable with our luxury vehicles
                </p>
                <Button variant="outline" className="w-full">Learn More</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-xl text-muted-foreground">
              Don't just take our word for it
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-4">Ready for the VIP Treatment?</h2>
          <p className="text-xl mb-8 opacity-90">
            Book your luxury transportation experience today and discover what true VIP service feels like.
          </p>
          <Link to="/booking">
            <Button 
              size="lg" 
              className="bg-accent text-primary hover:bg-accent/90 text-lg px-8 py-4"
            >
              Book Your Ride Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;