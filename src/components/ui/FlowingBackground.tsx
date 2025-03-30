import React, { useEffect, useRef } from 'react';

interface FlowingBackgroundProps {
  className?: string;
  particleCount?: number;
  speed?: number;
  particleSize?: number;
  particleColor?: string;
  lineColor?: string;
}

export const FlowingBackground: React.FC<FlowingBackgroundProps> = ({ 
  className, 
  particleCount = 50, 
  speed = 0.5,
  particleSize = 15,
  particleColor = "rgba(243, 240, 255, 0.3)",
  lineColor = "rgba(220, 215, 240, 0.4)"
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initial resize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particles
    const particlesArray: Particle[] = [];

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      hue: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * particleSize + 1;
        this.speedX = Math.random() * speed - speed/2;
        this.speedY = Math.random() * speed - speed/2;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.hue = Math.random() * 60 - 30; // For color variation
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > 0.2) this.size -= 0.05;
        
        // Reset particles when they get too small or leave the screen
        if (this.size <= 0.2 || 
            this.x < 0 || 
            this.x > canvas.width || 
            this.y < 0 || 
            this.y > canvas.height) {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.size = Math.random() * particleSize + 1;
          this.speedX = Math.random() * speed - speed/2;
          this.speedY = Math.random() * speed - speed/2;
          this.opacity = Math.random() * 0.5 + 0.1;
        }
      }

      draw() {
        // Extract base color from particleColor, with safe parsing
        const baseColorMatch = particleColor.match(/rgba?\(([^)]+)\)/);
        const baseColor = baseColorMatch 
          ? baseColorMatch[1].split(',').map(val => val.trim()) 
          : ['243', '240', '255'];
        
        // Safely parse and convert color values
        const r = Math.min(255, Math.max(0, parseInt(baseColor[0]) + this.hue));
        const g = Math.min(255, Math.max(0, parseInt(baseColor[1]) + this.hue));
        const b = Math.min(255, Math.max(0, parseInt(baseColor[2]) + this.hue));
        
        // Explicitly convert opacity to string
        const particleOpacity = String(this.opacity);
        const lineOpacityValue = String(this.opacity * 0.5);
        
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${particleOpacity})`;
        
        // Safely replace opacity in lineColor
        ctx.strokeStyle = lineColor.replace(/opacity/g, lineOpacityValue);
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particlesArray.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Apply a slight blur for a glow effect
      ctx.shadowBlur = 15;
      ctx.shadowColor = particleColor;
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      
      // Connect nearby particles with lines
      connectParticles();
      
      // Reset shadow for next frame
      ctx.shadowBlur = 0;
      
      requestAnimationFrame(animate);
    };

    // Draw lines between particles that are close to each other
    const connectParticles = () => {
      const maxDistance = 150;
      
      for (let i = 0; i < particlesArray.length; i++) {
        for (let j = i; j < particlesArray.length; j++) {
          const dx = particlesArray[i].x - particlesArray[j].x;
          const dy = particlesArray[i].y - particlesArray[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            // Calculate opacity based on distance
            const opacity = 1 - (distance / maxDistance);
            
            // Extract base color from lineColor
            const baseColor = lineColor.includes("rgba") 
              ? lineColor.replace(/rgba?\(|\)/g, '').split(',')
              : [220, 215, 240]; // Default color
              
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${opacity * 0.8})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
            ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
            ctx.stroke();
          }
        }
      }
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [particleCount, speed, particleSize, particleColor, lineColor]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`fixed top-0 left-0 w-full h-full -z-10 ${className || ''}`}
    />
  );
};
