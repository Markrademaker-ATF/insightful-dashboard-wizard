import React, { useRef, useEffect, useState } from 'react';
import { ArrowRight, TrendingUp } from 'lucide-react';

const LandingPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState({
    headerSection: false,
    featuresSection: false,
    testimonialsSection: false,
    footerSection: false,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      {
        threshold: 0.1,
      }
    );

    // Observe each section
    observer.observe(document.getElementById('headerSection')!);
    observer.observe(document.getElementById('featuresSection')!);
    observer.observe(document.getElementById('testimonialsSection')!);
    observer.observe(document.getElementById('footerSection')!);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#ffffff';

      for (let i = 0; i < 200; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 2;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
    };

    setCanvasSize();
    drawStars();

    const animate = () => {
      drawStars();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('resize', setCanvasSize);

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
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
      <header id="headerSection" className={`container mx-auto px-6 py-8 md:py-12 transition-all duration-1000 ${isVisible.headerSection ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[-20px]"}`}>
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">
            <span className="text-primary">Løvable</span>.
          </div>
          <nav className="space-x-4 md:space-x-6">
            <a href="#features" className="text-white/80 hover:text-white transition-colors duration-200">Features</a>
            <a href="#testimonials" className="text-white/80 hover:text-white transition-colors duration-200">Testimonials</a>
            <a href="#contact" className="text-white/80 hover:text-white transition-colors duration-200">Contact</a>
          </nav>
        </div>
        <div className="text-center mt-12 md:mt-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Unlock Your Marketing Potential
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Transform your marketing strategy with our AI-powered platform. Gain insights, automate campaigns, and drive growth.
          </p>
          <button className="bg-primary hover:bg-primary-foreground text-black font-bold py-3 px-8 rounded-full transition-colors duration-200">
            Get Started <ArrowRight className="inline-block ml-2" />
          </button>
        </div>
      </header>

      <main className="flex-grow text-white relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-6 py-12 md:py-16">
          {/* Add hero content here, if any */}
        </div>

        {/* Features Section with dashboard preview image */}
        <div id="featuresSection" className={`container mx-auto px-6 py-16 md:py-24 transition-all duration-1000 ${isVisible.featuresSection ? "opacity-100" : "opacity-0 translate-y-10"}`}>
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
                      src="/lovable-uploads/9fb50ea6-c0ee-4207-9e9d-13740bd8d8e0.png"
                      alt="Channel Performance Matrix" 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-pink-500/30 rounded-full blur-3xl"></div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold mb-4">AI-Powered Campaign Optimization</h3>
                <p className="text-lg text-white/80 mb-6">
                  Leverage the power of artificial intelligence to optimize your marketing campaigns. Our platform analyzes data, predicts outcomes, and automates adjustments to maximize ROI.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="p-1 rounded-full bg-green-500/30 mr-3">
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    </div>
                    <span className="text-white/90">Predictive analytics for campaign performance</span>
                  </li>
                  <li className="flex items-center">
                    <div className="p-1 rounded-full bg-green-500/30 mr-3">
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    </div>
                    <span className="text-white/90">Automated A/B testing and optimization</span>
                  </li>
                  <li className="flex items-center">
                    <div className="p-1 rounded-full bg-green-500/30 mr-3">
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    </div>
                    <span className="text-white/90">Personalized recommendations for campaign improvements</span>
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2 relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                  <div className="aspect-video bg-gradient-to-br from-indigo-900/70 to-purple-900/70 backdrop-blur-lg p-4 flex items-center justify-center">
                    {/* Replace with actual image or component */}
                    <div className="text-white text-xl font-bold">AI Optimization Preview</div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-500/30 rounded-full blur-3xl"></div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
              <div className="md:w-1/2 order-2 md:order-1">
                <h3 className="text-2xl font-bold mb-4">Audience Segmentation and Targeting</h3>
                <p className="text-lg text-white/80 mb-6">
                  Reach the right customers with precision targeting. Our platform enables you to segment your audience based on demographics, behavior, and interests, ensuring your message resonates.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="p-1 rounded-full bg-green-500/30 mr-3">
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    </div>
                    <span className="text-white/90">Advanced audience segmentation tools</span>
                  </li>
                  <li className="flex items-center">
                    <div className="p-1 rounded-full bg-green-500/30 mr-3">
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    </div>
                    <span className="text-white/90">Customizable targeting parameters</span>
                  </li>
                  <li className="flex items-center">
                    <div className="p-1 rounded-full bg-green-500/30 mr-3">
                      <TrendingUp className="h-4 w-4 text-green-400" />
                    </div>
                    <span className="text-white/90">Integration with leading advertising platforms</span>
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2 order-1 md:order-2 relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                  <div className="aspect-video bg-gradient-to-br from-indigo-900/70 to-purple-900/70 backdrop-blur-lg p-4 flex items-center justify-center">
                    {/* Replace with actual image or component */}
                    <div className="text-white text-xl font-bold">Audience Targeting Preview</div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-purple-500/30 rounded-full blur-3xl"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div id="testimonialsSection" className={`container mx-auto px-6 py-16 md:py-24 transition-all duration-1000 ${isVisible.testimonialsSection ? "opacity-100" : "opacity-0 translate-y-10"}`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              See how our platform has helped businesses like yours achieve their marketing goals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-black/20 rounded-2xl p-6 shadow-lg border border-white/10">
              <p className="text-white/90 mb-4">
                "Løvable has transformed our marketing efforts. The AI-powered insights have helped us optimize our campaigns and achieve a 30% increase in ROI."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-700 mr-4">
                  {/* Replace with actual customer image */}
                </div>
                <div>
                  <p className="font-bold">John Doe</p>
                  <p className="text-sm text-white/60">CEO, Example Company</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-black/20 rounded-2xl p-6 shadow-lg border border-white/10">
              <p className="text-white/90 mb-4">
                "The audience segmentation tools are incredibly powerful. We've been able to target our customers with laser precision, resulting in higher conversion rates."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-700 mr-4">
                  {/* Replace with actual customer image */}
                </div>
                <div>
                  <p className="font-bold">Jane Smith</p>
                  <p className="text-sm text-white/60">Marketing Director, Another Company</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-black/20 rounded-2xl p-6 shadow-lg border border-white/10">
              <p className="text-white/90 mb-4">
                "The real-time analytics dashboard has given us unparalleled visibility into our marketing performance. We can now make data-driven decisions and optimize our campaigns on the fly."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-700 mr-4">
                  {/* Replace with actual customer image */}
                </div>
                <div>
                  <p className="font-bold">Mike Johnson</p>
                  <p className="text-sm text-white/60">Sales Manager, Some Company</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer id="footerSection" className={`container mx-auto px-6 py-12 text-center text-white/60 transition-all duration-1000 ${isVisible.footerSection ? "opacity-100" : "opacity-0 translate-y-10"}`}>
        <p>&copy; {new Date().getFullYear()} Løvable. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
