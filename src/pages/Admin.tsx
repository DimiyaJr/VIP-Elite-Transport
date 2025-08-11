import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Car, Mail, MessageSquare, Phone, RefreshCw, Users } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { bookingAPI, contactAPI } from "@/lib/api";

interface Booking {
  id: string;
  full_name: string;
  contact_number: string;
  email: string;
  pickup_address: string;
  drop_address: string;
  pickup_date: string;
  pickup_time: string;
  vehicle_type: string;
  special_requests?: string | null;
  created_at: string;
}

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  created_at: string;
}

const Admin = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [isLoadingBookings, setIsLoadingBookings] = useState(true);
  const [isLoadingContacts, setIsLoadingContacts] = useState(true);

  // Fetch bookings
  const fetchBookings = async () => {
    setIsLoadingBookings(true);
    try {
      const { data, error } = await bookingAPI.getAll();
      if (error) {
        toast.error('Failed to fetch bookings: ' + error);
      } else {
        setBookings(data || []);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to fetch bookings');
    } finally {
      setIsLoadingBookings(false);
    }
  };

  // Fetch contact submissions
  const fetchContactSubmissions = async () => {
    setIsLoadingContacts(true);
    try {
      const { data, error } = await contactAPI.getAll();
      if (error) {
        toast.error('Failed to fetch contact submissions: ' + error);
      } else {
        setContactSubmissions(data || []);
      }
    } catch (error) {
      console.error('Error fetching contact submissions:', error);
      toast.error('Failed to fetch contact submissions');
    } finally {
      setIsLoadingContacts(false);
    }
  };

  useEffect(() => {
    fetchBookings();
    fetchContactSubmissions();
  }, []);

  const handleRefresh = () => {
    fetchBookings();
    fetchContactSubmissions();
    toast.success('Data refreshed successfully');
  };

  const formatVehicleType = (type: string) => {
    return type.split('-').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch {
      return dateString;
    }
  };

  const formatTime = (timeString: string) => {
    try {
      return format(new Date(`2000-01-01T${timeString}`), 'h:mm a');
    } catch {
      return timeString;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage bookings and contact submissions</p>
            </div>
            <Button onClick={handleRefresh} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh Data
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="flex items-center p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mr-4">
                  <Car className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{bookings.length}</p>
                  <p className="text-muted-foreground">Total Bookings</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mr-4">
                  <MessageSquare className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{contactSubmissions.length}</p>
                  <p className="text-muted-foreground">Contact Messages</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mr-4">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {bookings.filter(b => new Date(b.pickup_date) >= new Date()).length}
                  </p>
                  <p className="text-muted-foreground">Upcoming Bookings</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mr-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {new Set(bookings.map(b => b.email)).size}
                  </p>
                  <p className="text-muted-foreground">Unique Customers</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="bookings">
            <TabsList className="mb-6">
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="contacts">Contact Submissions</TabsTrigger>
            </TabsList>

            {/* Bookings Tab */}
            <TabsContent value="bookings">
              <Card>
                <CardHeader>
                  <CardTitle>All Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoadingBookings ? (
                    <div className="text-center py-8 text-muted-foreground">Loading bookings...</div>
                  ) : bookings.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">No bookings found.</div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Customer</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Pickup</TableHead>
                            <TableHead>Destination</TableHead>
                            <TableHead>Date & Time</TableHead>
                            <TableHead>Vehicle</TableHead>
                            <TableHead>Booked On</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {bookings.map(b => (
                            <TableRow key={b.id}>
                              <TableCell>
                                <div className="font-medium">{b.full_name}</div>
                                <div className="text-sm text-muted-foreground">{b.email}</div>
                              </TableCell>
                              <TableCell>
                                <div className="text-sm">{b.contact_number}</div>
                              </TableCell>
                              <TableCell className="max-w-xs truncate">{b.pickup_address}</TableCell>
                              <TableCell className="max-w-xs truncate">{b.drop_address}</TableCell>
                              <TableCell>
                                <div className="font-medium">{formatDate(b.pickup_date)}</div>
                                <div className="text-muted-foreground">{formatTime(b.pickup_time)}</div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">{formatVehicleType(b.vehicle_type)}</Badge>
                              </TableCell>
                              <TableCell className="text-sm text-muted-foreground">
                                {formatDate(b.created_at)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Contact Submissions Tab */}
            <TabsContent value="contacts">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Submissions</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoadingContacts ? (
                    <div className="text-center py-8 text-muted-foreground">Loading contact submissions...</div>
                  ) : contactSubmissions.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">No contact submissions found.</div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Message</TableHead>
                            <TableHead>Submitted On</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {contactSubmissions.map(c => (
                            <TableRow key={c.id}>
                              <TableCell>{c.name}</TableCell>
                              <TableCell>{c.email}</TableCell>
                              <TableCell>{c.phone || "-"}</TableCell>
                              <TableCell className="max-w-xs truncate">{c.message}</TableCell>
                              <TableCell className="text-sm text-muted-foreground">
                                {formatDate(c.created_at)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Admin;
