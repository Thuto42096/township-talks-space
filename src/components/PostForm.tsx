import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface PostFormProps {
  section: string;
  onSubmit: (post: {
    displayName: string;
    kasi: string;
    content: string;
    section: string;
    timestamp: Date;
  }) => void;
  kasiName?: string;
}

const PostForm = ({ section, onSubmit, kasiName }: PostFormProps) => {
  const [displayName, setDisplayName] = useState("");
  const [kasi, setKasi] = useState(kasiName ? kasiName.charAt(0).toUpperCase() + kasiName.slice(1) : "");
  const [content, setContent] = useState("");

  const kasiOptions = [
    "Soweto", "Alexandra", "Tembisa", "Katlehong", "Evaton", 
    "Sebokeng", "Daveyton", "Diepsloot", "Mamelodi", "Lenasia",
    "Khayelitsha", "Gugulethu", "Langa", "Nyanga", "Soshanguve", 
    "Atteridgeville", "Vosloorus", "Thokoza", "Botshabelo", 
    "Mdantsane", "KwaMashu", "Umlazi", "Chatsworth", "Phoenix", 
    "Verulam", "Other"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!displayName.trim() || !kasi || !content.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before posting.",
        variant: "destructive"
      });
      return;
    }

    onSubmit({
      displayName: displayName.trim(),
      kasi,
      content: content.trim(),
      section,
      timestamp: new Date()
    });

    // Clear form
    setDisplayName("");
    setKasi("");
    setContent("");
    
    toast({
      title: "Post Created!",
      description: "Your post has been added to the community.",
    });
  };

  return (
    <Card className="shadow-soft border-kasi-earth/20">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-primary">
          <PlusCircle className="w-5 h-5" />
          Share with your community
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="displayName" className="block text-sm font-medium mb-2">
                Display Name
              </label>
              <Input
                id="displayName"
                placeholder="What should we call you?"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="border-kasi-earth/30 focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="kasi" className="block text-sm font-medium mb-2">
                Your Kasi
              </label>
              <Select value={kasi} onValueChange={setKasi}>
                <SelectTrigger className="border-kasi-earth/30 focus:border-primary">
                  <SelectValue placeholder={kasiName ? `Posting in ${kasiName.charAt(0).toUpperCase() + kasiName.slice(1)}` : "Select your neighborhood"} />
                </SelectTrigger>
                <SelectContent>
                  {kasiOptions.map((kasiOption) => (
                    <SelectItem key={kasiOption} value={kasiOption}>
                      {kasiOption}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <label htmlFor="content" className="block text-sm font-medium mb-2">
              Your Message
            </label>
            <Textarea
              id="content"
              placeholder={`What's happening in ${section}?`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[100px] border-kasi-earth/30 focus:border-primary resize-none"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-sunset hover:opacity-90 text-white shadow-warm"
          >
            Post to Community
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PostForm;