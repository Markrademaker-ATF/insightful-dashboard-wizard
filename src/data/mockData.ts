
// Channel colors
export const channelColors = {
  search: "#4361ee",
  social: "#3a0ca3",
  email: "#7209b7",
  display: "#f72585",
  video: "#4cc9f0",
  affiliate: "#4895ef",
  direct: "#560bad",
  referral: "#480ca8"
};

export const channelNames = {
  search: "Search",
  social: "Social Media",
  email: "Email Marketing",
  display: "Display Ads",
  video: "Video",
  affiliate: "Affiliate",
  direct: "Direct",
  referral: "Referral"
};

// Mock data functions
export function generatePerformanceData(days = 30) {
  const data = [];
  const channels = Object.keys(channelColors);
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  for (let i = 0; i < days; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + i);
    
    const dateStr = currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    const entry: Record<string, any> = {
      name: dateStr,
      date: currentDate.toISOString(),
    };
    
    let totalRevenue = 0;
    
    channels.forEach(channel => {
      // Base value with some randomness
      const baseValue = 1000 + Math.random() * 2000;
      
      // Add weekly patterns
      const dayOfWeek = currentDate.getDay();
      const weekendEffect = dayOfWeek === 0 || dayOfWeek === 6 ? 0.8 : 1;
      
      // Add growth trend
      const growthFactor = 1 + (i / days) * 0.2;
      
      // Channel-specific adjustments
      let channelValue = baseValue * weekendEffect * growthFactor;
      
      // Add some channel-specific patterns
      if (channel === 'social') {
        // Social performs better on weekends
        channelValue *= dayOfWeek === 0 || dayOfWeek === 6 ? 1.3 : 1;
      } else if (channel === 'email') {
        // Email campaigns often sent on Tuesday/Thursday
        channelValue *= dayOfWeek === 2 || dayOfWeek === 4 ? 1.4 : 1;
      }
      
      // Add some randomness
      channelValue *= 0.85 + Math.random() * 0.3;
      
      // Round to whole number
      channelValue = Math.round(channelValue);
      
      entry[channel] = channelValue;
      totalRevenue += channelValue;
    });
    
    entry.totalRevenue = totalRevenue;
    data.push(entry);
  }
  
  return data;
}

export function generateChannelBreakdown() {
  const channels = Object.keys(channelColors);
  
  return channels.map(channel => {
    const revenue = 10000 + Math.random() * 90000;
    const cost = revenue * (0.3 + Math.random() * 0.3);
    const roas = revenue / cost;
    
    return {
      name: channelNames[channel as keyof typeof channelNames],
      id: channel,
      revenue: Math.round(revenue),
      cost: Math.round(cost),
      roas: parseFloat(roas.toFixed(2)),
      conversion: parseFloat((Math.random() * 5).toFixed(2)),
      cpa: Math.round(100 + Math.random() * 200),
    };
  });
}

export function generateBudgetAllocation() {
  const channels = Object.keys(channelColors);
  let totalBudget = 0;
  
  const allocation = channels.map(channel => {
    const budget = 5000 + Math.random() * 50000;
    totalBudget += budget;
    
    return {
      name: channelNames[channel as keyof typeof channelNames],
      id: channel,
      budget: Math.round(budget),
      color: channelColors[channel as keyof typeof channelColors]
    };
  });
  
  // Convert to percentages and format for pie chart
  return allocation.map(item => ({
    name: item.name,
    value: item.budget,
    color: item.color
  }));
}

export function generateIncrementalData() {
  const channels = Object.keys(channelColors);
  
  return channels.map(channel => {
    const baseline = 10000 + Math.random() * 30000;
    const incremental = baseline * (0.3 + Math.random() * 0.7);
    
    return {
      name: channelNames[channel as keyof typeof channelNames],
      id: channel,
      baseline: Math.round(baseline),
      incremental: Math.round(incremental),
      total: Math.round(baseline + incremental),
      color: channelColors[channel as keyof typeof channelColors]
    };
  });
}

export function generateBudgetRecommendations() {
  const channels = Object.keys(channelColors);
  
  return channels.map(channel => {
    const currentBudget = 10000 + Math.random() * 50000;
    let recommendedChange = -0.2 + Math.random() * 0.4; // Between -20% and +20%
    
    // Make some channels have bigger recommendations
    if (['search', 'social', 'video'].includes(channel)) {
      recommendedChange = Math.random() * 0.3; // 0% to 30% increase
    }
    
    if (['display', 'affiliate'].includes(channel)) {
      recommendedChange = -0.3 + Math.random() * 0.15; // -30% to -15% decrease
    }
    
    const recommendedBudget = currentBudget * (1 + recommendedChange);
    
    return {
      name: channelNames[channel as keyof typeof channelNames],
      id: channel,
      currentBudget: Math.round(currentBudget),
      recommendedBudget: Math.round(recommendedBudget),
      change: parseFloat((recommendedChange * 100).toFixed(1)),
      impact: parseFloat((Math.random() * 10 + 1).toFixed(1)),
      color: channelColors[channel as keyof typeof channelColors]
    };
  });
}
