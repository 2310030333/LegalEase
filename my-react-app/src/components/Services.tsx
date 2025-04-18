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

// Services Section
const Services = () => {
    const servicesData = [
      {
        title: 'Automation',
        description: 'Hassle Free operation with chatbot integration and more.',
        icon: <Briefcase className="w-10 h-10 text-primary" />, // Increased icon size
      },
      {
        title: 'Justice Served Right',
        description: 'Now, the power of law at your finger tips through virtual communication, curated courses and more.',
        icon: <Gavel className="w-10 h-10 text-primary" />,
      },
      {
        title: 'Inclusivity',
        description: 'Caters to a diversified set of individuals.',
        icon: <Users className="w-10 h-10 text-primary" />,
      },
      {
          title: 'Locate Legal Services',
          description: 'Find lawyers, resources and services near you.',
          icon: <MapPin className="w-10 h-10 text-primary" />,
      },
      {
          title: 'Resources & Student Support',
          description: 'Refer to past cases for better understanding.',
          icon: <BookOpen className="w-10 h-10 text-primary" />,
      },
      {
          title: 'Timeline Of Applications',
          description: 'Keep track of the progress of your cases.',
          icon: <Clock className="w-10 h-10 text-primary" />,
      }
    ];
  
    return (
      <section className="bg-gray-950 py-24 md:py-36">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Our Legal Services"
            subtitle="We offer a wide range of legal services to meet your needs."
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">  {/* Increased gap */}
            {servicesData.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>
    );
  };

  export default Services;