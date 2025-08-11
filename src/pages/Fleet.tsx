import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Users, Luggage, Star, ArrowRight } from "lucide-react";

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
      description: "Sophisticated and powerful, ideal for executives and VIP transportation."
    },
    {
      id: 3,
      name: "Cadillac Escalade",
      category: "Luxury SUV",
      passengers: 7,
      luggage: 6,
      features: ["Spacious Interior", "Entertainment System", "Premium Audio"],
      priceRange: "$180-240/hour",
      description: "Spacious luxury SUV perfect for group transportation and airport transfers."
    },
    {
      id: 4,
      name: "Lincoln Navigator",
      category: "Premium SUV",
      passengers: 8,
      luggage: 8,
      features: ["Captain Chairs", "Panoramic Roof", "Ambient Lighting"],
      priceRange: "$200-260/hour",
      description: "Ultimate comfort and space for larger groups with premium amenities."
    },
    {
      id: 5,
      name: "Stretch Limousine",
      category: "Classic Limo",
      passengers: 10,
      luggage: 4,
      features: ["Bar Service", "Privacy Partition", "LED Lighting"],
      priceRange: "$300-400/hour",
      description: "Classic elegance for weddings, proms, and special celebrations."
    },
    {
      id: 6,
      name: "Hummer H2 Stretch",
      category: "Luxury Limo",
      passengers: 14,
      luggage: 6,
      features: ["Party Lighting", "Sound System", "Mini Bar"],
      priceRange: "$400-500/hour",
      description: "Make a statement with this impressive stretch Hummer, perfect for parties."
    },
    {
      id: 7,
      name: "Rolls-Royce Phantom",
      category: "Ultra Luxury",
      passengers: 4,
      luggage: 3,
      features: ["Handcrafted Interior", "Whisper Quiet", "Starlight Headliner"],
      priceRange: "$500-600/hour",
      description: "The pinnacle of luxury automotive excellence for the most discerning clients."
    },
    {
      id: 8,
      name: "Bentley Mulsanne",
      category: "Ultra Luxury",
      passengers: 4,
      luggage: 3,
      features: ["Bespoke Interior", "Champagne Cooler", "Rear Entertainment"],
      priceRange: "$450-550/hour",
      description: "British luxury at its finest, combining tradition with modern sophistication."
    },
    {
      id: 9,
      name: "Party Bus",
      category: "Group Transport",
      passengers: 20,
      luggage: 10,
      features: ["Dance Floor", "Premium Sound", "LED Dance Lighting"],
      priceRange: "$600-800/hour",
      description: "Ultimate party experience on wheels for large groups and celebrations."
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Our Luxury Fleet</h1>
            <p className="text-xl max-w-3xl mx-auto opacity-90">
              Discover our collection of premium vehicles, each meticulously maintained 
              and equipped with the finest amenities for your comfort and satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* Fleet Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">Choose Your Vehicle</h2>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category, index) => (
                <Badge 
                  key={index} 
                  variant={index === 0 ? "default" : "outline"}
                  className="cursor-pointer hover:bg-accent hover:text-accent-foreground px-4 py-2"
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {/* Vehicle Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles.map((vehicle) => (
              <Card key={vehicle.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative">
                  <div className="h-48 bg-gradient-to-br from-primary via-accent to-secondary"></div>
                  {vehicle.popular && (
                    <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                      <Star className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  )}
                </div>
                
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl mb-1">{vehicle.name}</CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {vehicle.category}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-accent">{vehicle.priceRange}</div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm">{vehicle.description}</p>
                  
                  {/* Capacity Info */}
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4 text-accent" />
                      <span>{vehicle.passengers} passengers</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Luggage className="h-4 w-4 text-accent" />
                      <span>{vehicle.luggage} bags</span>
                    </div>
                  </div>
                  
                  {/* Features */}
                  <div>
                    <h4 className="font-medium text-sm mb-2">Key Features:</h4>
                    <div className="flex flex-wrap gap-1">
                      {vehicle.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Book Button */}
                  <Link to="/booking" className="block">
                    <Button className="w-full group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                      Book This Vehicle
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Features */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Every Vehicle Includes</h2>
            <p className="text-xl text-muted-foreground">
              Standard amenities across our entire fleet
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Professional Chauffeur</h3>
              <p className="text-sm text-muted-foreground">Licensed and experienced drivers</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Premium Comfort</h3>
              <p className="text-sm text-muted-foreground">Luxury interiors and amenities</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Door-to-Door Service</h3>
              <p className="text-sm text-muted-foreground">Pickup and drop-off anywhere</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Badge className="h-8 w-8 bg-accent text-accent-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Complimentary Extras</h3>
              <p className="text-sm text-muted-foreground">Water, WiFi, and charging ports</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-4">Ready to Experience Luxury?</h2>
          <p className="text-xl mb-8 opacity-90">
            Choose from our premium fleet and book your VIP transportation experience today.
          </p>
          <Link to="/booking">
            <Button 
              size="lg" 
              className="bg-accent text-primary hover:bg-accent/90 text-lg px-8 py-4"
            >
              Book Your Vehicle Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Fleet;