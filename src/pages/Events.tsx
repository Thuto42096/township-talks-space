import Navigation from "@/components/Navigation";
import ForumSection from "@/components/ForumSection";
import { Calendar } from "lucide-react";

const Events = () => {
  return (
    <div>
      <Navigation />
      <ForumSection
        section="events"
        title="Events"
        description="Share and discover community events, celebrations, and gatherings in your kasi"
        icon={<Calendar className="w-6 h-6 text-white" />}
      />
    </div>
  );
};

export default Events;