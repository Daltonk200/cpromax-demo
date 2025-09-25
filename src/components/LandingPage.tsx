import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, Search, UserPlus, Menu, X, Star, ArrowRight, Mail, Target, Lightbulb } from 'lucide-react';
import RegistrationModal from './RegistrationModal';

const LandingPage: React.FC = () => {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleJoinBusiness = () => {
    setIsRegistrationOpen(true);
  };

  const handleLogin = () => {
    // Placeholder for login functionality
    alert('Login feature coming soon!');
  };

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

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
        onSuccess={() => {
          setIsRegistrationOpen(false);
          navigate('/packages');
        }}
      />
    </div>
  );
};

export default LandingPage;
