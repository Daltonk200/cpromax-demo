import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, Search, UserPlus, Menu, X } from 'lucide-react';
import RegistrationModal from './RegistrationModal';

const LandingPage: React.FC = () => {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleJoinBusiness = () => {
    setIsRegistrationOpen(true);
  };

  const handleFindServices = () => {
    // Placeholder for services page
    alert('Find Services feature coming soon!');
  };

  const handleLogin = () => {
    // Placeholder for login functionality
    alert('Login feature coming soon!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <Building2 className="h-8 w-8 text-primary-500" />
              <span className="text-xl font-bold text-neutral-900">CiproMart</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogin}
                className="px-4 py-2 text-neutral-700 hover:text-primary-500 transition-colors"
              >
                Login
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleJoinBusiness}
                className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors shadow-md"
              >
                Join as Business
              </motion.button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-neutral-700"
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
              className="md:hidden border-t border-neutral-200 py-4"
            >
              <div className="flex flex-col space-y-3">
                <button
                  onClick={handleLogin}
                  className="px-4 py-2 text-left text-neutral-700 hover:text-primary-500 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={handleJoinBusiness}
                  className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-left"
                >
                  Join as Business
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight">
                Connect with
                <span className="text-primary-500"> Trusted</span>
                <br />
                Service Providers
              </h1>
              <p className="text-lg sm:text-xl text-neutral-600 max-w-lg">
                Join CiproMart - the premier platform connecting businesses with customers
                across Cameroon. Grow your business or find the services you need.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(245, 158, 11, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                onClick={handleJoinBusiness}
                className="flex items-center justify-center space-x-2 px-8 py-4 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-all shadow-lg font-semibold text-lg"
              >
                <UserPlus className="h-5 w-5" />
                <span>Join as Business</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleFindServices}
                className="flex items-center justify-center space-x-2 px-8 py-4 bg-white text-neutral-700 rounded-xl hover:bg-neutral-50 transition-all shadow-lg font-semibold text-lg border border-neutral-200"
              >
                <Search className="h-5 w-5" />
                <span>Find Services</span>
              </motion.button>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex items-center space-x-8 pt-8"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-neutral-900">500+</div>
                <div className="text-sm text-neutral-600">Businesses</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-neutral-900">10k+</div>
                <div className="text-sm text-neutral-600">Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-neutral-900">4.8★</div>
                <div className="text-sm text-neutral-600">Rating</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Illustration Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:order-2"
          >
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl shadow-2xl flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Building2 className="h-24 w-24 text-primary-500 mx-auto" />
                  <h3 className="text-xl font-semibold text-neutral-700">
                    Your Business Hub
                  </h3>
                  <p className="text-neutral-600 max-w-xs">
                    Showcase your services, connect with customers, and grow your business
                  </p>
                </div>
              </div>
              
              {/* Floating elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-primary-400 rounded-full shadow-lg flex items-center justify-center"
              >
                <Search className="h-8 w-8 text-white" />
              </motion.div>
              
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-primary-300 rounded-full shadow-lg flex items-center justify-center"
              >
                <UserPlus className="h-6 w-6 text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-20 lg:mt-32"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              Why Choose CiproMart?
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              We provide everything you need to succeed in the digital marketplace
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Building2,
                title: 'Professional Profiles',
                description: 'Create stunning business profiles that showcase your expertise and services',
              },
              {
                icon: Search,
                title: 'Easy Discovery',
                description: 'Get found by customers searching for your services in your area',
              },
              {
                icon: UserPlus,
                title: 'Customer Connection',
                description: 'Connect directly with potential customers and grow your business',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-xl shadow-lg border border-neutral-100 text-center"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="h-8 w-8 text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-neutral-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>

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
