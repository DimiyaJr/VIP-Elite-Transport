import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Users, Luggage, Star, ArrowRight, CheckCircle, Crown, Shield, Zap } from "lucide-react";

const Fleet = () => {
  const vehicles = [
    {
      id: 1,
      name: "Mercedes S-Class",
      category: "Luxury Sedan",
      passengers: 4,
      luggage: 3,
      features: ["Leather Interior", "Climate Control", "Premium Sound"],
      priceRange: "$150-200/hour",
      description: "The epitome of luxury and comfort, perfect for business meetings and special occasions.",
      image: "https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      popular: true
    },
    {
      id: 2,
      name: "BMW 7 Series",
      category: "Executive Sedan",
      passengers: 4,
      luggage: 3,
      features: ["Executive Package", "WiFi", "Massage Seats"],
      priceRange: "$140-180/hour",
      description: "Sophisticated and powerful, ideal for executives and VIP transportation.",
      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      name: "Cadillac Escalade",
      category: "Luxury SUV",
      passengers: 7,
      luggage: 6,
      features: ["Spacious Interior", "Entertainment System", "Premium Audio"],
      priceRange: "$180-240/hour",
      description: "Spacious luxury SUV perfect for group transportation and airport transfers.",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      name: "Lincoln Navigator",
      category: "Premium SUV",
      passengers: 8,
      luggage: 8,
      features: ["Captain Chairs", "Panoramic Roof", "Ambient Lighting"],
      priceRange: "$200-260/hour",
      description: "Ultimate comfort and space for larger groups with premium amenities.",
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      name: "Stretch Limousine",
      category: "Classic Limo",
      passengers: 10,
      luggage: 4,
      features: ["Bar Service", "Privacy Partition", "LED Lighting"],
      priceRange: "$300-400/hour",
      description: "Classic elegance for weddings, proms, and special celebrations.",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      name: "Hummer H2 Stretch",
      category: "Luxury Limo",
      passengers: 14,
      luggage: 6,
      features: ["Party Lighting", "Sound System", "Mini Bar"],
      priceRange: "$400-500/hour",
      description: "Make a statement with this impressive stretch Hummer, perfect for parties.",
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 7,
      name: "Rolls-Royce Phantom",
      category: "Ultra Luxury",
      passengers: 4,
      luggage: 3,
      features: ["Handcrafted Interior", "Whisper Quiet", "Starlight Headliner"],
      priceRange: "$500-600/hour",
      description: "The pinnacle of luxury automotive excellence for the most discerning clients.",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 8,
      name: "Bentley Mulsanne",
      category: "Ultra Luxury",
      passengers: 4,
      luggage: 3,
      features: ["Bespoke Interior", "Champagne Cooler", "Rear Entertainment"],
      priceRange: "$450-550/hour",
      description: "British luxury at its finest, combining tradition with modern sophistication.",
      image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 9,
      name: "Party Bus",
      category: "Group Transport",
      passengers: 20,
      luggage: 10,
      features: ["Dance Floor", "Premium Sound", "LED Dance Lighting"],
      priceRange: "$600-800/hour",
      description: "Ultimate party experience on wheels for large groups and celebrations.",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const categories = [
    "All Vehicles",
    "Luxury Sedan",
    "Executive Sedan", 
    "Luxury SUV",
    "Premium SUV",
    "Classic Limo",
    "Luxury Limo",
    "Ultra Luxury",
    "Group Transport"
  ];

  const fleetFeatures = [
    {
      icon: Users,
      title: "Professional Chauffeur",
      description: "Licensed and experienced drivers"
    },
    {
      icon: Star,
      title: "Premium Comfort",
      description: "Luxury interiors and amenities"
    },
    {
      icon: Shield,
      title: "Safety Certified",
      description: "Regular inspections and maintenance"
    },
    {
      icon: Zap,
      title: "Modern Technology",
      description: "WiFi, charging ports, and entertainment"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative section-padding fleet-bg">
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="absolute inset-0 pattern-overlay opacity-20"></div>
        
        <div className="container-custom relative z-10">
          <div className="text-center text-white">
            <div className="fade-in-up">
              <h1 className="mb-8">Our Luxury Fleet</h1>
              <p className="text-xl md:text-2xl max-w-4xl mx-auto opacity-90 leading-relaxed">
                Discover our collection of premium vehicles, each meticulously maintained 
                and equipped with the finest amenities for your comfort and satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Grid */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container-custom">
          {/* Category Filter */}
          <div className="mb-16">
            <div className="fade-in-up">
              <h2 className="text-gradient text-center mb-8">Choose Your Vehicle</h2>
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category, index) => (
                  <Badge 
                    key={index} 
                    variant={index === 0 ? "default" : "outline"}
                    className="cursor-pointer hover:bg-accent hover:text-white px-6 py-3 text-sm font-medium transition-all hover:scale-105"
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Vehicle Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles.map((vehicle, index) => (
              <div key={vehicle.id} className={`fade-in-up stagger-${(index % 6) + 1}`}>
                <Card className="overflow-hidden hover-lift glass-card border-0 h-full group">
                  <div className="relative overflow-hidden">
                    <img 
                      src={vehicle.image} 
                      alt={vehicle.name}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    {vehicle.popular && (
                      <Badge className="absolute top-4 left-4 bg-accent text-white shadow-lg">
                        <Star className="h-3 w-3 mr-1" />
                        Most Popular
                      </Badge>
                    )}
                    <div className="absolute top-4 right-4">
                      <div className="glass-morphism rounded-full px-3 py-1">
                        <span className="text-white font-semibold text-sm">{vehicle.priceRange}</span>
                      </div>
                    </div>
                  </div>
                  
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl mb-2">{vehicle.name}</CardTitle>
                        <Badge variant="outline" className="text-xs font-medium">
                          {vehicle.category}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <p className="text-muted-foreground leading-relaxed">{vehicle.description}</p>
                    
                    {/* Capacity Info */}
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-2">
                        <Users className="h-5 w-5 text-accent" />
                        <span className="font-medium">{vehicle.passengers} passengers</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Luggage className="h-5 w-5 text-accent" />
                        <span className="font-medium">{vehicle.luggage} bags</span>
                      </div>
                    </div>
                    
                    {/* Features */}
                    <div>
                      <h4 className="font-semibold mb-3">Key Features:</h4>
                      <div className="space-y-2">
                        {vehicle.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-accent" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Book Button */}
                    <Link to="/booking" className="block">
                      <Button className="w-full btn-primary group-hover:scale-105 transition-transform">
                        Book This Vehicle
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Features */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="fade-in-up">
              <h2 className="text-gradient mb-6">Every Vehicle Includes</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Standard amenities across our entire fleet to ensure your comfort and satisfaction
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {fleetFeatures.map((feature, index) => (
              <div key={index} className={`text-center fade-in-up stagger-${index + 1}`}>
                <Card className="glass-card border-0 hover-lift h-full">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-accent to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-bold text-lg mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
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
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="fade-in-up">
              <Crown className="h-16 w-16 text-accent mx-auto mb-8" />
              <h2 className="text-white mb-6">Ready to Experience Luxury?</h2>
              <p className="text-xl opacity-90 mb-12 leading-relaxed">
                Choose from our premium fleet and book your VIP transportation experience today. 
                Every journey with us is designed to exceed your expectations.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link to="/booking">
                  <Button className="bg-accent text-luxury-navy hover:bg-accent/90 text-lg px-10 py-6 hover:scale-105 transition-transform">
                    Book Your Vehicle Now
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

export default Fleet;