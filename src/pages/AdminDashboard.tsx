import React, { useState, useEffect } from 'react';
import { Package, Calendar, Users, MessageSquare, Plus, Settings } from 'lucide-react';
import Button from '../components/Button';
import { getAllBookings, getAllUsers } from '../services/database';
import type { BookingData } from '../services/database';
import './Dashboard.css';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [usersCount, setUsersCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingsData, usersData] = await Promise.all([
          getAllBookings(),
          getAllUsers()
        ]);
        setBookings(bookingsData);
        setUsersCount(usersData.length);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
              <div className="stat-title">Total Bookings</div>
              <div className="stat-val text-gold">{bookings.length}</div>
              <div className="stat-desc">All time</div>
            </div>
            <div className="admin-stat-card">
              <div className="stat-title">Pending Approvals</div>
              <div className="stat-val text-danger">
                {bookings.filter(b => b.status === 'Pending Advance').length}
              </div>
              <div className="stat-desc">Action required</div>
            </div>
            <div className="admin-stat-card">
              <div className="stat-title">Active Events</div>
              <div className="stat-val text-primary">
                {bookings.filter(b => b.status !== 'Completed').length}
              </div>
              <div className="stat-desc">In progress/Confirmed</div>
            </div>
            <div className="admin-stat-card">
              <div className="stat-title">Total Customers</div>
              <div className="stat-val text-muted">{usersCount}</div>
              <div className="stat-desc">All users</div>
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
                  {loading ? (
                    <tr><td colSpan={6} className="text-center p-lg">Loading data...</td></tr>
                  ) : bookings.length > 0 ? (
                    bookings.map(b => (
                      <tr key={b.id}>
                        <td className="font-medium">#{b.id?.slice(-6).toUpperCase()}</td>
                        <td>{b.customerName || 'N/A'}</td>
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
                    ))
                  ) : (
                    <tr><td colSpan={6} className="text-center p-lg">No bookings found</td></tr>
                  )}
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
