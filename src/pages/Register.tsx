import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from 'firebase/auth';
import { auth, db, googleProvider } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { User, Lock, Mail, Phone } from 'lucide-react';
import Button from '../components/Button';
import { FcGoogle } from 'react-icons/fc';
import './Auth.css';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'user' // Default role
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    console.log("Register Page Mounted");
  }, []);

  const handleGoogleLogin = async () => {
    setError('');
    console.log("handleGoogleLogin: Initiating Google Sign-In...");
    try {
      setLoading(true);
      console.log("handleGoogleLogin: Calling signInWithPopup...");
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("handleGoogleLogin: Sign-In Success! User UID:", user.uid);

      // Check if user exists in Firestore, if not create profile
      console.log("handleGoogleLogin: Checking Firestore for profile...");
      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (!userDoc.exists()) {
        console.log("handleGoogleLogin: No profile found. Creating document in 'users' collection...");
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          role: 'user', // Default role for Google login
          createdAt: new Date().toISOString()
        });
        console.log("handleGoogleLogin: Firestore profile created.");
      } else {
        console.log("handleGoogleLogin: Profile already exists.");
      }

      console.log("handleGoogleLogin: Redirecting to Homepage");
      navigate('/');
    } catch (err: any) {
      console.error("handleGoogleLogin: Technical Error:", err);
      let errorMessage = 'Google registration failed. Please try again.';
      switch (err.code) {
        case 'auth/popup-closed-by-user':
          errorMessage = 'The popup was closed before completing registration.';
          break;
        case 'auth/cancelled-popup-request':
          errorMessage = 'Registration cancelled.';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Google Sign-In is not enabled on this Firebase project.';
          break;
        default:
          errorMessage = err.message || errorMessage;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
      console.log("handleGoogleLogin: Process finished.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    console.log("Starting Registration Process...", formData.email);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      console.error("Registration Error: Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      console.log("Calling Firebase createUserWithEmailAndPassword...");
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      console.log("User Auth Created:", user.uid);

      console.log("Updating Profile Display Name...");
      await updateProfile(user, { displayName: formData.name });

      console.log("Saving Profile to Firestore...");
      await setDoc(doc(db, "users", user.uid), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      });
      console.log("Firestore Profile Created Successfully");

      navigate('/');
    } catch (err: any) {
      console.error("Registration technical error:", err);
      let errorMessage = "Failed to register account.";
      switch (err.code) {
        case 'auth/email-already-in-use':
          errorMessage = "This email is already in use by another account.";
          break;
        case 'auth/invalid-email':
          errorMessage = "Invalid email address format.";
          break;
        case 'auth/weak-password':
          errorMessage = "Password should be at least 6 characters long.";
          break;
        case 'auth/operation-not-allowed':
          errorMessage = "Email/Password sign-in is not enabled on this Firebase project.";
          break;
        default:
          errorMessage = err.message || errorMessage;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container section">
      <div className="container">
        <div className="auth-card register-card">
          <div className="auth-header">
            <h2>Create an Account</h2>
            <p>Join us to easily manage and track your event bookings</p>
          </div>

          {error && <div className="auth-error-msg" style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</div>}

          <form onSubmit={handleRegister} className="auth-form">
            <div className="auth-input-group">
              <label>Full Name</label>
              <div className="input-with-icon">
                <User className="input-icon" size={20} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="auth-input-group">
              <label>Email Address</label>
              <div className="input-with-icon">
                <Mail className="input-icon" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="auth-input-group">
              <label>Phone Number</label>
              <div className="input-with-icon">
                <Phone className="input-icon" size={20} />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="10-digit number"
                />
              </div>
            </div>

            <div className="auth-input-group">
              <label>Account Type</label>
              <div className="input-with-icon">
                <User className="input-icon" size={20} />
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="role-select"
                  required
                >
                  <option value="user">Customer (Individual/Guest)</option>
                  <option value="client">Client (Professional/Planner)</option>
                </select>
              </div>
            </div>

            <div className="auth-input-group">
              <label>Password</label>
              <div className="input-with-icon">
                <Lock className="input-icon" size={20} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Create a password"
                />
              </div>
            </div>

            <div className="auth-input-group">
              <label>Confirm Password</label>
              <div className="input-with-icon">
                <Lock className="input-icon" size={20} />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Re-enter password"
                />
              </div>
            </div>

            <Button type="submit" variant="primary" className="full-width mt-4" disabled={loading}>
              {loading ? 'Registering...' : 'Register Now'}
            </Button>
          </form>

          <div className="auth-divider">
            <span>OR</span>
          </div>

          <button
            type="button"
            className="google-auth-btn"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <FcGoogle size={24} />
            Continue with Google
          </button>

          <div className="auth-footer">
            <p>Already have an account? <Link to="/login">Login here</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
