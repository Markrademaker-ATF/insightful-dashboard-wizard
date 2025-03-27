
import React from "react";
import { AnalyticsOverview } from "@/components/dashboard/AnalyticsOverview";
import { Helmet } from "react-helmet";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Analytics Dashboard - Marketing ROI Platform</title>
      </Helmet>
      <AnalyticsOverview />
    </>
  );
};

export default Index;
