
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { 
  Calendar, 
  Clock, 
  CalendarDays, 
  Check, 
  Target, 
  ChevronRight, 
  ChevronDown, 
  BarChart3, 
  Users, 
  Star,
  DollarSign
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface CampaignEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: "launch" | "milestone" | "update" | "report";
  status: "completed" | "active" | "upcoming";
  performance?: {
    revenue?: number;
    conversions?: number;
    roas?: number;
  };
}

interface CampaignTimelineProps {
  loading?: boolean;
  events?: CampaignEvent[];
}

export const CampaignTimeline: React.FC<CampaignTimelineProps> = ({
  loading = false,
  events = []
}) => {
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
  
  const toggleEvent = (eventId: string) => {
    if (expandedEvent === eventId) {
      setExpandedEvent(null);
    } else {
      setExpandedEvent(eventId);
    }
  };
  
  // Generate mock events if none are provided
  const timelineEvents = events.length > 0 ? events : [
    {
      id: "event1",
      date: "2023-06-01",
      title: "Summer Campaign Launch",
      description: "Initial launch of our Summer Sale campaign across all digital channels.",
      type: "launch",
      status: "completed",
      performance: {
        revenue: 124500,
        conversions: 2840,
        roas: 3.6
      }
    },
    {
      id: "event2",
      date: "2023-06-15",
      title: "Mid-Month Performance Review",
      description: "Analysis of first two weeks performance data. Adjustments made to ad spend allocation based on initial results.",
      type: "report",
      status: "completed",
      performance: {
        revenue: 178600,
        conversions: 3920,
        roas: 4.1
      }
    },
    {
      id: "event3",
      date: "2023-07-01",
      title: "Campaign Expansion",
      description: "Extended campaign to include new social media platforms and increased budget for best performing channels.",
      type: "update",
      status: "completed",
      performance: {
        revenue: 245800,
        conversions: 5240,
        roas: 3.8
      }
    },
    {
      id: "event4",
      date: "2023-07-15",
      title: "10,000 Conversions Milestone",
      description: "Campaign reached 10,000 total conversions, exceeding mid-point targets by 15%.",
      type: "milestone",
      status: "completed",
      performance: {
        revenue: 512400,
        conversions: 10000,
        roas: 4.5
      }
    },
    {
      id: "event5",
      date: "2023-08-01",
      title: "Final Performance Review",
      description: "Complete analysis of campaign performance across all channels. Preparation of insights report for future campaigns.",
      type: "report",
      status: "active",
      performance: {
        revenue: 728300,
        conversions: 14950,
        roas: 4.2
      }
    },
    {
      id: "event6",
      date: "2023-08-15",
      title: "Fall Campaign Planning",
      description: "Strategic planning session for upcoming Fall promotion based on Summer campaign learnings.",
      type: "update",
      status: "upcoming",
      performance: {
        revenue: 0,
        conversions: 0,
        roas: 0
      }
    }
  ];
  
  // Get icon based on event type
  const getEventIcon = (type: string) => {
    switch (type) {
      case "launch":
        return <Calendar className="h-4 w-4" />;
      case "milestone":
        return <Target className="h-4 w-4" />;
      case "update":
        return <BarChart3 className="h-4 w-4" />;
      case "report":
        return <Users className="h-4 w-4" />;
      default:
        return <Star className="h-4 w-4" />;
    }
  };
  
  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "active":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "upcoming":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm border-border/40 overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-[#4361ee] to-[#7209b7]"></div>
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-primary/10">
            <CalendarDays className="h-5 w-5 text-primary" />
          </div>
          <CardTitle>Campaign Timeline</CardTitle>
        </div>
        <CardDescription>
          Campaign progression with performance metrics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative pl-8">
          {/* Timeline connector line */}
          <div className="absolute left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-purple-500 to-pink-500 rounded-full"></div>
          
          {/* Timeline events */}
          <div className="space-y-8 pb-2">
            {timelineEvents.map((event) => (
              <div 
                key={event.id}
                className={`relative animate-fade-in ${
                  event.status === "active" ? "ring-2 ring-primary/10 rounded-lg p-3 -ml-3 bg-muted/10" : ""
                }`}
              >
                {/* Event marker */}
                <div 
                  className={`absolute -left-8 p-2 rounded-full ${
                    event.status === "completed" 
                      ? "bg-green-100" 
                      : event.status === "active" 
                        ? "bg-blue-100" 
                        : "bg-gray-100"
                  }`}
                >
                  {event.status === "completed" ? (
                    <Check className="h-4 w-4 text-green-700" />
                  ) : (
                    getEventIcon(event.type)
                  )}
                </div>
                
                {/* Event date */}
                <div className="ml-2">
                  <div className="flex items-center text-xs text-muted-foreground mb-1">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                
                  {/* Event content */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-medium">{event.title}</h3>
                        <Badge 
                          variant="outline" 
                          className={getStatusColor(event.status)}
                        >
                          {event.status}
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Performance metrics */}
                    {event.performance && event.status !== "upcoming" && (
                      <div className="grid grid-cols-3 gap-2 my-2">
                        <div className="flex items-center gap-1 text-xs">
                          <DollarSign className="h-3 w-3 text-primary" />
                          <span className="text-muted-foreground">Revenue:</span>
                          <span className="font-medium">${event.performance.revenue?.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <Users className="h-3 w-3 text-primary" />
                          <span className="text-muted-foreground">Conv:</span>
                          <span className="font-medium">{event.performance.conversions?.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <BarChart3 className="h-3 w-3 text-primary" />
                          <span className="text-muted-foreground">ROAS:</span>
                          <span className="font-medium">{event.performance.roas?.toFixed(1)}x</span>
                        </div>
                      </div>
                    )}
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 w-full justify-between bg-muted/50 hover:bg-muted"
                      onClick={() => toggleEvent(event.id)}
                    >
                      <span className="text-xs">
                        {expandedEvent === event.id ? "Hide details" : "View details"}
                      </span>
                      {expandedEvent === event.id ? (
                        <ChevronDown className="h-3 w-3 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-3 w-3 text-muted-foreground" />
                      )}
                    </Button>
                    
                    {expandedEvent === event.id && (
                      <div className="pt-2 text-sm text-muted-foreground bg-muted/20 p-3 rounded-md mt-2 animate-fade-in">
                        {event.description}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
