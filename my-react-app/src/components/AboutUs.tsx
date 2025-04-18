import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';  // Assuming you have shadcn/ui
import {
  Briefcase,
  Gavel,
  BookOpen,
  Users,
  Mail,
  Phone,
  MapPin,
  Clock,
  ChevronRight,
  User,
  Quote,
  Loader2,
} from 'lucide-react';
import SectionTitle from './SectionTitle';

const AboutUs = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeInOut' } },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeInOut' } },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeInOut' } },
  };

  const handleScroll = () => {
    const aboutSection = document.getElementById('hero');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.section
      id="about" // 👈 This ID is important for scrolling
      className="bg-gray-900 py-24 md:py-36"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <SectionTitle
            title="About LegalEase"
            subtitle="An AI-powered application designed to make the legal 
system more accessible, efficient, and user-friendly for 
both clients and legal professionals."
            align="left"
          />
          <motion.p
            className="text-gray-300 text-lg sm:text-xl mb-8 leading-relaxed"
            variants={textVariants}
          >
            LegalEase revolutionizes the legal landscape by simplifying traditionally complex legal
            processes. Through automation and intelligent design, it streamlines everything from
            client intake to case resolution, reducing the time and effort required for both clients
            and legal professionals. Whether you're filing paperwork, managing case documents, or
            navigating compliance, LegalEase ensures that each step is clear, organized, and easy to
            follow — even for those without a legal background.
          </motion.p>
          <motion.p
            className="text-gray-300 text-lg sm:text-xl mb-10 leading-relaxed"
            variants={textVariants}
            transition={{ delay: 0.2 }}
          >
            At the heart of LegalEase is a suite of AI-driven tools tailored for legal
            professionals. From advanced case management and intelligent legal research to automated
            documentation, these tools empower lawyers to work faster and more accurately. An
            intuitive, user-friendly interface, combined with built-in chatbots, helps clients find
            answers to basic legal questions instantly — making legal support more accessible,
            responsive, and human-centered than ever before.
          </motion.p>
          <motion.div transition={{ delay: 0.4 }}>
            <Button
              variant="outline"
              size="lg"
              className="text-primary hover:bg-primary/20 border-primary/50 px-6 py-2 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-lg"
              onClick={handleScroll}
            >
              Join Us!
            </Button>
          </motion.div>
        </div>
        <motion.div
          className="relative rounded-3xl shadow-2xl overflow-hidden border border-gray-700"
          variants={imageVariants}
        >
          <img
            src="/images/heroimage.jpg"
            alt="About Our Firm"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutUs;
