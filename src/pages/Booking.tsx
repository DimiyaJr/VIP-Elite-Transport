import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Clock, MapPin, Phone, Mail, Car } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { bookingAPI } from "@/lib/api";

const vehicleOptions = [
  { value: "luxury-sedan", label: "Luxury Sedan", price: "$150-200/hr" },
  { value: "limousine", label: "Stretch Limousine", price: "$200-300/hr" },
  { value: "suv-luxury", label: "Luxury SUV", price: "$180-250/hr" },
  { value: "sports-car", label: "Sports Car", price: "$300-500/hr" },
  { value: "hummer", label: "Hummer", price: "$250-350/hr" },
  { value: "rolls-royce", label: "Rolls Royce", price: "$400-600/hr" },
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">Book Your Luxury Ride</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the ultimate in luxury transportation. Fill out the form below to reserve your premium vehicle.
            </p>
          </div>

          <Card className="shadow-2xl border-0">
            <CardHeader className="bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-t-lg">
              <CardTitle className="text-2xl">Reservation Details</CardTitle>
              <CardDescription className="text-primary-foreground/80">
                Please provide your booking information
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="full_name" className="flex items-center gap-2">
                      <span>Full Name *</span>
                    </Label>
                    <Input
                      id="full_name"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact_number" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>Contact Number *</span>
                    </Label>
                    <Input
                      id="contact_number"
                      name="contact_number"
                      type="tel"
                      value={formData.contact_number}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span>Email Address *</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>

                {/* Location Information */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="pickup_address" className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>Pickup Address *</span>
                    </Label>
                    <Textarea
                      id="pickup_address"
                      name="pickup_address"
                      value={formData.pickup_address}
                      onChange={handleInputChange}
                      placeholder="Enter pickup location with full address"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="drop_address" className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>Drop-off Address *</span>
                    </Label>
                    <Textarea
                      id="drop_address"
                      name="drop_address"
                      value={formData.drop_address}
                      onChange={handleInputChange}
                      placeholder="Enter destination address"
                      required
                    />
                  </div>
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      <span>Pickup Date *</span>
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.pickup_date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
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

                  <div className="space-y-2">
                    <Label htmlFor="pickup_time" className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>Pickup Time *</span>
                    </Label>
                    <Input
                      id="pickup_time"
                      name="pickup_time"
                      type="time"
                      value={formData.pickup_time}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                {/* Vehicle Selection */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Car className="h-4 w-4" />
                    <span>Vehicle Type *</span>
                  </Label>
                  <Select onValueChange={handleVehicleSelect} value={formData.vehicle_type}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your preferred vehicle" />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicleOptions.map((vehicle) => (
                        <SelectItem key={vehicle.value} value={vehicle.value}>
                          <div className="flex justify-between items-center w-full">
                            <span>{vehicle.label}</span>
                            <span className="text-muted-foreground text-sm ml-4">{vehicle.price}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Special Requests */}
                <div className="space-y-2">
                  <Label htmlFor="special_requests">Special Requests</Label>
                  <Textarea
                    id="special_requests"
                    name="special_requests"
                    value={formData.special_requests}
                    onChange={handleInputChange}
                    placeholder="Any special requirements or requests..."
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-lg py-3"
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting..." : "Submit Booking Request"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Booking;