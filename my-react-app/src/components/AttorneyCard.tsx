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

// Reusable Attorney Card
const AttorneyCard = ({ name, title, image }: { name: string, title: string, image: string }) => {
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };
  return (
    <motion.div
      className="bg-gray-800 rounded-xl p-4 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] border border-gray-700" // Refined styling
      whileHover={{ scale: 1.01, boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.2)" }}
      whileTap={{ scale: 0.99 }}
       variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <img src={image} alt={name} className="w-full h-72 object-cover rounded-md mb-6"  // Increased image height
      />
      <h3 className="text-2xl font-semibold text-white">{name}</h3>  {/* Refined typography */}
      <p className="text-gray-400 text-lg">{title}</p>
    </motion.div>
  );
};

export default AttorneyCard;