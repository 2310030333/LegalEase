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

// Testimonials Section
const Testimonials = () => {
    const testimonialsData = [
        {
            name: 'John Smith',
            quote: 'The team at Lawyex provided exceptional legal service and support throughout my case. I highly recommend them.',
            image: 'https://placehold.co/120x120/EEE/31343C', // Placeholder, increased size
        },
        {
            name: 'Jane Doe',
            quote: 'I was very impressed with the professionalism and expertise of the attorneys at this firm.',
            image: 'https://placehold.co/120x120/EEE/31343C',  // Placeholder, increased size
        },
        {
            name: 'David Johnson',
            quote: 'Lawyex helped me navigate a complex legal situation with ease.  I am grateful for their guidance.',
            image: 'https://placehold.co/120x120/EEE/31343C', // Placeholder, increased size
        },
    ];

    return (
        <section className="bg-gray-900 py-24 md:py-36">
            <div className="container mx-auto px-4">
                <SectionTitle
                    title="What Our Clients Say"
                    subtitle="Read testimonials from our satisfied clients."
                    align="center"
                />
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-12">  {/* Adjusted grid */}
                    {testimonialsData.map((testimonial, index) => (
                        <TestimonialCard key={index} {...testimonial} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;