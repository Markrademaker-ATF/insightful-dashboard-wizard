
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import Index from "./pages/Index";
import DataPage from "./pages/DataPage";
import ChannelsPage from "./pages/ChannelsPage";
import MetricsPage from "./pages/MetricsPage";
import ChannelDetailsPage from "./pages/ChannelDetailsPage";
import MultiTouchAttributionPage from "./pages/MultiTouchAttributionPage";
import IncrementalPage from "./pages/IncrementalPage";
import BudgetPage from "./pages/BudgetPage";
import ABTestingPage from "./pages/ABTestingPage";
import GuidePage from "./pages/GuidePage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/data" element={<DataPage />} />
            <Route path="/channels" element={<ChannelsPage />} />
            <Route path="/metrics" element={<MetricsPage />} />
            <Route path="/channel-details" element={<ChannelDetailsPage />} />
            <Route path="/attribution" element={<MultiTouchAttributionPage />} />
            <Route path="/incremental" element={<IncrementalPage />} />
            <Route path="/budget" element={<BudgetPage />} />
            <Route path="/ab-testing" element={<ABTestingPage />} />
            <Route path="/guide" element={<GuidePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
