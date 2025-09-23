import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Home from "./pages/Home";
import KasiForum from "./pages/KasiForum";
import Events from "./pages/Events";
import Businesses from "./pages/Businesses";
import News from "./pages/News";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import SupabaseTestPage from "./pages/SupabaseTestPage";
import AddKasi from "./pages/AddKasi";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <div>
              <Navigation />
              <Home />
            </div>
          } />
          <Route path="/kasi/:kasiName" element={<KasiForum />} />
          <Route path="/kasi/:kasiName/events" element={<Events />} />
          <Route path="/kasi/:kasiName/businesses" element={<Businesses />} />
          <Route path="/kasi/:kasiName/news" element={<News />} />
          <Route path="/kasi/:kasiName/chat" element={<Chat />} />
          <Route path="/events" element={<Events />} />
          <Route path="/businesses" element={<Businesses />} />
          <Route path="/news" element={<News />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/test-supabase" element={<SupabaseTestPage />} />
          <Route path="/add-kasi" element={<AddKasi />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
