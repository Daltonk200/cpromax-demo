import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlusCircle, 
  Edit, 
  Trash2, 
  Camera, 
  X, 
  Save,
  Package,
  DollarSign
} from 'lucide-react';
import { toast } from 'sonner';
import { getCurrentUser, addService, updateService, deleteService } from '../utils/storage';
import { SERVICE_CATEGORIES } from '../utils/constants';
import type { Service } from '../types';

const ServiceCatalog: React.FC = () => {
  const currentUser = getCurrentUser();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [serviceForm, setServiceForm] = useState({
    name: '',
    category: 'Construction',
    description: '',
    photoUrl: '',
    price: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setServiceForm(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload to a cloud service
      const photoUrl = URL.createObjectURL(file);
      setServiceForm(prev => ({ ...prev, photoUrl }));
      toast.success('Photo uploaded successfully!');
    }
  };

  const resetForm = () => {
    setServiceForm({
      name: '',
      category: 'Construction',
      description: '',
      photoUrl: '',
      price: '',
    });
  };

  const handleAddService = () => {
    if (!currentUser) return;

    // Check user plan limitations
    const userPlanData = localStorage.getItem('userPlanData');
    if (userPlanData) {
      const planData = JSON.parse(userPlanData);
      if (planData.userType === 'individual' && currentUser.services.length >= 1) {
        toast.error('Individual plans are limited to 1 service. Upgrade to Business for unlimited services.');
        return;
      }
    }

    resetForm();
    setEditingService(null);
    setShowAddModal(true);
  };

  const handleEditService = (service: Service) => {
    setServiceForm({
      name: service.name,
      category: service.category,
      description: service.description,
      photoUrl: service.photoUrl,
      price: service.price,
    });
    setEditingService(service);
    setShowAddModal(true);
  };

  const handleDeleteService = (serviceId: string) => {
    if (!currentUser) return;
    
    if (window.confirm('Are you sure you want to delete this service?')) {
      deleteService(currentUser.id, serviceId);
      toast.success('Service deleted successfully!');
    }
  };

  const handleSaveService = () => {
    if (!currentUser) return;

    if (!serviceForm.name.trim() || !serviceForm.description.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      if (editingService) {
        // Update existing service
        updateService(currentUser.id, editingService.id, serviceForm);
        toast.success('Service updated successfully!');
      } else {
        // Add new service
        addService(currentUser.id, serviceForm);
        toast.success('Service added successfully!');
      }

      setShowAddModal(false);
      resetForm();
      setEditingService(null);
    } catch (error) {
      toast.error('Failed to save service. Please try again.');
    }
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    resetForm();
    setEditingService(null);
  };

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-neutral-600">Please log in to manage your services.</p>
      </div>
    );
  }

  const services = currentUser.services || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-neutral-900">
              Your Services
            </h2>
            <p className="text-neutral-600 mt-1">
              Manage the services you offer to customers
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddService}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white  hover:bg-primary-600 transition-colors"
          >
            <PlusCircle className="h-5 w-5" />
            <span>Add Service</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Services Grid */}
      {services.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-12 text-center"
        >
          <Package className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">
            No Services Yet
          </h3>
          <p className="text-neutral-600 mb-6">
            Start by adding your first service to attract customers
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddService}
            className="px-6 py-3 bg-primary-500 text-white  hover:bg-primary-600 transition-colors"
          >
            Add Your First Service
          </motion.button>
        </motion.div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              {/* Service Image */}
              <div className="h-48 bg-neutral-100 flex items-center justify-center overflow-hidden">
                {service.photoUrl ? (
                  <img
                    src={service.photoUrl}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Camera className="h-12 w-12 text-neutral-300" />
                )}
              </div>

              {/* Service Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-neutral-900 text-lg">
                      {service.name}
                    </h3>
                    <span className="inline-block px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-full mt-1">
                      {service.category}
                    </span>
                  </div>
                  {service.price && (
                    <div className="text-right">
                      <div className="text-sm text-neutral-600">Price</div>
                      <div className="font-semibold text-neutral-900">
                        {service.price}
                      </div>
                    </div>
                  )}
                </div>

                <p className="text-neutral-600 text-sm mb-4 line-clamp-3">
                  {service.description}
                </p>

                {/* Actions */}
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleEditService(service)}
                    className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-neutral-100 text-neutral-700  hover:bg-neutral-200 transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Edit</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDeleteService(service.id)}
                    className="flex items-center justify-center px-3 py-2 bg-red-100 text-red-700  hover:bg-red-200 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add/Edit Service Modal */}
      <AnimatePresence>
        {showAddModal && (
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
                className="bg-white  shadow-2xl w-full max-w-lg mx-auto max-h-[90vh] overflow-y-auto"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-neutral-200">
                  <h2 className="text-xl font-semibold text-neutral-900">
                    {editingService ? 'Edit Service' : 'Add New Service'}
                  </h2>
                  <button
                    onClick={handleCloseModal}
                    className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                  >
                    <X className="h-5 w-5 text-neutral-500" />
                  </button>
                </div>

                {/* Form */}
                <div className="p-6 space-y-4">
                  {/* Service Name */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Service Name *
                    </label>
                    <input
                      type="text"
                      value={serviceForm.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-3 border border-neutral-300  focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white text-neutral-900 placeholder-neutral-500"
                      placeholder="Enter service name"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Category
                    </label>
                    <select
                      value={serviceForm.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full px-4 py-3 border border-neutral-300  focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white text-neutral-900"
                    >
                      {SERVICE_CATEGORIES.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={serviceForm.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border border-neutral-300  focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white text-neutral-900 placeholder-neutral-500"
                      placeholder="Describe your service in detail..."
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Price (Optional)
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                      <input
                        type="text"
                        value={serviceForm.price}
                        onChange={(e) => handleInputChange('price', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-neutral-300  focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white text-neutral-900 placeholder-neutral-500"
                        placeholder="e.g., From 50,000 FCFA"
                      />
                    </div>
                  </div>

                  {/* Photo Upload */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Service Photo
                    </label>
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 bg-neutral-100  flex items-center justify-center overflow-hidden">
                        {serviceForm.photoUrl ? (
                          <img
                            src={serviceForm.photoUrl}
                            alt="Service"
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
                          onChange={handlePhotoUpload}
                          className="hidden"
                          id="photo-upload"
                        />
                        <label
                          htmlFor="photo-upload"
                          className="cursor-pointer px-4 py-2 bg-primary-100 text-primary-700  hover:bg-primary-200 transition-colors"
                        >
                          Upload Photo
                        </label>
                        <p className="text-xs text-neutral-500 mt-1">
                          JPG, PNG up to 2MB
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex space-x-3 pt-6">
                    <button
                      onClick={handleCloseModal}
                      className="flex-1 px-4 py-2 border border-neutral-300 text-neutral-700  hover:bg-neutral-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSaveService}
                      className="flex-1 px-4 py-2 bg-primary-500 text-white  hover:bg-primary-600 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Save className="h-4 w-4" />
                      <span>{editingService ? 'Update' : 'Add'} Service</span>
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

export default ServiceCatalog;
