import { useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import ForumSection from "@/components/ForumSection";
import { Newspaper } from "lucide-react";

const News = () => {
  const { kasiName } = useParams();
  
  return (
    <div>
      <Navigation />
      <ForumSection
        section="news"
        title="News"
        description="Stay informed with local news, updates, and important community announcements"
        icon={<Newspaper className="w-6 h-6 text-white" />}
        kasiName={kasiName}
      />
    </div>
  );
};

export default News;