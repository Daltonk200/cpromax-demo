import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, 
  Smartphone, 
  CheckCircle, 
  ArrowRight, 
  X,
  Shield,
  Clock,
  Upload,
  Building2,
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  FileText
} from 'lucide-react';
import { toast } from 'sonner';
import { getCurrentUser, updateUser, setCurrentUser, generateId } from '../utils/storage';
import { formatCurrency, addMonths } from '../utils/constants';
import type { PaymentMethod } from '../types';

interface PaymentSimulationProps {
  selectedPackage: string;
}

const PaymentSimulation: React.FC<PaymentSimulationProps> = ({
  selectedPackage,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showLoadingTransition, setShowLoadingTransition] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileData, setProfileData] = useState({
    logo: '',
    description: '',
    phone: '',
    email: '',
    whatsapp: '',
    serviceAreas: '',
  });
  const navigate = useNavigate();

  const currentUser = getCurrentUser();
  
  // Get user plan data from localStorage
  const getUserPlanData = () => {
    const userPlanData = localStorage.getItem('userPlanData');
    if (userPlanData) {
      return JSON.parse(userPlanData);
    }
    return null;
  };

  const userPlan = getUserPlanData();
  const actualSelectedPackage = userPlan?.selectedPlan || selectedPackage;
  const userType = userPlan?.userType || 'business';

  // Mock payment methods based on country
  const getPaymentMethods = (): PaymentMethod[] => {
    const country = currentUser?.country || 'Cameroon';
    
    const methods: PaymentMethod[] = [
      {
        id: 'mtn-momo',
        name: 'MTN Mobile Money',
        icon: 'smartphone',
        available: ['Cameroon', 'Ghana'].includes(country),
      },
      {
        id: 'orange-money',
        name: 'Orange Money',
        icon: 'smartphone',
        available: ['Cameroon'].includes(country),
      },
      {
        id: 'visa-card',
        name: 'Visa/Mastercard',
        icon: 'credit-card',
        available: true,
      },
      {
        id: 'bank-transfer',
        name: 'Bank Transfer',
        icon: 'credit-card',
        available: true,
      },
    ];

    return methods.filter(method => method.available);
  };

  const paymentMethods = getPaymentMethods();

  const getPackagePrice = (packageId: string, userType: string): string => {
    const individualPrices = {
      basic: '10,000',
      professional: '18,000',
      premium: '30,000',
    };
    
    const businessPrices = {
      basic: '25,000',
      professional: '40,000',  
      premium: '70,000',
    };
    
    const prices = userType === 'individual' ? individualPrices : businessPrices;
    return prices[packageId as keyof typeof prices] || '25,000';
  };

  const handleSelectMethod = (method: PaymentMethod) => {
    setSelectedMethod(method);
    setShowPaymentModal(true);
  };

  const handleProcessPayment = async () => {
    if (!selectedMethod || !currentUser) return;

    setIsProcessing(true);

    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Update user with payment and subscription info
      const startDate = new Date();
      const endDate = addMonths(startDate, 1);
      const transactionId = generateId();

      const updatedUser = {
        ...currentUser,
        status: 'active' as const,
        package: actualSelectedPackage as any,
        subscription: {
          isActive: true,
          package: actualSelectedPackage,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        },
        payment: {
          method: selectedMethod.id.includes('momo') || selectedMethod.id.includes('money') 
            ? 'mobileMoney' as const 
            : 'card' as const,
          status: 'success' as const,
          transactionId,
        },
      };

      updateUser(updatedUser);
      setCurrentUser(updatedUser.id);

      setPaymentSuccess(true);
      toast.success('Payment successful! Your subscription is now active.');

      // Show loading transition after payment success
      setTimeout(() => {
        setShowPaymentModal(false);
        setShowLoadingTransition(true);
        
        // After loading transition, show profile modal
        setTimeout(() => {
          setShowLoadingTransition(false);
          setShowProfileModal(true);
          // Pre-fill form with existing user data
          setProfileData({
            logo: '',
            description: '',
            phone: currentUser.phone || '',
            email: currentUser.email || '',
            whatsapp: '',
            serviceAreas: '',
          });
        }, 2500);
      }, 2000);

    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCloseModal = () => {
    if (!isProcessing) {
      setShowPaymentModal(false);
      setSelectedMethod(null);
      setPaymentSuccess(false);
    }
  };

  const handleProfileInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('File size must be less than 2MB');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file (JPG/PNG)');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        setProfileData(prev => ({ ...prev, logo: base64 }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    if (!currentUser) return;

    try {
      // Parse service areas
      const serviceAreasArray = profileData.serviceAreas
        .split(',')
        .map(area => area.trim())
        .filter(area => area.length > 0);

      // Save to localStorage under businessProfile structure
      const businessProfile = {
        logo: profileData.logo,
        description: profileData.description,
        phone: profileData.phone,
        email: profileData.email,
        whatsapp: profileData.whatsapp || null,
        serviceAreas: serviceAreasArray,
      };

      // Save to localStorage
      localStorage.setItem('businessProfile', JSON.stringify({ businessProfile }));

      // Also update the user's profile data for consistency
      const updatedUser = {
        ...currentUser,
        profile: {
          ...currentUser.profile,
          logoUrl: profileData.logo,
          description: profileData.description,
          contact: {
            phone: profileData.phone,
            email: profileData.email,
            whatsapp: profileData.whatsapp,
          },
          serviceAreas: serviceAreasArray,
        },
      };

      updateUser(updatedUser);
      toast.success('Profile saved successfully!');
      setShowProfileModal(false);
      navigate('/dashboard');
    } catch (error) {
      toast.error('Something went wrong, please try again.');
    }
  };

  const handleSkipProfile = () => {
    setShowProfileModal(false);
    navigate('/dashboard');
  };

  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case 'smartphone':
        return <Smartphone className="h-6 w-6" />;
      case 'credit-card':
        return <CreditCard className="h-6 w-6" />;
      default:
        return <CreditCard className="h-6 w-6" />;
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">
            Please register first
          </h1>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-primary-500 text-white  hover:bg-primary-600 transition-colors"
          >
            Go to Registration
          </button>
        </div>
      </div>
    );
  }

  // Redirect to home if no plan is selected
  if (!userPlan && !selectedPackage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">
            Please select a plan first
          </h1>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-primary-500 text-white  hover:bg-primary-600 transition-colors"
          >
            Choose Your Plan
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-neutral-900">Complete Payment</h1>
            <p className="mt-2 text-lg text-neutral-600">
              Secure your {actualSelectedPackage} {userType} plan subscription
            </p>
          </div>
        </div>
      </div>

      {/* Payment Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white  shadow-lg p-8"
          >
            <h2 className="text-xl font-semibold text-neutral-900 mb-6">
              Order Summary
            </h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-neutral-200">
                <span className="text-neutral-700">{actualSelectedPackage} {userType} Plan</span>
                <span className="font-semibold text-neutral-900">
                  {formatCurrency(getPackagePrice(actualSelectedPackage, userType))}
                </span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-neutral-200">
                <span className="text-neutral-700">Billing Period</span>
                <span className="text-neutral-900">Monthly</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-neutral-200">
                <span className="text-neutral-700">Setup Fee</span>
                <span className="text-green-600">Free</span>
              </div>
              
              <div className="flex justify-between items-center py-4 bg-primary-50  px-4">
                <span className="text-lg font-semibold text-neutral-900">Total</span>
                <span className="text-xl font-bold text-primary-600">
                  {formatCurrency(getPackagePrice(actualSelectedPackage, userType))}
                </span>
              </div>
            </div>

            {/* Security Notice */}
            <div className="mt-8 p-4 bg-neutral-50 ">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="h-5 w-5 text-primary-500" />
                <span className="font-medium text-neutral-900">Secure Payment</span>
              </div>
              <p className="text-sm text-neutral-600">
                Your payment information is encrypted and secure. We never store your payment details.
              </p>
            </div>
          </motion.div>

          {/* Payment Methods */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white  shadow-lg p-8"
          >
            <h2 className="text-xl font-semibold text-neutral-900 mb-6">
              Choose Payment Method
            </h2>
            
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <motion.button
                  key={method.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelectMethod(method)}
                  className="w-full p-4 border-2 border-neutral-200 rounded-xl hover:border-primary-300 transition-all duration-200 flex items-center space-x-4"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    {renderIcon(method.icon)}
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-medium text-neutral-900">{method.name}</h3>
                    <p className="text-sm text-neutral-600">
                      {method.id.includes('momo') || method.id.includes('money') 
                        ? 'Instant mobile payment' 
                        : 'Credit/Debit card payment'}
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-neutral-400" />
                </motion.button>
              ))}
            </div>

            {/* Demo Notice */}
            <div className="mt-8 p-4 bg-amber-50 border border-amber-200 ">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="h-5 w-5 text-amber-600" />
                <span className="font-medium text-amber-900">Demo Mode</span>
              </div>
              <p className="text-sm text-amber-800">
                This is a demo environment. No real payment will be processed.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && selectedMethod && (
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
                {!paymentSuccess ? (
                  <>
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-neutral-200">
                      <h2 className="text-xl font-semibold text-neutral-900">
                        {selectedMethod.name}
                      </h2>
                      {!isProcessing && (
                        <button
                          onClick={handleCloseModal}
                          className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                        >
                          <X className="h-5 w-5 text-neutral-500" />
                        </button>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          {renderIcon(selectedMethod.icon)}
                        </div>
                        <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                          Payment Amount
                        </h3>
                        <div className="text-2xl font-bold text-primary-500">
                          {formatCurrency(getPackagePrice(actualSelectedPackage, userType))}
                        </div>
                      </div>

                      <div className="bg-neutral-50  p-4 mb-6">
                        <p className="text-sm text-neutral-600 text-center">
                          {selectedMethod.id.includes('momo') || selectedMethod.id.includes('money')
                            ? 'You will receive a prompt on your mobile device to complete the payment.'
                            : 'You will be redirected to a secure payment gateway to enter your card details.'}
                        </p>
                      </div>

                      <motion.button
                        whileHover={{ scale: isProcessing ? 1 : 1.02 }}
                        whileTap={{ scale: isProcessing ? 1 : 0.98 }}
                        onClick={handleProcessPayment}
                        disabled={isProcessing}
                        className="w-full bg-primary-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isProcessing ? (
                          <div className="flex items-center justify-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Processing Payment...</span>
                          </div>
                        ) : (
                          `Pay ${formatCurrency(getPackagePrice(actualSelectedPackage, userType))}`
                        )}
                      </motion.button>
                    </div>
                  </>
                ) : (
                  /* Success State */
                  <div className="p-8 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", duration: 0.5 }}
                      className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle className="h-12 w-12 text-green-600" />
                    </motion.div>
                    
                    <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                      Payment Successful!
                    </h3>
                    
                    <p className="text-neutral-600 mb-6">
                      Your subscription has been activated. You can now access your dashboard
                      and start building your business profile.
                    </p>
                    
                    <div className="text-sm text-neutral-500">
                      Redirecting to dashboard...
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Loading Transition */}
      <AnimatePresence>
        {showLoadingTransition && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-50 flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-6"
              />
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-2xl font-semibold text-neutral-900 mb-2"
              >
                Setting up your account...
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-neutral-600"
              >
                Please bear with us a little longer — let's set up your business profile.
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Business Profile Modal */}
      <AnimatePresence>
        {showProfileModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-auto max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white rounded-t-2xl border-b border-neutral-200 p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building2 className="h-8 w-8 text-primary-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                    Set Up Your Business Profile
                  </h2>
                  <p className="text-neutral-600">
                    Complete your profile to start attracting customers
                  </p>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-6 space-y-6">
                {/* Business Logo */}
                <div>
                  <label className="block text-sm font-medium text-neutral-900 mb-2">
                    <Upload className="h-4 w-4 inline mr-2" />
                    Business Logo
                  </label>
                  <div className="border-2 border-dashed border-neutral-300 rounded-xl p-6 text-center hover:border-primary-400 transition-colors">
                    {profileData.logo ? (
                      <div className="space-y-4">
                        <img
                          src={profileData.logo}
                          alt="Business logo"
                          className="w-24 h-24 object-cover rounded-xl mx-auto"
                        />
                        <button
                          onClick={() => setProfileData(prev => ({ ...prev, logo: '' }))}
                          className="text-sm text-red-600 hover:text-red-700"
                        >
                          Remove Image
                        </button>
                      </div>
                    ) : (
                      <div>
                        <Upload className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
                        <p className="text-neutral-600 mb-2">
                          Upload your business logo (JPG/PNG, max 2MB)
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="hidden"
                          id="logo-upload"
                        />
                        <label
                          htmlFor="logo-upload"
                          className="inline-block px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 cursor-pointer transition-colors"
                        >
                          Choose File
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                {/* Business Description */}
                <div>
                  <label className="block text-sm font-medium text-neutral-900 mb-2">
                    <FileText className="h-4 w-4 inline mr-2" />
                    Business Description
                  </label>
                  <textarea
                    value={profileData.description}
                    onChange={(e) => handleProfileInputChange('description', e.target.value)}
                    placeholder="Describe your business, services, and what makes you unique..."
                    rows={4}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-900 mb-2">
                      <Phone className="h-4 w-4 inline mr-2" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => handleProfileInputChange('phone', e.target.value)}
                      placeholder="Enter phone number"
                      className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-900 mb-2">
                      <Mail className="h-4 w-4 inline mr-2" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleProfileInputChange('email', e.target.value)}
                      placeholder="Enter email address"
                      className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* WhatsApp Number */}
                <div>
                  <label className="block text-sm font-medium text-neutral-900 mb-2">
                    <MessageCircle className="h-4 w-4 inline mr-2" />
                    WhatsApp Number (Optional)
                  </label>
                  <input
                    type="tel"
                    value={profileData.whatsapp}
                    onChange={(e) => handleProfileInputChange('whatsapp', e.target.value)}
                    placeholder="Enter WhatsApp number"
                    className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                {/* Service Areas */}
                <div>
                  <label className="block text-sm font-medium text-neutral-900 mb-2">
                    <MapPin className="h-4 w-4 inline mr-2" />
                    Service Areas
                  </label>
                  <input
                    type="text"
                    value={profileData.serviceAreas}
                    onChange={(e) => handleProfileInputChange('serviceAreas', e.target.value)}
                    placeholder="e.g. Douala, Yaoundé, Bafoussam"
                    className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <p className="text-xs text-neutral-500 mt-1">
                    Separate multiple areas with commas
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="sticky bottom-0 bg-white rounded-b-2xl border-t border-neutral-200 p-6">
                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSaveProfile}
                    className="flex-1 bg-primary-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-primary-600 transition-colors flex items-center justify-center"
                  >
                    <Building2 className="h-5 w-5 mr-2" />
                    Save Profile
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSkipProfile}
                    className="flex-1 bg-neutral-200 text-neutral-700 py-3 px-6 rounded-xl font-semibold hover:bg-neutral-300 transition-colors"
                  >
                    Skip for now
                  </motion.button>
                </div>
                <p className="text-xs text-neutral-500 text-center mt-3">
                  You can always complete your profile later from the dashboard
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PaymentSimulation;
