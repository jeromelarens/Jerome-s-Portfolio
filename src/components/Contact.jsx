import React, { useState, useEffect } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaPaperPlane,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "../data/portfolioData";
import {
  getRemainingCooldown,
  isExternalHttpUrl,
  rememberSubmission,
  sanitizeHref,
} from "../utils/security";

// ✅ Your Formspree form ID
const FORMSPREE_FORM_ID = "mpqeqyqo";
const LAST_SUBMISSION_STORAGE_KEY = "portfolio-contact-last-submission";
const SUBMISSION_COOLDOWN_MS = 60_000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMPTY_FORM = {
  name: "",
  email: "",
  subject: "",
  message: "",
  website: "",
};

function normalizeFormData(formData) {
  return {
    name: formData.name.trim(),
    email: formData.email.trim(),
    subject: formData.subject.trim(),
    message: formData.message.trim(),
    website: formData.website.trim(),
  };
}

function validateFormData(formData) {
  if (formData.name.length < 2 || formData.name.length > 80) {
    return "Please enter a name between 2 and 80 characters.";
  }

  if (!EMAIL_PATTERN.test(formData.email) || formData.email.length > 254) {
    return "Please enter a valid email address.";
  }

  if (formData.subject.length < 3 || formData.subject.length > 120) {
    return "Please enter a subject between 3 and 120 characters.";
  }

  if (formData.message.length < 20 || formData.message.length > 500) {
    return "Please keep your message between 20 and 500 characters.";
  }

  return null;
}

