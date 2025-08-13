import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Clock, MapPin, Phone, Mail, Car, Crown, CheckCircle, Star } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { bookingAPI } from "@/lib/api";

const vehicleOptions = [
  { value: "luxury-sedan", label: "Luxury Sedan", price: "$150-200/hr", image: "https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
  { value: "limousine", label: "Stretch Limousine", price: "$200-300/hr", image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
  { value: "suv-luxury", label: "Luxury SUV", price: "$180-250/hr", image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
  { value: "sports-car", label: "Sports Car", price: "$300-500/hr", image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
  { value: "hummer", label: "Hummer", price: "$250-350/hr", image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
  { value: "rolls-royce", label: "Rolls Royce", price: "$400-600/hr", image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
];

const Booking = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    contact_number: '',
    email: '',
    pickup_address: '',
    drop_address: '',
    pickup_date: null,
    pickup_time: '',
    vehicle_type: '',
    special_requests: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateSelect = (date) => {
    setFormData(prev => ({
      ...prev,
      pickup_date: date
    }));
  };

  const handleVehicleSelect = (value) => {
    setFormData(prev => ({
      ...prev,
      vehicle_type: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate required fields
    const requiredFields = ['full_name', 'contact_number', 'email', 'pickup_address', 'drop_address', 'pickup_date', 'pickup_time', 'vehicle_type'];
    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      toast.error('Please fill in all required fields');
      setIsLoading(false);
      return;
    }

    try {
      // Format data for API
      const bookingData = {
        ...formData,
        pickup_date: format(formData.pickup_date, 'yyyy-MM-dd'),
      };

      const { data, error } = await bookingAPI.create(bookingData);

      if (error) {
        toast.error(error);
      } else {
        toast.success('Booking submitted successfully! We will contact you shortly.');
        // Reset form
        setFormData({
          full_name: '',
          contact_number: '',
          email: '',
          pickup_address: '',
          drop_address: '',
          pickup_date: null,
          pickup_time: '',
          vehicle_type: '',
          special_requests: ''
        });
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast.error('Failed to submit booking. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const selectedVehicle = vehicleOptions.find(v => v.value === formData.vehicle_type);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 luxury-car-bg">
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="absolute inset-0 pattern-overlay opacity-20"></div>
        
        <div className="container-custom relative z-10">
          <div className="text-center text-white">
            <div className="fade-in-up">
              <Crown className="h-16 w-16 text-accent mx-auto mb-8" />
              <h1 className="mb-8">Book Your Luxury Ride</h1>
              <p className="text-xl md:text-2xl max-w-4xl mx-auto opacity-90 leading-relaxed">
                Experience the ultimate in luxury transportation. Fill out the form below to reserve your premium vehicle 
                and enjoy a journey that exceeds all expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Form */}
              <div className="lg:col-span-2">
                <Card className="glass-card border-0 shadow-2xl">
                  <CardHeader className="luxury-gradient text-white rounded-t-2xl">
                    <CardTitle className="text-3xl flex items-center">
                      <Car className="h-8 w-8 mr-3" />
                      Reservation Details
                    </CardTitle>
                    <CardDescription className="text-white/80 text-lg">
                      Please provide your booking information for the perfect VIP experience
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                      {/* Personal Information */}
                      <div className="space-y-6">
                        <h3 className="text-xl font-bold text-gradient flex items-center">
                          <Crown className="h-5 w-5 mr-2" />
                          Personal Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <Label htmlFor="full_name" className="text-base font-semibold">
                              Full Name *
                            </Label>
                            <Input
                              id="full_name"
                              name="full_name"
                              value={formData.full_name}
                              onChange={handleInputChange}
                              placeholder="Enter your full name"
                              className="h-12 text-base"
                              required
                            />
                          </div>

                          <div className="space-y-3">
                            <Label htmlFor="contact_number" className="flex items-center text-base font-semibold">
                              <Phone className="h-4 w-4 mr-2" />
                              Contact Number *
                            </Label>
                            <Input
                              id="contact_number"
                              name="contact_number"
                              type="tel"
                              value={formData.contact_number}
                              onChange={handleInputChange}
                              placeholder="Enter your phone number"
                              className="h-12 text-base"
                              required
                            />
                          </div>

                          <div className="space-y-3 md:col-span-2">
                            <Label htmlFor="email" className="flex items-center text-base font-semibold">
                              <Mail className="h-4 w-4 mr-2" />
                              Email Address *
                            </Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="Enter your email address"
                              className="h-12 text-base"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {/* Location Information */}
                      <div className="space-y-6">
                        <h3 className="text-xl font-bold text-gradient flex items-center">
                          <MapPin className="h-5 w-5 mr-2" />
                          Journey Details
                        </h3>
                        <div className="space-y-6">
                          <div className="space-y-3">
                            <Label htmlFor="pickup_address" className="text-base font-semibold">
                              Pickup Address *
                            </Label>
                            <Textarea
                              id="pickup_address"
                              name="pickup_address"
                              value={formData.pickup_address}
                              onChange={handleInputChange}
                              placeholder="Enter pickup location with full address"
                              className="min-h-[100px] text-base"
                              required
                            />
                          </div>

                          <div className="space-y-3">
                            <Label htmlFor="drop_address" className="text-base font-semibold">
                              Drop-off Address *
                            </Label>
                            <Textarea
                              id="drop_address"
                              name="drop_address"
                              value={formData.drop_address}
                              onChange={handleInputChange}
                              placeholder="Enter destination address"
                              className="min-h-[100px] text-base"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {/* Date and Time */}
                      <div className="space-y-6">
                        <h3 className="text-xl font-bold text-gradient flex items-center">
                          <Clock className="h-5 w-5 mr-2" />
                          Schedule
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <Label className="text-base font-semibold">
                              Pickup Date *
                            </Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full h-12 justify-start text-left font-normal text-base",
                                    !formData.pickup_date && "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="mr-3 h-5 w-5" />
                                  {formData.pickup_date ? format(formData.pickup_date, "PPP") : "Select date"}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={formData.pickup_date}
                                  onSelect={handleDateSelect}
                                  disabled={(date) => date < new Date()}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </div>

                          <div className="space-y-3">
                            <Label htmlFor="pickup_time" className="text-base font-semibold">
                              Pickup Time *
                            </Label>
                            <Input
                              id="pickup_time"
                              name="pickup_time"
                              type="time"
                              value={formData.pickup_time}
                              onChange={handleInputChange}
                              className="h-12 text-base"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {/* Vehicle Selection */}
                      <div className="space-y-6">
                        <h3 className="text-xl font-bold text-gradient flex items-center">
                          <Car className="h-5 w-5 mr-2" />
                          Vehicle Selection
                        </h3>
                        <div className="space-y-3">
                          <Label className="text-base font-semibold">
                            Vehicle Type *
                          </Label>
                          <Select onValueChange={handleVehicleSelect} value={formData.vehicle_type}>
                            <SelectTrigger className="h-12 text-base">
                              <SelectValue placeholder="Select your preferred vehicle" />
                            </SelectTrigger>
                            <SelectContent>
                              {vehicleOptions.map((vehicle) => (
                                <SelectItem key={vehicle.value} value={vehicle.value}>
                                  <div className="flex items-center space-x-3 py-2">
                                    <img 
                                      src={vehicle.image} 
                                      alt={vehicle.label}
                                      className="w-12 h-8 object-cover rounded"
                                    />
                                    <div>
                                      <div className="font-medium">{vehicle.label}</div>
                                      <div className="text-sm text-muted-foreground">{vehicle.price}</div>
                                    </div>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Special Requests */}
                      <div className="space-y-3">
                        <Label htmlFor="special_requests" className="text-base font-semibold">
                          Special Requests
                        </Label>
                        <Textarea
                          id="special_requests"
                          name="special_requests"
                          value={formData.special_requests}
                          onChange={handleInputChange}
                          placeholder="Any special requirements or requests..."
                          rows={4}
                          className="text-base"
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full btn-primary text-lg py-6 hover:scale-105 transition-transform"
                        disabled={isLoading}
                      >
                        {isLoading ? "Submitting..." : "Submit Booking Request"}
                        <Crown className="ml-3 h-6 w-6" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Selected Vehicle Preview */}
                {selectedVehicle && (
                  <Card className="glass-card border-0 hover-lift">
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg mb-4 flex items-center">
                        <Star className="h-5 w-5 text-accent mr-2" />
                        Selected Vehicle
                      </h3>
                      <div className="space-y-4">
                        <img 
                          src={selectedVehicle.image} 
                          alt={selectedVehicle.label}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <div>
                          <div className="font-semibold">{selectedVehicle.label}</div>
                          <div className="text-accent font-medium">{selectedVehicle.price}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Why Choose Us */}
                <Card className="glass-card border-0">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-4 flex items-center">
                      <Crown className="h-5 w-5 text-accent mr-2" />
                      Why Choose VIP Elite?
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-accent" />
                        <span className="text-sm">Professional chauffeurs</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-accent" />
                        <span className="text-sm">Luxury vehicles</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-accent" />
                        <span className="text-sm">24/7 availability</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-accent" />
                        <span className="text-sm">Punctual service</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-accent" />
                        <span className="text-sm">Competitive pricing</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Info */}
                <Card className="glass-card border-0">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-4">Need Help?</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center space-x-3">
                        <Phone className="h-4 w-4 text-accent" />
                        <span>+1 (555) 123-4567</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="h-4 w-4 text-accent" />
                        <span>info@vipelite.com</span>
                      </div>
                      <p className="text-muted-foreground mt-3">
                        Our team is available 24/7 to assist you with your booking.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;