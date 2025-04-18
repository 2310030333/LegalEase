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

// Reusable Section Title
const SectionTitle = ({ title, subtitle, align = 'left' }: { title: string, subtitle: string, align?: 'left' | 'center' }) => {
    const titleVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };
    const subtitleVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
    };

  return (
    <div className={cn(
      "mb-12", // Increased margin-bottom
      align === 'center' && "text-center mx-auto max-w-3xl" // Adjusted max-width
    )}>
      <motion.h2
        className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight" // Refined typography
        variants={titleVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {title}
      </motion.h2>
      <motion.p
        className="text-gray-300 text-lg sm:text-xl leading-relaxed" // Improved text styling
        variants={subtitleVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {subtitle}
      </motion.p>
    </div>
  );
};

export default SectionTitle;