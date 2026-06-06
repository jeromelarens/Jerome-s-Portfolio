import React from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaReact,
  FaNodeJs,
  FaDownload,
} from "react-icons/fa";
import {
  SiRedux,
  SiMongodb,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import resumePdf from "../public/JEROME LARENS-BE 2026  MERN STACK DEVELOPER RESUME.pdf";

export default function About() {
  const techs = [
    { name: "React", icon: <FaReact /> },
    { name: "Redux Toolkit", icon: <SiRedux /> },
    { name: "Node.js", icon: <FaNodeJs /> },
    { name: "MongoDB", icon: <SiMongodb /> },
    { name: "TypeScript", icon: <SiTypescript /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss /> },
  ];

  const stats = [
    { value: "15+", label: "Projects Completed" },
    { value: "2026", label: "Graduation Year" },
    { value: "MERN", label: "Primary Stack" },
    { value: "∞", label: "Learning Mindset" },
  ];

  const featuredWork = [
    { name: "Text Forensic Analyzer", tag: "Analytics Platform" },
    { name: "Interview Aware Code Intelligence", tag: "AI Interview Prep" },
    { name: "Student Growth Analyzer", tag: "Data Insights" },
  ];

  return (
    <section
      id="about"
      className="relative bg-black py-32 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[140px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[140px] rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 blur-[160px] rounded-full" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg,#fff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-sm font-medium"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Available for Opportunities
            </motion.span>

            <h2 className="text-5xl md:text-7xl font-black text-white mt-8 leading-tight">
              Building
              <span className="text-emerald-400 block mt-2">
                Real World Products
              </span>
            </h2>

            <p className="mt-8 text-lg leading-8 text-gray-400 max-w-xl">
              Hi, I&apos;m Jerome Larens &mdash; a Software Engineer and 2026 graduate focused on
              building modern web applications using React, Redux Toolkit, JavaScript,
              Node.js, and MongoDB.
            </p>

            <p className="mt-4 text-lg leading-8 text-gray-500 max-w-xl">
              I enjoy turning complex ideas into simple user experiences. My projects
              focus on performance, scalability, and solving practical problems rather
              than just showcasing technologies.
            </p>

            <p className="mt-4 text-lg leading-8 text-gray-500 max-w-xl">
              Recently, I&apos;ve been building products like Developer Blind Spot Detector,
              Interview Aware Code Intelligence, and analytics-driven applications that
              help developers learn, improve, and make better technical decisions.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mt-10">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition-colors"
              >
                Let&apos;s Talk
              </motion.a>

              <motion.a
                href={resumePdf}
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 hover:border-emerald-500/30 transition-all"
              >
                <FaDownload className="text-emerald-400" />
                Download Resume
              </motion.a>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-8">
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all"
              >
                <FaGithub size={20} />
              </motion.a>

              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all"
              >
                <FaLinkedin size={20} />
              </motion.a>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative p-8 rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl overflow-hidden">
              {/* Top Badge */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-white text-xl font-semibold">
                    Software Engineer
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    Building Products &bull; Solving Problems &bull; Learning Daily
                  </p>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-400 text-xs font-medium">Open to Work</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    viewport={{ once: true }}
                    className="p-5 rounded-2xl bg-black/30 border border-white/10 hover:border-emerald-500/20 transition-colors group"
                  >
                    <h4 className="text-3xl md:text-4xl font-black text-emerald-400 group-hover:scale-105 transition-transform origin-left">
                      {stat.value}
                    </h4>
                    <p className="text-gray-500 text-sm mt-1">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Tech Stack */}
              <h4 className="text-white font-semibold mb-4">
                Technologies I Work With
              </h4>

              <div className="flex flex-wrap gap-3">
                {techs.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.05 * index }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-sm cursor-default hover:bg-emerald-500/10 hover:border-emerald-500/40 transition-all"
                  >
                    {tech.icon}
                    {tech.name}
                  </motion.div>
                ))}
              </div>

              {/* Current Focus */}
              <div className="mt-8">
                <h4 className="text-white font-semibold mb-4">
                  Current Focus
                </h4>

                <div className="flex flex-wrap gap-3">
                  {[
                    "Next.js",
                    "System Design",
                    "Performance Optimization",
                  ].map((item) => (
                    <div
                      key={item}
                      className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured Work */}
              <div className="mt-10 pt-6 border-t border-white/10">
                <h4 className="text-white font-semibold mb-4">
                  Featured Work
                </h4>

                <div className="space-y-3">
                  {featuredWork.map((work) => (
                    <div key={work.name} className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">
                        {work.name}
                      </span>
                      <span className="text-emerald-400 text-sm">
                        {work.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/10 blur-[80px] rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-500/5 blur-[60px] rounded-full" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
