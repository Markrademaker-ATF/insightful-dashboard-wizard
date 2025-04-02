import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { LandingPage } from "@/pages/LandingPage";
import { NotFound } from "@/pages/NotFound";
import { AnalyticsPage } from "@/pages/AnalyticsPage";
import { ChannelsPage } from "@/pages/ChannelsPage";
import { CampaignsPage } from "@/pages/CampaignsPage";
import { IncrementalPage } from "@/pages/IncrementalPage";
import ABTestingPage from "@/pages/ABTestingPage";
import IncrementalityTestPage from "./pages/IncrementalityTestPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "/analytics",
        element: <AnalyticsPage />,
      },
      {
        path: "/channels",
        element: <ChannelsPage />,
      },
      {
        path: "/campaigns",
        element: <CampaignsPage />,
      },
      {
        path: "/incremental",
        element: <IncrementalPage />,
      },
      {
        path: "/ab-testing",
        element: <ABTestingPage />,
      },
      {
        path: "/incrementality-test",
        element: <IncrementalityTestPage />,
      },
    ],
  },
]);

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
