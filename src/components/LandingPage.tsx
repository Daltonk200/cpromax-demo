import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Search, UserPlus, Menu, X, Star, ArrowRight, Mail, Target, Lightbulb, User, Briefcase, Check } from 'lucide-react';
import RegistrationModal from './RegistrationModal';

const LandingPage: React.FC = () => {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState<'individual' | 'business' | null>(null);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const navigate = useNavigate();

  const handleJoinBusiness = () => {
    setIsRegistrationOpen(true);
  };

  const handleLogin = () => {
    // Placeholder for login functionality
    alert('Login feature coming soon!');
  };

  const handleViewPlans = (userType: 'individual' | 'business') => {
    setSelectedUserType(userType);
    setShowPricingModal(true);
  };

  const handleSelectPlan = (planType: 'basic' | 'professional' | 'premium') => {
    if (!selectedUserType) return;

    // Save user type and plan selection to localStorage
    const userPlanData = {
      userType: selectedUserType,
      selectedPlan: planType,
      subscriptionStatus: 'pending' as const
    };
    
    localStorage.setItem('userPlanData', JSON.stringify(userPlanData));
    
    // Close modal and proceed to registration
    setShowPricingModal(false);
    setIsRegistrationOpen(true);
  };

  const individualPlans = [
    {
      id: 'basic' as const,
      name: 'Basic',
      price: '10,000',
      period: 'month', 
      description: 'Perfect for getting started',
      features: [
        'Profile creation',
        '1 service listing',
        'Appear in search results',
        'Basic customer support'
      ]
    },
    {
      id: 'professional' as const,
      name: 'Professional',
      price: '18,000',
      period: 'month',
      description: 'Most popular for freelancers',
      popular: true,
      features: [
        'Everything in Basic',
        '1 service listing',
        'Priority listing',
        'Reviews enabled',
        'Email support'
      ]
    },
    {
      id: 'premium' as const,
      name: 'Premium',
      price: '30,000',
      period: 'month',
      description: 'For established professionals',
      features: [
        'Everything in Professional',
        '1 service listing',
        'Featured badge',
        'Analytics dashboard',
        'WhatsApp integration',
        'Priority support'
      ]
    }
  ];

  const businessPlans = [
    {
      id: 'basic' as const,
      name: 'Basic',
      price: '25,000',
      period: 'month',
      description: 'Great for small businesses',
      features: [
        'Profile creation',
        'Unlimited services',
        'Appear in search results',
        'Team management',
        'Basic support'
      ]
    },
    {
      id: 'professional' as const,
      name: 'Professional',
      price: '40,000',
      period: 'month',
      description: 'Most popular for businesses',
      popular: true,
      features: [
        'Everything in Basic',
        'Unlimited services',
        'Priority listing',
        'Reviews enabled',
        'WhatsApp integration',
        'Advanced analytics'
      ]
    },
    {
      id: 'premium' as const,
      name: 'Premium',
      price: '70,000',
      period: 'month',
      description: 'For growing companies',
      features: [
        'Everything in Professional',
        'Unlimited services',
        'Featured badge',
        'Dedicated support',
        'API access',
        'Custom integrations',
        'Priority phone support'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">CiproMart</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <nav className="flex space-x-8">
                <a href="#features" className="text-white/80 hover:text-primary-400 font-medium transition-colors">
                  Features
                </a>
                <a href="#services" className="text-white/80 hover:text-primary-400 font-medium transition-colors">
                  Services
                </a>
                <a href="#pricing" className="text-white/80 hover:text-primary-400 font-medium transition-colors">
                  Pricing
                </a>
                <a href="#about" className="text-white/80 hover:text-primary-400 font-medium transition-colors">
                  About
                </a>
              </nav>
              <div className="flex items-center space-x-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLogin}
                  className="px-6 py-2.5 text-white font-medium hover:bg-white/10 transition-all"
                >
                  Sign In
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleJoinBusiness}
                  className="px-6 py-2.5 bg-primary-500 text-white hover:bg-primary-600 transition-all font-medium"
                >
                  Get Started
                </motion.button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-white hover:bg-white/10  transition-colors"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden bg-black/20 backdrop-blur-sm  mt-2 p-4"
            >
              <div className="flex flex-col space-y-4">
                <a href="#features" className="px-4 py-2 text-white/80 hover:text-primary-400 transition-colors">
                  Features
                </a>
                <a href="#services" className="px-4 py-2 text-white/80 hover:text-primary-400 transition-colors">
                  Services
                </a>
                <a href="#pricing" className="px-4 py-2 text-white/80 hover:text-primary-400 transition-colors">
                  Pricing
                </a>
                <a href="#about" className="px-4 py-2 text-white/80 hover:text-primary-400 transition-colors">
                  About
                </a>
                <div className="pt-4 border-t border-white/20 flex flex-col space-y-3">
                  <button
                    onClick={handleLogin}
                    className="px-4 py-2 text-left text-white hover:bg-white/10 transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={handleJoinBusiness}
                    className="px-4 py-2 bg-primary-500 text-white hover:bg-primary-600 transition-colors text-left"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section - Matching Library Design */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/construction-jobs.jpg"
            alt="Construction professionals at work"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay to match reference design */}
          <div className="absolute inset-0 bg-black/60"></div>
          
          {/* Orange geometric shapes overlay - matching the reference design */}
          <div className="absolute top-0 right-0 w-1/3 h-full">
            <div className="relative w-full h-full">
              {/* Large orange circle */}
              <div className="absolute top-20 right-20 w-64 h-64 bg-primary-500/30 rounded-full"></div>
              {/* Medium orange circles */}
              <div className="absolute top-40 right-10 w-32 h-32 bg-primary-400/40 rounded-full"></div>
              <div className="absolute bottom-40 right-32 w-48 h-48 bg-primary-600/25 rounded-full"></div>
              {/* Small orange dots */}
              <div className="absolute top-32 right-48 w-8 h-8 bg-primary-500 rounded-full"></div>
              <div className="absolute bottom-32 right-16 w-12 h-12 bg-primary-400 rounded-full"></div>
              <div className="absolute top-60 right-64 w-6 h-6 bg-primary-600 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Content Container - Following Reference Layout */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
            {/* Left Content - Matching Reference Text Layout */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white space-y-8"
            >
              {/* Small text above main heading */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg font-medium text-primary-200 tracking-wide"
              >
                Service Management
              </motion.p>

              {/* Main Heading - Matching Reference Style */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-2"
              >
                <div className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                  Welcome to
                </div>
                <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-400 leading-tight">
                  CiproMart
                </div>
              </motion.h1>

              {/* Description - Matching Reference Layout */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-200 max-w-lg leading-relaxed"
              >
                Connect with trusted service providers across Cameroon. Find skilled professionals for construction, craftsmanship, and engineering services with our modern platform.
              </motion.p>

              {/* CTA Button - Matching Reference Style */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="pt-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleJoinBusiness}
                  className="px-8 py-4 bg-primary-500 text-white font-semibold text-lg  hover:bg-primary-600 transition-all shadow-xl"
                >
                  Find Services
                </motion.button>
              </motion.div>
            </motion.div>


          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose CiproMart?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide everything you need to succeed in the digital marketplace
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Building2,
                title: 'Professional Profiles',
                description: 'Create stunning business profiles that showcase your expertise and services',
                color: 'primary'
              },
              {
                icon: Search,
                title: 'Easy Discovery',
                description: 'Get found by customers searching for your services in your area',
                color: 'primary'
              },
              {
                icon: UserPlus,
                title: 'Customer Connection',
                description: 'Connect directly with potential customers and grow your business',
                color: 'primary'
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white  shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary-100  flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="h-8 w-8 text-primary-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Popular Service Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the most sought-after services on our platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: 'Construction & Building',
                image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
                count: '200+ Services',
              },
              {
                name: 'Craftsmanship & Trade',
                image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
                count: '150+ Services',
              },
              {
                name: 'Engineering & Design',
                image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
                count: '120+ Services',
              },
              {
                name: 'Home & Renovation',
                image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
                count: '180+ Services',
              },
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="relative bg-white  shadow-lg overflow-hidden cursor-pointer group hover:shadow-xl transition-all duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="font-bold text-lg mb-1">{category.name}</h3>
                  <p className="text-white/90 text-sm">{category.count}</p>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <ArrowRight className="h-4 w-4 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Parallax Background */}
      <section className="relative py-20 overflow-hidden">
        {/* Fixed Background Image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/get-started.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            backgroundRepeat: 'no-repeat',
          }}
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        
        {/* Content */}
        <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.h2 
              className="text-3xl lg:text-4xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Ready to Grow Your Business?
            </motion.h2>
            
            <motion.p 
              className="text-xl text-white/90 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Join thousands of successful businesses on CiproMart today
            </motion.p>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleJoinBusiness}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-3 px-10 py-5 bg-white text-primary-600  hover:bg-gray-50 transition-all shadow-2xl hover:shadow-3xl font-bold text-lg group"
            >
              <span>Get Started Today</span>
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
        
        {/* Floating Elements for Extra Visual Appeal */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"
          animate={{ 
            y: [-20, 20, -20],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        
        <motion.div
          className="absolute bottom-20 right-20 w-32 h-32 bg-primary-300/20 rounded-full blur-2xl"
          animate={{ 
            y: [20, -20, 20],
            scale: [1.1, 1, 1.1]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
        />
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from businesses and professionals who have grown with CiproMart
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Jean Baptiste',
                role: 'Construction Company Owner',
                company: 'BuildCam Construction',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=150&q=80',
                testimonial: 'CiproMart helped me connect with hundreds of new clients. My business has grown by 300% since joining the platform.',
                rating: 5
              },
              {
                name: 'Marie Ngozi',
                role: 'Interior Designer',
                company: 'Elegant Spaces Cameroon',
                image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&w=150&q=80',
                testimonial: 'The platform is incredibly user-friendly and has connected me with clients I never would have reached otherwise.',
                rating: 5
              },
              {
                name: 'Paul Atanga',
                role: 'Electrical Engineer',
                company: 'PowerTech Solutions',
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&w=150&q=80',
                testimonial: 'Professional, reliable, and effective. CiproMart has become an essential tool for growing my engineering practice.',
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white  shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300"
              >
                {/* Rating Stars */}
                <div className="flex justify-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-primary-500 fill-current" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-gray-700 text-center mb-6 italic leading-relaxed">
                  "{testimonial.testimonial}"
                </blockquote>

                {/* Author Info */}
                <div className="text-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h4 className="font-bold text-gray-900 text-lg">
                    {testimonial.name}
                  </h4>
                  <p className="text-primary-600 font-medium">
                    {testimonial.role}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {testimonial.company}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-500 mb-2">500+</div>
                <div className="text-gray-600 font-medium">Happy Businesses</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-500 mb-2">10k+</div>
                <div className="text-gray-600 font-medium">Satisfied Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-500 mb-2">4.8★</div>
                <div className="text-gray-600 font-medium">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-500 mb-2">98%</div>
                <div className="text-gray-600 font-medium">Success Rate</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Plans Section */}
      <section className="py-20 bg-white" id="pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Growth Plan
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transparent pricing designed to scale with your business. All plans include manual onboarding and dedicated support.
            </p>
          </motion.div>

          {/* Plan Type Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Individual Plan Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => handleViewPlans('individual')}
            >
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                <User className="h-10 w-10 text-blue-600" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Individual</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Perfect for freelancers, small contractors, and independent professionals looking to grow their client base.
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span>1 Service Listing</span>
                </div>
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span>Professional Profile</span>
                </div>
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span>Customer Reviews</span>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors group-hover:shadow-lg"
              >
                View Individual Plans
              </motion.button>
              
              <p className="text-xs text-gray-500 mt-4">
                Starting from 10,000 FCFA/month
              </p>
            </motion.div>

            {/* Business Plan Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-primary-200 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 cursor-pointer group relative overflow-hidden"
              onClick={() => handleViewPlans('business')}
            >
              {/* Popular Badge */}
              <div className="absolute top-0 right-0 bg-primary-500 text-white px-4 py-1 text-xs font-semibold transform rotate-12 translate-x-2 translate-y-2">
                Popular
              </div>
              
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-200 transition-colors">
                <Briefcase className="h-10 w-10 text-primary-600" />  
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Business</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Ideal for companies, contractors, and firms that want to showcase multiple services and manage teams.
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span>Unlimited Services</span>
                </div>
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span>Team Management</span>
                </div>
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  <span>Advanced Analytics</span>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-primary-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-primary-600 transition-colors group-hover:shadow-lg"
              >
                View Business Plans
              </motion.button>
              
              <p className="text-xs text-gray-500 mt-4">
                Starting from 25,000 FCFA/month
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Section with Fixed Background Parallax */}
      <section className="relative py-24 overflow-hidden">
        {/* Fixed Background Image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/newsletter.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            backgroundRepeat: 'no-repeat',
          }}
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        
        {/* Content */}
        <div className="relative z-30 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.h2 
              className="text-4xl lg:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Stay Updated with CiproMart
            </motion.h2>
            
            <motion.p 
              className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Get the latest updates on new service providers, industry insights, and exclusive opportunities directly to your inbox.
            </motion.p>
            
            {/* Newsletter Form */}
            <motion.div
              className="max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-primary-500 text-white hover:bg-primary-600 transition-all font-semibold shadow-lg hover:shadow-xl whitespace-nowrap"
                >
                  Subscribe Now
                </motion.button>
              </div>
              
              <p className="text-white/70 text-sm mt-4">
                Join 5,000+ professionals already subscribed. No spam, unsubscribe anytime.
              </p>
            </motion.div>

            {/* Newsletter Benefits */}
            <motion.div
              className="grid md:grid-cols-3 gap-6 mt-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              {[
                {
                  icon: Mail,
                  title: 'Weekly Updates',
                  description: 'Get curated industry news and platform updates'
                },
                {
                  icon: Target,
                  title: 'Exclusive Opportunities',
                  description: 'First access to premium job listings and partnerships'
                },
                {
                  icon: Lightbulb,
                  title: 'Expert Insights',
                  description: 'Tips and strategies from successful business owners'
                }
              ].map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <motion.div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm p-6 border border-white/20"
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-4">
                      <IconComponent className="h-8 w-8 text-primary-400" />
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {benefit.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
        
        {/* Floating Elements */}
        <motion.div
          className="absolute top-16 left-16 w-24 h-24 bg-white/5 rounded-full blur-xl"
          animate={{ 
            y: [-15, 15, -15],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        
        <motion.div
          className="absolute bottom-16 right-16 w-32 h-32 bg-primary-400/10 rounded-full blur-2xl"
          animate={{ 
            y: [15, -15, 15],
            scale: [1.1, 1, 1.1]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2
          }}
        />
      </section>

      {/* Pricing Modal */}
      {showPricingModal && selectedUserType && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowPricingModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl mx-auto max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white rounded-t-2xl border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="text-center flex-1">
                  <div className={`w-16 h-16 ${selectedUserType === 'individual' ? 'bg-blue-100' : 'bg-primary-100'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    {selectedUserType === 'individual' ? (
                      <User className={`h-8 w-8 ${selectedUserType === 'individual' ? 'text-blue-600' : 'text-primary-600'}`} />
                    ) : (
                      <Briefcase className="h-8 w-8 text-primary-600" />
                    )}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedUserType === 'individual' ? 'Individual' : 'Business'} Plans
                  </h2>
                  <p className="text-gray-600">
                    {selectedUserType === 'individual' 
                      ? 'Perfect for freelancers and independent professionals'
                      : 'Designed for companies and growing businesses'
                    }
                  </p>
                </div>
                <button
                  onClick={() => setShowPricingModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-6 w-6 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Pricing Cards */}
            <div className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                {(selectedUserType === 'individual' ? individualPlans : businessPlans).map((plan, index) => (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative bg-white border-2 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 ${
                      plan.popular 
                        ? 'border-primary-500 ring-2 ring-primary-200' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {/* Popular Badge */}
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <div className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                          Most Popular
                        </div>
                      </div>
                    )}

                    {/* Plan Header */}
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                      <div className="mb-4">
                        <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                        <span className="text-gray-600 ml-1">FCFA/{plan.period}</span>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Select Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelectPlan(plan.id)}
                      className={`w-full py-3 px-4 rounded-xl font-semibold transition-colors ${
                        plan.popular
                          ? 'bg-primary-500 text-white hover:bg-primary-600'
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      }`}
                    >
                      Select {plan.name}
                    </motion.button>
                  </motion.div>
                ))}
              </div>

              {/* Features Comparison Note */}
              <div className="mt-8 p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600 text-center">
                  <strong>Service Limitations:</strong> {selectedUserType === 'individual' ? 'Individual plans allow only 1 service listing' : 'Business plans include unlimited service listings'}. 
                  All plans include profile creation, search visibility, and customer support.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
        onSuccess={() => {
          setIsRegistrationOpen(false);
          navigate('/payment');
        }}
      />
    </div>
  );
};

export default LandingPage;
