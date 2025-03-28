
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, ChevronRight } from "lucide-react";
import { Helmet } from "react-helmet";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Artefact - AI is about people</title>
      </Helmet>
      
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-purple-800 text-white py-6 px-6 md:px-10">
        <div className="container mx-auto">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl md:text-3xl font-bold">ARTEFACT</h1>
            <p className="text-xs md:text-sm">AI IS ABOUT PEOPLE</p>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <main className="flex-grow bg-gradient-to-br from-blue-900 via-purple-800 to-purple-700 text-white">
        <div className="container mx-auto px-6 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Data-Driven <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-pink-500">
                Analytics Platform
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto">
              Transform your business with powerful insights and AI-driven analytics
              to make better decisions and achieve exceptional results.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Button 
              asChild
              variant="default" 
              className="bg-pink-500 hover:bg-pink-600 rounded-full px-8 py-6 text-white w-full md:w-auto"
            >
              <Link to="/analytics">
                Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              className="bg-transparent hover:bg-white/10 rounded-full px-8 py-6 text-white border-white w-full md:w-auto"
            >
              <Play className="mr-2 h-5 w-5" /> Watch demo
            </Button>
          </div>

          {/* 3D Visual Elements */}
          <div className="mt-20 relative max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Data Insights",
                  desc: "Understand your data with powerful visualization tools",
                  color: "from-blue-400/80 to-purple-400/80"
                },
                {
                  title: "Channel Analysis",
                  desc: "Optimize your marketing campaigns across all channels",
                  color: "from-purple-400/80 to-pink-400/80"
                },
                {
                  title: "Budget Optimizer",
                  desc: "Maximize ROI with intelligent budget allocation",
                  color: "from-pink-400/80 to-orange-400/80"
                }
              ].map((card, i) => (
                <div key={i} className="feature-card backdrop-blur-lg relative overflow-hidden">
                  <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${card.color} opacity-50 blur-xl`}></div>
                  <div className={`absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-gradient-to-tr ${card.color} opacity-40 blur-lg`}></div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                    <p className="text-white/80">{card.desc}</p>
                    <Link to="/analytics" className="inline-flex items-center mt-4 text-pink-300 hover:text-pink-100">
                      Learn more <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Background blur effects */}
            <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -z-10 animate-float"></div>
            <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl -z-10 animate-float" style={{animationDelay: "1.5s"}}></div>
            <div className="absolute top-2/3 left-1/2 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl -z-10 animate-float" style={{animationDelay: "3s"}}></div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-900 to-purple-800 text-white py-6 px-6">
        <div className="container mx-auto text-center">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold">ARTEFACT</h2>
              <p className="text-xs">AI IS ABOUT PEOPLE</p>
            </div>
            <div className="text-sm opacity-80">
              © 2023 Artefact. All rights reserved.
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" size="sm" className="text-white hover:text-pink-300 hover:bg-transparent p-0">About</Button>
              <Button variant="ghost" size="sm" className="text-white hover:text-pink-300 hover:bg-transparent p-0">Privacy</Button>
              <Button variant="ghost" size="sm" className="text-white hover:text-pink-300 hover:bg-transparent p-0">Contact</Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
