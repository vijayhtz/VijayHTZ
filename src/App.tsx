import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Context
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Layout components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import Packages from './pages/Packages';
import Booking from './pages/Booking';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Invoice from './pages/Invoice';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="app-container">
            <Navbar />
            <main className="main-content">
              <Routes>
                {/* Public Auth Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Routes */}
                <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
                <Route path="/packages" element={<ProtectedRoute><Packages /></ProtectedRoute>} />
                <Route path="/booking" element={<ProtectedRoute><Booking /></ProtectedRoute>} />
                <Route path="/gallery" element={<ProtectedRoute><Gallery /></ProtectedRoute>} />
                <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
                <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
                <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                <Route path="/invoice" element={<ProtectedRoute><Invoice /></ProtectedRoute>} />

                {/* Admin Route */}
                <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
