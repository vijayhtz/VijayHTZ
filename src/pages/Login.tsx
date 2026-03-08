import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, db, googleProvider } from '../firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { Lock, Mail } from 'lucide-react';
import Button from '../components/Button';
import { FcGoogle } from 'react-icons/fc';
import './Auth.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    console.log("Login Page Mounted");
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
          role: 'user',
          createdAt: new Date().toISOString()
        });
        console.log("handleGoogleLogin: Firestore profile created.");
      } else {
        console.log("handleGoogleLogin: Profile already exists.");
      }

      const userData = userDoc.exists() ? userDoc.data() : { role: 'user' };
      console.log("handleGoogleLogin: User role is:", userData.role);

      if (userData.role === 'admin' || user.email === 'admin@vijaytent.com') {
        console.log("handleGoogleLogin: Redirecting to Admin Dashboard");
        navigate('/admin');
      } else {
        console.log("handleGoogleLogin: Redirecting to Homepage");
        navigate('/');
      }
    } catch (err: any) {
      console.error("handleGoogleLogin: Technical Error:", err);
      let errorMessage = 'Google sign-in failed. Please try again.';
      switch (err.code) {
        case 'auth/popup-closed-by-user':
          errorMessage = 'The popup was closed before completing sign-in.';
          break;
        case 'auth/cancelled-popup-request':
          errorMessage = 'Sign-in cancelled.';
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check user role in Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (userDoc.exists()) {
        console.log("handleLogin: Updating lastLogin in Firestore...");
        await updateDoc(doc(db, "users", user.uid), {
          lastLogin: new Date().toISOString()
        });

        const userData = userDoc.data();
        if (userData.role === 'admin' || email === 'admin@vijaytent.com') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        // Fallback or handle missing profile
        if (email === 'admin@vijaytent.com') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }
    } catch (err: any) {
      console.error("Login error:", err);
      let errorMessage = "Failed to sign in. Please check your credentials.";
      switch (err.code) {
        case 'auth/invalid-email':
          errorMessage = "Invalid email address format.";
          break;
        case 'auth/user-disabled':
          errorMessage = "This user account has been disabled.";
          break;
        case 'auth/user-not-found':
        case 'auth/invalid-login-credentials':
        case 'auth/wrong-password':
          errorMessage = "Invalid email or password.";
          break;
        case 'auth/too-many-requests':
          errorMessage = "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.";
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
        <div className="auth-card">
          <div className="auth-header">
            <h2>Welcome Back</h2>
            <p>Log in to manage your bookings and profile</p>
          </div>

          {error && <div className="auth-error-msg" style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</div>}

          <form onSubmit={handleLogin} className="auth-form">
            <div className="auth-input-group">
              <label>Email Address</label>
              <div className="input-with-icon">
                <Mail className="input-icon" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="auth-input-group">
              <div className="label-with-link">
                <label>Password</label>
                <a href="#" className="forgot-password">Forgot Password?</a>
              </div>
              <div className="input-with-icon">
                <Lock className="input-icon" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <Button type="submit" variant="primary" className="full-width mt-4" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
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
            <p>Don't have an account?</p>
            <Button to="/register" variant="outline" className="full-width mt-2">
              Create New Account / Register
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
