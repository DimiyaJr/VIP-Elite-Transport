import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail, MapPin, Crown, Star, Shield, Clock } from "lucide-react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Fleet", href: "/fleet" },
    { name: "Book Now", href: "/booking" },
    { name: "Contact", href: "/contact" },
    { name: "Admin", href: "/admin" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "glass-card shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container-custom">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Crown className="h-10 w-10 text-accent transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-accent/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="hidden sm:block">
                <div className="text-2xl font-bold text-gradient">VIP ELITE</div>
                <div className="text-xs font-medium text-muted-foreground tracking-widest">
                  TRANSPORT
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative text-sm font-medium transition-all duration-300 hover:text-accent group ${
                    location.pathname === item.href ? "text-accent" : "text-foreground"
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${
                      location.pathname === item.href ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </Link>
              ))}
            </nav>

            {/* Contact Info & CTA */}
            <div className="hidden xl:flex items-center space-x-6">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2 hover:text-accent transition-colors">
                  <Phone className="h-4 w-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
              </div>
              <Button asChild className="btn-primary">
                <Link to="/booking">Book Now</Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden relative z-10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="relative w-6 h-6">
                <span
                  className={`absolute block w-6 h-0.5 bg-current transition-all duration-300 ${
                    isMenuOpen ? "rotate-45 top-3" : "top-1"
                  }`}
                ></span>
                <span
                  className={`absolute block w-6 h-0.5 bg-current transition-all duration-300 top-3 ${
                    isMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                ></span>
                <span
                  className={`absolute block w-6 h-0.5 bg-current transition-all duration-300 ${
                    isMenuOpen ? "-rotate-45 top-3" : "top-5"
                  }`}
                ></span>
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="glass-morphism m-4 rounded-2xl p-6 space-y-4">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block py-3 px-4 text-lg font-medium transition-all duration-300 rounded-xl hover:bg-accent/10 hover:text-accent ${
                  location.pathname === item.href ? "text-accent bg-accent/10" : "text-foreground"
                } fade-in-up stagger-${index + 1}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/20">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <Button asChild className="w-full btn-primary">
                <Link to="/booking" onClick={() => setIsMenuOpen(false)}>
                  Book Now
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20">{children}</main>

      {/* Footer */}
      <footer className="relative overflow-hidden bg-gradient-to-br from-[#0f1b2b] via-[#1c2a44] to-[#ffd700] text-white">
        {/* Optional: remove the overlay or make it transparent dark */}
        {/* <div className="absolute inset-0 pattern-overlay opacity-20 bg-black/20"></div> */}
        <div className="relative z-10 section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              {/* Company Info */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center space-x-3">
                  <Crown className="h-12 w-12 text-accent" />
                  <div>
                    <div className="text-3xl font-bold text-white">VIP ELITE</div>
                    <div className="text-accent font-medium tracking-widest">TRANSPORT</div>
                  </div>
                </div>
                <p className="text-white/90 text-lg leading-relaxed max-w-md">
                  Providing luxury transportation services for VIP clients since 2010.
                  Experience the ultimate in comfort, style, and reliability.
                </p>

                {/* Contact Info */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                      <Phone className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <div className="font-semibold">+1 (555) 123-4567</div>
                      <div className="text-sm text-white/70">Available 24/7</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                      <Mail className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <div className="font-semibold">info@vipelite.com</div>
                      <div className="text-sm text-white/70">Quick response guaranteed</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <div className="font-semibold">123 Luxury Avenue</div>
                      <div className="text-sm text-white/70">Premium District, City 12345</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-accent">Quick Links</h3>
                <ul className="space-y-3">
                  {navigation.slice(0, 5).map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className="text-white/80 hover:text-accent transition-all duration-300 hover:translate-x-2 transform inline-block"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-accent">Our Services</h3>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-accent" />
                    <span>Airport Transfers</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-accent" />
                    <span>Corporate Events</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-accent" />
                    <span>Wedding Transportation</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-accent" />
                    <span>City Tours</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-accent" />
                    <span>Special Occasions</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/20 py-8 mt-8">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <p className="text-white/70 text-center md:text-left">
                  © 2024 VIP Elite Transport. All rights reserved.
                </p>
                <div className="flex items-center space-x-6">
                  <Link to="/privacy" className="text-white/70 hover:text-accent transition-colors">
                    Privacy Policy
                  </Link>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-white/70">
                      <Shield className="h-4 w-4" />
                      <span className="text-sm">Secure & Licensed</span>
                    </div>
                    <div className="flex items-center space-x-2 text-white/70">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">24/7 Service</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
