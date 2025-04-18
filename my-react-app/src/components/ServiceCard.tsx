
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';  // Assuming you have shadcn/ui
import { Input } from './ui/input';  // Assuming you have shadcn/ui
import { Textarea } from './ui/textarea';  // Assuming you have shadcn/ui
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
} from 'lucide-react';  // Import icons
import { cn } from '../lib/utils'; // Utility for combining class names

const ServiceCard = ({ title, description, icon, }: { title: string, description: string, icon: React.ReactNode }) => {
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };
    const titleVariants = {
        base: "text-2xl font-semibold text-white mb-3 group-hover:text-primary transition-colors",
        hover: "text-primary",
    };

  return (
    <motion.div
      className="bg-gray-800 rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] border border-gray-700 group" // Refined styling
      whileHover={{ scale: 1.01, boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.2)" }}
      whileTap={{ scale: 0.99 }}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="mb-6 text-primary">{icon}</div>
      <h3 className={titleVariants.base}>{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </motion.div>
  );
};

export default ServiceCard;