import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Crown, Lock, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { authAPI } from "@/lib/api";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const tokenFromUrl = searchParams.get('token');
    if (!tokenFromUrl) {
      toast.error('Invalid reset link');
      navigate('/login');
      return;
    }
    setToken(tokenFromUrl);
  }, [searchParams, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validatePassword = (password: string) => {
    const errors = [];
    if (password.length < 6) {
      errors.push('At least 6 characters');
    }
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push('One lowercase letter');
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push('One uppercase letter');
    }
    if (!/(?=.*\d)/.test(password)) {
      errors.push('One number');
    }
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token) {
      toast.error('Invalid reset token');
      return;
    }

    setIsLoading(true);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      setIsLoading(false);
      return;
    }

    // Validate password strength
    const passwordErrors = validatePassword(formData.password);
    if (passwordErrors.length > 0) {
      toast.error(`Password must have: ${passwordErrors.join(', ')}`);
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await authAPI.resetPassword(token, formData.password);
      
      if (error) {
        toast.error(error);
      } else {
        toast.success('Password reset successfully! You can now sign in.');
        navigate('/login');
      }
    } catch (error) {
      console.error('Reset password error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const passwordErrors = validatePassword(formData.password);
  const isPasswordValid = formData.password.length > 0 && passwordErrors.length === 0;
  const doPasswordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword.length > 0;

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <Card className="glass-card border-0 shadow-2xl">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="h-8 w-8 text-red-600" />
                </div>
              </div>
              <CardTitle className="text-2xl">Invalid Reset Link</CardTitle>
              <CardDescription>
                This password reset link is invalid or has expired
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Link to="/forgot-password" className="block">
                  <Button className="w-full btn-primary">
                    Request New Reset Link
                  </Button>
                </Link>
                <Link to="/login" className="block">
                  <Button variant="outline" className="w-full">
                    Back to Login
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Crown className="h-12 w-12 text-accent" />
          </div>
          <h1 className="text-3xl font-bold text-gradient">Reset Password</h1>
          <p className="text-muted-foreground mt-2">Enter your new password</p>
        </div>

        <Card className="glass-card border-0 shadow-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Create New Password</CardTitle>
            <CardDescription className="text-center">
              Choose a strong password for your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center">
                  <Lock className="h-4 w-4 mr-2" />
                  New Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your new password"
                    className="h-12 pr-12"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                
                {/* Password strength indicator */}
                {formData.password.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-xs text-muted-foreground">Password requirements:</div>
                    <div className="space-y-1">
                      {[
                        { check: formData.password.length >= 6, text: 'At least 6 characters' },
                        { check: /(?=.*[a-z])/.test(formData.password), text: 'One lowercase letter' },
                        { check: /(?=.*[A-Z])/.test(formData.password), text: 'One uppercase letter' },
                        { check: /(?=.*\d)/.test(formData.password), text: 'One number' }
                      ].map((req, index) => (
                        <div key={index} className="flex items-center space-x-2 text-xs">
                          <CheckCircle className={`h-3 w-3 ${req.check ? 'text-green-500' : 'text-gray-300'}`} />
                          <span className={req.check ? 'text-green-600' : 'text-muted-foreground'}>
                            {req.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="flex items-center">
                  <Lock className="h-4 w-4 mr-2" />
                  Confirm New Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your new password"
                    className="h-12 pr-12"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                
                {/* Password match indicator */}
                {formData.confirmPassword.length > 0 && (
                  <div className="flex items-center space-x-2 text-xs">
                    <CheckCircle className={`h-3 w-3 ${doPasswordsMatch ? 'text-green-500' : 'text-red-500'}`} />
                    <span className={doPasswordsMatch ? 'text-green-600' : 'text-red-600'}>
                      {doPasswordsMatch ? 'Passwords match' : 'Passwords do not match'}
                    </span>
                  </div>
                )}
              </div>

              <Button
                type="submit"
                className="w-full btn-primary h-12"
                disabled={isLoading || !isPasswordValid || !doPasswordsMatch}
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </Button>
            </form>

            <div className="text-center">
              <Link to="/login" className="text-sm text-muted-foreground hover:text-accent">
                ← Back to Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;