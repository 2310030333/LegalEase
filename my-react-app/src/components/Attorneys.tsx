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
import SectionTitle from './SectionTitle';
import ServiceCard from './ServiceCard';
import TestimonialCard from './TestimonialCard';
import AttorneyCard from './AttorneyCard';

import AashrithaImage from '../assets/Aashritha.png';
import ManavImage from '../assets/Manav.png';
import DeepikaImage from '../assets/Deepika.png';

// Attorneys Section
const Attorneys = () => {
    const attorneysData = [
      {
        name: 'Sri Aashritha',
        title: '',
        image: AashrithaImage,
      },
      {
        name: 'Manav',
        title: '',
        image: ManavImage,
      },
      {
        name: 'Deepika',
        title: '',
        image: DeepikaImage,
      },
    ];
  
    return (
      <section className="bg-gray-950 py-24 md:py-36">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Meet the Key Developers"
            subtitle="A dedicated team with proven results."
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">  {/* Increased gap */}
            {attorneysData.map((attorney, index) => (
              <AttorneyCard key={index} {...attorney} />
            ))}
          </div>
        </div>
      </section>
    );
  };

export default Attorneys;
