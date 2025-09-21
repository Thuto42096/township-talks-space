import Navigation from "@/components/Navigation";
import ForumSection from "@/components/ForumSection";
import { Building2 } from "lucide-react";

const Businesses = () => {
  return (
    <div>
      <Navigation />
      <ForumSection
        section="businesses"
        title="Local Businesses"
        description="Promote and support small businesses, services, and entrepreneurs in your neighborhood"
        icon={<Building2 className="w-6 h-6 text-white" />}
      />
    </div>
  );
};

export default Businesses;