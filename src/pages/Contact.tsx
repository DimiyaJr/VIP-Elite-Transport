import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock, Crown, Send, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { contactAPI } from "@/lib/api";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await contactAPI.create(formData);

      if (error) {
        toast.error(error);
      } else {
        toast.success('Message sent successfully! We will get back to you soon.');
        // Reset form
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      primary: "+1 (555) 123-4567",
      secondary: "Available 24/7",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: Mail,
      title: "Email",
      primary: "info@vipelite.com",
      secondary: "We'll respond within 1 hour",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: MapPin,
      title: "Location",
      primary: "123 Luxury Avenue",
      secondary: "Premium District, City 12345",
      color: "from-purple-500 to-violet-600"
    },
    {
      icon: Clock,
      title: "Business Hours",
      primary: "Mon - Fri: 8:00 AM - 10:00 PM",
      secondary: "Sat - Sun: 24/7 Emergency Service",
      color: "from-amber-500 to-yellow-600"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 contact-bg">
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="absolute inset-0 pattern-overlay opacity-20"></div>
        
        <div className="container-custom relative z-10">
          <div className="text-center text-white">
            <div className="fade-in-up">
              <Crown className="h-16 w-16 text-accent mx-auto mb-8" />
              <h1 className="mb-8">Contact Us</h1>
              <p className="text-xl md:text-2xl max-w-4xl mx-auto opacity-90 leading-relaxed">
                Get in touch with our team for any inquiries, bookings, or special requests. 
                We're here to provide you with exceptional service and personalized attention.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container-custom">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Information */}
              <div className="space-y-8">
                <div className="fade-in-up">
                  <h2 className="text-gradient mb-6">Get in Touch</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                    We're here to provide you with exceptional service and answer any questions 
                    you may have about our luxury transportation services.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className={`fade-in-up stagger-${index + 1}`}>
                      <Card className="glass-card border-0 hover-lift h-full">
                        <CardContent className="p-6">
                          <div className={`w-12 h-12 bg-gradient-to-r ${info.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                            <info.icon className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="font-bold text-lg mb-2">{info.title}</h3>
                          <p className="font-semibold text-foreground mb-1">{info.primary}</p>
                          <p className="text-sm text-muted-foreground">{info.secondary}</p>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>

                {/* Additional Info */}
                <div className="fade-in-up stagger-5">
                  <Card className="glass-card border-0">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-4">
                        <MessageSquare className="h-6 w-6 text-accent mr-3" />
                        <h3 className="font-bold text-xl">Why Contact Us?</h3>
                      </div>
                      <div className="space-y-3 text-muted-foreground">
                        <p>• Personalized service recommendations</p>
                        <p>• Custom pricing for special events</p>
                        <p>• Fleet availability and scheduling</p>
                        <p>• Corporate account setup</p>
                        <p>• Special accommodation requests</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Contact Form */}
              <div className="fade-in-up slide-in-right">
                <Card className="glass-card border-0 shadow-2xl">
                  <CardHeader className="luxury-gradient text-white rounded-t-2xl">
                    <CardTitle className="text-3xl flex items-center">
                      <Send className="h-8 w-8 mr-3" />
                      Send us a Message
                    </CardTitle>
                    <CardDescription className="text-white/80 text-lg">
                      Fill out the form and we'll get back to you shortly
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-3">
                        <Label htmlFor="name" className="text-base font-semibold">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          className="h-12 text-base"
                          required
                        />
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="email" className="text-base font-semibold">
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

                      <div className="space-y-3">
                        <Label htmlFor="message" className="text-base font-semibold">
                          Message *
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Tell us how we can help you..."
                          rows={6}
                          className="text-base"
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full btn-primary text-lg py-6 hover:scale-105 transition-transform"
                        disabled={isLoading}
                      >
                        {isLoading ? "Sending..." : "Send Message"}
                        <Send className="ml-3 h-6 w-6" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="fade-in-up">
              <h2 className="text-gradient mb-6">Visit Our Location</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Located in the heart of the premium district, our office is easily accessible 
                and equipped with luxury amenities for your comfort.
              </p>
            </div>
          </div>
          
          <div className="fade-in-up">
            <Card className="glass-card border-0 overflow-hidden">
              <div className="h-96 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-accent mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Interactive Map</h3>
                  <p className="text-muted-foreground">
                    123 Luxury Avenue, Premium District, City 12345
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;