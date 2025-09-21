import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useKasis } from "@/hooks/useKasis";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch kasis from Supabase
  const { data: kasisData = [], isLoading: kasisLoading } = useKasis();

  // Fallback to hardcoded list if API fails
  const fallbackKasiOptions = [
    "Soweto", "Alexandra", "Tembisa", "Katlehong", "Evaton",
    "Sebokeng", "Daveyton", "Diepsloot", "Mamelodi", "Lenasia",
    "Khayelitsha", "Gugulethu", "Langa", "Nyanga", "Soshanguve",
    "Atteridgeville", "Vosloorus", "Thokoza", "Botshabelo",
    "Mdantsane", "KwaMashu", "Umlazi", "Chatsworth", "Phoenix",
    "Verulam", "Other"
  ];

  const kasiOptions = kasisData.length > 0
    ? kasisData.map(k => k.name).concat(["Other"])
    : fallbackKasiOptions;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!displayName.trim() || !kasi || !content.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before posting.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit({
        displayName: displayName.trim(),
        kasi,
        content: content.trim(),
        section,
        timestamp: new Date()
      });

      // Clear form only on success
      setDisplayName("");
      setKasi(kasiName ? kasiName.charAt(0).toUpperCase() + kasiName.slice(1) : "");
      setContent("");
    } catch (error) {
      // Error handling is done in the mutation
    } finally {
      setIsSubmitting(false);
    }
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
            disabled={isSubmitting || kasisLoading}
            className="w-full bg-gradient-sunset hover:opacity-90 text-white shadow-warm disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Posting...
              </>
            ) : (
              'Post to Community'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PostForm;