import React, { useState, useEffect } from 'react';
import { FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { portfolioData } from '../data/portfolioData';

/**
 * Testimonial Card Component
 * - Client testimonial with image, name, company, and rating
 */
function TestimonialCard({ testimonial }) {
  return (
    <div className="glass p-8 rounded-2xl border border-primary-500 border-opacity-20">
      {/* Star Rating */}
      <div className="flex gap-2 mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <FaStar key={i} className="text-yellow-400" />
        ))}
      </div>

      {/* Testimonial Text */}
      <p className="text-slate-300 text-lg mb-6 leading-relaxed">
        "{testimonial.testimonial}"
      </p>

      {/* Client Info */}
      <div className="flex items-center gap-4 pt-6 border-t border-primary-500 border-opacity-20">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-16 h-16 rounded-full object-cover border-2 border-primary-500"
        />
        <div>
          <h4 className="font-bold text-slate-100">{testimonial.name}</h4>
          <p className="text-slate-400 text-sm">{testimonial.title}</p>
          <p className="text-primary-400 text-sm font-semibold">
            {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Testimonials Section Component
 * - Carousel of client testimonials
 * - Navigation controls
 */
export default function Testimonials() {
  const { testimonials } = portfolioData;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay, testimonials.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
    setIsAutoPlay(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlay(false);
  };

  // Get visible testimonials (show 3 cards or less on mobile)
  const visibleCount = window.innerWidth < 768 ? 1 : 3;
  const visibleTestimonials = Array.from({ length: visibleCount }).map(
    (_, i) => testimonials[(currentIndex + i) % testimonials.length]
  );

  return (
    <section id="testimonials" className="py-20 bg-dark-bg">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Clients <span className="gradient-text">Say</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Testimonials from satisfied clients and colleagues
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-cyan-500 mx-auto mt-6"></div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {visibleTestimonials.map((testimonial, index) => (
            <div key={index} className="animate-slide-up">
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center gap-8">
          <button
            onClick={handlePrev}
            className="bg-primary-500 hover:bg-primary-600 p-3 rounded-full transition-all duration-300 hover:shadow-glow"
            aria-label="Previous testimonial"
          >
            <FaChevronLeft />
          </button>

          {/* Indicators */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlay(false);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary-500 w-8'
                    : 'bg-slate-600 hover:bg-slate-500'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              ></button>
            ))}
          </div>

          <button
            onClick={handleNext}
            className="bg-primary-500 hover:bg-primary-600 p-3 rounded-full transition-all duration-300 hover:shadow-glow"
            aria-label="Next testimonial"
          >
            <FaChevronRight />
          </button>
        </div>

        {/* Autoplay Toggle */}
        <div className="text-center mt-8">
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className="text-sm text-slate-400 hover:text-primary-400 transition-colors duration-300"
          >
            {isAutoPlay ? '⏸ Pause' : '▶ Play'} Autoplay
          </button>
        </div>
      </div>
    </section>
  );
}
