import Navigation from "@/components/Navigation";
import ForumSection from "@/components/ForumSection";
import { Newspaper } from "lucide-react";

const News = () => {
  return (
    <div>
      <Navigation />
      <ForumSection
        section="news"
        title="News"
        description="Stay informed with local news, updates, and important community announcements"
        icon={<Newspaper className="w-6 h-6 text-white" />}
      />
    </div>
  );
};

export default News;