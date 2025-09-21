import { useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import ForumSection from "@/components/ForumSection";
import { Building2 } from "lucide-react";

const Businesses = () => {
  const { kasiName } = useParams();
  
  return (
    <div>
      <Navigation />
      <ForumSection
        section="businesses"
        title="Local Businesses"
        description="Promote and support small businesses, services, and entrepreneurs in your neighborhood"
        icon={<Building2 className="w-6 h-6 text-white" />}
        kasiName={kasiName}
      />
    </div>
  );
};

export default Businesses;