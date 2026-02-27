import React from 'react';
import { Download, Calendar, MapPin, Search } from 'lucide-react';
import Button from '../components/Button';
import './Dashboard.css';

const UserDashboard: React.FC = () => {
  // Mock Data
  const bookings = [
    { id: '#BKG-1024', event: 'Wedding (Premium)', date: 'Oct 15, 2026', status: 'Confirmed', paid: true },
    { id: '#BKG-0985', event: 'Birthday (Standard)', date: 'May 04, 2026', status: 'Completed', paid: true },
    { id: '#BKG-1156', event: 'Corporate Setup', date: 'Dec 10, 2026', status: 'Pending Advance', paid: false },
  ];

  return (
    <div className="dashboard-container bg-light min-h-screen">
      <div className="container py-xl">
        <div className="dashboard-layout">

          {/* Sidebar / Profile summary */}
          <aside className="dashboard-sidebar">
            <div className="profile-card text-center">
              <div className="profile-avatar">JD</div>
              <h3 className="profile-name">John Doe</h3>
              <p className="profile-email">john@example.com</p>
              <div className="profile-stats mt-4">
                <div className="stat"><strong>3</strong> Total Bookings</div>
                <div className="stat"><strong>1</strong> Upcoming Event</div>
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
              {bookings.map((booking) => (
                <div key={booking.id} className="booking-card flex-between align-center">
                  <div className="booking-info flex-column gap-sm">
                    <div className="flex align-center gap-md">
                      <span className="booking-id">{booking.id}</span>
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
              ))}
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
