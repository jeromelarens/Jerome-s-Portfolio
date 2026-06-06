import React, { useEffect, useState } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaArrowUp,
  FaHeart,
  FaCode,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { motion } from "framer-motion";
import { portfolioData } from "../data/portfolioData";
import { isExternalHttpUrl, sanitizeHref } from "../utils/security";

export default function Footer() {
  const { personal, social } = portfolioData;
  const currentYear = new Date().getFullYear();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Respect user's motion preferences
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ 
      top: 0, 
      behavior: prefersReducedMotion ? 'auto' : 'smooth' 
    });
  };

  const quickLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    {
      icon: <FaGithub />,
      href: sanitizeHref(social.github),
      label: "GitHub",
      color: "hover:text-white hover:border-white/20 hover:bg-white/5",
    },
    {
      icon: <FaLinkedin />,
      href: sanitizeHref(social.linkedin),
      label: "LinkedIn",
      color: "hover:text-blue-400 hover:border-blue-400/20 hover:bg-blue-400/5",
    },
    {
      icon: <FaEnvelope />,
      href: sanitizeHref(`mailto:${personal.email}`),
      label: "Email",
      color: "hover:text-emerald-400 hover:border-emerald-400/20 hover:bg-emerald-400/5",
    },
  ];

  return (
    <footer className="relative overflow-hidden" style={{ backgroundColor: "#050505" }}>
      {/* Top Wave Divider — responsive height */}
      <div className="relative h-16 sm:h-20 md:h-24 overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-full h-full"
          aria-hidden="true"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="rgba(16,185,129,0.03)"
          />
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            fill="rgba(16,185,129,0.05)"
          />
        </svg>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* CTA Banner */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-2xl sm:rounded-3xl lg:rounded-[2.5rem] p-6 sm:p-8 lg:p-10 xl:p-16 mb-12 sm:mb-16 lg:mb-20 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #064E3B 0%, #065F46 50%, #047857 100%)",
            border: "1px solid rgba(16,185,129,0.2)",
          }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(52,211,153,0.3) 1px, transparent 0)`,
                backgroundSize: "32px 32px",
              }}
            />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
            <div className="text-center md:text-left">
              <h3 
                className="font-bold text-white mb-2 sm:mb-3"
                style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)' }}
              >
                Ready to start a project?
              </h3>
              <p 
                className="text-emerald-100/70"
                style={{ fontSize: 'clamp(0.9375rem, 1.5vw, 1.125rem)' }}
              >
                Let's collaborate and build something extraordinary together.
              </p>
            </div>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-white text-emerald-900 font-bold hover:bg-emerald-50 transition-all duration-300 hover:scale-105 shadow-xl shadow-black/20 shrink-0"
              style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1rem)' }}
            >
              Get in Touch
              <FaExternalLinkAlt className="text-xs sm:text-sm group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </motion.div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-12 sm:mb-16">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="#home" className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 group">
              <div className="relative">
                <div 
                  className="rounded-lg sm:rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-400 flex items-center justify-center text-[#050505] shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-all duration-300"
                  style={{
                    width: 'clamp(2.25rem, 6vw, 2.5rem)',
                    height: 'clamp(2.25rem, 6vw, 2.5rem)',
                  }}
                >
                  <FaCode style={{ fontSize: 'clamp(0.875rem, 2vw, 1.125rem)' }} />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#050505]" />
              </div>
              <div>
                <h1 
                  className="font-black tracking-wider uppercase text-white"
                  style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)' }}
                >
                  JEROME
                </h1>
                <span 
                  className="text-emerald-400 font-bold tracking-[0.3em] uppercase block"
                  style={{ fontSize: 'clamp(0.625rem, 1.2vw, 0.75rem)' }}
                >
                  STUDIO
                </span>
              </div>
            </a>
            <p 
              className="text-gray-500 leading-relaxed mb-4 sm:mb-6"
              style={{ fontSize: 'clamp(0.8125rem, 1.3vw, 0.875rem)' }}
            >
              MERN Stack Developer crafting scalable web applications and modern digital experiences with passion and precision.
            </p>
            <div className="flex gap-2.5 sm:gap-3">
              {socialLinks.map((socialLink, index) => (
                <a
                  key={index}
                  href={socialLink.href}
                  target={isExternalHttpUrl(socialLink.href) ? "_blank" : undefined}
                  rel={isExternalHttpUrl(socialLink.href) ? "noopener noreferrer" : undefined}
                  referrerPolicy={isExternalHttpUrl(socialLink.href) ? "no-referrer" : undefined}
                  aria-label={socialLink.label}
                  className={`flex items-center justify-center rounded-lg sm:rounded-xl border border-gray-800 bg-[#0a0a0a] text-gray-400 transition-all duration-300 ${socialLink.color}`}
                  style={{
                    width: 'clamp(2.25rem, 5vw, 2.5rem)',
                    height: 'clamp(2.25rem, 5vw, 2.5rem)',
                    fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                  }}
                >
                  {socialLink.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 
              className="font-bold text-white mb-4 sm:mb-6 flex items-center gap-2"
              style={{ fontSize: 'clamp(0.9375rem, 1.5vw, 1rem)' }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Quick Links
            </h4>
            <ul className="space-y-2.5 sm:space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-2 text-gray-500 hover:text-emerald-400 transition-all duration-300"
                    style={{ fontSize: 'clamp(0.8125rem, 1.3vw, 0.875rem)' }}
                  >
                    <span className="w-0 group-hover:w-2.5 h-px bg-emerald-400 transition-all duration-300 shrink-0" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 
              className="font-bold text-white mb-4 sm:mb-6 flex items-center gap-2"
              style={{ fontSize: 'clamp(0.9375rem, 1.5vw, 1rem)' }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Contact
            </h4>
            <div className="space-y-3 sm:space-y-4">
              <a
                href={`mailto:${personal.email}`}
                className="group flex items-start gap-2.5 sm:gap-3 text-gray-500 hover:text-emerald-400 transition-all duration-300"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0 group-hover:bg-emerald-500/10 transition-colors duration-300">
                  <FaEnvelope style={{ fontSize: 'clamp(0.625rem, 1.2vw, 0.75rem)' }} />
                </div>
                <div className="min-w-0">
                  <p 
                    className="text-gray-600 mb-0.5"
                    style={{ fontSize: 'clamp(0.625rem, 1vw, 0.6875rem)' }}
                  >
                    Email
                  </p>
                  <p 
                    className="truncate"
                    style={{ fontSize: 'clamp(0.8125rem, 1.3vw, 0.875rem)' }}
                  >
                    {personal.email}
                  </p>
                </div>
              </a>
              <div className="group flex items-start gap-2.5 sm:gap-3 text-gray-500">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                  <span style={{ fontSize: 'clamp(0.625rem, 1.2vw, 0.75rem)' }}>📱</span>
                </div>
                <div>
                  <p 
                    className="text-gray-600 mb-0.5"
                    style={{ fontSize: 'clamp(0.625rem, 1vw, 0.6875rem)' }}
                  >
                    Phone
                  </p>
                  <p style={{ fontSize: 'clamp(0.8125rem, 1.3vw, 0.875rem)' }}>
                    {personal.phone}
                  </p>
                </div>
              </div>
              <div className="group flex items-start gap-2.5 sm:gap-3 text-gray-500">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                  <span style={{ fontSize: 'clamp(0.625rem, 1.2vw, 0.75rem)' }}>📍</span>
                </div>
                <div>
                  <p 
                    className="text-gray-600 mb-0.5"
                    style={{ fontSize: 'clamp(0.625rem, 1vw, 0.6875rem)' }}
                  >
                    Location
                  </p>
                  <p style={{ fontSize: 'clamp(0.8125rem, 1.3vw, 0.875rem)' }}>
                    {personal.location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Availability */}
          <div>
            <h4 
              className="font-bold text-white mb-4 sm:mb-6 flex items-center gap-2"
              style={{ fontSize: 'clamp(0.9375rem, 1.5vw, 1rem)' }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Availability
            </h4>
            <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-emerald-500/10 bg-emerald-500/5 mb-3 sm:mb-4">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="relative">
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-400" />
                  {!prefersReducedMotion && (
                    <div className="absolute inset-0 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  )}
                </div>
                <span 
                  className="text-emerald-400 font-semibold"
                  style={{ fontSize: 'clamp(0.8125rem, 1.3vw, 0.875rem)' }}
                >
                  Open to Work
                </span>
              </div>
              <p 
                className="text-gray-500 leading-relaxed"
                style={{ fontSize: 'clamp(0.75rem, 1.2vw, 0.8125rem)' }}
              >
                Currently available for freelance projects and full-time opportunities.
              </p>
            </div>
            <p 
              className="text-gray-600"
              style={{ fontSize: 'clamp(0.75rem, 1.2vw, 0.8125rem)' }}
            >
              Response time: <span className="text-emerald-400 font-medium">Within 24 hours</span>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative py-6 sm:py-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
            {/* Copyright */}
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gray-600 flex items-center gap-2 order-2 sm:order-1"
              style={{ fontSize: 'clamp(0.75rem, 1.2vw, 0.875rem)' }}
            >
              © {currentYear} {personal.name}. Crafted with
              <FaHeart 
                className={`text-emerald-500 text-xs ${prefersReducedMotion ? '' : 'animate-pulse'}`} 
              />
              and lots of coffee.
            </motion.p>

            {/* Tech Stack Badge */}
            <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-gray-800 bg-[#0a0a0a] order-3 sm:order-2">
              <span 
                className="text-gray-600"
                style={{ fontSize: 'clamp(0.625rem, 1vw, 0.75rem)' }}
              >
                Built with
              </span>
              <span 
                className="font-semibold text-emerald-400"
                style={{ fontSize: 'clamp(0.625rem, 1vw, 0.75rem)' }}
              >
                React
              </span>
              <span className="text-gray-700">+</span>
              <span 
                className="font-semibold text-cyan-400"
                style={{ fontSize: 'clamp(0.625rem, 1vw, 0.75rem)' }}
              >
                Tailwind
              </span>
            </div>

            {/* Scroll to Top */}
            <motion.button
              onClick={scrollToTop}
              whileHover={prefersReducedMotion ? {} : { y: -4, scale: 1.1 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              className="group relative flex items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-400 text-[#050505] shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-shadow duration-300 order-1 sm:order-3"
              style={{
                width: 'clamp(2.5rem, 6vw, 3rem)',
                height: 'clamp(2.5rem, 6vw, 3rem)',
              }}
              aria-label="Scroll to top"
            >
              <FaArrowUp 
                className="group-hover:-translate-y-0.5 transition-transform duration-300"
                style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}
              />
              {/* Ripple Effect */}
              {!prefersReducedMotion && (
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl border border-emerald-400/50 animate-ping opacity-20" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Ambient Glow — responsive sizing */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] sm:w-[600px] sm:h-[250px] lg:w-[800px] lg:h-[300px] rounded-full blur-[100px] sm:blur-[120px] lg:blur-[150px] opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(16,185,129,0.5) 0%, transparent 70%)" }}
      />
    </footer>
  );
}
