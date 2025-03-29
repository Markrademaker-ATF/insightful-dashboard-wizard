import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, ChevronRight, BarChart3, Users, Zap } from "lucide-react";
import { Helmet } from "react-helmet";

const LandingPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Create particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        
        // Purple/blue color palette with opacity
        const hue = Math.floor(Math.random() * 40) + 240; // Blue to purple hues
        const saturation = Math.floor(Math.random() * 30) + 70; // High saturation
        const lightness = Math.floor(Math.random() * 30) + 50; // Medium lightness
        const alpha = Math.random() * 0.5 + 0.1; // Low opacity
        
        this.color = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Wrap around screen edges
        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }
      
      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Create particle array
    const particleCount = Math.min(150, Math.floor((canvas.width * canvas.height) / 15000));
    const particles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    // Animation function
    const animate = () => {
      // Clear canvas with semi-transparent background for trail effect
      ctx.fillStyle = 'rgba(16, 16, 39, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      // Connect particles with lines if they are close enough
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(155, 135, 245, ${0.1 * (1 - distance / 100)})`; // Purple with distance-based opacity
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Dynamic Background Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full -z-10"
      />
      
      {/* Header */}
      <header className="bg-transparent text-white py-6 px-6 md:px-10 relative z-10">
        <div className="container mx-auto">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl md:text-3xl font-bold">ARTEFACT</h1>
            <p className="text-xs md:text-sm">AI IS ABOUT PEOPLE</p>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <main className="flex-grow text-white relative z-10">
        <div className="container mx-auto px-6 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Marketing <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-pink-500">
                Intelligence Platform
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
              <Link to="/login">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              asChild
              variant="outline" 
              className="bg-transparent hover:bg-white/10 rounded-full px-8 py-6 text-white border-white w-full md:w-auto"
            >
              <a href="https://artefact.com" target="_blank" rel="noopener noreferrer">
                Visit Artefact.com <ExternalLink className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>

          {/* 3D Visual Elements - Updated with the requested marketing analytics solutions */}
          <div className="mt-20 relative max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Marketing Mix Modelling */}
              <div className="feature-card backdrop-blur-lg relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-blue-400/80 to-purple-400/80 opacity-50 blur-xl"></div>
                <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-gradient-to-tr from-blue-400/80 to-purple-400/80 opacity-40 blur-lg"></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2">Marketing Mix Modelling</h3>
                  <p className="text-white/80">Optimize your marketing budget allocation with advanced statistical analysis</p>
                  <Link to="/channels" className="inline-flex items-center mt-4 text-pink-300 hover:text-pink-100">
                    Channel Analysis <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>

              {/* Multi-Touch Attribution */}
              <div className="feature-card backdrop-blur-lg relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-purple-400/80 to-pink-400/80 opacity-50 blur-xl"></div>
                <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-gradient-to-tr from-purple-400/80 to-pink-400/80 opacity-40 blur-lg"></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2">Multi-Touch Attribution</h3>
                  <p className="text-white/80">Understand the customer journey by analyzing each touchpoint's contribution</p>
                  <Link to="/channel-details" className="inline-flex items-center mt-4 text-pink-300 hover:text-pink-100">
                    Campaign Analysis <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>

              {/* Incrementality Testing */}
              <div className="feature-card backdrop-blur-lg relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-pink-400/80 to-orange-400/80 opacity-50 blur-xl"></div>
                <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-gradient-to-tr from-pink-400/80 to-orange-400/80 opacity-40 blur-lg"></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2">Incrementality Testing</h3>
                  <p className="text-white/80">Measure the true impact of your marketing efforts through controlled experiments</p>
                  <Link to="/ab-testing" className="inline-flex items-center mt-4 text-pink-300 hover:text-pink-100">
                    A/B Testing <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Background blur effects */}
            <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -z-10 animate-float"></div>
            <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl -z-10 animate-float" style={{animationDelay: "1.5s"}}></div>
            <div className="absolute top-2/3 left-1/2 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl -z-10 animate-float" style={{animationDelay: "3s"}}></div>
          </div>
        </div>

        {/* Marketing Analytics Solutions Section */}
        <div className="container mx-auto px-6 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Advanced Marketing Analytics Solutions</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Leverage our cutting-edge analytics methodologies to optimize your marketing strategy and maximize ROI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Marketing Mix Modelling */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-blue-400/30 rounded-2xl blur-xl transform group-hover:scale-105 transition-all duration-300 -z-10"></div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-white/10 h-full flex flex-col transform group-hover:translate-y-[-5px] transition-all duration-300">
                <div className="p-3 rounded-full bg-blue-500/20 w-fit mb-6">
                  <BarChart3 className="h-7 w-7 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Marketing Mix Modelling</h3>
                <p className="mb-6 text-white/80 flex-grow">
                  Optimize your marketing budget allocation with advanced statistical analysis to determine the impact of different marketing channels on your business outcomes.
                </p>
                <Button 
                  asChild
                  variant="outline" 
                  className="mt-4 bg-blue-500/20 border border-blue-400/30 hover:bg-blue-500/40 transition-colors text-white w-full justify-between"
                >
                  <Link to="/channels">
                    <span>Channel Analysis</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Multi-Touch Attribution */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-purple-400/30 rounded-2xl blur-xl transform group-hover:scale-105 transition-all duration-300 -z-10"></div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-white/10 h-full flex flex-col transform group-hover:translate-y-[-5px] transition-all duration-300">
                <div className="p-3 rounded-full bg-purple-500/20 w-fit mb-6">
                  <Users className="h-7 w-7 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Multi-Touch Attribution</h3>
                <p className="mb-6 text-white/80 flex-grow">
                  Understand the customer journey with precision by analyzing each touchpoint's contribution to conversion, helping you allocate budget to the most effective channels.
                </p>
                <Button 
                  asChild
                  variant="outline" 
                  className="mt-4 bg-purple-500/20 border border-purple-400/30 hover:bg-purple-500/40 transition-colors text-white w-full justify-between"
                >
                  <Link to="/channel-details">
                    <span>Campaign Analysis</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Incrementality Testing */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-600/20 to-pink-400/30 rounded-2xl blur-xl transform group-hover:scale-105 transition-all duration-300 -z-10"></div>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-white/10 h-full flex flex-col transform group-hover:translate-y-[-5px] transition-all duration-300">
                <div className="p-3 rounded-full bg-pink-500/20 w-fit mb-6">
                  <Zap className="h-7 w-7 text-pink-400" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Incrementality Testing</h3>
                <p className="mb-6 text-white/80 flex-grow">
                  Measure the true impact of your marketing efforts by conducting controlled experiments to determine how much value each channel adds compared to no marketing activity.
                </p>
                <Button 
                  asChild
                  variant="outline" 
                  className="mt-4 bg-pink-500/20 border border-pink-400/30 hover:bg-pink-500/40 transition-colors text-white w-full justify-between"
                >
                  <Link to="/ab-testing">
                    <span>A/B Testing</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-transparent text-white py-6 px-6 relative z-10">
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
