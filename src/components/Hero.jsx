import React, { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { portfolioData } from '../data/portfolioData';
import profileImage from '../public/images/profile.jpg';

/**
 * Hero Section Component
 * - Developer introduction with animated text
 * - CTA buttons
 * - Social media links
 * - Profile image with animation
 */
export default function Hero() {
  const { personal } = portfolioData;
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Respect user's motion preferences
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId);
    element?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  const animationClass = (base) => 
    prefersReducedMotion ? '' : base;

  return (
    <section 
      id="home" 
      className="min-h-[100dvh] flex items-center justify-center pt-20 pb-16 relative overflow-hidden"
      style={{ backgroundColor: '#050505' }}
    >
      {/* Background decorative elements — responsive sizing and positioning */}
      <div className="absolute top-16 sm:top-20 left-4 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 rounded-full opacity-30 pointer-events-none" 
        style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)' }} 
      />
      <div className="absolute bottom-16 sm:bottom-20 right-4 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 rounded-full opacity-20 pointer-events-none" 
        style={{ background: 'radial-gradient(circle, rgba(52,211,153,0.12) 0%, transparent 70%)' }} 
      />
      <div className="absolute top-1/2 left-[10%] sm:left-1/4 w-3 h-3 sm:w-4 sm:h-4 rounded-full opacity-40 pointer-events-none" 
        style={{ backgroundColor: '#10B981' }} 
      />
      <div className="absolute top-1/3 right-[15%] sm:right-1/3 w-2 h-2 sm:w-3 sm:h-3 rounded-full opacity-30 pointer-events-none" 
        style={{ backgroundColor: '#34D399' }} 
      />

      {/* Main Content Grid */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
          
          {/* Left Content */}
          <div className={`order-2 lg:order-1 ${animationClass('animate-fade-in')}`}>
            {/* Greeting Badge */}
            <div 
              className={`inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6 ${animationClass('animate-slide-down')}`}
              style={{ 
                backgroundColor: 'rgba(16, 185, 129, 0.1)', 
                border: '1px solid rgba(16, 185, 129, 0.2)' 
              }}
            >
              <span className={`w-2 h-2 rounded-full ${animationClass('animate-pulse')}`} style={{ backgroundColor: '#10B981' }} />
              <span className="text-xs sm:text-sm font-semibold whitespace-nowrap" style={{ color: '#34D399' }}>
                Available for work
              </span>
            </div>

            {/* Main Heading — fluid typography with clamp */}
            <h1 
              className={`font-bold mb-3 sm:mb-4 leading-[1.1] sm:leading-tight ${animationClass('animate-slide-up')}`} 
              style={{ 
                color: '#FFFFFF',
                fontSize: 'clamp(2rem, 5vw, 4rem)',
              }}
            >
              Hi, I'm{' '}
              <span 
                className="font-extrabold block sm:inline mt-1 sm:mt-0"
                style={{ 
                  background: 'linear-gradient(135deg, #10B981 0%, #34D399 50%, #6EE7B7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                JEROME LARENS
              </span>
            </h1>

            {/* Subtitle */}
            <h2 
              className={`font-semibold mb-4 sm:mb-6 ${animationClass('animate-slide-up')}`} 
              style={{ 
                color: '#A7F3D0',
                fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
              }}
            >
              MERN Stack & Full Stack Developer
            </h2>

            {/* Description */}
            <p 
              className={`leading-relaxed mb-6 sm:mb-8 max-w-lg ${animationClass('animate-fade-in')}`} 
              style={{ 
                color: '#D1D5DB',
                fontSize: 'clamp(0.9375rem, 1.5vw, 1.125rem)',
              }}
            >
              I craft beautiful, responsive, and user-friendly web experiences. 
              Passionate about building modern applications with clean code and 
              intuitive design that makes a real difference.
            </p>

            {/* Stats Row — flex-wrap for safety, responsive gaps */}
            <div className={`flex flex-wrap gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8 ${animationClass('animate-slide-up')}`}>
              <div className="text-center min-w-[70px]">
                <div className="text-xl sm:text-2xl font-bold" style={{ color: '#10B981' }}>10+</div>
                <div className="text-xs sm:text-sm" style={{ color: '#9CA3AF' }}>Real Projects</div>
              </div>
              <div className="w-px hidden sm:block" style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)' }} />
              <div className="text-center min-w-[70px]">
                <div className="text-xl sm:text-2xl font-bold" style={{ color: '#10B981' }}>500+</div>
                <div className="text-xs sm:text-sm" style={{ color: '#9CA3AF' }}>Coding Problems</div>
              </div>
              <div className="w-px hidden sm:block" style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)' }} />
              <div className="text-center min-w-[70px]">
                <div className="text-xl sm:text-2xl font-bold" style={{ color: '#10B981' }}>10+</div>
                <div className="text-xs sm:text-sm" style={{ color: '#9CA3AF' }}>Technical Tools</div>
              </div>
            </div>

            {/* CTA Buttons — full-width on mobile, side-by-side on sm+ */}
            <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8 ${animationClass('animate-slide-up')}`}>
              <button
                onClick={() => scrollToSection('#projects')}
                className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 active:scale-95 text-white shadow-lg min-h-[48px]"
                style={{ 
                  background: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
                  boxShadow: '0 8px 25px rgba(16, 185, 129, 0.35)',
                }}
              >
                View My Work
              </button>
              <button
                onClick={() => scrollToSection('#contact')}
                className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 active:scale-95 min-h-[48px]"
                style={{ 
                  color: '#34D399',
                  border: '2px solid rgba(16, 185, 129, 0.4)',
                  backgroundColor: 'rgba(16, 185, 129, 0.05)',
                }}
              >
                Get In Touch
              </button>
            </div>

            {/* Social Links — responsive sizing */}
            <div className={`flex gap-3 sm:gap-4 ${animationClass('animate-slide-up')}`}>
              {[
                { href: 'https://github.com/jeromelarens', icon: FaGithub, label: 'GitHub' },
                { href: 'https://www.linkedin.com/in/jerome-larens-5b244b3a9/', icon: FaLinkedin, label: 'LinkedIn' },
                { href: 'mailto:jeromelarens7@gmail.com', icon: FaEnvelope, label: 'Email' },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full text-lg sm:text-xl transition-all duration-300 hover:scale-110 hover:bg-emerald-500/20 min-w-[40px] min-h-[40px]"
                  style={{ 
                    color: '#34D399', 
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                  }}
                  aria-label={label}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Right Content - Profile Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <figure className="relative">
              {/* Glow Background — responsive sizing */}
              <div 
                className={`absolute -inset-4 sm:-inset-6 rounded-full blur-3xl opacity-20 ${animationClass('animate-pulse')}`}
                style={{ background: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)' }}
              />

              {/* Decorative Ring — responsive sizing */}
              <div 
                className="absolute -inset-2 sm:-inset-3 rounded-full opacity-30 pointer-events-none"
                style={{ 
                  border: '2px dashed rgba(16, 185, 129, 0.4)',
                  animation: prefersReducedMotion ? 'none' : 'spin 20s linear infinite',
                }}
              />

              {/* Profile Image Container — proper responsive sizing */}
              <div 
                className="relative rounded-full overflow-hidden shadow-2xl"
                style={{ 
                  width: 'clamp(16rem, 40vw, 28rem)',
                  height: 'clamp(16rem, 40vw, 28rem)',
                  border: '4px solid rgba(16, 185, 129, 0.3)',
                  boxShadow: '0 25px 80px rgba(16, 185, 129, 0.25)',
                  aspectRatio: '1 / 1',
                }}
              >
                {/* Loading skeleton */}
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-neutral-800 animate-pulse rounded-full" />
                )}
                <img
                  src={profileImage}
                  alt="JEROME LARENS - Full Stack Developer"
                  className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => setImageLoaded(true)}
                  loading="eager"
                />
              </div>

              {/* Floating Badge — responsive positioning */}
              <div 
                className="absolute -bottom-2 sm:-bottom-1 -right-2 sm:-right-1 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl shadow-lg"
                style={{ 
                  backgroundColor: '#111111',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  boxShadow: '0 8px 25px rgba(16, 185, 129, 0.15)',
                }}
              >
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className={`w-2 h-2 rounded-full ${animationClass('animate-pulse')}`} style={{ backgroundColor: '#4CAF50' }} />
                  <span className="text-xs sm:text-sm font-semibold whitespace-nowrap" style={{ color: '#34D399' }}>Open to Work</span>
                </div>
              </div>
            </figure>
          </div>
        </div>
      </div>

      {/* Scroll Indicator — hidden on very short viewports */}
      <div className={`absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 ${animationClass('animate-bounce')} hidden sm:flex`}>
        <button
          onClick={() => scrollToSection('#about')}
          className="w-8 h-8 flex items-center justify-center rounded-full text-lg transition-all duration-300 hover:scale-110 hover:bg-emerald-500/20"
          style={{ 
            color: '#10B981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
          }}
          aria-label="Scroll to About section"
        >
          ↓
        </button>
      </div>
    </section>
  );
}
