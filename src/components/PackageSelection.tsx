import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Crown, ArrowRight, X } from 'lucide-react';
import { toast } from 'sonner';
import { PACKAGES, formatCurrency } from '../utils/constants';
import type { PackageType } from '../types';

interface PackageSelectionProps {
  onPackageSelect: (packageId: string) => void;
}

const PackageSelection: React.FC<PackageSelectionProps> = ({
  onPackageSelect,
}) => {
  const [selectedPackage, setSelectedPackage] = useState<PackageType | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const navigate = useNavigate();

  const handleSelectPackage = (pkg: PackageType) => {
    setSelectedPackage(pkg);
    setShowConfirmModal(true);
  };

  const handleConfirmSelection = () => {
    if (selectedPackage) {
      onPackageSelect(selectedPackage.id);
      setShowConfirmModal(false);
      toast.success(`${selectedPackage.name} package selected!`);
      // Navigate to payment simulation
      navigate('/payment');
    }
  };

  const handleCloseModal = () => {
    setShowConfirmModal(false);
    setSelectedPackage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-neutral-900">Choose Your Package</h1>
            <p className="mt-2 text-lg text-neutral-600">
              Select the perfect plan to grow your business
            </p>
          </div>
        </div>
      </div>

      {/* Package Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {PACKAGES.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`relative bg-white  shadow-lg border-2 transition-all duration-300 ${
                pkg.popular
                  ? 'border-primary-500 transform scale-105'
                  : 'border-neutral-200 hover:border-primary-300'
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                    <Crown className="h-4 w-4" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Package Name & Price */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                    {pkg.name}
                  </h3>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-neutral-900">
                      {formatCurrency(pkg.price)}
                    </span>
                    <span className="text-neutral-600 ml-1">/{pkg.period}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center mt-0.5">
                        <Check className="h-3 w-3 text-primary-600" />
                      </div>
                      <span className="text-neutral-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Select Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelectPackage(pkg)}
                  className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                    pkg.popular
                      ? 'bg-primary-500 text-white hover:bg-primary-600 shadow-lg'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  Select {pkg.name}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">
              All Packages Include:
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              {[
                'Mobile-optimized profile',
                'Secure payment processing',
                'Customer messaging system',
                'Basic analytics dashboard',
                '24/7 technical support',
                'Regular platform updates',
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-primary-500" />
                  <span className="text-neutral-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmModal && selectedPackage && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            >
              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white  shadow-2xl w-full max-w-md mx-auto"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-neutral-200">
                  <h2 className="text-xl font-semibold text-neutral-900">
                    Confirm Package Selection
                  </h2>
                  <button
                    onClick={handleCloseModal}
                    className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                  >
                    <X className="h-5 w-5 text-neutral-500" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      {selectedPackage.popular && <Crown className="h-8 w-8 text-primary-500" />}
                      {!selectedPackage.popular && <Check className="h-8 w-8 text-primary-500" />}
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                      {selectedPackage.name} Package
                    </h3>
                    <div className="text-2xl font-bold text-primary-500">
                      {formatCurrency(selectedPackage.price)}/{selectedPackage.period}
                    </div>
                  </div>

                  <div className="bg-neutral-50  p-4 mb-6">
                    <h4 className="font-medium text-neutral-900 mb-3">
                      Package includes:
                    </h4>
                    <div className="space-y-2">
                      {selectedPackage.features.slice(0, 3).map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                          <Check className="h-3 w-3 text-primary-500" />
                          <span className="text-neutral-700">{feature}</span>
                        </div>
                      ))}
                      {selectedPackage.features.length > 3 && (
                        <div className="text-xs text-neutral-500 mt-2">
                          +{selectedPackage.features.length - 3} more features
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={handleCloseModal}
                      className="flex-1 px-4 py-2 border border-neutral-300 text-neutral-700  hover:bg-neutral-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleConfirmSelection}
                      className="flex-1 px-4 py-2 bg-primary-500 text-white  hover:bg-primary-600 transition-colors flex items-center justify-center space-x-2"
                    >
                      <span>Continue</span>
                      <ArrowRight className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PackageSelection;