export default function Contact() {
  const { personal, social } = portfolioData;
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Respect user's motion preferences
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const [formData, setFormData] = useState(EMPTY_FORM);

  const [focusedField, setFocusedField] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const normalizedFormData = normalizeFormData(formData);
    const validationError = validateFormData(normalizedFormData);
    if (validationError) {
      setError(validationError);
      return;
    }

    const remainingCooldown = getRemainingCooldown(
      LAST_SUBMISSION_STORAGE_KEY,
      SUBMISSION_COOLDOWN_MS
    );
    if (remainingCooldown > 0) {
      setError(
        `Please wait ${Math.ceil(
          remainingCooldown / 1000
        )} seconds before sending another message.`
      );
      return;
    }

    // Hidden field catches simplistic bot submissions without affecting real visitors.
    if (normalizedFormData.website) {
      setSubmitted(true);
      setFormData(EMPTY_FORM);
      setTimeout(() => setSubmitted(false), 5000);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        cache: "no-store",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({
          name: normalizedFormData.name,
          _replyto: normalizedFormData.email,
          email: normalizedFormData.email,
          subject: normalizedFormData.subject,
          message: normalizedFormData.message,
        }),
      });

      if (response.ok) {
        rememberSubmission(LAST_SUBMISSION_STORAGE_KEY);
        setSubmitted(true);
        setFormData(EMPTY_FORM);
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        const data = await response.json();
        throw new Error(data.error || "Failed to send message");
      }
    } catch (err) {
      console.error("Formspree Error:", err);
      setError("Failed to send message. Please try again or email me directly.");
    } finally {
      setLoading(false);
    }
  };

  const contactMethods = [
    {
      icon: <FaEnvelope />,
      label: "Email",
      value: personal.email,
      href: sanitizeHref(`mailto:${personal.email}`),
      color: "from-emerald-500/20 to-emerald-400/5",
      iconColor: "text-emerald-400",
    },
    {
      icon: <FaPhone />,
      label: "Phone",
      value: personal.phone,
      href: sanitizeHref(`tel:${personal.phone}`),
      color: "from-teal-500/20 to-teal-400/5",
      iconColor: "text-teal-400",
    },
    {
      icon: <FaMapMarkerAlt />,
      label: "Location",
      value: personal.location,
      href: "#",
      color: "from-cyan-500/20 to-cyan-400/5",
      iconColor: "text-cyan-400",
    },
  ];

  const socialLinks = [
    {
      icon: <FaGithub />,
      href: sanitizeHref(social.github),
      label: "GitHub",
      color: "hover:text-white",
    },
    {
      icon: <FaLinkedin />,
      href: sanitizeHref(social.linkedin),
      label: "LinkedIn",
      color: "hover:text-blue-400",
    },
    {
      icon: <FaTwitter />,
      href: sanitizeHref(social.twitter || "#"),
      label: "Twitter",
      color: "hover:text-sky-400",
    },
  ];

  const inputClasses = (fieldName) =>
    `w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-[#0a0a0a] border outline-none transition-all duration-300 text-white placeholder-gray-600 text-sm sm:text-base ${
      focusedField === fieldName
        ? "border-emerald-500/50 shadow-lg shadow-emerald-500/10"
        : "border-gray-800 hover:border-gray-700"
    }`;

  return (
    <section
      id="contact"
      className="relative py-16 sm:py-20 md:py-28 lg:py-32 overflow-hidden"
      style={{ backgroundColor: "#050505" }}
    >
      {/* Background Glow */}
      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] rounded-full blur-[100px] sm:blur-[120px] lg:blur-[150px] opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14 lg:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 backdrop-blur-sm">
            <HiSparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            CONTACT
          </div>
          <h2
            className="font-black text-white leading-tight mb-3 sm:mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Let's <span className="text-emerald-400">Connect</span>
          </h2>
          <p
            className="max-w-xl mx-auto leading-relaxed px-2 sm:px-0"
            style={{
              color: "#9CA3AF",
              fontSize: "clamp(0.9375rem, 1.5vw, 1.125rem)",
            }}
          >
            Have a project in mind? I'd love to hear about it. Let's build something amazing together.
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12 xl:gap-16">
          {/* Left Side - Contact Info */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 space-y-6 sm:space-y-8"
          >
            {/* Info Cards */}
            <div className="space-y-3 sm:space-y-4">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={index}
                  href={method.href}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: prefersReducedMotion ? 0 : index * 0.1 + 0.2 }}
                  whileHover={prefersReducedMotion ? {} : { x: 4 }}
                  className="group flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-gray-800 bg-[#0a0a0a] hover:border-emerald-500/20 transition-all duration-300"
                >
                  <div
                    className={`shrink-0 rounded-xl sm:rounded-2xl bg-gradient-to-br ${method.color} border border-emerald-500/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
                    style={{
                      width: "clamp(2.75rem, 7vw, 3.5rem)",
                      height: "clamp(2.75rem, 7vw, 3.5rem)",
                      fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
                    }}
                  >
                    <span className={method.iconColor}>{method.icon}</span>
                  </div>
                  <div className="min-w-0">
                    <p
                      className="text-gray-500 mb-0.5"
                      style={{ fontSize: "clamp(0.75rem, 1.2vw, 0.875rem)" }}
                    >
                      {method.label}
                    </p>
                    <p
                      className="text-white font-semibold group-hover:text-emerald-300 transition-colors duration-300 truncate"
                      style={{ fontSize: "clamp(0.8125rem, 1.5vw, 1rem)" }}
                    >
                      {method.value}
                    </p>
                  </div>
                  <FaArrowRight
                    className="ml-auto text-gray-700 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all duration-300 opacity-0 group-hover:opacity-100 shrink-0"
                    style={{ fontSize: "clamp(0.75rem, 1.2vw, 0.875rem)" }}
                  />
                </motion.a>
              ))}
            </div>

            {/* Availability Status */}
            <div className="p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl border border-emerald-500/15 bg-emerald-500/5">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="relative">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-400" />
                  <div className="absolute inset-0 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <span
                  className="text-emerald-400 font-semibold"
                  style={{ fontSize: "clamp(0.8125rem, 1.3vw, 0.9375rem)" }}
                >
                  Available for Work
                </span>
              </div>
              <p
                className="text-gray-500 leading-relaxed"
                style={{ fontSize: "clamp(0.75rem, 1.2vw, 0.875rem)" }}
              >
                Currently open to freelance projects and full-time opportunities. Response time: within 24 hours.
              </p>
            </div>

            {/* Social Links */}
            <div>
              <p
                className="text-gray-500 mb-3 sm:mb-4 font-medium uppercase tracking-wider"
                style={{ fontSize: "clamp(0.6875rem, 1vw, 0.75rem)" }}
              >
                Follow Me
              </p>
              <div className="flex gap-2.5 sm:gap-3">
                {socialLinks.map((socialLink, index) => (
                  <a
                    key={index}
                    href={socialLink.href}
                    target={isExternalHttpUrl(socialLink.href) ? "_blank" : undefined}
                    rel={isExternalHttpUrl(socialLink.href) ? "noopener noreferrer" : undefined}
                    referrerPolicy={isExternalHttpUrl(socialLink.href) ? "no-referrer" : undefined}
                    className={`flex items-center justify-center rounded-xl border border-gray-800 bg-[#0a0a0a] text-gray-400 ${socialLink.color} hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-300`}
                    style={{
                      width: "clamp(2.5rem, 6vw, 3rem)",
                      height: "clamp(2.5rem, 6vw, 3rem)",
                      fontSize: "clamp(0.875rem, 2vw, 1.125rem)",
                    }}
                    aria-label={socialLink.label}
                  >
                    {socialLink.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3"
          >
            <div
              className="rounded-2xl sm:rounded-[1.5rem] lg:rounded-[2rem] p-5 sm:p-6 lg:p-8 xl:p-10 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #111111 0%, #0a0a0a 100%)",
                border: "1px solid rgba(16,185,129,0.12)",
              }}
            >
              {/* Top Accent */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
                    className="py-12 sm:py-16 lg:py-20 text-center"
                  >
                    <motion.div
                      initial={prefersReducedMotion ? false : { scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={
                        prefersReducedMotion ? {} : { type: "spring", stiffness: 200, damping: 15 }
                      }
                      className="mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4 sm:mb-6"
                      style={{
                        width: "clamp(4rem, 10vw, 5rem)",
                        height: "clamp(4rem, 10vw, 5rem)",
                      }}
                    >
                      <FaCheckCircle
                        className="text-emerald-400"
                        style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)" }}
                      />
                    </motion.div>
                    <h3
                      className="font-bold text-white mb-2"
                      style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)" }}
                    >
                      Message Sent!
                    </h3>
                    <p
                      className="text-gray-400"
                      style={{ fontSize: "clamp(0.8125rem, 1.3vw, 0.9375rem)" }}
                    >
                      Thank you for reaching out. I'll get back to you soon.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <h3
                      className="font-bold text-white mb-1 sm:mb-2"
                      style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)" }}
                    >
                      Send a Message
                    </h3>
                    <p
                      className="text-gray-500 mb-6 sm:mb-8"
                      style={{ fontSize: "clamp(0.8125rem, 1.3vw, 0.9375rem)" }}
                    >
                      Fill out the form below and I'll respond as soon as possible.
                    </p>

                    {/* Error Message */}
                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                        >
                          {error}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                      <div className="sr-only" aria-hidden="true">
                        <label htmlFor="website">Website</label>
                        <input
                          id="website"
                          type="text"
                          name="website"
                          value={formData.website}
                          onChange={handleChange}
                          tabIndex={-1}
                          autoComplete="off"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        <div className="relative">
                          <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            onFocus={() => setFocusedField("name")}
                            onBlur={() => setFocusedField(null)}
                            required
                            autoComplete="name"
                            aria-label="Your Name"
                            maxLength={80}
                            className={inputClasses("name")}
                          />
                          {focusedField === "name" && !prefersReducedMotion && (
                            <motion.div
                              layoutId="focus"
                              className="absolute bottom-0 left-4 sm:left-5 right-4 sm:right-5 h-0.5 bg-emerald-500 rounded-full"
                            />
                          )}
                        </div>
                        <div className="relative">
                          <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            onFocus={() => setFocusedField("email")}
                            onBlur={() => setFocusedField(null)}
                            required
                            autoComplete="email"
                            aria-label="Email Address"
                            maxLength={254}
                            className={inputClasses("email")}
                          />
                        </div>
                      </div>

                      <div className="relative">
                        <input
                          type="text"
                          name="subject"
                          placeholder="Subject"
                          value={formData.subject}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("subject")}
                          onBlur={() => setFocusedField(null)}
                          required
                          autoComplete="off"
                          aria-label="Subject"
                          maxLength={120}
                          className={inputClasses("subject")}
                        />
                      </div>

                      <div className="relative">
                        <textarea
                          rows="4"
                          name="message"
                          placeholder="Tell me about your project..."
                          value={formData.message}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("message")}
                          onBlur={() => setFocusedField(null)}
                          required
                          autoComplete="off"
                          aria-label="Your Message"
                          maxLength={500}
                          className={`${inputClasses("message")} resize-none`}
                        />
                        <div
                          className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 text-gray-700"
                          style={{ fontSize: "clamp(0.625rem, 1vw, 0.75rem)" }}
                        >
                          {formData.message.length}/500
                        </div>
                      </div>

                      <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={prefersReducedMotion ? {} : { scale: 1.01 }}
                        whileTap={prefersReducedMotion ? {} : { scale: 0.99 }}
                        className="w-full py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-bold flex items-center justify-center gap-2 sm:gap-3 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed min-h-[52px] sm:min-h-[56px]"
                        style={{
                          background: "linear-gradient(135deg, #10B981, #34D399)",
                          color: "#050505",
                          fontSize: "clamp(0.875rem, 1.5vw, 1rem)",
                        }}
                      >
                        {loading ? (
                          <>
                            <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-[#050505]/30 border-t-[#050505] rounded-full animate-spin" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <FaPaperPlane className="text-sm sm:text-base" />
                            <span>Send Message</span>
                          </>
                        )}
                      </motion.button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
