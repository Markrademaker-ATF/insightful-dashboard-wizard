
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Clock, FileBarChart, Settings, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const GettingStartedPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Getting Started</h1>
        <p className="text-muted-foreground mt-2">
          Follow these steps to set up your analytics dashboard
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <Clock className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Quick Setup</CardTitle>
            <CardDescription>
              Complete these tasks to get your dashboard ready
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="mt-0.5">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="font-medium">Create your account</p>
                  <p className="text-sm text-muted-foreground">
                    You're already logged in and ready to go
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="mt-0.5">
                  <CheckCircle className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">Connect your data sources</p>
                  <p className="text-sm text-muted-foreground">
                    Import your marketing and analytics data
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="mt-0.5">
                  <CheckCircle className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">Configure your metrics</p>
                  <p className="text-sm text-muted-foreground">
                    Set up key performance indicators
                  </p>
                </div>
              </div>
              
              <div className="mt-6">
                <Button asChild>
                  <Link to="/settings">
                    Continue Setup <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Zap className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Explore Features</CardTitle>
            <CardDescription>
              Discover what you can do with the analytics dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Link to="/analytics" className="flex items-start gap-4 group hover:bg-muted p-2 rounded-lg transition-colors">
                <div className="mt-0.5">
                  <FileBarChart className="h-5 w-5 text-primary group-hover:text-primary" />
                </div>
                <div>
                  <p className="font-medium group-hover:text-primary">Analytics Overview</p>
                  <p className="text-sm text-muted-foreground">
                    Get a comprehensive view of your marketing performance
                  </p>
                </div>
              </Link>
              
              <Link to="/channels" className="flex items-start gap-4 group hover:bg-muted p-2 rounded-lg transition-colors">
                <div className="mt-0.5">
                  <Settings className="h-5 w-5 text-primary group-hover:text-primary" />
                </div>
                <div>
                  <p className="font-medium group-hover:text-primary">Channel Analysis</p>
                  <p className="text-sm text-muted-foreground">
                    Compare performance across different marketing channels
                  </p>
                </div>
              </Link>
              
              <Link to="/guide" className="flex items-start gap-4 group hover:bg-muted p-2 rounded-lg transition-colors">
                <div className="mt-0.5">
                  <Settings className="h-5 w-5 text-primary group-hover:text-primary" />
                </div>
                <div>
                  <p className="font-medium group-hover:text-primary">User Guide</p>
                  <p className="text-sm text-muted-foreground">
                    Learn how to get the most out of your analytics
                  </p>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
          <CardDescription>
            After setting up, explore these features to maximize your analytics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col items-center text-center space-y-2 p-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <FileBarChart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Analyze Data</h3>
              <p className="text-sm text-muted-foreground">
                Explore metrics and identify trends in your marketing performance
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center space-y-2 p-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Settings className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Customize Reports</h3>
              <p className="text-sm text-muted-foreground">
                Create custom reports for different stakeholders and purposes
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center space-y-2 p-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Schedule Insights</h3>
              <p className="text-sm text-muted-foreground">
                Set up automated reports to keep your team informed
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GettingStartedPage;
