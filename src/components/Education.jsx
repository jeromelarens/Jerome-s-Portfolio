import React, { useEffect, useState } from "react";
import { portfolioData } from "../data/portfolioData";
import { FaGraduationCap, FaCalendarAlt, FaAward } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Education() {
  const { education } = portfolioData;
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Respect user's motion preferences
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section
      id="education"
      className="relative py-16 sm:py-20 md:py-28 lg:py-32 overflow-hidden"
      style={{ backgroundColor: "#050505" }}
    >
      {/* Subtle background glow */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[400px] h-[300px] sm:w-[500px] sm:h-[400px] lg:w-[600px] lg:h-[500px] rounded-full blur-[100px] sm:blur-[120px] lg:blur-[150px] opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(16,185,129,0.4) 0%, transparent 70%)" }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14 lg:mb-20"
        >
          <span
            className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider"
            style={{
              background: "rgba(16,185,129,.1)",
              color: "#34D399",
              border: "1px solid rgba(16,185,129,.15)",
            }}
          >
            Education
          </span>

          <h2
            className="font-bold mt-4 sm:mt-6 mb-3 sm:mb-4 text-white"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Academic <span className="text-emerald-400">Journey</span>
          </h2>

          <p
            className="max-w-2xl mx-auto leading-relaxed px-2 sm:px-0"
            style={{ 
              color: "#A1A1AA",
              fontSize: 'clamp(0.9375rem, 1.5vw, 1.125rem)',
            }}
          >
            My educational background and academic achievements.
          </p>
        </motion.div>

        {/* Education Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative space-y-6 sm:space-y-8"
        >
          {/* Timeline connector line */}
          <div className="absolute left-6 sm:left-8 lg:left-10 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/30 via-emerald-500/10 to-transparent hidden md:block" />

          {education.map((edu, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={prefersReducedMotion ? {} : { y: -4 }}
              className="group relative rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 transition-all duration-500"
              style={{
                background: "#111111",
                border: "1px solid rgba(16,185,129,.15)",
              }}
            >
              {/* Timeline dot */}
              <div className="absolute -left-2 sm:-left-3 top-8 sm:top-10 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-500 border-4 border-[#050505] hidden md:block shadow-[0_0_12px_rgba(16,185,129,0.4)]" />

              <div className="flex flex-col md:flex-row md:justify-between gap-6 sm:gap-8">
                {/* Left - Degree & Institution */}
                <div className="flex gap-4 sm:gap-5">
                  <div
                    className="shrink-0 rounded-xl sm:rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: "linear-gradient(135deg,#10B981,#34D399)",
                      width: 'clamp(3rem, 8vw, 4rem)',
                      height: 'clamp(3rem, 8vw, 4rem)',
                    }}
                  >
                    <FaGraduationCap
                      className="transition-transform duration-300"
                      style={{ 
                        color: "#050505",
                        fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                      }}
                    />
                  </div>

                  <div className="min-w-0">
                    <h3
                      className="font-bold mb-1 sm:mb-2 text-white leading-tight"
                      style={{ fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)' }}
                    >
                      {edu.degree}
                    </h3>

                    <p
                      className="font-medium text-emerald-400"
                      style={{ fontSize: 'clamp(0.9375rem, 1.5vw, 1.125rem)' }}
                    >
                      {edu.institution}
                    </p>
                  </div>
                </div>

                {/* Right - Meta Info */}
                <div className="flex flex-col sm:flex-row md:flex-col gap-2 sm:gap-3 shrink-0">
                  <div
                    className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl"
                    style={{
                      background: "rgba(16,185,129,.08)",
                    }}
                  >
                    <FaCalendarAlt
                      className="shrink-0"
                      style={{ 
                        color: "#10B981",
                        fontSize: 'clamp(0.75rem, 1.2vw, 0.875rem)',
                      }}
                    />
                    <span 
                      className="text-white whitespace-nowrap"
                      style={{ fontSize: 'clamp(0.8125rem, 1.3vw, 0.9375rem)' }}
                    >
                      {edu.year}
                    </span>
                  </div>

                  <div
                    className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl"
                    style={{
                      background: "rgba(16,185,129,.08)",
                    }}
                  >
                    <FaAward
                      className="shrink-0"
                      style={{ 
                        color: "#10B981",
                        fontSize: 'clamp(0.75rem, 1.2vw, 0.875rem)',
                      }}
                    />
                    <span 
                      className="text-white whitespace-nowrap"
                      style={{ fontSize: 'clamp(0.8125rem, 1.3vw, 0.9375rem)' }}
                    >
                      CGPA: {edu.cgpa}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Note */}
              <div
                className="mt-6 sm:mt-8 pt-4 sm:pt-6"
                style={{
                  borderTop: "1px solid rgba(16,185,129,.15)",
                }}
              >
                <p
                  className="leading-relaxed"
                  style={{ 
                    color: "#A1A1AA",
                    fontSize: 'clamp(0.8125rem, 1.3vw, 0.9375rem)',
                  }}
                >
                  {edu.description || "Pursuing a strong foundation in Computer Science, Software Development, Data Structures, Algorithms, and Modern Web Technologies with a focus on Full Stack Development."}
                </p>
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-emerald-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}