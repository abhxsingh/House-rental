import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Auth } from './components/Auth';
import { PropertyList } from './components/PropertyList';
import { PropertyDetails } from './components/PropertyDetails';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navigation } from './components/Navigation';

function AppContent() {
  const { user } = useAuth();

  if (!user) {
    return <Auth />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <Routes>
        <Route path="/" element={<PropertyList />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;