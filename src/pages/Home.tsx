import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Heart, Plus, MessageSquare } from "lucide-react";

const Home = () => {
  const kasis = [
    { name: "Soweto", description: "South Western Townships" },
    { name: "Alexandra", description: "Alex Township" },
    { name: "Tembisa", description: "Ekurhuleni Township" },
    { name: "Katlehong", description: "East Rand Township" },
    { name: "Evaton", description: "Vaal Triangle Township" },
    { name: "Sebokeng", description: "Sedibeng District" },
    { name: "Daveyton", description: "Benoni Township" },
    { name: "Diepsloot", description: "Johannesburg Township" },
    { name: "Mamelodi", description: "Pretoria Township" },
    { name: "Lenasia", description: "South of Johannesburg" },
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
            Choose your kasi to connect with your local community. Share events, support businesses, and stay connected.
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

        {/* Kasi Selection Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {kasis.map((kasi) => (
            <Card key={kasi.name} className="shadow-warm border-kasi-earth/20 hover:shadow-xl transition-all duration-300 group cursor-pointer">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-kasi-gold rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl text-primary">{kasi.name}</CardTitle>
                    <CardDescription className="mt-1">{kasi.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <Link to={`/kasi/${kasi.name.toLowerCase()}`}>
                  <Button className="w-full group-hover:shadow-warm transition-all">
                    Enter {kasi.name}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add Kasi Button */}
        <div className="text-center mb-12">
          <Button variant="outline" size="lg" className="shadow-soft border-kasi-earth/20">
            <Plus className="w-5 h-5 mr-2" />
            Your kasi not here? Add Kasi
          </Button>
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