import { faker } from "@faker-js/faker";

// Define the channel names
export const channelNames = {
  google: "Google Ads",
  facebook: "Facebook Ads",
  youtube: "YouTube Ads",
  tiktok: "TikTok Ads",
  email: "Email Marketing",
  affiliate: "Affiliate Marketing",
  direct: "Direct Traffic",
  referral: "Referral Traffic",
  organicSearch: "Organic Search",
  organicSocial: "Organic Social",
};

// Define the channel colors
export const channelColors = {
  google: "#4361ee",
  facebook: "#f72585",
  youtube: "#7209b7",
  tiktok: "#4cc9f0",
  email: "#f9c74f",
  affiliate: "#90be6d",
  direct: "#f8961e",
  referral: "#577590",
  organicSearch: "#4d908e",
  organicSocial: "#277da1",
};

// Function to generate random incremental data for each channel
export const generateIncrementalData = () => {
  const channels = Object.keys(channelNames);
  return channels.map((channel) => ({
    id: channel,
    name: channelNames[channel as keyof typeof channelNames],
    color: channelColors[channel as keyof typeof channelColors],
    baseline: faker.number.int({ min: 50000, max: 200000 }),
    incremental: faker.number.int({ min: 10000, max: 100000 }),
    total: faker.number.int({ min: 100000, max: 300000 }),
  }));
};

// Function to generate random performance data for each day
export const generatePerformanceData = (days: number) => {
  const channels = Object.keys(channelNames);
  const data = [];
  for (let i = 0; i < days; i++) {
    const day = {
      name: `Day ${i + 1}`,
      date: faker.date.recent({ days: i }).toLocaleDateString(),
      totalRevenue: faker.number.int({ min: 10000, max: 50000 }),
    };
    channels.forEach((channel) => {
      day[channel] = faker.number.float({ min: 0.1, max: 1, precision: 0.01 });
    });
    data.push(day);
  }
  return data;
};

// Generate Sankey diagram data showing flow from media types to channels
export function generateSankeyData() {
  // Define media categories (sources)
  const mediaCategories = [
    { name: "Paid Media", fill: "#4361ee" },
    { name: "Organic Media", fill: "#06d6a0" },
    { name: "Non-Paid Media", fill: "#ffd166" }
  ];
  
  // Define channels (targets)
  const channels = [
    { name: "Search Ads", category: "Paid Media", fill: "#4361ee", value: 850000 },
    { name: "Display Ads", category: "Paid Media", fill: "#4361ee", value: 620000 },
    { name: "Social Ads", category: "Paid Media", fill: "#4361ee", value: 780000 },
    { name: "Video Ads", category: "Paid Media", fill: "#4361ee", value: 520000 },
    
    { name: "Organic Search", category: "Organic Media", fill: "#06d6a0", value: 910000 },
    { name: "Organic Social", category: "Organic Media", fill: "#06d6a0", value: 430000 },
    { name: "Email", category: "Organic Media", fill: "#06d6a0", value: 380000 },
    
    { name: "Direct", category: "Non-Paid Media", fill: "#ffd166", value: 680000 },
    { name: "Referral", category: "Non-Paid Media", fill: "#ffd166", value: 320000 },
    { name: "Affiliates", category: "Non-Paid Media", fill: "#ffd166", value: 240000 },
  ];
  
  // Create nodes array for Sankey diagram
  const nodes = [
    ...mediaCategories,
    ...channels
  ];
  
  // Create links array for Sankey diagram
  const links = channels.map(channel => {
    const sourceIndex = mediaCategories.findIndex(cat => cat.name === channel.category);
    const targetIndex = mediaCategories.length + channels.indexOf(channel);
    
    return {
      source: sourceIndex,
      target: targetIndex,
      value: channel.value,
      fill: channel.fill
    };
  });
  
  return { nodes, links };
}
