
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FlowingBackground } from "@/components/ui/FlowingBackground";
import { Mail, Lock, ArrowRight, KeyRound } from "lucide-react";
import { toast } from "sonner";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Extract the redirect path from URL search params, default to getting-started
  const searchParams = new URLSearchParams(location.search);
  const redirectTo = searchParams.get("redirectTo") || "/getting-started";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate authentication process
    setTimeout(() => {
      // For demo purposes, accept any input
      toast.success("Login successful! Redirecting you to dashboard...");
      setLoading(false);
      navigate(redirectTo);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4 relative overflow-hidden">
      {/* Enhanced dynamic background with customized properties */}
      <FlowingBackground 
        className="opacity-80"
        particleCount={120}
        speed={0.4}
        particleSize={18}
        particleColor="rgba(155, 135, 245, 0.7)"
        lineColor="rgba(155, 135, 245, 0.5)"
      />
      
      {/* Add floating elements for depth */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-purple-500/10 blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-indigo-500/10 blur-3xl animate-float" style={{animationDelay: "2s"}}></div>
      <div className="absolute top-3/4 right-1/3 w-24 h-24 rounded-full bg-violet-500/10 blur-3xl animate-float" style={{animationDelay: "4s"}}></div>
      
      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex flex-col items-center justify-center mb-2">
            {/* Updated logo design to match reference image */}
            <div className="mb-2">
              <svg width="100" height="80" viewBox="0 0 50 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25 0L50 40H0L25 0Z" fill="url(#login-triangle-gradient)"/>
                <defs>
                  <linearGradient id="login-triangle-gradient" x1="25" y1="0" x2="25" y2="40" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#2B5BA9"/>
                    <stop offset="0.33" stopColor="#8B4AA9"/>
                    <stop offset="1" stopColor="#C84E99"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white mb-2 text-balance">ARTEFACT</h1>
          </div>
          <p className="text-slate-300">Marketing Intelligence Platform</p>
        </div>
        
        <Card className="backdrop-blur-xl bg-white/10 border-white/20 shadow-2xl transform transition-all duration-500 hover:shadow-[0_0_30px_rgba(155,135,245,0.3)] rounded-xl">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-primary/20 shadow-lg shadow-primary/30 animate-float">
                <KeyRound className="h-7 w-7 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center text-white">Welcome Back</CardTitle>
            <CardDescription className="text-slate-300 text-center">
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-6 pt-2">
              <div className="space-y-4">
                <div className="relative group">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors duration-300" />
                  <Input
                    type="email"
                    placeholder="Email"
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-slate-400 h-12 transition-all duration-300 focus:border-primary/50 focus:ring-2 focus:ring-primary/30"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="relative group">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors duration-300" />
                  <Input
                    type="password"
                    placeholder="Password"
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-slate-400 h-12 transition-all duration-300 focus:border-primary/50 focus:ring-2 focus:ring-primary/30"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-xs text-primary hover:text-primary/80 hover:underline transition-colors"
                    onClick={() => toast.info("Password reset functionality coming soon!")}
                  >
                    Forgot password?
                  </button>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col gap-4">
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-600 to-primary hover:from-purple-700 hover:to-primary/90 h-12 text-base shadow-lg shadow-primary/20 transition-all duration-300"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    Sign In
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                )}
              </Button>
              
              <p className="text-sm text-center text-slate-400">
                Don't have an account?{" "}
                <button 
                  onClick={() => toast.info("Sign up functionality coming soon!")}
                  className="text-primary hover:text-primary/80 hover:underline transition-colors font-medium"
                >
                  Create account
                </button>
              </p>
            </CardFooter>
          </form>
        </Card>

        <div className="mt-8 text-center text-xs text-slate-400">
          <p>© 2023 Artefact. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
