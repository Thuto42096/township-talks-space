import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Users, Heart, Plus, MessageSquare, Loader2, Search, ChevronDown, Flag } from "lucide-react";
import { useKasis } from "@/hooks/useKasis";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch kasis from Supabase
  const { data: kasisData = [], isLoading, error } = useKasis();

  // Fallback data in case API fails
  const fallbackKasis = [
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

  // Use API data if available, otherwise fallback
  const allKasis = kasisData.length > 0 ? kasisData : fallbackKasis;

  // Filter kasis based on search term
  const filteredKasis = allKasis.filter(kasi =>
    kasi.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    kasi.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Scroll to kasis section
  const scrollToKasis = () => {
    const kasisSection = document.getElementById('kasis-section');
    if (kasisSection) {
      kasisSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-earth">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-primary mb-4">
            Welcome to Kasi Lami
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect with your local community. Share events, support businesses, and stay connected with your neighbors.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>Community Driven</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              <span>No Login Required</span>
            </div>
            <div className="flex items-center gap-2">
              <Flag className="w-5 h-5" />
              <span>Proudly Mzanzi</span>
            </div>
          </div>

          {/* Explore Kasis Button */}
          <Button
            onClick={scrollToKasis}
            size="lg"
            className="bg-gradient-sunset hover:opacity-90 text-white shadow-warm"
          >
            <ChevronDown className="w-5 h-5 mr-2" />
            Explore Kasis
          </Button>
        </div>

        {/* Kasis Section */}
        <div id="kasis-section" className="scroll-mt-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Choose Your Kasi
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Find your community and start connecting with your neighbors
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search for your kasi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-kasi-earth/30 focus:border-primary"
                />
              </div>
              {searchTerm && (
                <p className="text-sm text-muted-foreground mt-2">
                  {filteredKasis.length} kasi{filteredKasis.length !== 1 ? 's' : ''} found
                </p>
              )}
            </div>
          </div>

          {/* Kasi Selection Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {isLoading ? (
              <div className="col-span-full flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin mr-3" />
                <span className="text-lg text-muted-foreground">Loading communities...</span>
              </div>
            ) : error ? (
              <div className="col-span-full text-center py-12">
                <p className="text-destructive mb-4">Failed to load communities</p>
                <p className="text-muted-foreground">Using default list</p>
              </div>
            ) : filteredKasis.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                  No kasis found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try a different search term or browse all communities
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSearchTerm("")}
                  className="border-kasi-earth/20"
                >
                  Clear Search
                </Button>
              </div>
            ) : null}
            {filteredKasis.map((kasi) => (
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
          <div className="text-center mb-8">
            <Link to="/add-kasi">
              <Button variant="outline" size="lg" className="shadow-soft border-kasi-earth/20">
                <Plus className="w-5 h-5 mr-2" />
                Your kasi not here? Add Kasi
              </Button>
            </Link>
          </div>
        </div>

        {/* Test Supabase Link */}
        <div className="text-center mb-12">
          <Link to="/test-supabase">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              Test Supabase Connection
            </Button>
          </Link>
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