import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, MapPin, Loader2, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useCreateKasi } from "@/hooks/useKasis";

const AddKasi = () => {
  const [kasiName, setKasiName] = useState("");
  const [kasiDescription, setKasiDescription] = useState("");
  const navigate = useNavigate();
  const createKasiMutation = useCreateKasi();

  const MAX_KASI_NAME_LENGTH = 100;
  const MAX_DESCRIPTION_LENGTH = 500;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = kasiName.trim();
    const trimmedDesc = kasiDescription.trim();

    if (!trimmedName || !trimmedDesc) {
      toast({
        title: "Missing Information",
        description: "Please fill in both the kasi name and description.",
        variant: "destructive"
      });
      return;
    }

    if (trimmedName.length > MAX_KASI_NAME_LENGTH) {
      toast({
        title: "Name Too Long",
        description: `Kasi name must be ${MAX_KASI_NAME_LENGTH} characters or less.`,
        variant: "destructive"
      });
      return;
    }

    if (trimmedDesc.length > MAX_DESCRIPTION_LENGTH) {
      toast({
        title: "Description Too Long",
        description: `Description must be ${MAX_DESCRIPTION_LENGTH} characters or less.`,
        variant: "destructive"
      });
      return;
    }

    try {
      await createKasiMutation.mutateAsync({
        name: kasiName.trim(),
        description: kasiDescription.trim()
      });

      // Clear form
      setKasiName("");
      setKasiDescription("");

      // Redirect to home page after successful submission
      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (error) {
      // Error handling is done in the mutation hook
      console.error('Error adding kasi:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-earth">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div className="text-center">
            <div className="w-16 h-16 bg-kasi-gold rounded-lg flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-primary mb-2">
              Add Your Kasi
            </h1>
            <p className="text-muted-foreground">
              Help grow our community by adding your kasi to Kasi Lami
            </p>
          </div>
        </div>

        {/* Add Kasi Form */}
        <Card className="shadow-warm border-kasi-earth/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <MapPin className="w-5 h-5" />
              Kasi Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="kasiName" className="block text-sm font-medium mb-2">
                  Kasi Name *
                </label>
                <Input
                  id="kasiName"
                  placeholder="e.g., Soweto, Alexandra, Tembisa..."
                  value={kasiName}
                  onChange={(e) => setKasiName(e.target.value)}
                  maxLength={MAX_KASI_NAME_LENGTH}
                  className="border-kasi-earth/30 focus:border-primary"
                  disabled={createKasiMutation.isPending}
                />
              </div>

              <div>
                <label htmlFor="kasiDescription" className="block text-sm font-medium mb-2">
                  Description *
                </label>
                <Textarea
                  id="kasiDescription"
                  placeholder="Brief description of your kasi (e.g., location, what makes it special...)"
                  value={kasiDescription}
                  onChange={(e) => setKasiDescription(e.target.value)}
                  maxLength={MAX_DESCRIPTION_LENGTH}
                  className="border-kasi-earth/30 focus:border-primary min-h-[100px] resize-none"
                  rows={4}
                  disabled={createKasiMutation.isPending}
                />
              </div>

              <div className="bg-secondary/30 rounded-lg p-4">
                <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Guidelines
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Use the official or commonly known name of your kasi</li>
                  <li>• Keep the description brief but informative</li>
                  <li>• Make sure your kasi isn't already listed</li>
                  <li>• Be respectful and accurate in your description</li>
                </ul>
              </div>

              <Button
                type="submit"
                disabled={createKasiMutation.isPending}
                className="w-full bg-gradient-sunset hover:opacity-90 text-white shadow-warm disabled:opacity-50"
              >
                {createKasiMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Adding Kasi...
                  </>
                ) : (
                  <>
                    <MapPin className="w-4 h-4 mr-2" />
                    Add Kasi to Community
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="mt-6 shadow-soft border-kasi-earth/20">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">What happens next?</h3>
            <p className="text-sm text-muted-foreground">
              Once you submit your kasi, it will be added to our community list and other users 
              will be able to find and join your kasi community. You'll be redirected back to 
              the home page where you can see your newly added kasi.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddKasi;
