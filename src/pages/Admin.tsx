import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Car, Mail, MessageSquare, Phone, RefreshCw, Users, Shield, UserCheck } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { bookingAPI, contactAPI, adminAPI } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

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
  user_id?: number;
  created_at: string;
}

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  user_id?: number;
  user_name?: string;
  user_email?: string;
  created_at: string;
}

interface User {
  id: number;
  full_name: string;
  email: string;
  phone?: string;
  role: 'user' | 'admin';
  auth_provider: 'local' | 'google';
  email_verified: boolean;
  created_at: string;
  last_login?: string;
  is_active: boolean;
}

const Admin = () => {
  const { user: currentUser } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoadingBookings, setIsLoadingBookings] = useState(true);
  const [isLoadingContacts, setIsLoadingContacts] = useState(true);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);

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

  // Fetch users
  const fetchUsers = async () => {
    setIsLoadingUsers(true);
    try {
      const { data, error } = await adminAPI.getUsers();
      if (error) {
        toast.error('Failed to fetch users: ' + error);
      } else {
        setUsers(data || []);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    } finally {
      setIsLoadingUsers(false);
    }
  };

  // Update user role
  const updateUserRole = async (userId: number, newRole: 'user' | 'admin') => {
    try {
      const { data, error } = await adminAPI.updateUserRole(userId, newRole);
      if (error) {
        toast.error('Failed to update user role: ' + error);
      } else {
        toast.success('User role updated successfully');
        fetchUsers(); // Refresh users list
      }
    } catch (error) {
      console.error('Error updating user role:', error);
      toast.error('Failed to update user role');
    }
  };

  useEffect(() => {
    fetchBookings();
    fetchContactSubmissions();
    fetchUsers();
  }, []);

  const handleRefresh = () => {
    fetchBookings();
    fetchContactSubmissions();
    fetchUsers();
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
              <p className="text-muted-foreground">Manage bookings, users, and contact submissions</p>
              <p className="text-sm text-muted-foreground mt-1">Welcome back, {currentUser?.full_name}</p>
            </div>
            <Button onClick={handleRefresh} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh Data
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
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
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mr-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{users.length}</p>
                  <p className="text-muted-foreground">Total Users</p>
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
                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mr-4">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {users.filter(u => u.role === 'admin').length}
                  </p>
                  <p className="text-muted-foreground">Admin Users</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="bookings">
            <TabsList className="mb-6">
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="contacts">Contact Submissions</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
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
                            <TableHead>User ID</TableHead>
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
                              <TableCell>
                                {b.user_id ? (
                                  <Badge variant="secondary">#{b.user_id}</Badge>
                                ) : (
                                  <span className="text-muted-foreground">-</span>
                                )}
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
                            <TableHead>User Account</TableHead>
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
                                {c.user_name ? (
                                  <div>
                                    <div className="font-medium">{c.user_name}</div>
                                    <div className="text-sm text-muted-foreground">{c.user_email}</div>
                                  </div>
                                ) : (
                                  <span className="text-muted-foreground">Anonymous</span>
                                )}
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

            {/* Users Tab */}
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoadingUsers ? (
                    <div className="text-center py-8 text-muted-foreground">Loading users...</div>
                  ) : users.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">No users found.</div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Auth Provider</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Last Login</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {users.map(u => (
                            <TableRow key={u.id}>
                              <TableCell>
                                <div className="font-medium">{u.full_name}</div>
                                <div className="text-sm text-muted-foreground">ID: {u.id}</div>
                              </TableCell>
                              <TableCell>
                                <div className="text-sm">{u.email}</div>
                                {u.phone && <div className="text-sm text-muted-foreground">{u.phone}</div>}
                              </TableCell>
                              <TableCell>
                                <Badge variant={u.role === 'admin' ? 'default' : 'secondary'}>
                                  {u.role === 'admin' ? (
                                    <>
                                      <Shield className="h-3 w-3 mr-1" />
                                      Admin
                                    </>
                                  ) : (
                                    <>
                                      <UserCheck className="h-3 w-3 mr-1" />
                                      User
                                    </>
                                  )}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">
                                  {u.auth_provider === 'google' ? 'Google' : 'Local'}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  <Badge variant={u.is_active ? 'default' : 'destructive'}>
                                    {u.is_active ? 'Active' : 'Inactive'}
                                  </Badge>
                                  {u.email_verified && (
                                    <Badge variant="outline" className="text-green-600">
                                      Verified
                                    </Badge>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell className="text-sm text-muted-foreground">
                                {u.last_login ? formatDate(u.last_login) : 'Never'}
                              </TableCell>
                              <TableCell>
                                {u.id !== currentUser?.id && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => updateUserRole(u.id, u.role === 'admin' ? 'user' : 'admin')}
                                  >
                                    {u.role === 'admin' ? 'Make User' : 'Make Admin'}
                                  </Button>
                                )}
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
