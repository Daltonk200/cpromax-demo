import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Globe, Camera, MapPin, Save } from 'lucide-react';
import { toast } from 'sonner';
import { getCurrentUser, updateUser, calculateProfileCompletion } from '../utils/storage';

const BusinessProfile: React.FC = () => {
  const currentUser = getCurrentUser();
  const [isLoading, setIsLoading] = useState(false);

  // Get user type from localStorage
  const getUserType = (): 'individual' | 'business' => {
    const userPlanData = localStorage.getItem('userPlanData');
    if (userPlanData) {
      const planData = JSON.parse(userPlanData);
      return planData.userType || 'business';
    }
    return 'business';
  };

  const userType = getUserType();
  const [profileData, setProfileData] = useState({
    logoUrl: '',
    description: '',
    phone: '',
    email: '',
    whatsapp: '',
    serviceAreas: [] as string[],
  });

  useEffect(() => {
    if (currentUser) {
      setProfileData({
        logoUrl: currentUser.profile.logoUrl || '',
        description: currentUser.profile.description || '',
        phone: currentUser.profile.contact.phone || currentUser.phone,
        email: currentUser.profile.contact.email || currentUser.email,
        whatsapp: currentUser.profile.contact.whatsapp || '',
        serviceAreas: currentUser.profile.serviceAreas || [],
      });
    }
  }, [currentUser]);

  const handleInputChange = (field: string, value: string | string[]) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleServiceAreasChange = (value: string) => {
    const areas = value.split(',').map(area => area.trim()).filter(area => area.length > 0);
    setProfileData(prev => ({ ...prev, serviceAreas: areas }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload to a cloud service
      // For demo, we'll just use a placeholder URL
      const logoUrl = URL.createObjectURL(file);
      setProfileData(prev => ({ ...prev, logoUrl }));
      toast.success(`${userType === 'individual' ? 'Profile picture' : 'Logo'} uploaded successfully!`);
    }
  };

  const handleSaveProfile = async () => {
    if (!currentUser) return;

    setIsLoading(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const updatedUser = {
        ...currentUser,
        profile: {
          ...currentUser.profile,
          logoUrl: profileData.logoUrl,
          description: profileData.description,
          contact: {
            phone: profileData.phone,
            email: profileData.email,
            whatsapp: profileData.whatsapp,
          },
          serviceAreas: profileData.serviceAreas,
          completion: 0, // Will be recalculated
        },
      };

      // Recalculate completion percentage
      updatedUser.profile.completion = calculateProfileCompletion(updatedUser);

      updateUser(updatedUser);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-neutral-600">Please log in to access your profile.</p>
      </div>
    );
  }

  const profileCompletion = calculateProfileCompletion(currentUser);

  return (
    <div className="space-y-6">
      {/* Profile Completion */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-neutral-900">
            Profile Completion
          </h2>
          <span className="text-2xl font-bold text-primary-500">
            {profileCompletion}%
          </span>
        </div>
        <div className="w-full bg-neutral-200 rounded-full h-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${profileCompletion}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-primary-500 h-3 rounded-full"
          />
        </div>
        <p className="text-sm text-neutral-600 mt-2">
          Complete your profile to improve visibility and attract more customers
        </p>
      </motion.div>

      {/* Profile Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h2 className="text-xl font-semibold text-neutral-900 mb-6">
          {userType === 'individual' ? 'Individual Profile' : 'Business Profile'}
        </h2>

        <div className="space-y-6">
          {/* Logo Upload */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              {userType === 'individual' ? 'Profile Picture' : 'Business Logo'}
            </label>
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center overflow-hidden">
                {profileData.logoUrl ? (
                  <img
                    src={profileData.logoUrl}
                    alt="Business Logo"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Camera className="h-8 w-8 text-neutral-400" />
                )}
              </div>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                  id="logo-upload"
                />
                <label
                  htmlFor="logo-upload"
                  className="cursor-pointer px-4 py-2 bg-primary-100 text-primary-700  hover:bg-primary-200 transition-colors"
                >
                  Upload Logo
                </label>
                <p className="text-xs text-neutral-500 mt-1">
                  JPG, PNG up to 2MB
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              {userType === 'individual' ? 'About You' : 'Business Description'}
            </label>
            <textarea
              value={profileData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-neutral-300  focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white text-neutral-900 placeholder-neutral-500"
              placeholder={userType === 'individual' 
                ? 'Describe yourself, your skills, and what makes you unique...'
                : 'Describe your business, services, and what makes you unique...'
              }
            />
          </div>

          {/* Contact Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-neutral-300  focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white text-neutral-900 placeholder-neutral-500"
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-neutral-300  focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white text-neutral-900 placeholder-neutral-500"
                  placeholder="Enter email address"
                />
              </div>
            </div>
          </div>

          {/* WhatsApp */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              WhatsApp Number (Optional)
            </label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <input
                type="tel"
                value={profileData.whatsapp}
                onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-neutral-300  focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white text-neutral-900 placeholder-neutral-500"
                placeholder="Enter WhatsApp number"
              />
            </div>
          </div>

          {/* Service Areas */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Service Areas
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-neutral-400" />
              <input
                type="text"
                value={profileData.serviceAreas.join(', ')}
                onChange={(e) => handleServiceAreasChange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-neutral-300  focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white text-neutral-900 placeholder-neutral-500"
                placeholder="Enter service areas separated by commas (e.g., Douala, Yaoundé, Bafoussam)"
              />
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              List the cities or regions where you provide services
            </p>
          </div>

          {/* Save Button */}
          <div className="pt-6 border-t border-neutral-200">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSaveProfile}
              disabled={isLoading}
              className="w-full md:w-auto px-8 py-3 bg-primary-500 text-white  font-semibold hover:bg-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  <span>Save Profile</span>
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Profile Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-primary-50 rounded-xl p-6 border border-primary-200"
      >
        <h3 className="text-lg font-semibold text-primary-900 mb-4">
          Tips for a Great Profile
        </h3>
        <ul className="space-y-2 text-sm text-primary-800">
          <li className="flex items-start space-x-2">
            <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
            <span>Upload a clear, professional logo that represents your business</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
            <span>Write a compelling description that highlights your expertise and services</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
            <span>Provide accurate contact information so customers can easily reach you</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
            <span>List all areas where you provide services to maximize your reach</span>
          </li>
        </ul>
      </motion.div>
    </div>
  );
};

export default BusinessProfile;
