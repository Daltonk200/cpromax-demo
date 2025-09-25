import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Building2,
  Wrench,
  BarChart3,
  Star,
  ArrowUpCircle,
  Menu,
  X,
  LogOut,
  User,
} from 'lucide-react';
import { toast } from 'sonner';
import { getCurrentUser, logout, calculateProfileCompletion } from '../utils/storage';
import { formatDate } from '../utils/constants';
import BusinessProfile from './BusinessProfile';
import ServiceCatalog from './ServiceCatalog';
import AnalyticsAndReviews from './AnalyticsAndReviews';

type ActiveSection = 'overview' | 'profile' | 'services' | 'analytics' | 'reviews' | 'upgrade';

const DashboardLayout: React.FC = () => {
  const [activeSection, setActiveSection] = useState<ActiveSection>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">
            Please log in to access the dashboard
          </h1>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-primary-500 text-white  hover:bg-primary-600 transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const profileCompletion = calculateProfileCompletion(currentUser);

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'profile', label: 'Business Profile', icon: Building2 },
    { id: 'services', label: 'Services', icon: Wrench },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'upgrade', label: 'Upgrade Package', icon: ArrowUpCircle },
  ];

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const handleUpgradePackage = () => {
    navigate('/packages');
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">
              Welcome back, {currentUser.businessName}!
            </h1>
            <p className="text-neutral-600 mt-1">
              Manage your business profile and services
            </p>
          </div>
          <div className="hidden md:block">
            <div className="text-right">
              <div className="text-sm text-neutral-600">Current Package</div>
              <div className="text-lg font-semibold text-primary-600 capitalize">
                {currentUser.package}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Profile Completion</p>
              <p className="text-2xl font-bold text-neutral-900">{profileCompletion}%</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-primary-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-neutral-200 rounded-full h-2">
              <div
                className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${profileCompletion}%` }}
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Active Services</p>
              <p className="text-2xl font-bold text-neutral-900">{currentUser.services.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Wrench className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Profile Views</p>
              <p className="text-2xl font-bold text-neutral-900">120</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2">+12% from last week</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Rating</p>
              <p className="text-2xl font-bold text-neutral-900">4.5★</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <p className="text-xs text-neutral-600 mt-2">Based on 8 reviews</p>
        </motion.div>
      </div>

      {/* Subscription Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h2 className="text-lg font-semibold text-neutral-900 mb-4">
          Subscription Details
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-neutral-600">Current Plan</p>
            <p className="text-lg font-semibold text-neutral-900 capitalize">
              {currentUser.package}
            </p>
          </div>
          <div>
            <p className="text-sm text-neutral-600">Status</p>
            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
              currentUser.subscription.isActive 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {currentUser.subscription.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
          <div>
            <p className="text-sm text-neutral-600">Expires On</p>
            <p className="text-lg font-semibold text-neutral-900">
              {currentUser.subscription.endDate 
                ? formatDate(currentUser.subscription.endDate)
                : 'N/A'}
            </p>
          </div>
        </div>
        
        {currentUser.package !== 'premium' && (
          <div className="mt-6 p-4 bg-primary-50 ">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-primary-900">Upgrade Your Plan</h3>
                <p className="text-sm text-primary-700 mt-1">
                  Get more features and boost your business visibility
                </p>
              </div>
              <button
                onClick={handleUpgradePackage}
                className="px-4 py-2 bg-primary-500 text-white  hover:bg-primary-600 transition-colors"
              >
                Upgrade
              </button>
            </div>
          </div>
        )}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h2 className="text-lg font-semibold text-neutral-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={() => setActiveSection('profile')}
            className="p-4 border border-neutral-200  hover:border-primary-300 transition-all text-left"
          >
            <div className="flex items-center space-x-3">
              <Building2 className="h-8 w-8 text-primary-500" />
              <div>
                <h3 className="font-medium text-neutral-900">Complete Profile</h3>
                <p className="text-sm text-neutral-600">
                  {profileCompletion < 100 ? 'Add missing information' : 'Update your details'}
                </p>
              </div>
            </div>
          </button>
          
          <button
            onClick={() => setActiveSection('services')}
            className="p-4 border border-neutral-200  hover:border-primary-300 transition-all text-left"
          >
            <div className="flex items-center space-x-3">
              <Wrench className="h-8 w-8 text-blue-500" />
              <div>
                <h3 className="font-medium text-neutral-900">Manage Services</h3>
                <p className="text-sm text-neutral-600">
                  {currentUser.services.length === 0 ? 'Add your first service' : 'Edit existing services'}
                </p>
              </div>
            </div>
          </button>
        </div>
      </motion.div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return renderOverview();
      case 'profile':
        return <BusinessProfile />;
      case 'services':
        return <ServiceCatalog />;
      case 'analytics':
        return <AnalyticsAndReviews />;
      case 'reviews':
        return <AnalyticsAndReviews />;
      case 'upgrade':
        handleUpgradePackage();
        return renderOverview();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm border-b border-neutral-200">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-neutral-600 hover:text-neutral-900"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-semibold text-neutral-900">
            CiproMart Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="p-2 text-neutral-600 hover:text-neutral-900"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <AnimatePresence>
          {(isSidebarOpen || window.innerWidth >= 1024) && (
            <>
              {/* Mobile Backdrop */}
              {isSidebarOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsSidebarOpen(false)}
                  className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                />
              )}

              {/* Sidebar Content */}
              <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg border-r border-neutral-200 lg:relative lg:shadow-xl"
              >
                {/* Sidebar Header */}
                <div className="flex items-center justify-between p-6 border-b border-neutral-200">
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-8 w-8 text-primary-500" />
                    <span className="text-xl font-bold text-neutral-900">CiproMart</span>
                  </div>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="lg:hidden p-2 text-neutral-600 hover:text-neutral-900"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* User Info */}
                <div className="p-6 border-b border-neutral-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900 truncate">
                        {currentUser.businessName}
                      </p>
                      <p className="text-sm text-neutral-600 capitalize">
                        {currentUser.package} Plan
                      </p>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-6 ">
                  <div className="space-y-1 px-3">
                    {menuItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeSection === item.id;
                      
                      return (
                        <motion.button
                          key={item.id}
                          whileHover={{ x: isActive ? 0 : 4 }}
                          onClick={() => {
                            setActiveSection(item.id as ActiveSection);
                            setIsSidebarOpen(false);
                          }}
                          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all relative ${
                            isActive
                              ? 'bg-gradient-to-r from-primary-500 to-primary-400 text-white font-semibold shadow-lg'
                              : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900'
                          }`}
                        >
                          {isActive && (
                            <motion.div
                              layoutId="activeTab"
                              className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-400 rounded-xl shadow-lg"
                              initial={false}
                              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                          )}
                          <Icon className={`h-5 w-5 relative z-10 ${isActive ? 'text-white' : ''}`} />
                          <span className={`relative z-10 ${isActive ? 'text-white' : ''}`}>{item.label}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </nav>

                {/* Logout Button */}
                <div className="p-6 border-t border-neutral-200">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-3 py-2 text-neutral-700 hover:bg-red-50 hover:text-red-600  transition-all"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1 lg:ml-24">
          <main className="py-4 lg:py-6 ">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
