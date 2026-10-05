import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  Truck, 
  CreditCard, 
  BarChart3, 
  AlertCircle, 
  Settings, 
  LogOut, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  ArrowUpRight, 
  IndianRupee, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Eye, 
  UserCheck,
  RefreshCw,
  Bell
} from 'lucide-react';
import { VEHICLE_CATEGORIES } from '../../data/mockData';
import { Booking, Driver } from '../../types';

type AdminTab = 
  | 'dashboard'
  | 'bookings'
  | 'drivers'
  | 'vehicles'
  | 'customers'
  | 'payments'
  | 'reports'
  | 'complaints'
  | 'settings';

export const AdminDashboard: React.FC = () => {
  const { 
    language, 
    bookings, 
    updateBookingStatus, 
    drivers, 
    approveDriver, 
    rejectDriver, 
    adminStats, 
    showToast,
    customerProfile,
    setActiveView,
    recentLoginAlerts,
    contactInfo 
  } = useApp();

  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedDriverDoc, setSelectedDriverDoc] = useState<Driver | null>(null);

  // Complaints mock data
  const [complaints, setComplaints] = useState([
    { id: 'TKT-104', customer: 'Arihant Electronics', issue: 'Request for early delivery at Bhiwandi depot', status: 'In Review', priority: 'High', date: '03 Oct 2026' },
    { id: 'TKT-103', customer: 'Shree Krishna Agro', issue: 'Tarpaulin check required at Kotputli toll', status: 'Resolved', priority: 'Medium', date: '02 Oct 2026' },
    { id: 'TKT-102', customer: 'Yogi Logistics', issue: 'GST Invoice revision with updated PO number', status: 'Resolved', priority: 'Low', date: '01 Oct 2026' }
  ]);

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = b.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.pickupCity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.dropCity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const pendingDrivers = drivers.filter(d => d.status === 'pending');

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen flex flex-col lg:flex-row font-sans">
      
      {/* SIDEBAR NAVIGATION inspired by reference image */}
      <aside className="w-full lg:w-64 bg-slate-950 border-r border-slate-800 p-4 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          
          {/* Admin Header */}
          <div className="flex items-center gap-2.5 px-2 py-1">
            <div className="w-9 h-9 rounded-xl bg-emerald-700 flex items-center justify-center text-white font-bold">
              <Truck className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight text-white block">VAHAN SETU</span>
              <span className="text-[10px] text-emerald-400 font-mono tracking-wider">TMS CONTROL ROOM</span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1 text-xs">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'dashboard' ? 'bg-emerald-700 text-white font-semibold shadow-xs' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('bookings')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'bookings' ? 'bg-emerald-700 text-white font-semibold shadow-xs' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4" />
                <span>Bookings Management</span>
              </div>
              <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded font-mono">{bookings.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('drivers')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'drivers' ? 'bg-emerald-700 text-white font-semibold shadow-xs' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <UserCheck className="w-4 h-4" />
                <span>Driver Fleet & KYC</span>
              </div>
              {pendingDrivers.length > 0 && (
                <span className="text-[10px] bg-orange-500 text-white px-1.5 py-0.5 rounded font-bold font-mono">
                  {pendingDrivers.length} Pending
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('vehicles')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'vehicles' ? 'bg-emerald-700 text-white font-semibold shadow-xs' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Truck className="w-4 h-4" />
              <span>Vehicles Availability</span>
            </button>

            <button
              onClick={() => setActiveTab('payments')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'payments' ? 'bg-emerald-700 text-white font-semibold shadow-xs' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Payments & Settlements</span>
            </button>

            <button
              onClick={() => setActiveTab('complaints')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'complaints' ? 'bg-emerald-700 text-white font-semibold shadow-xs' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <AlertCircle className="w-4 h-4" />
                <span>Complaints & Tickets</span>
              </div>
              <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded font-mono">3</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'settings' ? 'bg-emerald-700 text-white font-semibold shadow-xs' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Platform Settings</span>
            </button>
          </nav>

        </div>

        {/* Admin user footer */}
        <div className="pt-4 border-t border-slate-800 text-xs space-y-2">
          <div className="flex items-center gap-2.5 px-2">
            <div className="w-8 h-8 rounded-full bg-emerald-800 border border-emerald-600 flex items-center justify-center font-bold text-white text-xs">
              VY
            </div>
            <div>
              <div className="font-bold text-white">Vikas Yogi</div>
              <div className="text-[10px] text-slate-400">Super Administrator</div>
            </div>
          </div>
          <button
            onClick={() => setActiveView('home')}
            className="w-full flex items-center gap-2 px-2 py-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer text-xs"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Return to Public Website</span>
          </button>
        </div>

      </aside>

      {/* MAIN VIEWPORT */}
      <main className="flex-1 p-4 sm:p-8 space-y-6 overflow-y-auto max-h-screen">
        
        {/* Top contextual bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
          <div>
            <div className="text-xs text-slate-400 font-mono">
              Admin Console / {activeTab.toUpperCase()}
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
              {activeTab === 'dashboard' && 'Operations Dashboard & KPI Analytics'}
              {activeTab === 'bookings' && 'Commercial Transport Bookings'}
              {activeTab === 'drivers' && 'Transporter & Driver Fleet Verification'}
              {activeTab === 'vehicles' && 'Vehicle Availability & Specifications'}
              {activeTab === 'payments' && 'Freight Revenue & Transporter Settlements'}
              {activeTab === 'complaints' && 'Customer Support & Dispatch Grievances'}
              {activeTab === 'settings' && 'System Configuration & Toll Rules'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-3 py-1 rounded-lg">
              ● Central Server Active
            </span>
            <button
              onClick={() => showToast('Data re-synchronized with AIS-140 GPS Network')}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors cursor-pointer"
              title="Refresh Telemetry"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* TAB: DASHBOARD OVERVIEW */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            
            {/* 6 Core Dashboard Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-medium">Total Bookings</span>
                <div className="text-2xl font-bold font-mono text-white tabular-nums">
                  {adminStats.totalBookings.toLocaleString()}
                </div>
                <span className="text-[10px] text-emerald-400">+14% this month</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-medium">Active Drivers</span>
                <div className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">
                  {adminStats.activeDrivers}
                </div>
                <span className="text-[10px] text-emerald-400">92% online today</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-medium">Registered Users</span>
                <div className="text-2xl font-bold font-mono text-white tabular-nums">
                  {adminStats.registeredCustomers.toLocaleString()}
                </div>
                <span className="text-[10px] text-slate-400">Across 28 States</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-medium">Available Fleet</span>
                <div className="text-2xl font-bold font-mono text-orange-400 tabular-nums">
                  {adminStats.availableVehicles}
                </div>
                <span className="text-[10px] text-slate-400">10 Vehicle Classes</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-medium">Total Revenue</span>
                <div className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">
                  ₹84.6 L
                </div>
                <span className="text-[10px] text-emerald-400">GST Input Credited</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-medium">Pending Payouts</span>
                <div className="text-2xl font-bold font-mono text-amber-400 tabular-nums">
                  ₹3.2 L
                </div>
                <span className="text-[10px] text-slate-400">Daily NEFT Cycle</span>
              </div>

            </div>

            {/* Interactive Charts: Booking Overview Line Chart + Revenue Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Line Chart Component */}
              <div className="lg:col-span-8 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white">Booking Volume Overview (Last 7 Days)</h3>
                    <p className="text-[11px] text-slate-400">Dispatch trajectory across North & West Indian logistics corridors</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded">
                    +22.4% Volume Growth
                  </span>
                </div>

                {/* SVG Line Chart */}
                <div className="h-48 w-full pt-4">
                  <svg viewBox="0 0 500 150" className="w-full h-full overflow-visible">
                    {/* Grid lines */}
                    <line x1="0" y1="30" x2="500" y2="30" stroke="#1e293b" strokeDasharray="3 3" />
                    <line x1="0" y1="70" x2="500" y2="70" stroke="#1e293b" strokeDasharray="3 3" />
                    <line x1="0" y1="110" x2="500" y2="110" stroke="#1e293b" strokeDasharray="3 3" />

                    {/* Gradient fill area */}
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    <path
                      d="M 10,120 L 80,95 L 160,105 L 240,65 L 320,75 L 400,35 L 490,20 L 490,140 L 10,140 Z"
                      fill="url(#chartGradient)"
                    />

                    {/* Trend Line */}
                    <path
                      d="M 10,120 L 80,95 L 160,105 L 240,65 L 320,75 L 400,35 L 490,20"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3"
                    />

                    {/* Nodes */}
                    {[
                      { x: 10, y: 120, label: 'Mon', val: '142' },
                      { x: 80, y: 95, label: 'Tue', val: '185' },
                      { x: 160, y: 105, label: 'Wed', val: '172' },
                      { x: 240, y: 65, label: 'Thu', val: '235' },
                      { x: 320, y: 75, label: 'Fri', val: '210' },
                      { x: 400, y: 35, label: 'Sat', val: '298' },
                      { x: 490, y: 20, label: 'Sun', val: '342' }
                    ].map((pt, i) => (
                      <g key={i}>
                        <circle cx={pt.x} cy={pt.y} r="4" fill="#ffffff" stroke="#10b981" strokeWidth="2" />
                        <text x={pt.x - 10} y="145" fontSize="9" fill="#94a3b8" fontFamily="monospace">
                          {pt.label}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>
              </div>

              {/* Revenue Pie / Share by Category */}
              <div className="lg:col-span-4 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-white">Revenue by Vehicle Class</h3>
                  <p className="text-[11px] text-slate-400">Proportional freight billing distribution</p>
                </div>

                <div className="space-y-3 pt-2 text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-300">Heavy Multi-Axle & Taurus (12W/14W)</span>
                      <span className="font-mono text-emerald-400 font-bold">44%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-[44%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-300">32ft High-Cube Containers</span>
                      <span className="font-mono text-orange-400 font-bold">26%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-orange-500 h-full w-[26%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-300">Medium Trucks (Eicher / 6 Wheeler)</span>
                      <span className="font-mono text-blue-400 font-bold">18%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full w-[18%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-300">Intra-City Light (Tata Ace / Pickup)</span>
                      <span className="font-mono text-purple-400 font-bold">12%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-purple-500 h-full w-[12%]" />
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* Pending Driver KYC Verification Queue */}
            {pendingDrivers.length > 0 && (
              <div className="bg-slate-950 p-5 rounded-2xl border border-orange-500/40 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-400 animate-ping" />
                    <h3 className="text-sm font-bold text-white">
                      Pending Transporter / Driver KYC Applications ({pendingDrivers.length})
                    </h3>
                  </div>
                  <span className="text-[10px] text-orange-300 font-mono">Verification Required before ride assignment</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pendingDrivers.map((driver) => (
                    <div key={driver.id} className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-bold text-white text-sm">{driver.name}</div>
                          <div className="text-[11px] text-slate-400 font-mono">
                            Vehicle: {driver.vehicleNumber} ({driver.vehicleType})
                          </div>
                        </div>
                        <span className="text-[10px] bg-orange-950 text-orange-400 border border-orange-700/60 px-2 py-0.5 rounded font-mono">
                          Awaiting Approval
                        </span>
                      </div>

                      <div className="space-y-1 text-xs text-slate-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                        <div className="flex justify-between">
                          <span>DL Number:</span>
                          <span className="font-mono">{driver.dlNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Bank Account:</span>
                          <span className="font-mono">{driver.bankAccount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Phone:</span>
                          <span className="font-mono">+91 {driver.phone}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <button
                          onClick={() => approveDriver(driver.id)}
                          className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Approve & Activate Driver</span>
                        </button>
                        <button
                          onClick={() => rejectDriver(driver.id)}
                          className="px-3 py-2 bg-slate-800 hover:bg-rose-900/60 text-slate-300 hover:text-white text-xs rounded-lg transition-colors cursor-pointer"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Active Bookings Table snapshot */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden space-y-3 p-5">
              <div className="flex items-center justify-between pb-2">
                <h3 className="text-sm font-bold text-white">Recent Active Highway Dispatches</h3>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  View All {bookings.length} Bookings →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900 text-slate-400 font-semibold border-b border-slate-800">
                    <tr>
                      <th className="p-3">Booking ID</th>
                      <th className="p-3">Customer</th>
                      <th className="p-3">Route (Origin ➔ Drop)</th>
                      <th className="p-3">Vehicle</th>
                      <th className="p-3">Driver</th>
                      <th className="p-3 text-right">Fare (₹)</th>
                      <th className="p-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {bookings.slice(0, 4).map((b) => (
                      <tr key={b.id} className="hover:bg-slate-900/60 transition-colors">
                        <td className="p-3 font-mono font-bold text-white">{b.id}</td>
                        <td className="p-3 font-medium text-slate-200">{b.customerName}</td>
                        <td className="p-3">
                          <span className="text-emerald-400">{b.pickupCity}</span> ➔ <span className="text-orange-400">{b.dropCity}</span>
                        </td>
                        <td className="p-3 text-slate-400">{b.vehicleName}</td>
                        <td className="p-3 font-mono text-slate-200">{b.driverName || 'Assigning'}</td>
                        <td className="p-3 text-right font-mono font-bold text-emerald-400">
                          ₹{b.totalFare.toLocaleString()}
                        </td>
                        <td className="p-3 text-center">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                            b.status === 'in_transit' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                            b.status === 'delivered' ? 'bg-blue-950 text-blue-400 border border-blue-800' :
                            'bg-orange-950 text-orange-400 border border-orange-800'
                          }`}>
                            {b.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* REAL-TIME OWNER LOGIN ALERTS SECTION */}
            <div className="bg-slate-950 rounded-2xl border border-emerald-800/60 p-5 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>Owner Login Alerts Feed (WhatsApp & Email Logs)</span>
                    <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-700/60 px-2 py-0.5 rounded font-mono">
                      Target: Vikas Yogi (+91 {contactInfo.phone})
                    </span>
                  </h3>
                </div>
                <span className="text-xs text-slate-400 font-mono">
                  {recentLoginAlerts.length} Dispatches Recorded
                </span>
              </div>

              {recentLoginAlerts.length === 0 ? (
                <div className="p-4 bg-slate-900/60 rounded-xl text-xs text-slate-400 flex items-center justify-between">
                  <span>No recent logins yet. Try logging in from the "Login / Register" portal to trigger a live dispatch.</span>
                  <button
                    onClick={() => setActiveView('login')}
                    className="text-emerald-400 hover:underline font-semibold"
                  >
                    Open Login Portal →
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  {recentLoginAlerts.slice(0, 5).map((alert) => (
                    <div
                      key={alert.id}
                      className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                            alert.role === 'customer' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-orange-950 text-orange-300 border border-orange-800'
                          }`}>
                            {alert.role}
                          </span>
                          <span className="font-bold text-white">{alert.userName}</span>
                          <span className="text-slate-400 font-mono text-[11px]">(+91 {alert.userPhone})</span>
                        </div>
                        <p className="text-[11px] text-slate-400">
                          Dispatched at {alert.timestamp} · Target: WhatsApp (+91 {alert.ownerPhone}) & Email ({alert.ownerEmail})
                        </p>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-auto">
                        <span className="text-[10px] bg-emerald-950 text-emerald-400 font-bold px-2 py-1 rounded border border-emerald-700/60">
                          ✓ WHATSAPP & EMAIL SENT
                        </span>
                        <a
                          href={`https://wa.me/91${alert.ownerPhone}?text=${encodeURIComponent(alert.messageText)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] rounded transition-colors"
                        >
                          View WhatsApp
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB: BOOKINGS MANAGEMENT */}
        {activeTab === 'bookings' && (
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 space-y-4">
            
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between pb-4 border-b border-slate-800">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filter by ID, City, or Shipper..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Status Segmented Filter */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl overflow-x-auto w-full sm:w-auto">
                {['all', 'assigned', 'in_transit', 'delivered'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                      statusFilter === st ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {st.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Bookings List */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900 text-slate-400 font-semibold border-b border-slate-800">
                  <tr>
                    <th className="p-3">Booking ID</th>
                    <th className="p-3">Shipper / Customer</th>
                    <th className="p-3">Pickup ➔ Destination</th>
                    <th className="p-3">Consignment</th>
                    <th className="p-3">Assigned Transporter</th>
                    <th className="p-3 text-right">Fare (₹)</th>
                    <th className="p-3 text-center">Action Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-900/50">
                      <td className="p-3 font-mono font-bold text-white">{b.id}</td>
                      <td className="p-3">
                        <div className="font-semibold text-slate-200">{b.customerName}</div>
                        <div className="text-[10px] text-slate-500 font-mono">+91 {b.customerPhone}</div>
                      </td>
                      <td className="p-3">
                        <div>{b.pickupCity} ➔ {b.dropCity}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{b.distanceKm} KM</div>
                      </td>
                      <td className="p-3">
                        <div>{b.vehicleName}</div>
                        <div className="text-[10px] text-slate-500">{(b.weightKg / 1000).toFixed(1)} T · {b.materialType}</div>
                      </td>
                      <td className="p-3">
                        <div className="font-semibold text-slate-200">{b.driverName || 'Pending'}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{b.vehicleNumber}</div>
                      </td>
                      <td className="p-3 text-right font-mono font-bold text-emerald-400">
                        ₹{b.totalFare.toLocaleString()}
                      </td>
                      <td className="p-3 text-center">
                        <select
                          value={b.status}
                          onChange={(e) => updateBookingStatus(b.id, e.target.value as Booking['status'])}
                          className="bg-slate-900 border border-slate-700 text-slate-200 rounded-lg p-1 text-xs focus:outline-none focus:border-emerald-500 font-mono"
                        >
                          <option value="pending">Pending</option>
                          <option value="assigned">Assigned</option>
                          <option value="in_transit">In Transit</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* TAB: DRIVER FLEET */}
        {activeTab === 'drivers' && (
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white">Transporter & Fleet Partner Registry</h3>
              <span className="text-xs text-slate-400 font-mono">{drivers.length} Registered Drivers</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {drivers.map((d) => (
                <div key={d.id} className="bg-slate-900 rounded-xl p-4 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img src={d.photo} alt={d.name} className="w-10 h-10 rounded-full object-cover border border-emerald-600" />
                      <div>
                        <div className="font-bold text-white text-xs">{d.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{d.phone}</div>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                      d.status === 'verified' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-orange-950 text-orange-400 border border-orange-800'
                    }`}>
                      {d.status}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs text-slate-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Vehicle:</span>
                      <span className="font-mono text-white">{d.vehicleNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Type:</span>
                      <span>{d.vehicleType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Trips / Rating:</span>
                      <span>{d.totalTrips} Trips · ★ {d.rating}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Current Base:</span>
                      <span>{d.currentLocation}</span>
                    </div>
                  </div>

                  {d.status === 'pending' ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => approveDriver(d.id)}
                        className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-bold"
                      >
                        Approve KYC
                      </button>
                      <button
                        onClick={() => rejectDriver(d.id)}
                        className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded text-xs"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <div className="text-[11px] text-emerald-400 flex items-center justify-between">
                      <span>✓ All KYC Verified</span>
                      <span className="font-mono">{d.isOnline ? 'Online' : 'Offline'}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: VEHICLES AVAILABILITY */}
        {activeTab === 'vehicles' && (
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 space-y-4">
            <h3 className="text-sm font-bold text-white">Commercial Vehicle Fleet Specifications</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {VEHICLE_CATEGORIES.map(v => (
                <div key={v.id} className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs">{v.name}</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded">
                      ₹{v.baseFare} Base + ₹{v.perKmRate}/KM
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">{v.description}</p>
                  <div className="flex items-center justify-between text-xs text-slate-300 pt-1 border-t border-slate-800">
                    <span>Capacity: <strong>{v.capacityText}</strong></span>
                    <span className="font-mono text-slate-400">{v.dimensions}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: PAYMENTS */}
        {activeTab === 'payments' && (
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white">Platform Commission & Transporter Settlement Ledger</h3>
              <span className="text-xs text-emerald-400 font-mono font-bold">Commission Model: 8% Flat</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-slate-900 rounded-xl">
                  <span className="text-slate-400 block text-[11px]">Gross Dispatch GMV</span>
                  <span className="text-xl font-bold font-mono text-white">₹84,62,900</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl">
                  <span className="text-slate-400 block text-[11px]">Platform Commission (8%)</span>
                  <span className="text-xl font-bold font-mono text-emerald-400">₹6,77,032</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl">
                  <span className="text-slate-400 block text-[11px]">Transporter Direct Payouts</span>
                  <span className="text-xl font-bold font-mono text-white">₹77,85,868</span>
                </div>
              </div>

              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-white">Razorpay Settlement Gateway Status</div>
                <p className="text-slate-400 text-[11px]">
                  Daily T+1 automatic NEFT bank payouts configured to all verified driver bank accounts. 0 pending reconciliations.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB: COMPLAINTS */}
        {activeTab === 'complaints' && (
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 space-y-4">
            <h3 className="text-sm font-bold text-white">Customer Support & Dispatch Grievance Tickets</h3>
            
            <div className="space-y-3">
              {complaints.map(t => (
                <div key={t.id} className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold font-mono text-white">{t.id}</span>
                      <span className="text-slate-300 font-semibold">{t.customer}</span>
                      <span className="text-[10px] text-orange-400 bg-orange-950 px-1.5 py-0.5 rounded font-mono">
                        {t.priority}
                      </span>
                    </div>
                    <p className="text-slate-400 mt-1">{t.issue}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-emerald-400 font-bold block">{t.status}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{t.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 space-y-4 max-w-xl text-xs">
            <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3">Platform System Settings</h3>
            
            <div className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Company Contact Helpline</label>
                <input
                  type="text"
                  defaultValue="+91 9461695205 (Vikas Yogi)"
                  className="w-full p-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">GST Tax Rate (Goods Transport Agency)</label>
                <input
                  type="text"
                  defaultValue="5.0% GTA Concessional"
                  className="w-full p-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Platform Commission Rate</label>
                <input
                  type="text"
                  defaultValue="8.0%"
                  className="w-full p-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                />
              </div>

              <button
                onClick={() => showToast('Platform settings updated successfully')}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg cursor-pointer"
              >
                Save Settings
              </button>
            </div>
          </div>
        )}

      </main>

    </div>
  );
};
