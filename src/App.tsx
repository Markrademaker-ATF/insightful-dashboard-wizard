
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import Index from "./pages/Index";
import HomePage from "./pages/HomePage"; // Updated import
import DataPage from "./pages/DataPage";
import ChannelsPage from "./pages/ChannelsPage";
import MetricsPage from "./pages/MetricsPage";
import ChannelDetailsPage from "./pages/ChannelDetailsPage";
import IncrementalPage from "./pages/IncrementalPage";
import BudgetPage from "./pages/BudgetPage";
import ABTestingPage from "./pages/ABTestingPage";
import SettingsPage from "./pages/SettingsPage";
import MethodologiesPage from "./pages/MethodologiesPage";
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
            <Route path="/" element={<HomePage />} /> {/* Changed from Index */}
            <Route path="/methodologies" element={<MethodologiesPage />} />
            <Route path="/data" element={<DataPage />} />
            <Route path="/metrics" element={<MetricsPage />} />
            <Route path="/channels" element={<ChannelsPage />} />
            <Route path="/channel-details" element={<ChannelDetailsPage />} />
            <Route path="/incremental" element={<IncrementalPage />} />
            <Route path="/budget" element={<BudgetPage />} />
            <Route path="/ab-testing" element={<ABTestingPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
