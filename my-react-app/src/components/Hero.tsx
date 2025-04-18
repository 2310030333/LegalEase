import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Hero.css'; // <-- We'll create this CSS file

const Hero = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeInOut" } },
  };

  const descriptionVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeInOut", delay: 0.3 } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: "easeInOut", delay: 0.5 } },
  };

  const handleLoginClick = () => {
    navigate('/user-type-selection', { state: { action: 'login' } });
  };

  const handleSignUpClick = () => {
    navigate('/user-type-selection', { state: { action: 'signup' } });
  };

  return (
    <section id="hero" className="animated-wave-gradient py-24 md:py-36" ref={containerRef}>
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left space-y-6 md:space-y-8">
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight"
            variants={titleVariants}
            initial="hidden"
            animate="visible"
          >
            LegalEase
          </motion.h1>
          <motion.p
            className="text-gray-300 text-xl sm:text-2xl leading-relaxed max-w-2xl"
            variants={descriptionVariants}
            initial="hidden"
            animate="visible"
          >
            Providing expert legal services with integrity and dedication.
          </motion.p>
          <motion.div
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <Button
              variant="default"
              size="lg"
              onClick={handleLoginClick}
              className="bg-primary text-white hover:bg-primary/90 px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Login
            </Button>
            <br />
            <Button
              variant="default"
              size="lg"
              onClick={handleSignUpClick}
              className="bg-primary text-white hover:bg-primary/90 px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Sign Up
            </Button>
          </motion.div>
        </div>
        <motion.div
          className="hidden md:flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.8 }}
        >
          <img
            src="/images/randomimage.jpg"
            alt="Law and Justice"
            className="rounded-3xl shadow-2xl border border-gray-700"
          />
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0, ease: "easeInOut" }}
        className="mt-16 text-center"
      >
        <ChevronRight className="w-12 h-12 text-primary mx-auto animate-bounce" />
      </motion.div>
    </section>
  );
};

export default Hero;
