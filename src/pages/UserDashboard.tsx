import React, { useEffect, useState } from 'react';
import { Download, Calendar, MapPin, Search } from 'lucide-react';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { getUserBookings } from '../services/database';
import type { BookingData } from '../services/database';
import './Dashboard.css';

const UserDashboard: React.FC = () => {
  const { user, userProfile } = useAuth();
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (user) {
        try {
          const data = await getUserBookings(user.uid);
          setBookings(data);
        } catch (error) {
          console.error("Error fetching bookings:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchBookings();
  }, [user]);

  if (!userProfile) {
    return <div className="p-xl text-center">Loading profile...</div>;
  }

  return (
    <div className="dashboard-container bg-light min-h-screen">
      <div className="container py-xl">
        <div className="dashboard-layout">

          {/* Sidebar / Profile summary */}
          <aside className="dashboard-sidebar">
            <div className="profile-card text-center">
              <div className="profile-avatar">
                {userProfile.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase() || 'U'}
              </div>
              <h3 className="profile-name">{userProfile.name}</h3>
              <p className="profile-email">{userProfile.email}</p>
              <div className="profile-role text-gold text-sm font-bold mt-2">
                {userProfile.role === 'client' ? 'PROFESSIONAL CLIENT' : 'CUSTOMER'}
              </div>
              <div className="profile-stats mt-4">
                <div className="stat"><strong>{bookings.length}</strong> Total Bookings</div>
                <div className="stat"><strong>{bookings.filter(b => b.status !== 'Completed').length}</strong> Active Events</div>
              </div>
            </div>

            <nav className="dashboard-nav mt-4">
              <ul>
                <li className="active"><a href="#bookings">My Bookings</a></li>
                <li><a href="#profile">Profile Settings</a></li>
                <li><a href="#support">Customer Support</a></li>
                <li><a href="/login" className="text-danger">Logout</a></li>
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="dashboard-main">
            <div className="dashboard-header flex-between mb-lg">
              <h1 className="h2 text-primary">My Bookings</h1>
              <div className="search-bar">
                <Search size={18} className="search-icon" />
                <input type="text" placeholder="Search bookings..." />
              </div>
            </div>

            <div className="bookings-list">
              {loading ? (
                <p className="text-center p-lg">Fetching your bookings...</p>
              ) : bookings.length > 0 ? (
                bookings.map((booking) => (
                  <div key={booking.id} className="booking-card flex-between align-center">
                    <div className="booking-info flex-column gap-sm">
                      <div className="flex align-center gap-md">
                        <span className="booking-id">#{booking.id?.slice(-6).toUpperCase()}</span>
                        <span className={`status-badge ${booking.status.replace(/\s+/g, '-').toLowerCase()}`}>
                          {booking.status}
                        </span>
                      </div>
                      <h3 className="event-name">{booking.event}</h3>
                      <div className="booking-meta flex gap-lg text-muted text-sm">
                        <span className="flex align-center gap-xs"><Calendar size={14} /> {booking.date}</span>
                        <span className="flex align-center gap-xs"><MapPin size={14} /> Celebration City, IN</span>
                      </div>
                    </div>

                    <div className="booking-actions flex gap-sm">
                      {booking.paid ? (
                        <Button variant="outline" size="sm" className="flex align-center gap-xs">
                          <Download size={14} /> Invoice
                        </Button>
                      ) : (
                        <Button variant="primary" size="sm">Pay Advance</Button>
                      )}
                      <Button variant="secondary" size="sm">Details</Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-bookings text-center p-xl bg-white radius-lg shadow-sm">
                  <Calendar size={48} className="text-muted mb-md mx-auto" />
                  <h3>No bookings found</h3>
                  <p>You haven't made any event bookings yet.</p>
                </div>
              )}
            </div>

            <div className="mt-8 text-center">
              <Button to="/booking" variant="outline">+ New Booking Request</Button>
            </div>
          </main>

        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
