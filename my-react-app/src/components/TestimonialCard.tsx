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

// Reusable Testimonial Card
const TestimonialCard = ({ name, quote, image }: { name: string, quote: string, image: string }) => {
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    };

  return (
    <motion.div
      className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700" // Refined styling
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="flex items-center gap-4 mb-6">
        <img src={image} alt={name} className="w-16 h-16 rounded-full object-cover border-2 border-primary"  // Styled image
        />
        <h4 className="text-lg font-semibold text-white">{name}</h4>
      </div>
      <div className="relative pl-8"> {/* Added padding for quote */}
        <Quote className="absolute left-0 top-0 text-gray-500 w-8 h-8 opacity-50" />  {/* Styled quote */}
        <p className="text-gray-300 italic text-lg leading-relaxed">"{quote}"</p> {/* Refined text */}
      </div>
    </motion.div>
  );
};

export default TestimonialCard;