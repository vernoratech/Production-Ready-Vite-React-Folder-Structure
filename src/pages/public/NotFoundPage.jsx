import React, { useState, useEffect } from 'react';
import { Home, Search, ArrowLeft, Zap, Star } from 'lucide-react';

export default function NotFoundPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [glitchText, setGlitchText] = useState('404');
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Generate particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
    
    // Glitch effect
    const glitchInterval = setInterval(() => {
      const glitchChars = ['4', '0', '4', '▓', '█', '░'];
      const randomText = Array.from({ length: 3 }, () => 
        glitchChars[Math.floor(Math.random() * glitchChars.length)]
      ).join('');
      setGlitchText(randomText);
      
      setTimeout(() => setGlitchText('404'), 100);
    }, 3000);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(glitchInterval);
    };
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden flex items-center justify-center">
        {/* Animated background particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
        
        {/* Mouse follower gradient */}
        <div 
          className="absolute w-96 h-96 bg-gradient-radial from-cyan-400/20 to-transparent rounded-full pointer-events-none transition-all duration-300 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
        
        <div className="text-center z-10 px-6 max-w-4xl mx-auto">
          {/* Main 404 Text with glitch effect */}
          <div className="relative mb-8">
            <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-pulse select-none">
              {glitchText}
            </h1>
            <div className="absolute inset-0 text-8xl md:text-9xl font-black text-red-500 opacity-20 animate-ping" style={{ animationDuration: '4s' }}>
              404
            </div>
          </div>
          
          {/* Subtitle with typing effect */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 animate-pulse">
              Oops! You've ventured into the void
            </h2>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              The page you're looking for seems to have been swallowed by a digital black hole. 
              But don't worry, we'll help you find your way back to the light.
            </p>
          </div>
          
          {/* Interactive buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white font-semibold shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300 flex items-center gap-3 min-w-[200px]">
              <Home className="w-5 h-5 group-hover:animate-bounce" />
              <span>Back to Home</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </button>
            
            <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 flex items-center gap-3 min-w-[200px]">
              <Search className="w-5 h-5 group-hover:animate-spin" />
              <span>Search Site</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </button>
          </div>
          
          {/* Fun interactive elements */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="group cursor-pointer">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl">
                <ArrowLeft className="w-8 h-8 text-cyan-400 mx-auto mb-4 group-hover:animate-bounce" />
                <h3 className="text-white font-semibold mb-2">Go Back</h3>
                <p className="text-gray-300 text-sm">Return to previous page</p>
              </div>
            </div>
            
            <div className="group cursor-pointer">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl">
                <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-4 group-hover:animate-pulse" />
                <h3 className="text-white font-semibold mb-2">Quick Links</h3>
                <p className="text-gray-300 text-sm">Popular pages & features</p>
              </div>
            </div>
            
            <div className="group cursor-pointer">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl">
                <Star className="w-8 h-8 text-purple-400 mx-auto mb-4 group-hover:animate-spin" />
                <h3 className="text-white font-semibold mb-2">Contact Us</h3>
                <p className="text-gray-300 text-sm">We're here to help</p>
              </div>
            </div>
          </div>
          
          {/* Error code display */}
          <div className="mt-12 text-center">
            <div className="inline-block bg-black/30 backdrop-blur-sm rounded-lg px-6 py-3 border border-cyan-500/30">
              <code className="text-cyan-400 font-mono text-sm">
                ERROR_CODE: PAGE_NOT_FOUND | STATUS: 404 | TIME: {new Date().toLocaleTimeString()}
              </code>
            </div>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-cyan-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-32 right-32 w-6 h-6 bg-purple-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/4 w-3 h-3 bg-pink-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-32 right-1/4 w-5 h-5 bg-yellow-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '2s' }} />
      </div>
    </>
  );
}