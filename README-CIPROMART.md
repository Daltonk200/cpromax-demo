# CiproMart MVP

CiproMart is a modern business platform that connects service providers with customers across Cameroon. This MVP demonstrates the complete user journey from business registration to dashboard management.

## 🚀 Features

### Landing Page
- **Professional Hero Section** with animated elements
- **Call-to-Action Buttons** for business registration and service discovery
- **Responsive Design** that works on all devices
- **Feature Showcase** highlighting platform benefits

### Registration & Onboarding
- **Business Registration Modal** with form validation
- **Package Selection** with three tiers (Basic, Professional, Premium)
- **Payment Simulation** with mobile money and card options
- **Success Flow** leading to dashboard activation

### Dashboard
- **Complete Business Profile Management**
  - Logo upload functionality
  - Business description and contact information
  - Service area configuration
  - Profile completion tracking

- **Service Catalog Management**
  - Add, edit, and delete services
  - Photo uploads for services
  - Category organization
  - Price management

- **Analytics & Reviews**
  - Profile view statistics
  - Lead generation tracking
  - Customer reviews display
  - Performance insights

## 🛠 Tech Stack

- **React 19** with TypeScript
- **Vite** for development and building
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons
- **Sonner** for toast notifications
- **React Router** for navigation
- **localStorage** for data persistence (MVP simulation)

## 🎨 Design System

- **Primary Colors**: Amber-400 (#fbbf24) and Amber-500 (#f59e0b)
- **Neutral Palette**: Gray-50 to Gray-900 for text and backgrounds
- **Typography**: Clean, professional fonts with proper hierarchy
- **Animations**: Subtle, smooth transitions using Framer Motion
- **Responsive**: Mobile-first design approach

## 📱 User Journey

1. **Landing** → User sees hero section and clicks "Join as Business"
2. **Registration** → User fills form and creates account
3. **Package Selection** → User chooses subscription plan
4. **Payment** → User completes payment simulation
5. **Dashboard** → User manages profile and services

## 🏗 Project Structure

```
src/
├── components/           # React components
│   ├── LandingPage.tsx
│   ├── RegistrationModal.tsx
│   ├── PackageSelection.tsx
│   ├── PaymentSimulation.tsx
│   ├── DashboardLayout.tsx
│   ├── BusinessProfile.tsx
│   ├── ServiceCatalog.tsx
│   └── AnalyticsAndReviews.tsx
├── utils/               # Utility functions
│   ├── storage.ts       # localStorage management
│   └── constants.ts     # App constants
├── types/               # TypeScript interfaces
│   └── index.ts
└── App.tsx             # Main app component
```

## 📊 Data Schema (localStorage)

```typescript
{
  "users": [
    {
      "id": "uuid",
      "businessName": "string",
      "email": "string",
      "phone": "string",
      "password": "string",
      "country": "string",
      "status": "pending | active",
      "package": "basic | professional | premium",
      "subscription": {
        "isActive": true,
        "package": "string",
        "startDate": "ISODate",
        "endDate": "ISODate"
      },
      "payment": {
        "method": "mobileMoney | card",
        "status": "success | failed",
        "transactionId": "string"
      },
      "profile": {
        "logoUrl": "string",
        "description": "string",
        "contact": {
          "phone": "string",
          "email": "string",
          "whatsapp": "string"
        },
        "serviceAreas": ["Douala", "Yaoundé"],
        "completion": 85
      },
      "services": [
        {
          "id": "uuid",
          "name": "string",
          "category": "string",
          "description": "string",
          "photoUrl": "string",
          "price": "string"
        }
      ]
    }
  ],
  "session": {
    "currentUserId": "uuid"
  }
}
```

## 🚀 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to `http://localhost:5174` (or the port shown in terminal)

## 🎯 Demo Flow

1. **Visit the landing page** and click "Join as Business"
2. **Register** with any business details (use real email format)
3. **Select the Professional package** (marked as "Most Popular")
4. **Complete payment** using any payment method (simulated)
5. **Explore the dashboard** and add your business information
6. **Add services** to your catalog with photos
7. **View analytics** and reviews sections

## 🔧 Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 UI/UX Highlights

- **Smooth Animations**: Every interaction is animated for better user experience
- **Accessible Design**: Proper color contrast and keyboard navigation support
- **Mobile Responsive**: Works seamlessly on all screen sizes
- **Professional Styling**: Clean, modern design that builds trust
- **Intuitive Navigation**: Clear user flow with helpful feedback
- **Toast Notifications**: Real-time feedback for all user actions
- **Form Validation**: Comprehensive input validation with helpful error messages

## 💡 Key Implementation Details

### localStorage Simulation
- All data is stored in browser localStorage for MVP demonstration
- User sessions persist across browser refreshes
- Data structure mirrors what would be used with a real backend API

### Payment Simulation
- Mock payment methods based on selected country
- Realistic payment flow with processing delays
- Success/failure states with proper user feedback

### Profile Completion Tracking
- Dynamic calculation of profile completion percentage
- Visual progress indicators encourage users to complete their profiles
- Contextual tips and recommendations

### Responsive Design
- Mobile-first approach with progressive enhancement
- Collapsible sidebar navigation on mobile devices
- Touch-friendly interface elements

## 🔒 Security & Production Notes

This is an MVP using localStorage for demonstration. In production:
- Implement proper authentication with JWT tokens
- Use secure backend APIs for data storage
- Add input sanitization and validation server-side
- Implement rate limiting and security headers
- Use encrypted storage for sensitive data
- Add proper error handling and logging
- Implement real payment gateway integration

## 📋 Features Status

### ✅ Completed (MVP)
- Business registration and profile management
- Package selection with pricing tiers
- Payment simulation with multiple methods
- Service catalog management with photos
- Analytics dashboard with demo data
- Responsive design and animations
- Toast notifications and form validation

### 🔄 Future Enhancements
- Real customer booking system
- Live chat functionality
- Payment gateway integration
- Email notifications
- Advanced analytics with interactive charts
- Customer mobile app
- Real-time location services
- Multi-language support (French/English)

---

**CiproMart MVP** - Built with React, TypeScript, and Tailwind CSS 🚀

*Ready to connect businesses with customers across Cameroon* 🇨🇲
