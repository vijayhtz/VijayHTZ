import React, { useState } from 'react';
import { Package, Calendar, Users, MessageSquare, Plus, Settings } from 'lucide-react';
import Button from '../components/Button';
import './Dashboard.css';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('bookings');

  // Mock data
  const recentBookings = [
    { id: '#BKG-1156', customer: 'Alice Smith', event: 'Corporate Setup', date: 'Dec 10, 2026', status: 'Pending Advance' },
    { id: '#BKG-1024', customer: 'John Doe', event: 'Wedding (Premium)', date: 'Oct 15, 2026', status: 'Confirmed' },
    { id: '#BKG-1023', customer: 'Rahul Sharma', event: 'Birthday (Standard)', date: 'Sep 22, 2026', status: 'In Progress' },
  ];

  return (
    <div className="dashboard-container bg-light min-h-screen">
      <div className="admin-layout">

        {/* Admin Sidebar */}
        <aside className="admin-sidebar bg-dark text-light">
          <div className="admin-brand p-md">
            <h2>Vijay Tent House</h2>
            <span className="text-gold text-sm">Admin Panel</span>
          </div>
          <nav className="admin-nav mt-lg">
            <ul>
              <li className={activeTab === 'bookings' ? 'active' : ''} onClick={() => setActiveTab('bookings')}>
                <Calendar size={18} /> Manage Bookings
              </li>
              <li className={activeTab === 'packages' ? 'active' : ''} onClick={() => setActiveTab('packages')}>
                <Package size={18} /> Manage Packages
              </li>
              <li className={activeTab === 'customers' ? 'active' : ''} onClick={() => setActiveTab('customers')}>
                <Users size={18} /> Customers
              </li>
              <li className={activeTab === 'messages' ? 'active' : ''} onClick={() => setActiveTab('messages')}>
                <MessageSquare size={18} /> Inquiries
              </li>
              <li className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>
                <Settings size={18} /> Settings
              </li>
            </ul>
          </nav>
        </aside>

        {/* Admin Main Content */}
        <main className="admin-main p-xl">
          <div className="admin-header flex-between mb-xl">
            <h1 className="h2 text-primary">Dashboard Overview</h1>
            <Button variant="primary" size="sm" className="flex align-center gap-xs">
              <Plus size={16} /> Add New Package
            </Button>
          </div>

          <div className="admin-stats-grid mb-xl">
            <div className="admin-stat-card">
              <div className="stat-title">New Bookings</div>
              <div className="stat-val text-gold">12</div>
              <div className="stat-desc">This week</div>
            </div>
            <div className="admin-stat-card">
              <div className="stat-title">Pending Approvals</div>
              <div className="stat-val text-danger">5</div>
              <div className="stat-desc">Action required</div>
            </div>
            <div className="admin-stat-card">
              <div className="stat-title">Upcoming Events</div>
              <div className="stat-val text-primary">8</div>
              <div className="stat-desc">Next 30 days</div>
            </div>
            <div className="admin-stat-card">
              <div className="stat-title">Total Customers</div>
              <div className="stat-val text-muted">1,240</div>
              <div className="stat-desc">All time</div>
            </div>
          </div>

          <div className="admin-content-box p-lg bg-white radius-lg shadow-sm">
            <div className="flex-between mb-lg">
              <h2 className="h3">Recent Bookings</h2>
              <a href="#" className="text-primary font-medium text-sm hover-gold">View All</a>
            </div>

            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Customer</th>
                    <th>Event Details</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map(b => (
                    <tr key={b.id}>
                      <td className="font-medium">{b.id}</td>
                      <td>{b.customer}</td>
                      <td>{b.event}</td>
                      <td>{b.date}</td>
                      <td>
                        <span className={`status-badge admin ${b.status.replace(/\s+/g, '-').toLowerCase()}`}>
                          {b.status}
                        </span>
                      </td>
                      <td>
                        <button className="btn-table btn-table-primary">Review</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
