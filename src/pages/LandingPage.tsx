
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, ArrowRight, Play, Search, ChevronDown, Globe } from "lucide-react";
import { Helmet } from "react-helmet";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Artefact - AI is about people</title>
      </Helmet>
      
      {/* Navbar */}
      <header className="bg-gradient-to-r from-blue-900 to-purple-800 text-white py-4 px-6 md:px-10">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl md:text-2xl font-bold">ARTEFACT</h1>
            <p className="text-xs md:text-sm hidden sm:block">AI IS ABOUT PEOPLE</p>
          </div>
          
          <nav className="hidden lg:flex items-center space-x-8">
            {[
              { name: "Industries", hasSubmenu: true },
              { name: "Offers", hasSubmenu: true },
              { name: "Technologies", hasSubmenu: true },
              { name: "Insights", hasSubmenu: true },
              { name: "Clients", hasSubmenu: true },
              { name: "Company", hasSubmenu: true },
              { name: "School of Data", hasSubmenu: false },
              { name: "Careers", hasSubmenu: true },
              { name: "Contact", hasSubmenu: false },
            ].map((item) => (
              <div key={item.name} className="relative group">
                <button className="flex items-center text-white hover:text-purple-200 transition-colors">
                  {item.name}
                  {item.hasSubmenu && <ChevronDown className="ml-1 h-4 w-4" />}
                </button>
              </div>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4">
            <button aria-label="Search" className="text-white hover:text-purple-200">
              <Search className="h-5 w-5" />
            </button>
            <button className="flex items-center text-white hover:text-purple-200">
              EN <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            <button className="lg:hidden text-white" aria-label="Menu">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <main className="flex-grow bg-gradient-to-br from-blue-900 via-purple-800 to-purple-700 text-white">
        <div className="container mx-auto px-6 py-20 md:py-32 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-16 z-10">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              ARTEFACT<br />
              <span className="text-4xl md:text-5xl lg:text-6xl">
                AI is about<br />people
              </span>
            </h1>
            <p className="text-lg mb-8 max-w-lg">
              Artefact is a global leader in data and AI consulting services dedicated to 
              transforming data into business impact across the entire value chain of 
              organizations.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                variant="default" 
                className="bg-pink-500 hover:bg-pink-600 rounded-full px-8 py-6 text-white"
              >
                <Play className="mr-2 h-4 w-4" /> Watch video
              </Button>
              <Button 
                asChild
                variant="outline" 
                className="bg-transparent hover:bg-white/10 rounded-full px-8 py-6 text-white border-white"
              >
                <Link to="/analytics">
                  Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/2 mt-12 md:mt-0 relative flex justify-center">
            {/* Abstract 3D shapes */}
            <div className="relative w-full h-[400px]">
              <div className="absolute top-10 left-1/4 w-40 h-40 bg-gradient-to-br from-pink-400/80 via-purple-400/80 to-blue-400/80 rounded-full blur-lg animate-float"></div>
              <div className="absolute bottom-20 right-1/4 w-48 h-48 bg-gradient-to-tr from-blue-400/80 via-purple-400/80 to-pink-400/80 rounded-full blur-lg animate-float" style={{animationDelay: "1s"}}></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-gradient-to-r from-purple-500/60 to-pink-500/60 rounded-full blur-lg animate-pulse"></div>
              <img 
                src="/public/lovable-uploads/fda91c82-834d-4435-b86f-bc2e85a233ea.png" 
                alt="3D abstract shapes" 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-full max-h-full"
              />
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-900 to-purple-800 text-white py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold">ARTEFACT</h2>
            <p className="text-xs">AI IS ABOUT PEOPLE</p>
          </div>
          <div className="hidden md:block text-sm">
            <span>© 2023 Artefact. All rights reserved.</span>
          </div>
          <div className="flex items-center space-x-4">
            <Globe className="h-5 w-5" />
            <span className="text-sm">Global</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
