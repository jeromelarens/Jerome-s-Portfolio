import React, { useState, useEffect, useCallback } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Handle scroll with passive listener for performance
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 50);
      
      // Calculate scroll progress for indicator
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (currentY / docHeight) * 100 : 0);

      // Determine active section
      const sections = navItems.map(item => item.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = useCallback((href) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return (
    <>
      {/* Scroll Progress Indicator */}
      <div 
        className="fixed top-0 left-0 h-[2px] bg-emerald-400 z-[60] transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <nav
        role="navigation"
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          scrolled ? 'py-2 md:py-3' : 'py-3 md:py-5'
        }`}
      >
        {/* Background wrapper — responsive width with safe padding */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none px-3 sm:px-4 md:px-6 lg:px-8">
          <div
            className={`absolute left-1/2 -translate-x-1/2 transition-all duration-500 ease-out ${
              scrolled 
                ? 'top-1 w-full sm:w-[98%] md:w-[96%] lg:w-[94%] xl:w-[92%] h-full rounded-2xl md:rounded-3xl' 
                : 'top-0 w-full sm:w-[98%] md:w-[96%] lg:w-[94%] xl:w-[92%] h-[120%] rounded-3xl md:rounded-[32px]'
            }`}
            style={{
              backgroundColor: 'rgba(17, 17, 17, 0.95)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              boxShadow: scrolled 
                ? '0 8px 32px rgba(16, 185, 129, 0.12), 0 4px 20px rgba(16, 185, 129, 0.06)' 
                : '0 4px 30px rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderTop: 'none',
            }}
          />
        </div>

        {/* Content — max-width container with responsive padding */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex justify-between items-center">
            
            {/* Logo — fluid typography with clamp() */}
            <a 
              href="#home" 
              onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
              className="flex items-center gap-2 sm:gap-3 shrink-0 group"
              aria-label="Jerome Studio - Home"
            >
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-400 shadow-[0_0_20px_#34D399] group-hover:shadow-[0_0_30px_#34D399] transition-shadow duration-300" />
              <h1 className="font-black uppercase text-white whitespace-nowrap" style={{ fontSize: 'clamp(0.875rem, 2.5vw, 1.5rem)', letterSpacing: 'clamp(0.1em, 0.5vw, 0.25em)' }}>
                JEROME<span className="text-emerald-400 ml-1 sm:ml-2">STUDIO</span>
              </h1>
            </a>

            {/* Desktop Menu — hidden below md breakpoint */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.href)}
                    className={`relative px-3 lg:px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                      isActive 
                        ? 'text-emerald-400 bg-emerald-500/15' 
                        : 'text-white/90 hover:bg-emerald-500/15 hover:text-emerald-400'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className="relative z-10">{item.label}</span>
                    {isActive && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Desktop CTA — hidden below md breakpoint */}
            <div className="hidden md:block shrink-0">
              <button 
                onClick={() => handleNavClick('#contact')}
                className="px-5 lg:px-6 py-2.5 rounded-full font-semibold text-sm text-white bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_4px_15px_rgba(16,185,129,0.4)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.5)] min-h-[44px]"
              >
                Let's Talk
              </button>
            </div>

            {/* Mobile Menu Button — 48px touch target */}
            <button
              className="md:hidden flex items-center justify-center w-12 h-12 rounded-full text-emerald-400 hover:bg-emerald-500/15 active:bg-emerald-500/25 transition-colors"
              onClick={toggleMenu}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu — full-screen overlay with animation */}
        <div
          id="mobile-menu"
          className={`md:hidden fixed inset-x-0 top-[calc(100%+0.5rem)] mx-3 sm:mx-4 rounded-3xl overflow-hidden bg-[#111111]/98 backdrop-blur-xl border border-emerald-500/30 shadow-[0_8px_32px_rgba(16,185,129,0.15)] transition-all duration-300 ease-out ${
            isOpen 
              ? 'opacity-100 translate-y-0 pointer-events-auto' 
              : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
          style={{ maxHeight: 'calc(100vh - 6rem)', overflowY: 'auto' }}
          aria-hidden={!isOpen}
        >
          <div className="flex flex-col gap-1 p-4 sm:p-6">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className={`text-left py-3.5 px-4 rounded-2xl font-medium transition-all duration-300 flex items-center gap-3 min-h-[48px] ${
                    isActive
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'text-white hover:bg-emerald-500/15 hover:text-emerald-400'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className={`text-xs font-bold w-7 h-7 flex items-center justify-center rounded-full shrink-0 ${
                    isActive ? 'bg-emerald-500 text-white' : 'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-base">{item.label}</span>
                </button>
              );
            })}
            <button 
              onClick={() => handleNavClick('#contact')}
              className="w-full py-4 rounded-2xl font-semibold text-base mt-2 text-white bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 transition-all min-h-[48px] shadow-[0_4px_15px_rgba(16,185,129,0.4)]"
            >
              Let's Talk
            </button>
          </div>
        </div>

        {/* Mobile Menu Backdrop */}
        <div
          className={`md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          style={{ zIndex: -1 }}
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      </nav>
    </>
  );
}