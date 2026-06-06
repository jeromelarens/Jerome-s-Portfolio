import React, { useEffect, useRef, useState } from "react";
import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
  FaServer,
  FaDatabase,
  FaCode,
  FaBolt,
  FaGraduationCap,
  FaLayerGroup,
  FaStar,
  FaCodeBranch,
  FaTerminal,
  FaRocket,
  FaCogs,
  FaLaptopCode,
} from "react-icons/fa";
import {
  SiMongodb,
  SiExpress,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiRedux,
  SiPostman,
  SiNextdotjs,
  SiDocker,
  SiGraphql,
  SiJest,
  SiWebpack,
  SiNginx,
  SiRedis,
  SiFigma,
  SiVercel,
  SiLinux,
  SiNpm,
} from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";

export default function Skills() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredSkill, setHoveredSkill] = useState(null);

  // Respect user's motion preferences
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const categories = ["All", "Frontend", "Backend", "Database", "DevOps", "Tools"];

  const skills = [
    { name: "React.js", icon: <FaReact />, level: 95, color: "#61DAFB", category: "Frontend", },
    { name: "JavaScript", icon: <SiJavascript />, level: 92, color: "#F7DF1E", category: "Frontend",  },
    { name: "TypeScript", icon: <SiTypescript />, level: 88, color: "#3178C6", category: "Frontend",  },
    { name: "Node.js", icon: <FaNodeJs />, level: 90, color: "#339933", category: "Backend", },
    { name: "Express.js", icon: <SiExpress />, level: 88, color: "#808080", category: "Backend", },
    { name: "MongoDB", icon: <SiMongodb />, level: 87, color: "#47A248", category: "Database",  },
    { name: "Redux Toolkit", icon: <SiRedux />, level: 85, color: "#764ABC", category: "Frontend",  },
    { name: "Tailwind CSS", icon: <SiTailwindcss />, level: 94, color: "#06B6D4", category: "Frontend",  },
    { name: "Git", icon: <FaGitAlt />, level: 90, color: "#F05032", category: "Tools", },
    { name: "GitHub", icon: <FaGithub />, level: 92, color: "#FFFFFF", category: "Tools", },
    { name: "REST APIs", icon: <FaServer />, level: 92, color: "#10B981", category: "Backend", },
    { name: "Postman", icon: <SiPostman />, level: 88, color: "#FF6C37", category: "Tools", },
    { name: "VS Code", icon: <FaCode />, level: 95, color: "#007ACC", category: "Tools",  },
  
    { name: "Redis", icon: <SiRedis />, level: 72, color: "#DC382D", category: "Database",  },
  
  ];

  const currentlyLearning = [
    { name: "Next.js 15", icon: <SiNextdotjs />, desc: "App Router & Server Components", color: "#FFFFFF", progress: 65 },

    { name: "GraphQL Federation", icon: <SiGraphql />, desc: "Microservices API Gateway", color: "#E535AB", progress: 40 },
    { name: "System Design", icon: <FaBolt />, desc: "Scalable Architecture Patterns", color: "#F59E0B", progress: 55 },
    
    { name: "CI/CD Pipelines", icon: <FaCodeBranch />, desc: "Automated Deployment Workflows", color: "#10B981", progress: 50 },
  ];

  const stats = [
    { label: "Technologies", value: "10+", icon: <FaLayerGroup /> },
    { label: "Coding Problems", value: "500+", icon: <FaTerminal /> },
    { label: "Projects Built", value: "10+", icon: <FaRocket /> },
    { label: "Graduate", value: "2026", icon: <FaRocket /> },
  ];

  const filteredSkills = activeCategory === "All" 
    ? skills 
    : skills.filter(s => s.category === activeCategory);

  const motionProps = prefersReducedMotion
    ? { initial: false, animate: false }
    : {};

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-16 sm:py-20 md:py-28 lg:py-32 overflow-hidden"
      style={{ backgroundColor: "#050505" }}
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(16,185,129,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Floating Orbs Background */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-[120px] opacity-[0.08] pointer-events-none bg-emerald-500" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-[150px] opacity-[0.06] pointer-events-none bg-emerald-400" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[200px] opacity-[0.04] pointer-events-none bg-emerald-300" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border border-emerald-500/20 bg-emerald-500/5"
            whileHover={{ scale: 1.05 }}
          >
            <FaCogs className="text-emerald-400 text-sm" />
            <span className="text-emerald-400 font-semibold text-xs sm:text-sm uppercase tracking-widest">
              Technical Arsenal
            </span>
          </motion.div>

          <h2 
            className="font-bold text-white mb-4 sm:mb-6 leading-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Skills & <span className="text-emerald-400">Expertise</span>
          </h2>

          <p 
            className="max-w-2xl mx-auto text-gray-400 leading-relaxed px-2 sm:px-0 mb-10"
            style={{ fontSize: 'clamp(0.9375rem, 1.5vw, 1.125rem)' }}
          >
            A comprehensive toolkit of modern technologies I leverage to architect, 
            build, and deploy scalable web applications that drive results.
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative group"
              >
                <div className="relative p-4 sm:p-5 rounded-2xl border border-gray-800 bg-[#0a0a0a]/80 backdrop-blur-sm overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <div className="text-emerald-400 text-xl sm:text-2xl mb-1">
                      {stat.icon}
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-14"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 border ${
                activeCategory === cat
                  ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400 shadow-lg shadow-emerald-500/10"
                  : "border-gray-800 bg-[#0a0a0a] text-gray-400 hover:border-gray-700 hover:text-gray-300"
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 rounded-full border border-emerald-500/50"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, scale: 0.95 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-5 mb-20 sm:mb-24 lg:mb-32"
          >
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                variants={cardVariants}
                whileHover={prefersReducedMotion ? {} : { y: -8, scale: 1.03 }}
                onHoverStart={() => setHoveredSkill(skill.name)}
                onHoverEnd={() => setHoveredSkill(null)}
                className="group relative"
              >
                <div className="relative rounded-xl sm:rounded-2xl border border-gray-800 bg-[#0a0a0a] p-4 sm:p-5 lg:p-6 text-center transition-all duration-500 hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-500/10 overflow-hidden">

                  {/* Background Glow on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  {/* Top Accent Line */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-1/2 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent transition-all duration-500" />

                  {/* Level Badge */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      <FaStar className="text-emerald-400 text-[10px]" />
                      <span className="text-emerald-400 text-[10px] sm:text-xs font-bold">
                        {skill.level}%
                      </span>
                    </div>
                  </div>

                  {/* Icon Container with Hexagonal Shape */}
                  <div className="relative mx-auto mb-3 sm:mb-4">
                    <div 
                      className="mx-auto flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                      style={{ 
                        color: skill.color,
                        width: 'clamp(3rem, 7vw, 4rem)',
                        height: 'clamp(3rem, 7vw, 4rem)',
                        fontSize: 'clamp(1.5rem, 3.5vw, 2rem)',
                      }}
                    >
                      {/* Hexagon Background */}
                      <div className="absolute inset-0 rounded-xl bg-gray-800/50 rotate-45 group-hover:bg-emerald-500/10 transition-colors duration-500" />
                      <div className="relative z-10">{skill.icon}</div>
                    </div>
                  </div>

                  {/* Skill Name */}
                  <h3 
                    className="text-white font-bold mb-1 group-hover:text-emerald-300 transition-colors duration-300"
                    style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)' }}
                  >
                    {skill.name}
                  </h3>

                  {/* Category & Experience */}
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider">
                      {skill.category}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gray-700" />
                    <span className="text-[10px] sm:text-xs text-emerald-500/70">
                      {skill.experience}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="relative w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full relative"
                      style={{
                        background: `linear-gradient(90deg, ${skill.color}40 0%, ${skill.color} 100%)`,
                      }}
                      initial={{ width: 0 }}
                      animate={isVisible ? { width: `${skill.level}%` } : { width: 0 }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : 1.2,
                        delay: prefersReducedMotion ? 0 : index * 0.05,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                    >
                      {!prefersReducedMotion && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]" />
                      )}
                    </motion.div>
                  </div>

                  {/* Hover Info Overlay */}
                  <AnimatePresence>
                    {hoveredSkill === skill.name && !prefersReducedMotion && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs whitespace-nowrap"
                      >
                        {skill.level}% Proficiency
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Currently Learning Section */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Section Divider */}
          <div className="flex items-center gap-4 sm:gap-6 mb-10 sm:mb-14 lg:mb-16">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-800 to-gray-800" />
            <motion.div 
              className="flex items-center gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-emerald-500/20 bg-emerald-500/5"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative">
                <FaGraduationCap className="text-emerald-400 text-lg sm:text-xl" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
              </div>
              <span className="text-emerald-400 font-bold text-sm sm:text-base uppercase tracking-wider">
                Currently Learning
              </span>
            </motion.div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-gray-800 to-gray-800" />
          </div>

          {/* Learning Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {currentlyLearning.map((item, index) => (
              <motion.div
                key={item.name}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: prefersReducedMotion ? 0 : index * 0.1, 
                  duration: 0.6,
                  ease: "easeOut"
                }}
                whileHover={prefersReducedMotion ? {} : { y: -6, scale: 1.02 }}
                className="group relative"
              >
                <div className="relative rounded-xl sm:rounded-2xl border border-gray-800 bg-[#0a0a0a] p-5 sm:p-6 lg:p-7 transition-all duration-500 hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-500/5 overflow-hidden">

                  {/* Animated Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  {/* Top Progress Bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gray-800">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${item.color}60, ${item.color})` }}
                      initial={{ width: 0 }}
                      animate={isVisible ? { width: `${item.progress}%` } : { width: 0 }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : 1.5,
                        delay: prefersReducedMotion ? 0 : index * 0.15 + 0.5,
                        ease: "easeOut",
                      }}
                    />
                  </div>

                  {/* Header Row */}
                  <div className="flex items-start justify-between mb-4">
                    <div 
                      className="flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                      style={{ 
                        color: item.color,
                        width: 'clamp(2.5rem, 5vw, 3rem)',
                        height: 'clamp(2.5rem, 5vw, 3rem)',
                        fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
                      }}
                    >
                      {item.icon}
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </span>
                      <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                        Active
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <h4 
                    className="text-white font-bold mb-2 group-hover:text-emerald-300 transition-colors duration-300"
                    style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }}
                  >
                    {item.name}
                  </h4>

                  <p 
                    className="text-gray-500 mb-4 leading-relaxed"
                    style={{ fontSize: 'clamp(0.8125rem, 1.2vw, 0.9375rem)' }}
                  >
                    {item.desc}
                  </p>

                  {/* Progress Section */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                        Progress
                      </span>
                      <span className="text-xs font-bold text-emerald-400">
                        {item.progress}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full relative"
                        style={{ background: `linear-gradient(90deg, ${item.color}40, ${item.color})` }}
                        initial={{ width: 0 }}
                        animate={isVisible ? { width: `${item.progress}%` } : { width: 0 }}
                        transition={{
                          duration: prefersReducedMotion ? 0 : 1.2,
                          delay: prefersReducedMotion ? 0 : index * 0.12 + 0.3,
                          ease: "easeOut",
                        }}
                      >
                        {!prefersReducedMotion && (
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]" />
                        )}
                      </motion.div>
                    </div>
                  </div>

                  {/* Footer Info */}
                  <div className="mt-4 pt-4 border-t border-gray-800/50 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaLaptopCode className="text-xs" />
                      <span className="text-xs">Hands-on Practice</span>
                    </div>
                    <div className="text-xs text-emerald-500/60 font-medium">
                      {item.progress < 50 ? 'Beginner' : item.progress < 75 ? 'Intermediate' : 'Advanced'}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}