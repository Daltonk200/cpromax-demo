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
  Clock
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
  const navigate = useNavigate();

  const currentUser = getCurrentUser();

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

  const getPackagePrice = (packageId: string): string => {
    const prices = {
      basic: '15,000',
      professional: '25,000',
      premium: '50,000',
    };
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
        package: selectedPackage as any,
        subscription: {
          isActive: true,
          package: selectedPackage,
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

      // Redirect to dashboard after showing success
      setTimeout(() => {
        navigate('/dashboard');
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
            className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            Go to Registration
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
              Secure your {selectedPackage} package subscription
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
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-xl font-semibold text-neutral-900 mb-6">
              Order Summary
            </h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-neutral-200">
                <span className="text-neutral-700">{selectedPackage} Package</span>
                <span className="font-semibold text-neutral-900">
                  {formatCurrency(getPackagePrice(selectedPackage))}
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
              
              <div className="flex justify-between items-center py-4 bg-primary-50 rounded-lg px-4">
                <span className="text-lg font-semibold text-neutral-900">Total</span>
                <span className="text-xl font-bold text-primary-600">
                  {formatCurrency(getPackagePrice(selectedPackage))}
                </span>
              </div>
            </div>

            {/* Security Notice */}
            <div className="mt-8 p-4 bg-neutral-50 rounded-lg">
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
            className="bg-white rounded-2xl shadow-lg p-8"
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
            <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
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
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto"
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
                          {formatCurrency(getPackagePrice(selectedPackage))}
                        </div>
                      </div>

                      <div className="bg-neutral-50 rounded-lg p-4 mb-6">
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
                          `Pay ${formatCurrency(getPackagePrice(selectedPackage))}`
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
    </div>
  );
};

export default PaymentSimulation;
