import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import type { Project } from './ProjectShowcase';
import imgBluesenseHeader from "figma:asset/86030c7e18c17cdfcad0d1728f33e6319ea64b40.png";
import imgAlnixAgroHeader from "figma:asset/c6983ced5dee907820c07d180a5e11309b79b08b.png";
import imgStilistHeader from "figma:asset/5b4fb1be2a728aa5ea4f64a47d1cc49a2a2f0a67.png";
import imgAlnixAgroSolutions from "figma:asset/c117c0e5142dc9171b0eeee027840dfd333c0444.png";
import { ArrowUpRight } from 'lucide-react';

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
}

export function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-background/95 backdrop-blur-md z-50 overflow-y-auto p-4 md:p-8"
        onClick={onClose}
      >
        {/* Close button - Fixed position */}
        <motion.button
          onClick={onClose}
          className="cursor-hover fixed top-20 md:top-24 right-4 md:right-8 w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-accent/50 bg-background/90 backdrop-blur-sm flex items-center justify-center group shadow-lg"
          style={{ zIndex: 51 }}
          whileHover={{ scale: 1.1, rotate: 90, borderColor: 'rgba(143, 190, 159, 1)' }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <X className="w-5 h-5 md:w-6 md:h-6 text-accent group-hover:text-white transition-colors" />
        </motion.button>

        <div className="min-h-screen">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-5xl mx-auto py-16"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-12"
            >
              {/* Desktop: Tags on top */}
              <div className="hidden md:flex flex-wrap gap-3 mb-6">
                {project.tags.map((tag, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                    className="px-4 py-2 bg-accent/10 border border-accent/30 rounded-full text-sm text-accent"
                    style={{ fontWeight: 600 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
              
              <h2 className="text-4xl md:text-7xl text-white mb-6" style={{ fontWeight: 700 }}>
                {project.title}
              </h2>
              
              {/* Mobile: Tags below title */}
              <div className="flex md:hidden flex-wrap gap-3 mb-6">
                {project.tags.map((tag, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                    className="px-3 py-1.5 bg-accent/10 border border-accent/30 rounded-full text-xs text-accent"
                    style={{ fontWeight: 600 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
              
              <p className="text-lg md:text-2xl text-muted-foreground">
                {project.description}
              </p>
            </motion.div>

            {/* Main image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className={`relative ${
                project.title === "BLUESENSE" ? "aspect-[1000/450]" : 
                project.title === "STILIST APP" ? "" : 
                "aspect-video"
              } rounded-lg overflow-hidden mb-16 ${project.title === "STILIST APP" ? "" : "border border-accent/20"}`}
            >
              {project.title === "STILIST APP" ? (
                <img
                  src={imgStilistHeader}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={project.title === "BLUESENSE" ? imgBluesenseHeader : project.title === "ALNIX AGRO" ? imgAlnixAgroHeader : project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              )}
            </motion.div>

            {/* Detailed sections */}
            <div className="space-y-16 mb-16">
              {/* Overview */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-3xl md:text-4xl text-white mb-4" style={{ fontWeight: 700 }}>
                  Overview
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {project.detailedDescription}
                </p>
              </motion.div>

              {/* Challenge */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-secondary/30 border border-border rounded-lg p-8"
              >
                <h3 className="text-3xl md:text-4xl text-white mb-4" style={{ fontWeight: 700 }}>
                  The Challenge
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {project.challenge}
                </p>
              </motion.div>

              {/* Solution */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="text-3xl md:text-4xl text-white mb-4" style={{ fontWeight: 700 }}>
                  The Solution
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {project.solution}
                </p>
              </motion.div>

              {/* Additional Images Grid */}
              {project.additionalImages.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  {/* BLUESENSE: 2x2 grid of AI skincare images */}
                  {project.title === "BLUESENSE" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      {project.additionalImages.map((img, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.7 + index * 0.1 }}
                          className="aspect-video rounded-lg overflow-hidden border border-accent/20 bg-secondary"
                          whileHover={{ scale: 1.02 }}
                        >
                          {img.startsWith('video:') ? (
                            <iframe
                              src={img.replace('video:', '')}
                              className="w-full h-full"
                              allow="autoplay"
                              allowFullScreen
                            />
                          ) : (
                            <img
                              src={img}
                              alt={`${project.title} design detail ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )}
                  {/* ALNIX AGRO: Custom layout - Single wide image */}
                  {project.title === "ALNIX AGRO" && (
                    <div className="w-full">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 }}
                        className="rounded-lg overflow-hidden aspect-[1920/820] w-full"
                        whileHover={{ scale: 1.02 }}
                      >
                        <img
                          src={imgAlnixAgroSolutions}
                          alt="Alnix Agro Solutions Overview"
                          className="w-full h-full object-contain"
                        />
                      </motion.div>
                    </div>
                  )}
                  {/* SOCIAL MEDIA: Custom layout - 3 kare + 3 kare + 2 yatay */}
                  {project.title === "SOCIAL MEDIA" && (
                    <div className="space-y-4 md:space-y-6">
                      {/* First row - 3 square images */}
                      <div className="grid grid-cols-3 gap-3 md:gap-6">
                        {project.additionalImages.slice(0, 3).map((img, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 + index * 0.1 }}
                            className="aspect-square rounded-lg overflow-hidden border border-accent/20 bg-secondary"
                            whileHover={{ scale: 1.02 }}
                          >
                            <img
                              src={img}
                              alt={`Social media design ${index + 1}`}
                              className="w-full h-full object-contain"
                            />
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* Second row - 3 square images */}
                      <div className="grid grid-cols-3 gap-3 md:gap-6">
                        {project.additionalImages.slice(3, 6).map((img, index) => (
                          <motion.div
                            key={index + 3}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.9 + index * 0.1 }}
                            className="aspect-square rounded-lg overflow-hidden border border-accent/20 bg-secondary"
                            whileHover={{ scale: 1.02 }}
                          >
                            <img
                              src={img}
                              alt={`Social media design ${index + 4}`}
                              className="w-full h-full object-contain"
                            />
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* Third row - 2 horizontal images */}
                      {project.additionalImages.length > 6 && (
                        <div className="grid grid-cols-2 gap-3 md:gap-6">
                          {project.additionalImages.slice(6, 8).map((img, index) => (
                            <motion.div
                              key={index + 6}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 1.2 + index * 0.1 }}
                              className="aspect-video rounded-lg overflow-hidden border border-accent/20 bg-secondary"
                              whileHover={{ scale: 1.02 }}
                            >
                              <img
                                src={img}
                                alt={`Social media design ${index + 7}`}
                                className="w-full h-full object-cover"
                                style={{ objectPosition: '50% 35%' }}
                              />
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  {/* Default grid for other projects */}
                  {project.title !== "BLUESENSE" && project.title !== "ALNIX AGRO" && project.title !== "SOCIAL MEDIA" && (
                    <div className="grid md:grid-cols-2 gap-6">
                      {project.additionalImages.map((img, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                          className="aspect-video rounded-lg overflow-hidden border border-accent/20"
                          whileHover={{ scale: 1.02 }}
                        >
                          <img
                            src={img}
                            alt={`${project.title} detail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Results */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-accent/5 border border-accent/20 rounded-lg p-8"
              >
                <h3 className="text-3xl md:text-4xl text-white mb-6" style={{ fontWeight: 700 }}>
                  Key Results
                </h3>
                <ul className="space-y-4">
                  {project.results.map((result, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                      <span className="text-lg text-muted-foreground">{result}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* ALNIX AGRO Figma Link */}
              {project.title === "ALNIX AGRO" && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="text-center"
                >
                  <motion.a
                    href="https://www.figma.com/design/211m7wk4HrwiS2u13TulgM/ALNIX-AGRO?node-id=14-265&t=CD4EGaRAR7UxWahS-1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-hover inline-flex items-center gap-3 px-6 py-3 bg-accent/10 border border-accent/40 rounded-full hover:bg-accent/20 transition-all group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5 text-accent" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.5 2.25A2.25 2.25 0 0 0 5.25 4.5v15A2.25 2.25 0 0 0 7.5 21.75h3.75V16.5H7.5v-3.75h3.75V9H7.5V5.25h3.75v3.75H15V5.25h-3.75Zm7.5 0v3.75h3.75A2.25 2.25 0 0 0 21 3.75V2.25h-6Zm0 7.5V13.5h3.75a2.25 2.25 0 0 0 0-4.5H15Zm0 7.5v3.75h3.75a2.25 2.25 0 0 0 2.25-2.25v-1.5H15Z"/>
                    </svg>
                    <span className="text-accent" style={{ fontWeight: 600 }}>
                      View Full Design on Figma
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-accent" />
                  </motion.a>
                </motion.div>
              )}
            </div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="text-center py-8"
            >
              <motion.button
                onClick={onClose}
                className="cursor-hover px-8 py-4 border border-accent/30 rounded-full hover:bg-accent/10 transition-all group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-accent" style={{ fontWeight: 600 }}>
                  BACK TO PROJECTS
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}