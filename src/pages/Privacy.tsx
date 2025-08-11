import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, Lock, Users } from "lucide-react";

const Privacy = () => {
  const sections = [
    {
      icon: Shield,
      title: "Information We Collect",
      content: [
        "Personal identification information (name, email, phone number)",
        "Booking details (pickup/drop-off locations, dates, times)",
        "Payment information (processed securely through encrypted channels)",
        "Vehicle preferences and special requests",
        "Communication records for customer service purposes"
      ]
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      content: [
        "To process and fulfill your transportation bookings",
        "To communicate with you about your reservations",
        "To improve our services and customer experience",
        "To send promotional offers and updates (with your consent)",
        "To comply with legal requirements and resolve disputes"
      ]
    },
    {
      icon: Lock,
      title: "Data Protection & Security",
      content: [
        "All personal data is encrypted and stored securely",
        "Payment information is processed through PCI-compliant systems",
        "Access to customer data is restricted to authorized personnel only",
        "Regular security audits and updates to protect against threats",
        "Data is backed up regularly to prevent loss"
      ]
    },
    {
      icon: Users,
      title: "Information Sharing",
      content: [
        "We do not sell, trade, or rent your personal information to third parties",
        "Information may be shared with trusted partners only to fulfill services",
        "Legal authorities may receive information when required by law",
        "Anonymous, aggregated data may be used for analytics and reporting",
        "Service providers (payment processors, communication tools) with strict confidentiality agreements"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-xl max-w-3xl mx-auto opacity-90">
              Your privacy and data security are our top priorities. Learn how we collect, 
              use, and protect your personal information.
            </p>
          </div>
        </div>
      </section>

      {/* Last Updated */}
      <section className="py-8 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-sm text-muted-foreground">
                Last Updated: December 2024 | Effective Date: January 1, 2024
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Our Commitment to Privacy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                At VIP Elite Transport, we understand that your privacy is fundamental to your trust in our services. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you 
                use our luxury transportation services, visit our website, or interact with our mobile applications.
              </p>
              <p className="text-muted-foreground">
                By using our services, you consent to the data practices described in this policy. If you do not 
                agree with the practices described in this policy, please do not use our services.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Main Sections */}
      <section className="py-12 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {sections.map((section, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-3">
                  <section.icon className="h-6 w-6 text-accent" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Additional Policies */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Cookies and Tracking Technologies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We use cookies and similar tracking technologies to enhance your experience on our website:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• <strong>Essential Cookies:</strong> Required for basic website functionality</li>
                <li>• <strong>Performance Cookies:</strong> Help us understand how visitors interact with our website</li>
                <li>• <strong>Functionality Cookies:</strong> Remember your preferences and settings</li>
                <li>• <strong>Marketing Cookies:</strong> Used to deliver relevant advertisements (with your consent)</li>
              </ul>
              <p className="text-muted-foreground">
                You can control cookie settings through your browser preferences, though disabling certain cookies 
                may affect website functionality.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Your Rights and Choices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                You have several rights regarding your personal information:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• <strong>Access:</strong> Request copies of your personal data</li>
                <li>• <strong>Rectification:</strong> Request correction of inaccurate or incomplete data</li>
                <li>• <strong>Erasure:</strong> Request deletion of your personal data (subject to legal requirements)</li>
                <li>• <strong>Portability:</strong> Request transfer of your data to another service provider</li>
                <li>• <strong>Opt-out:</strong> Unsubscribe from marketing communications at any time</li>
              </ul>
              <p className="text-muted-foreground">
                To exercise these rights, please contact us at privacy@vipelite.com or +1 (555) 123-4567.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Data Retention</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                We retain your personal information only as long as necessary to fulfill the purposes for which it was collected:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• <strong>Booking Records:</strong> Retained for 7 years for tax and legal compliance</li>
                <li>• <strong>Customer Communications:</strong> Retained for 3 years for service improvement</li>
                <li>• <strong>Marketing Data:</strong> Retained until you opt-out or withdraw consent</li>
                <li>• <strong>Website Analytics:</strong> Anonymized and retained for 2 years</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our services are not directed to children under 13 years of age. We do not knowingly collect 
                personal information from children under 13. If we become aware that we have collected personal 
                information from a child under 13, we will take steps to delete such information promptly.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">International Transfers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Your information may be transferred to and processed in countries other than your own. We ensure 
                that such transfers are conducted in accordance with applicable data protection laws and that 
                appropriate safeguards are in place to protect your personal information.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Changes to This Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. 
                We will notify you of any material changes by posting the new Privacy Policy on our website and updating 
                the "Last Updated" date. Your continued use of our services after such changes constitutes acceptance 
                of the updated policy.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-primary-foreground text-primary">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Contact Us About Privacy</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p>
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2">
                <p><strong>Email:</strong> privacy@vipelite.com</p>
                <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                <p><strong>Mail:</strong> VIP Elite Transport, Privacy Officer<br />
                123 Luxury Drive, Downtown Business District<br />
                Metropolitan City, State 12345</p>
              </div>
              <p className="text-sm text-muted-foreground">
                We will respond to all privacy inquiries within 30 days.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Privacy;