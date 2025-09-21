import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Building2, Newspaper, MessageSquare, ArrowRight, Users, Heart } from "lucide-react";

const Home = () => {
  const sections = [
    {
      path: "/events",
      title: "Events", 
      description: "Discover and share community events happening in your kasi",
      icon: <Calendar className="w-6 h-6 text-white" />,
      color: "bg-kasi-gold"
    },
    {
      path: "/businesses",
      title: "Local Businesses",
      description: "Support and promote small businesses in your neighborhood", 
      icon: <Building2 className="w-6 h-6 text-white" />,
      color: "bg-kasi-grass"
    },
    {
      path: "/news",
      title: "News",
      description: "Stay updated with the latest local news and community updates",
      icon: <Newspaper className="w-6 h-6 text-white" />,
      color: "bg-kasi-sky"
    },
    {
      path: "/chat",
      title: "General Chat",
      description: "Connect with your neighbors in our open community space",
      icon: <MessageSquare className="w-6 h-6 text-white" />,
      color: "bg-primary"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-earth">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-primary mb-4">
            Welcome to Kasi Lami
          </h1>
          <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
            Your neighborhood's digital meeting place. Connect, share, and stay informed with your community.
          </p>
          <div className="flex items-center justify-center gap-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>Community Driven</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              <span>No Login Required</span>
            </div>
          </div>
        </div>

        {/* Sections Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {sections.map((section) => (
            <Card key={section.path} className="shadow-warm border-kasi-earth/20 hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${section.color} rounded-lg flex items-center justify-center`}>
                    {section.icon}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl text-primary">{section.title}</CardTitle>
                    <CardDescription className="mt-1">{section.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <Link to={section.path}>
                  <Button className="w-full group-hover:shadow-warm transition-all">
                    Explore {section.title}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Community Guidelines */}
        <Card className="shadow-soft border-kasi-earth/20 bg-gradient-to-r from-secondary/30 to-secondary/10">
          <CardHeader>
            <CardTitle className="text-center text-primary">Community Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <Heart className="w-8 h-8 text-kasi-sunset mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Be Respectful</h3>
                <p className="text-sm text-muted-foreground">
                  Treat everyone with kindness and respect, just like you would in your neighborhood
                </p>
              </div>
              <div>
                <Users className="w-8 h-8 text-kasi-sky mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Stay Local</h3>
                <p className="text-sm text-muted-foreground">
                  Share content that's relevant to your community and neighbors
                </p>
              </div>
              <div>
                <MessageSquare className="w-8 h-8 text-kasi-grass mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Keep it Real</h3>
                <p className="text-sm text-muted-foreground">
                  Share authentic experiences and genuine community connections
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;