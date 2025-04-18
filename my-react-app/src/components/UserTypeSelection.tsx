import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ChevronRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const UserTypeSelection = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Determine action: 'login' or 'signup' (default to 'signup')
  const action = location.state?.action === 'login' ? 'login' : 'signup';

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

  const handleSelection = (type: 'student' | 'lawyer' | 'client') => {
    // Route changes based on action
    if (action === 'login') {
      navigate(`/login/${type}`);
    } else {
      navigate(`/register/${type}`);
    }
  };

  return (
    <section className="bg-gradient-to-br from-gray-900 via-purple-900 to-black py-24 md:py-36" ref={containerRef}>
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left space-y-6 md:space-y-8">
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight"
            variants={titleVariants}
            initial="hidden"
            animate="visible"
          >
            {action === 'login' ? 'Login As' : 'Sign Up As'}
          </motion.h1>
          <motion.p
            className="text-gray-300 text-xl sm:text-2xl leading-relaxed max-w-2xl"
            variants={descriptionVariants}
            initial="hidden"
            animate="visible"
          >
            {action === 'login'
              ? 'Choose your role to log in.'
              : 'Choose your role to register.'}
          </motion.p>
          <motion.div
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
          >
            <Button
              variant="default"
              size="lg"
              className="bg-primary text-white hover:bg-primary/90 px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={() => handleSelection('student')}
            >
              Student
            </Button>
            <br /><br />
            <Button
              variant="default"
              size="lg"
              className="bg-primary text-white hover:bg-primary/90 px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={() => handleSelection('lawyer')}
            >
              Lawyer
            </Button>
            <br /><br />
            <Button
              variant="default"
              size="lg"
              className="bg-primary text-white hover:bg-primary/90 px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={() => handleSelection('client')}
            >
              Client
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
            src="https://placehold.co/700x500/EEE/31343C"
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

export default UserTypeSelection;
