import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Building2, Newspaper, MessageSquare, ArrowRight, MapPin } from "lucide-react";
import Navigation from "@/components/Navigation";

const KasiForum = () => {
  const { kasiName } = useParams();
  
  const sections = [
    {
      path: `/kasi/${kasiName}/events`,
      title: "Events", 
      description: "Discover and share community events happening in your kasi",
      icon: <Calendar className="w-6 h-6 text-white" />,
      color: "bg-kasi-gold"
    },
    {
      path: `/kasi/${kasiName}/businesses`,
      title: "Local Businesses",
      description: "Support and promote small businesses in your neighborhood", 
      icon: <Building2 className="w-6 h-6 text-white" />,
      color: "bg-kasi-grass"
    },
    {
      path: `/kasi/${kasiName}/news`,
      title: "News",
      description: "Stay updated with the latest local news and community updates",
      icon: <Newspaper className="w-6 h-6 text-white" />,
      color: "bg-kasi-sky"
    },
    {
      path: `/kasi/${kasiName}/chat`,
      title: "General Chat",
      description: "Connect with your neighbors in our open community space",
      icon: <MessageSquare className="w-6 h-6 text-white" />,
      color: "bg-primary"
    }
  ];

  const formatKasiName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <div>
      <Navigation />
      <div className="min-h-screen bg-gradient-earth">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-16 h-16 bg-kasi-gold rounded-lg flex items-center justify-center">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-primary">
                {formatKasiName(kasiName || "")} Community
              </h1>
            </div>
            <p className="text-lg text-muted-foreground mb-4">
              Connect with your neighbors and stay informed about what's happening in {formatKasiName(kasiName || "")}.
            </p>
            <Link to="/">
              <Button variant="outline" className="mb-6">
                ← Choose Different Kasi
              </Button>
            </Link>
          </div>

          {/* Sections Grid */}
          <div className="grid md:grid-cols-2 gap-6">
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
        </div>
      </div>
    </div>
  );
};

export default KasiForum;