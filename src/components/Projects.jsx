import React, { useState, useEffect, useCallback } from "react";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaStar,
  FaCode,
  FaExpand,
  FaTimes,
  FaChevronRight,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "../data/portfolioData";
import { isExternalHttpUrl, sanitizeHref } from "../utils/security";

// Project images mapping - matches by partial title (case-insensitive)
const getProjectImage = (title) => {
  const lowerTitle = title.toLowerCase();
  
  if (lowerTitle.includes("interview")) 
    return "src/public/images/Interview Aware code Inteligenge image.png";
  if (lowerTitle.includes("text forensic") || lowerTitle.includes("forensic")) 
    return "src/public/images/Text forensic analyser.png";
  if (lowerTitle.includes("mpxire")) 
    return "src/public/images/Mpxire.png";
  if (lowerTitle.includes("self motive") || lowerTitle.includes("motive")) 
    return "src/public/images/Self Motive Traker.png";
  if (lowerTitle.includes("student growth") || lowerTitle.includes("growth")) 
    return "src/public/images/Student Growth Analyser.png";
  
  return null;
};

function ProjectImage({ project, onExpand }) {
  const imageSrc = getProjectImage(project.title);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Show expand button on touch devices (no hover)
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  if (!imageSrc || error) {
    return (
      <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-[#0a0a0a] border-b border-gray-800 flex items-center justify-center">
        <div className="text-center px-4">
          <FaCode className="text-3xl sm:text-4xl text-emerald-500/20 mx-auto mb-2 sm:mb-3" />
          <p className="text-gray-600 text-xs sm:text-sm font-medium">{project.title}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group overflow-hidden rounded-t-xl sm:rounded-t-2xl lg:rounded-t-3xl bg-[#0a0a0a]">
      {/* Skeleton loader */}
      {!loaded && (
        <div className="absolute inset-0 bg-[#111111] animate-pulse z-0" />
      )}
      
      <img
        src={imageSrc}
        alt={`${project.title} project screenshot`}
        className={`w-full aspect-[16/10] sm:aspect-[16/9] object-cover object-top transition-transform duration-700 group-hover:scale-105 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        loading="lazy"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-80 pointer-events-none" />

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Expand Button — always visible on touch, hover on desktop */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onExpand(imageSrc, project.title);
        }}
        className={`absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white transition-all duration-300 hover:bg-emerald-500 hover:border-emerald-500 z-10 ${isTouch ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0'}`}
        aria-label={`Expand ${project.title} image`}
      >
        <FaExpand className="text-xs sm:text-sm" />
      </button>

      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30">
          <FaStar className="text-emerald-400 text-[10px] sm:text-xs" />
          <span className="text-emerald-300 text-[10px] sm:text-xs font-semibold">Featured</span>
        </div>
      )}

      {/* Tech Tags */}
      <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 flex gap-1.5 sm:gap-2 z-10 flex-wrap max-w-[70%]">
        {project.technologies.slice(0, 2).map((tech, i) => (
          <span
            key={i}
            className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg bg-black/50 backdrop-blur-sm border border-white/10 text-emerald-300 text-[10px] sm:text-xs font-medium"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

function Lightbox({ image, title, onClose }) {
  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 md:p-12"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} full size image`}
    >
      <button
        className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-emerald-500 hover:border-emerald-500 transition-all duration-300 z-10"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        <FaTimes className="text-sm sm:text-lg" />
      </button>

      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="relative max-w-5xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-auto max-h-[75vh] sm:max-h-[80vh] object-contain rounded-xl sm:rounded-2xl border border-gray-800"
        />
        <p className="text-center text-white font-semibold mt-3 sm:mt-4 text-sm sm:text-lg">{title}</p>
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({ project, index, prefersReducedMotion }) {
  const sourceHref = sanitizeHref(project.github);
  const liveHref = sanitizeHref(project.live);
  const sourceIsExternal = isExternalHttpUrl(sourceHref);
  const liveIsExternal = isExternalHttpUrl(liveHref);
  const liveUnavailable = liveHref === "#";

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : index * 0.08 }}
      whileHover={prefersReducedMotion ? {} : { y: -5 }}
      className="group relative rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden transition-all duration-500"
      style={{
        background: "#111111",
        border: "1px solid rgba(16,185,129,.15)",
      }}
      tabIndex={0}
      role="article"
      aria-label={`${project.title} project`}
    >
      {/* Project Image */}
      <ProjectImage project={project} onExpand={project.onExpand} />

      {/* Content */}
      <div className="p-4 sm:p-5 lg:p-6">
        <h3 
          className="font-bold text-white mb-2 sm:mb-3 group-hover:text-emerald-300 transition-colors duration-300"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}
        >
          {project.title}
        </h3>

        <p 
          className="text-gray-400 leading-relaxed mb-4 sm:mb-5 line-clamp-2"
          style={{ fontSize: 'clamp(0.8125rem, 1.3vw, 0.9375rem)' }}
        >
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
          {project.technologies.map((tech, i) => (
            <span
              key={i}
              className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium border border-emerald-500/20 bg-emerald-500/5 text-emerald-400"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-emerald-500/10">
          <div className="flex gap-3 sm:gap-4">
            <a
              href={sourceHref}
              target={sourceIsExternal ? "_blank" : undefined}
              rel={sourceIsExternal ? "noopener noreferrer" : undefined}
              referrerPolicy={sourceIsExternal ? "no-referrer" : undefined}
              className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-400 hover:text-emerald-400 transition-colors duration-300"
              aria-label={`View ${project.title} source code on GitHub`}
            >
              <FaGithub className="text-sm sm:text-base" />
              <span>Source</span>
            </a>
            <a
              href={liveHref}
              target={liveIsExternal ? "_blank" : undefined}
              rel={liveIsExternal ? "noopener noreferrer" : undefined}
              referrerPolicy={liveIsExternal ? "no-referrer" : undefined}
              onClick={liveUnavailable ? (event) => event.preventDefault() : undefined}
              className={`flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm transition-colors duration-300 ${
                liveUnavailable
                  ? "text-gray-600 cursor-not-allowed"
                  : "text-gray-400 hover:text-emerald-400"
              }`}
              aria-disabled={liveUnavailable}
              aria-label={`View ${project.title} live demo`}
            >
              <FaExternalLinkAlt className="text-xs sm:text-sm" />
              <span>Live</span>
            </a>
          </div>

          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gray-700 flex items-center justify-center text-gray-600 group-hover:border-emerald-500/50 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all duration-300">
            <FaChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          </div>
        </div>
      </div>

      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}

export default function Projects() {
  const { projects } = portfolioData;
  const [lightbox, setLightbox] = useState({ isOpen: false, image: "", title: "" });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Respect user's motion preferences
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const openLightbox = useCallback((image, title) => {
    setLightbox({ isOpen: true, image, title });
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox({ isOpen: false, image: "", title: "" });
  }, []);

  // Inject expand handler into projects
  const projectsWithHandler = projects.map((p) => ({
    ...p,
    onExpand: openLightbox,
  }));

  const featuredProjects = projectsWithHandler.filter((p) => p.featured);
  const otherProjects = projectsWithHandler.filter((p) => !p.featured);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: prefersReducedMotion ? 0 : 0.1, 
        delayChildren: 0.15 
      },
    },
  };

  return (
    <section
      id="projects"
      className="relative py-16 sm:py-20 md:py-28 lg:py-32 overflow-hidden"
      style={{ backgroundColor: "#050505" }}
    >
      {/* Background glows — responsive sizing */}
      <div className="absolute top-[-5%] sm:top-[-10%] right-[-10%] sm:right-[-5%] w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] rounded-full blur-[80px] sm:blur-[100px] lg:blur-[120px] opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(16,185,129,0.4) 0%, transparent 70%)" }}
      />
      <div className="absolute bottom-[-5%] sm:bottom-[-10%] left-[-10%] sm:left-[-5%] w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px] rounded-full blur-[60px] sm:blur-[80px] lg:blur-[100px] opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(52,211,153,0.3) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 backdrop-blur-sm">
            <HiSparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            PROJECTS
          </div>
          <h2 
            className="font-black text-white leading-tight mb-3 sm:mb-4 sm:mb-6"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Featured <span className="text-emerald-400">Work</span>
          </h2>
          <p 
            className="max-w-2xl mx-auto text-gray-400 leading-relaxed px-2 sm:px-0"
            style={{ fontSize: 'clamp(0.9375rem, 1.5vw, 1.125rem)' }}
          >
            A collection of real-world projects showcasing my expertise in MERN Stack Development,
            TypeScript, AI Integration, and Full Stack Architecture.
          </p>
        </motion.div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-12 sm:mb-16 lg:mb-20">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 lg:mb-10"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <FaStar className="text-xs sm:text-sm" />
              </div>
              <h3 
                className="font-bold text-white"
                style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)' }}
              >
                Featured Projects
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-emerald-500/20 to-transparent" />
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 lg:gap-8"
            >
              {featuredProjects.map((project, index) => (
                <ProjectCard 
                  key={index} 
                  project={project} 
                  index={index} 
                  prefersReducedMotion={prefersReducedMotion}
                />
              ))}
            </motion.div>
          </div>
        )}

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <div>
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 lg:mb-10"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <FaCode className="text-xs sm:text-sm" />
              </div>
              <h3 
                className="font-bold text-white"
                style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)' }}
              >
                Other Projects
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-emerald-500/20 to-transparent" />
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8"
            >
              {otherProjects.map((project, index) => (
                <ProjectCard 
                  key={index} 
                  project={project} 
                  index={index} 
                  prefersReducedMotion={prefersReducedMotion}
                />
              ))}
            </motion.div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox.isOpen && (
          <Lightbox
            image={lightbox.image}
            title={lightbox.title}
            onClose={closeLightbox}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
