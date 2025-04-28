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

// Contact Section
const Contact = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault(); // Prevent the default form submission
      setIsSubmitting(true);
      setSubmitError(null);
      setSubmitSuccess(false);
    
      try {
        // Simulate an API call with a delay
        await new Promise((resolve) => setTimeout(resolve, 2000));
    
        // Simulate a successful response
        // Uncomment the next line to simulate an error for testing
        // throw new Error("Failed to send message. Please try again.");
    
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', message: '' }); // Clear the form
      } catch (error: any) {
        setSubmitError(error.message || 'An error occurred. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    };
    
  
      const contactInfoVariants = {
          hidden: { opacity: 0, x: -20 },
          visible: (i: number) => ({
              opacity: 1,
              x: 0,
              transition: {
                  duration: 0.5,
                  delay: i * 0.2, // Staggered delay
                  ease: "easeInOut"
              }
          }),
      };
  
    return (
      <section className="bg-gray-900 py-24 md:py-36">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-start">  {/* Increased gap */}
          <div>
            <SectionTitle
              title="Contact Our Law Firm"
              subtitle="Get in touch with us for a consultation."
              align="left"
            />
            <div className="space-y-6">  {/* Increased spacing */}
              <motion.div
                className="flex items-center gap-4"
                 variants={contactInfoVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={0}
              >
                <MapPin className="w-7 h-7 text-primary" />  {/* Increased icon size */}
                <span className="text-gray-300 text-lg sm:text-xl">KLH Aziz Nagar Hyderabad,India</span>  {/* Refined text */}
              </motion.div>
              <motion.div  className="flex items-center gap-4"
               variants={contactInfoVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={1}
              >
                <Phone className="w-7 h-7 text-primary" />
                <span className="text-gray-300 text-lg sm:text-xl">+1 (555) 123-4567</span>
              </motion.div>
              <motion.div  className="flex items-center gap-4"
               variants={contactInfoVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                   custom={2}
              >
                <Mail className="w-7 h-7 text-primary" />
                <span className="text-gray-300 text-lg sm:text-xl">ingo@legalease.com</span>
              </motion.div>
            </div>
          </div>
          <div className="bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-700">  {/* Refined styling */}
            <h3 className="text-3xl font-semibold text-white mb-8">Send us a message</h3>  {/* Refined typography */}
            <form onSubmit={handleSubmit} className="space-y-6">  {/* Increased spacing */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1.5">Name</label>  {/* Added margin */}
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your Name"
                  className="mt-0 bg-gray-700 text-white border-gray-600 rounded-md px-4 py-3"  // Refined input style
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Your Email"
                  className="mt-0 bg-gray-700 text-white border-gray-600 rounded-md px-4 py-3"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1.5">Message</label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}  // Increased rows
                  placeholder="Your Message"
                  className="mt-0 bg-gray-700 text-white border-gray-600 rounded-md px-4 py-3 resize-y" // Refined textarea
                />
              </div>
              <Button
                type="submit"
                variant="default"
                size="lg"
                className="w-full bg-primary text-white hover:bg-primary/90 px-8 py-3 rounded-full font-semibold text-lg
                          transition-all duration-300 shadow-lg hover:shadow-xl" // Refined button
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />  {/* Increased size */}
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </Button>
            </form>
            <AnimatePresence>
              {submitError && (
                <motion.p
                  initial={{ opacity: 0, y: -15 }}  // Increased distance
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="mt-6 text-red-500 text-lg"  // Refined text
                >
                  {submitError}
                </motion.p>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {submitSuccess && (
                <motion.p
                  initial={{ opacity: 0, y: -15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="mt-6 text-green-500 text-lg"
                >
                  Message sent successfully! We will contact you shortly.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    );
  };

  export default Contact;
