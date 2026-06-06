
import React from "react";
import { portfolioData } from "../data/portfolioData";
import { FaBriefcase, FaCheckCircle } from "react-icons/fa";

export default function Experience() {
  const { experience } = portfolioData;

  return (
    <section
      id="experience"
      className="py-24"
      style={{ backgroundColor: "#050505" }}
    >
      <div className="section-container max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <span
            className="px-4 py-2 rounded-full text-sm font-semibold"
            style={{
              background: "rgba(16,185,129,.1)",
              color: "#34D399",
            }}
          >
            EXPERIENCE
          </span>

          <h2
            className="text-5xl md:text-6xl font-bold mt-6 mb-4"
            style={{ color: "#FFFFFF" }}
          >
            Professional Journey
          </h2>

          <p
            className="max-w-2xl mx-auto text-lg"
            style={{ color: "#A1A1AA" }}
          >
            My journey in full-stack development and modern web technologies.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div
            className="absolute left-6 top-0 w-1 h-full hidden md:block"
            style={{
              background:
                "linear-gradient(to bottom,#10B981,#34D399)",
            }}
          />

          {experience.map((exp, index) => (
            <div
              key={index}
              className="relative pl-16 mb-12"
            >
              {/* Timeline Dot */}
              <div
                className="absolute left-0 w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg,#10B981,#34D399)",
                }}
              >
                <FaBriefcase
                  className="text-lg"
                  style={{ color: "#050505" }}
                />
              </div>

              {/* Experience Card */}
              <div
                className="rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2"
                style={{
                  background: "#111111",
                  border:
                    "1px solid rgba(16,185,129,.15)",
                }}
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                  <div>
                    <h3
                      className="text-2xl font-bold"
                      style={{ color: "#FFFFFF" }}
                    >
                      {exp.position}
                    </h3>

                    <p
                      className="font-medium mt-1"
                      style={{ color: "#34D399" }}
                    >
                      {exp.company}
                    </p>
                  </div>

                  <span
                    className="mt-3 md:mt-0 px-4 py-2 rounded-full text-sm font-semibold"
                    style={{
                      background:
                        "rgba(16,185,129,.1)",
                      color: "#34D399",
                    }}
                  >
                    {exp.duration}
                  </span>
                </div>

                <p
                  className="leading-8 mb-6"
                  style={{ color: "#A1A1AA" }}
                >
                  {exp.description}
                </p>

                {exp.achievements &&
                  exp.achievements.length > 0 && (
                    <div className="space-y-4">
                      {exp.achievements.map(
                        (achievement, idx) => (
                          <div
                            key={idx}
                            className="flex gap-3"
                          >
                            <FaCheckCircle
                              className="mt-1"
                              style={{
                                color: "#10B981",
                              }}
                            />

                            <p
                              style={{
                                color: "#A1A1AA",
                              }}
                            >
                              {achievement}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

