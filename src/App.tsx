import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { initializeStorage, getCurrentUser, updateUser } from './utils/storage';
import LandingPage from './components/LandingPage';
import PackageSelection from './components/PackageSelection';
import PaymentSimulation from './components/PaymentSimulation';
import DashboardLayout from './components/DashboardLayout';

function App() {
  const [selectedPackage, setSelectedPackage] = useState<string>('professional');
  
  // Initialize localStorage on app start
  useEffect(() => {
    initializeStorage();
  }, []);

  // Simple navigation handler
  const handleNavigate = (path: string) => {
    window.location.hash = path;
  };

  // Handle package selection
  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId);
    
    // Update current user's package selection
    const currentUser = getCurrentUser();
    if (currentUser) {
      const updatedUser = { ...currentUser, package: packageId as any };
      updateUser(updatedUser);
    }
  };

  // Protected route component
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const currentUser = getCurrentUser();
    if (!currentUser || !currentUser.subscription.isActive) {
      return <Navigate to="/" replace />;
    }
    return <>{children}</>;
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Landing Page */}
          <Route 
            path="/" 
            element={<LandingPage onNavigate={handleNavigate} />} 
          />
          
          {/* Package Selection */}
          <Route 
            path="/packages" 
            element={
              <PackageSelection 
                onNavigate={handleNavigate}
                onPackageSelect={handlePackageSelect}
              />
            } 
          />
          
          {/* Payment Simulation */}
          <Route 
            path="/payment" 
            element={
              <PaymentSimulation 
                onNavigate={handleNavigate}
                selectedPackage={selectedPackage}
              />
            } 
          />
          
          {/* Dashboard (Protected) */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardLayout onNavigate={handleNavigate} />
              </ProtectedRoute>
            } 
          />
          
          {/* Redirect any unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Toast Notifications */}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'white',
              color: '#171717',
              border: '1px solid #e5e5e5',
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
