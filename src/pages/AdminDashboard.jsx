import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChartBarIcon,
  UsersIcon,
  CalendarIcon,
  ClipboardListIcon,
  CogIcon,
  LogoutIcon,
  MenuIcon,
  XIcon,
} from '@heroicons/react/outline';
import MenuManagement from '../components/Admin/MenuManagement';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState({});
  const [stats, setStats] = useState({
    totalReservations: 156,
    todayReservations: 24,
    totalCustomers: 890,
    revenue: 25600
  });
  const navigate = useNavigate();

  // Mock data for recent reservations
  const recentReservations = [
    { id: 1, name: 'John Doe', date: '2024-03-20', time: '19:00', guests: 4, status: 'confirmed' },
    { id: 2, name: 'Jane Smith', date: '2024-03-20', time: '20:00', guests: 2, status: 'pending' },
    { id: 3, name: 'Mike Johnson', date: '2024-03-21', time: '18:30', guests: 6, status: 'confirmed' },
  ];

  // Navigation items
  const navItems = [
    { id: 'overview', name: 'Overview', icon: ChartBarIcon },
    { id: 'reservations', name: 'Reservations', icon: CalendarIcon },
    { id: 'customers', name: 'Customers', icon: UsersIcon },
    { id: 'menu', name: 'Menu Management', icon: ClipboardListIcon },
    { id: 'settings', name: 'Settings', icon: CogIcon },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-secondary transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6">
            <h1 className="text-2xl font-serif text-white">Oshaad Admin</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-primary text-white'
                    : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.name}</span>
              </button>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="p-4 mt-auto">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-3 text-gray-300 hover:bg-white/10 rounded-lg transition-all duration-200"
            >
              <LogoutIcon className="w-5 h-5 mr-3" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg bg-secondary text-white hover:bg-primary transition-colors duration-200"
        >
          {isMobileMenuOpen ? (
            <XIcon className="w-6 h-6" />
          ) : (
            <MenuIcon className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Main Content */}
      <main className="md:ml-64 min-h-screen">
        <div className="p-8">
          {/* Overview Section */}
          {activeTab === 'overview' && (
            <div className="space-y-8" id="overview" data-animate>
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-serif text-secondary">Dashboard Overview</h2>
                <p className="text-gray-500">Welcome back, Admin</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: 'Total Reservations', value: stats.totalReservations, icon: CalendarIcon },
                  { title: "Today's Reservations", value: stats.todayReservations, icon: ClipboardListIcon },
                  { title: 'Total Customers', value: stats.totalCustomers, icon: UsersIcon },
                  { title: 'Revenue', value: formatCurrency(stats.revenue), icon: ChartBarIcon },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105"
                    style={{
                      opacity: isVisible['overview'] ? 1 : 0,
                      transform: `translateY(${isVisible['overview'] ? '0' : '20px'})`,
                      transition: `all 0.6s ease-out ${index * 100}ms`,
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-sm">{stat.title}</p>
                        <p className="text-2xl font-bold text-secondary mt-2">{stat.value}</p>
                      </div>
                      <div className="p-3 bg-primary/10 rounded-full">
                        <stat.icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Reservations */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-serif text-secondary mb-4">Recent Reservations</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guests</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {recentReservations.map((reservation) => (
                        <tr key={reservation.id} className="hover:bg-gray-50 transition-colors duration-200">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{reservation.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.time}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reservation.guests}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              reservation.status === 'confirmed'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {reservation.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Placeholder for other tabs */}
          {activeTab === 'reservations' && (
            <div className="text-center py-8">
              <h2 className="text-3xl font-serif text-secondary">Reservations Management</h2>
              {/* Add reservations management content */}
            </div>
          )}
          {activeTab === 'customers' && (
            <div className="text-center py-8">
              <h2 className="text-3xl font-serif text-secondary">Customer Management</h2>
              {/* Add customer management content */}
            </div>
          )}
          {/* Render MenuManagement when activeTab is 'menu' */}
          {activeTab === 'menu' && (
            <MenuManagement />
          )}
          {activeTab === 'settings' && (
            <div className="text-center py-8">
              <h2 className="text-3xl font-serif text-secondary">Settings</h2>
              {/* Add settings content */}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard; 