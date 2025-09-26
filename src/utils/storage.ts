import type { AppData, User, RegistrationData, Service, BusinessProfile } from '../types';

const STORAGE_KEY = 'cipromart_data';

// Initialize localStorage with default data
export const initializeStorage = (): void => {
  const existingData = localStorage.getItem(STORAGE_KEY);
  if (!existingData) {
    const defaultData: AppData = {
      users: [],
      session: {
        currentUserId: null,
      },
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
  }
};

// Get all data from localStorage
export const getStorageData = (): AppData => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    initializeStorage();
    return getStorageData();
  }
  return JSON.parse(data);
};

// Save data to localStorage
export const saveStorageData = (data: AppData): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// Generate unique ID
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// User management functions
export const createUser = (registrationData: RegistrationData): User => {
  const newUser: User = {
    id: generateId(),
    businessName: registrationData.businessName,
    email: registrationData.email,
    phone: registrationData.phone,
    password: registrationData.password, // In production, this should be hashed
    country: registrationData.country,
    status: 'pending',
    package: 'basic',
    subscription: {
      isActive: false,
      package: '',
      startDate: '',
      endDate: '',
    },
    payment: {
      method: 'placeholder',
      status: 'initiated',
      transactionId: '',
    },
    profile: {
      logoUrl: '',
      description: '',
      contact: {
        phone: registrationData.phone,
        email: registrationData.email,
        whatsapp: '',
      },
      serviceAreas: [],
      completion: 0,
    },
    services: [],
  };

  const data = getStorageData();
  data.users.push(newUser);
  saveStorageData(data);
  return newUser;
};

export const getUserById = (id: string): User | null => {
  const data = getStorageData();
  return data.users.find(user => user.id === id) || null;
};

export const updateUser = (updatedUser: User): void => {
  const data = getStorageData();
  const userIndex = data.users.findIndex(user => user.id === updatedUser.id);
  if (userIndex !== -1) {
    data.users[userIndex] = updatedUser;
    saveStorageData(data);
  }
};

export const getCurrentUser = (): User | null => {
  const data = getStorageData();
  if (!data.session.currentUserId) return null;
  return getUserById(data.session.currentUserId);
};

export const setCurrentUser = (userId: string): void => {
  const data = getStorageData();
  data.session.currentUserId = userId;
  saveStorageData(data);
};

export const logout = (): void => {
  const data = getStorageData();
  data.session.currentUserId = null;
  saveStorageData(data);
};

// Service management functions
export const addService = (userId: string, service: Omit<Service, 'id'>): void => {
  const user = getUserById(userId);
  if (user) {
    const newService: Service = {
      ...service,
      id: generateId(),
    };
    user.services.push(newService);
    updateUser(user);
  }
};

export const updateService = (userId: string, serviceId: string, updatedService: Partial<Service>): void => {
  const user = getUserById(userId);
  if (user) {
    const serviceIndex = user.services.findIndex(service => service.id === serviceId);
    if (serviceIndex !== -1) {
      user.services[serviceIndex] = { ...user.services[serviceIndex], ...updatedService };
      updateUser(user);
    }
  }
};

export const deleteService = (userId: string, serviceId: string): void => {
  const user = getUserById(userId);
  if (user) {
    user.services = user.services.filter(service => service.id !== serviceId);
    updateUser(user);
  }
};

// Calculate profile completion percentage
export const calculateProfileCompletion = (user: User): number => {
  let completed = 0;
  const totalFields = 6;

  if (user.profile.logoUrl) completed++;
  if (user.profile.description) completed++;
  if (user.profile.contact.whatsapp) completed++;
  if (user.profile.serviceAreas.length > 0) completed++;
  if (user.services.length > 0) completed++;
  if (user.subscription.isActive) completed++;

  return Math.round((completed / totalFields) * 100);
};

// Validation functions
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

// Business Profile management functions
export const getBusinessProfile = (): { businessProfile: BusinessProfile } | null => {
  const data = localStorage.getItem('businessProfile');
  return data ? JSON.parse(data) : null;
};

export const saveBusinessProfile = (profile: BusinessProfile): void => {
  localStorage.setItem('businessProfile', JSON.stringify({ businessProfile: profile }));
};
