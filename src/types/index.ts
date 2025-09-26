export interface User {
  id: string;
  name?: string;           // For individual users
  businessName?: string;   // For business users
  email: string;
  phone: string;
  password: string;
  country: string;
  status: 'pending' | 'active';
  package: 'basic' | 'professional' | 'premium';
  subscription: {
    isActive: boolean;
    package: string;
    startDate: string;
    endDate: string;
  };
  payment: {
    method: 'mobileMoney' | 'card' | 'placeholder';
    status: 'initiated' | 'success' | 'failed';
    transactionId: string;
  };
  profile: {
    logoUrl: string;
    description: string;
    contact: {
      phone: string;
      email: string;
      whatsapp: string;
    };
    serviceAreas: string[];
    completion: number;
  };
  services: Service[];
}

export interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  photoUrl: string;
  price: string;
}

export interface AppData {
  users: User[];
  session: {
    currentUserId: string | null;
  };
}

export interface RegistrationData {
  name?: string;           // For individual users
  businessName?: string;   // For business users  
  email: string;
  phone: string;
  password: string;
  country: string;
}

export interface PackageType {
  id: 'basic' | 'professional' | 'premium';
  name: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  available: boolean;
}

export interface BusinessProfile {
  logo: string;
  description: string;
  phone: string;
  email: string;
  whatsapp: string | null;
  serviceAreas: string[];
}
