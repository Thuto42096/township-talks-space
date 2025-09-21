import Navigation from "@/components/Navigation";
import ForumSection from "@/components/ForumSection";
import { MessageSquare } from "lucide-react";

const Chat = () => {
  return (
    <div>
      <Navigation />
      <ForumSection
        section="chat"
        title="General Chat"
        description="Connect with your neighbors and have casual conversations about daily life"
        icon={<MessageSquare className="w-6 h-6 text-white" />}
      />
    </div>
  );
};

export default Chat;