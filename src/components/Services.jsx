
import React from "react";
import {
  FaCode,
  FaServer,
  FaLaptopCode,
  FaArrowRight,
} from "react-icons/fa";
import { portfolioData } from "../data/portfolioData";

export default function Services() {
  const { services } = portfolioData;

  const icons = [
    <FaCode />,
    <FaServer />,
    <FaLaptopCode />,
  ];

  return (
    <section
      id="services"
      className="py-24"
      style={{ backgroundColor: "#050505" }}
    >
      <div className="section-container max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <span
            className="px-4 py-2 rounded-full text-sm font-semibold"
            style={{
              background: "rgba(16,185,129,.1)",
              color: "#34D399",
            }}
          >
            SERVICES
          </span>

          <h2
            className="text-5xl md:text-6xl font-bold mt-6 mb-4"
            style={{ color: "#FFFFFF" }}
          >
            What I Can Build
          </h2>

          <p
            className="max-w-2xl mx-auto text-lg"
            style={{ color: "#A1A1AA" }}
          >
            Modern web solutions using the MERN Stack and
            latest frontend technologies.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2"
              style={{
                background: "#111111",
                border: "1px solid rgba(16,185,129,.15)",
              }}
            >
              {/* Icon */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mb-6"
                style={{
                  background:
                    "linear-gradient(135deg,#10B981,#34D399)",
                  color: "#050505",
                }}
              >
                {icons[index]}
              </div>

              {/* Title */}
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: "#FFFFFF" }}
              >
                {service.title}
              </h3>

              {/* Description */}
              <p
                className="leading-8 mb-6"
                style={{ color: "#A1A1AA" }}
              >
                {service.description}
              </p>

              {/* Bottom */}
              <div
                className="flex items-center gap-2 font-medium"
                style={{ color: "#34D399" }}
              >
                Learn More
                <FaArrowRight />
              </div>
            </div>
          ))}
        </div>

        {/* CTA Card */}
        <div
          className="mt-20 rounded-3xl p-12 text-center"
          style={{
            background:
              "linear-gradient(135deg,#111111,#0d0d0d)",
            border: "1px solid rgba(16,185,129,.15)",
          }}
        >
          <h3
            className="text-3xl font-bold mb-4"
            style={{ color: "#FFFFFF" }}
          >
            Have a Project Idea?
          </h3>

          <p
            className="max-w-2xl mx-auto mb-8"
            style={{ color: "#A1A1AA" }}
          >
            Let's work together to create a modern,
            scalable, and user-friendly web application.
          </p>

          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold transition-all hover:scale-105"
            style={{
              background:
                "linear-gradient(135deg,#10B981,#34D399)",
              color: "#050505",
            }}
          >
            Contact Me
            <FaArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
}
