import React from 'react';
import { FaCertificate, FaExternalLinkAlt } from 'react-icons/fa';
import { portfolioData } from '../data/portfolioData';

export default function Certifications() {
  const { certifications = [] } = portfolioData;

  return (
    <section id="certifications" className="py-20 bg-dark-bg">
      <div className="section-container max-w-5xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Certifications</span>
          </h2>

          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-cyan-500 mx-auto"></div>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="glass p-8 rounded-2xl border border-primary-500 border-opacity-20 hover:border-opacity-50 transition-all duration-300 hover:shadow-glow group"
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="text-3xl text-primary-400">
                  <FaCertificate />
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary-400 transition-colors">
                    {cert.title}
                  </h3>

                  <p className="text-slate-400 font-semibold">
                    {cert.issuer}
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3 mb-6 pb-6 border-b border-primary-500 border-opacity-20">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Issued:</span>
                  <span className="font-semibold text-primary-400">
                    {cert.date}
                  </span>
                </div>

                {cert.credentialId && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Credential ID:</span>
                    <span className="font-mono text-primary-300">
                      {cert.credentialId}
                    </span>
                  </div>
                )}
              </div>

              {/* Verification Link */}
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 font-semibold transition-colors"
                >
                  Verify Credential
                  <FaExternalLinkAlt className="text-sm" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}