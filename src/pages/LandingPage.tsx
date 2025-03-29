import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LogIn, 
  ExternalLink, 
  ChevronRight, 
  BarChart3, 
  Users, 
  Zap, 
  LineChart, 
  Lightbulb, 
  TrendingUp, 
  Globe, 
  Award, 
  Clock, 
  ScrollIcon
} from "lucide-react";
import { Helmet } from "react-helmet";

const LandingPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState({
    clientSection: false,
    featuresSection: false,
    testimonialsSection: false
  });
  
  // Handle scroll position
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
      
      // Check visibility of sections based on scroll position
      setIsVisible({
        clientSection: position > 500,
        featuresSection: position > 1100,
        testimonialsSection: position > 1800
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
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
                Login <LogIn className="ml-2 h-5 w-5" />
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

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="flex flex-col items-center">
              <p className="mb-2 text-sm opacity-80">Scroll to discover</p>
              <ScrollIcon className="h-6 w-6" />
            </div>
          </div>

          {/* 3D Visual Elements */}
          <div className="mt-20 relative max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Marketing Mix Modelling */}
              <div className="feature-card backdrop-blur-lg relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-blue-400/80 to-purple-400/80 opacity-50 blur-xl"></div>
                <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-gradient-to-tr from-blue-400/80 to-purple-400/80 opacity-40 blur-lg"></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2">Marketing Mix Modelling</h3>
                  <p className="text-white/80">Optimize your marketing budget allocation with advanced statistical analysis</p>
                </div>
              </div>

              {/* Multi-Touch Attribution */}
              <div className="feature-card backdrop-blur-lg relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-purple-400/80 to-pink-400/80 opacity-50 blur-xl"></div>
                <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-gradient-to-tr from-purple-400/80 to-pink-400/80 opacity-40 blur-lg"></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2">Multi-Touch Attribution</h3>
                  <p className="text-white/80">Understand the customer journey by analyzing each touchpoint's contribution</p>
                </div>
              </div>

              {/* Incrementality Testing */}
              <div className="feature-card backdrop-blur-lg relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-pink-400/80 to-orange-400/80 opacity-50 blur-xl"></div>
                <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-gradient-to-tr from-pink-400/80 to-orange-400/80 opacity-40 blur-lg"></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2">Incrementality Testing</h3>
                  <p className="text-white/80">Measure the true impact of your marketing efforts through controlled experiments</p>
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
              </div>
            </div>
          </div>
        </div>

        {/* Client Logos Section - Updated with real brands */}
        <div className={`container mx-auto px-6 py-16 md:py-24 transition-all duration-1000 ${isVisible.clientSection ? "opacity-100" : "opacity-0 translate-y-10"}`}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Trusted by Leading Brands</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Join hundreds of forward-thinking companies leveraging our platform for data-driven marketing decisions
            </p>
          </div>

          {/* Client logo grid with real brand logos */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* L'Oreal */}
            <div className="flex items-center justify-center p-6 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 group">
              <div className="h-12 w-36 flex items-center justify-center">
                <span className="font-bold text-white tracking-wide text-xl">L'ORÉAL</span>
              </div>
            </div>
            
            {/* Hunkemoller */}
            <div className="flex items-center justify-center p-6 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 group">
              <div className="h-12 w-36 flex items-center justify-center">
                <span className="font-bold text-white tracking-wide text-xl">HUNKEMÖLLER</span>
              </div>
            </div>
            
            {/* Torrid */}
            <div className="flex items-center justify-center p-6 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 group">
              <div className="h-12 w-36 flex items-center justify-center">
                <span className="font-bold text-white tracking-wide text-xl">TORRID</span>
              </div>
            </div>
            
            {/* BNP Paribas */}
            <div className="flex items-center justify-center p-6 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 group">
              <div className="h-12 w-36 flex items-center justify-center">
                <span className="font-bold text-white tracking-wide text-lg">BNP PARIBAS</span>
              </div>
            </div>
            
            {/* Meta */}
            <div className="flex items-center justify-center p-6 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 group">
              <div className="h-12 w-36 flex items-center justify-center">
                <span className="font-bold text-white tracking-wide text-xl">META</span>
              </div>
            </div>
            
            {/* Samsung */}
            <div className="flex items-center justify-center p-6 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 group">
              <div className="h-12 w-36 flex items-center justify-center">
                <span className="font-bold text-white tracking-wide text-xl">SAMSUNG</span>
              </div>
            </div>
          </div>

          {/* Statistics Counter - Animated on scroll */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-300 mb-2">500+</div>
              <p className="text-white/80">Active Customers</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-300 mb-2">$1.2B+</div>
              <p className="text-white/80">Media Spend Optimized</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-300 mb-2">15+</div>
              <p className="text-white/80">Countries Served</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-300 mb-2">24%</div>
              <p className="text-white/80">Avg. ROI Improvement</p>
            </div>
          </div>
        </div>

        {/* Features Section with dashboard preview image */}
        <div className={`container mx-auto px-6 py-16 md:py-24 transition-all duration-1000 ${isVisible.featuresSection ? "opacity-100" : "opacity-0 translate-y-10"}`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Platform Features</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Our comprehensive suite of tools provides everything you need to transform your marketing strategy
            </p>
          </div>

          {/* Feature blocks with dashboard preview image */}
          <div className="space-y-24">
            {/* Feature 1 with dashboard preview */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
              <div className="md:w-1/2 order-2 md:order-1">
                <h3 className="text-2xl font-bold mb-4">Real-time Analytics Dashboard</h3>
                <p className="text-lg text-white/80 mb-6">
                  Monitor your marketing performance with customizable dashboards that provide real-time insights into your campaigns, channels, and audience behavior.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="p-1 rounded-full bg-green-500/30 mr-3">
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    </div>
                    <span className="text-white/90">Live performance tracking across channels</span>
                  </li>
                  <li className="flex items-center">
                    <div className="p-1 rounded-full bg-green-500/30 mr-3">
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    </div>
                    <span className="text-white/90">Customizable KPI visualization</span>
                  </li>
                  <li className="flex items-center">
                    <div className="p-1 rounded-full bg-green-500/30 mr-3">
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    </div>
                    <span className="text-white/90">Automated performance alerts</span>
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2 order-1 md:order-2 relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                  <div className="aspect-video bg-gradient-to-br from-indigo-900/70 to-purple-900/70 backdrop-blur-lg p-4 flex items-center justify-center">
                    <img 
                      src="/placeholder.svg"
                      alt="Analytics Dashboard Preview" 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-pink-500/30 rounded-full blur-3xl"></div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
              <div className="md:w-1/2 relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                  <div className="aspect-video bg-gradient-to-br from-blue-900/70 to-indigo-900/70 backdrop-blur-lg p-8 flex items-center justify-center">
                    <img 
                      src="/lovable-uploads/601cbd8c-24db-4884-a53e-1be9a498f2db.png"
                      alt="Global Marketing Intelligence Dashboard" 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-500/30 rounded-full blur-3xl"></div>
              </div>
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold mb-4">Global Marketing Intelligence</h3>
                <p className="text-lg text-white/80 mb-6">
                  Gain insights from markets around the world with our comprehensive global data integration and analysis tools.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="p-1 rounded-full bg-blue-500/30 mr-3">
                      <Award className="h-4 w-4 text-blue-400" />
                    </div>
                    <span className="text-white/90">Multi-market performance comparison</span>
                  </li>
                  <li className="flex items-center">
                    <div className="p-1 rounded-full bg-blue-500/30 mr-3">
                      <Award className="h-4 w-4 text-blue-400" />
                    </div>
                    <span className="text-white/90">Regional trend analysis</span>
                  </li>
                  <li className="flex items-center">
                    <div className="p-1 rounded-full bg-blue-500/30 mr-3">
                      <Award className="h-4 w-4 text-blue-400" />
                    </div>
                    <span className="text-white/90">Cross-market opportunities</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
              <div className="md:w-1/2 order-2 md:order-1">
                <h3 className="text-2xl font-bold mb-4">AI-Powered Recommendations</h3>
                <p className="text-lg text-white/80 mb-6">
                  Let our artificial intelligence analyze your data and provide actionable recommendations to optimize your marketing strategy.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="p-1 rounded-full bg-purple-500/30 mr-3">
                      <Lightbulb className="h-4 w-4 text-purple-400" />
                    </div>
                    <span className="text-white/90">Channel optimization suggestions</span>
                  </li>
                  <li className="flex items-center">
                    <div className="p-1 rounded-full bg-purple-500/30 mr-3">
                      <Lightbulb className="h-4 w-4 text-purple-400" />
                    </div>
                    <span className="text-white/90">Budget allocation recommendations</span>
                  </li>
                  <li className="flex items-center">
                    <div className="p-1 rounded-full bg-purple-500/30 mr-3">
                      <Lightbulb className="h-4 w-4 text-purple-400" />
                    </div>
                    <span className="text-white/90">Performance improvement insights</span>
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2 order-1 md:order-2 relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                  <div className="aspect-video bg-gradient-to-br from-purple-900/70 to-pink-900/70 backdrop-blur-lg p-8 flex items-center justify-center">
                    <div className="w-full h-full bg-black/40 rounded-lg flex items-center justify-center">
                      <Lightbulb className="w-16 h-16 text-white/40" />
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-500/30 rounded-full blur-3xl"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className={`container mx-auto px-6 py-16 md:py-24 transition-all duration-1000 ${isVisible.testimonialsSection ? "opacity-100" : "opacity-0 translate-y-10"}`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Discover how our platform has transformed marketing strategies for businesses around the world
            </p>
          </div>

          {/* Testimonial cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                quote: "The insights we've gained have completely transformed our marketing approach. We've seen a 32% increase in ROAS since implementing Artefact's recommendations.",
                author: "Sarah Johnson",
                title: "CMO, Global Retail Brand",
                color: "blue"
              },
              {
                quote: "Artefact's platform gives us clarity on which channels are truly driving results. We've reallocated our budget based on their analysis and seen immediate improvements.",
                author: "Michael Chen",
                title: "Head of Digital, Tech Company",
                color: "purple"
              },
              {
                quote: "The multi-touch attribution model has given us visibility into the customer journey we never had before. It's changed how we think about our entire marketing strategy.",
                author: "Emma Rodriguez",
                title: "Marketing Director, E-commerce",
                color: "pink"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-lg relative overflow-hidden">
                <div className={`absolute -top-12 -right-12 w-32 h-32 bg-${testimonial.color}-500/20 rounded-full blur-3xl`}></div>
                <div className={`absolute -bottom-12 -left-12 w-32 h-32 bg-${testimonial.color}-500/10 rounded-full blur-3xl`}></div>
                <div className="relative z-10">
                  <div className="text-3xl text-white/20 mb-4">"</div>
                  <p className="text-white/90 mb-8 italic">{testimonial.quote}</p>
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full bg-${testimonial.color}-500/30 flex items-center justify-center mr-3`}>
                      <Users className="h-5 w-5 text-white/70" />
                    </div>
                    <div>
                      <p className="font-bold text-white">{testimonial.author}</p>
                      <p className="text-white/70 text-sm">{testimonial.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-6 py-16 md:py-32">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-lg rounded-3xl p-8 md:p-16 border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-pink-500/30 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your
