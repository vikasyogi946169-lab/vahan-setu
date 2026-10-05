import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Truck, 
  User, 
  Phone, 
  MessageSquare, 
  Mail, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  Sparkles, 
  Smartphone, 
  Bell, 
  ExternalLink,
  MapPin,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { VEHICLE_CATEGORIES, DRIVER_AVATAR_IMAGE } from '../../data/mockData';
import { OwnerNotificationAlert } from '../../types';

export const LoginPage: React.FC = () => {
  const { 
    language, 
    loginAsCustomer, 
    loginAsDriver, 
    setActiveView, 
    contactInfo, 
    loggedInUser,
    logoutUser,
    recentLoginAlerts
  } = useApp();

  const [activeTab, setActiveTab] = useState<'customer' | 'driver'>('customer');

  // Customer Form
  const [custName, setCustName] = useState('Vikas Yogi');
  const [custPhone, setCustPhone] = useState('9461695205');
  const [custEmail, setCustEmail] = useState('vikasyogi946169@gmail.com');
  const [custOtp, setCustOtp] = useState('9461');
  const [custOtpSent, setCustOtpSent] = useState(false);
  const [postLoginAction, setPostLoginAction] = useState<'book' | 'wallet' | 'track'>('book');

  // Driver Form
  const [drvName, setDrvName] = useState('Rajesh Gurjar');
  const [drvPhone, setDrvPhone] = useState('9461695205');
  const [drvVehicleNo, setDrvVehicleNo] = useState('RJ-14-GB-4819');
  const [drvVehicleType, setDrvVehicleType] = useState('Eicher Truck (17ft)');
  const [drvOtp, setDrvOtp] = useState('9461');
  const [drvOtpSent, setDrvOtpSent] = useState(false);

  // Success Notification Modal State
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [lastDispatchedAlert, setLastDispatchedAlert] = useState<OwnerNotificationAlert | null>(null);

  const handleCustomerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const alert = loginAsCustomer(custName, custPhone, custEmail);
    setLastDispatchedAlert(alert);
    setShowNotificationModal(true);
  };

  const handleDriverLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const alert = loginAsDriver(drvName, drvPhone, drvVehicleNo, drvVehicleType);
    setLastDispatchedAlert(alert);
    setShowNotificationModal(true);
  };

  const handleQuickDemoCustomer = () => {
    setCustName('Vikas Yogi (Yogi Logistics & Trade)');
    setCustPhone('9461695205');
    setCustEmail('vikasyogi946169@gmail.com');
    setCustOtpSent(true);
    setCustOtp('9461');
  };

  const handleQuickDemoDriver = () => {
    setDrvName('Rajesh Gurjar');
    setDrvPhone('9461695205');
    setDrvVehicleNo('RJ-14-GB-4819');
    setDrvVehicleType('Eicher Truck (17ft)');
    setDrvOtpSent(true);
    setDrvOtp('9461');
  };

  const handleContinueAfterAlert = () => {
    setShowNotificationModal(false);
    if (activeTab === 'customer') {
      if (postLoginAction === 'book') setActiveView('book');
      else if (postLoginAction === 'wallet') setActiveView('wallet');
      else setActiveView('track');
    } else {
      setActiveView('driver-app');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openOwnerWhatsAppAlert = (alert: OwnerNotificationAlert) => {
    const encoded = encodeURIComponent(alert.messageText);
    window.open(`https://wa.me/91${alert.ownerPhone}?text=${encoded}`, '_blank');
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Module Title */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
            <Lock className="w-3.5 h-3.5" />
            <span>VAHAN SETU SECURE ACCESS PORTAL</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {language === 'hi' 
              ? 'लॉगिन पोर्टल — ग्राहक एवं ड्राइवर पार्टनर' 
              : 'Login Portal — Customer & Driver Partner'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            {language === 'hi'
              ? 'गाड़ी बुक करने के लिए ग्राहक के रूप में, या ट्रिप प्राप्त करने के लिए ड्राइवर पार्टनर के रूप में लॉगिन करें। लॉगिन होते ही मालिक विकास योगी जी को व्हाट्सएप और ईमेल पर तत्काल सूचना प्रेषित होगी।'
              : 'Sign in as a Customer to book commercial trucks or as a Driver Partner to receive dispatches. Platform Owner Vikas Yogi receives automated WhatsApp and Email notifications on every login.'}
          </p>
        </div>

        {/* If Already Logged In Banner */}
        {loggedInUser && (
          <div className="mb-6 bg-white border border-emerald-300 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-sm">
                {loggedInUser.name.charAt(0)}
              </div>
              <div>
                <div className="text-xs text-slate-500">Currently Logged In:</div>
                <div className="font-bold text-slate-900 text-sm">
                  {loggedInUser.name} ({loggedInUser.role === 'customer' ? 'Customer' : 'Driver Partner'})
                </div>
                <div className="text-[11px] text-slate-500 font-mono">+91 {loggedInUser.phone}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => setActiveView(loggedInUser.role === 'customer' ? 'book' : 'driver-app')}
                className="flex-1 sm:flex-none px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                {loggedInUser.role === 'customer' ? 'Book a Vehicle Now →' : 'Open Driver Dashboard →'}
              </button>
              <button
                onClick={logoutUser}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs rounded-xl transition-colors cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        )}

        {/* Main Card with Tabs */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          
          {/* Top Mode Segmented Switcher */}
          <div className="grid grid-cols-2 bg-slate-100 p-1.5 border-b border-slate-200">
            <button
              onClick={() => setActiveTab('customer')}
              className={`py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'customer'
                  ? 'bg-white text-emerald-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-4 h-4 text-emerald-700" />
              <span>{language === 'hi' ? 'ग्राहक लॉगिन (Customer)' : 'Customer / Shipper Login'}</span>
            </button>

            <button
              onClick={() => setActiveTab('driver')}
              className={`py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'driver'
                  ? 'bg-white text-orange-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Truck className="w-4 h-4 text-orange-600" />
              <span>{language === 'hi' ? 'ड्राइवर पार्टनर लॉगिन (Driver)' : 'Driver Partner Login'}</span>
            </button>
          </div>

          <div className="p-6 sm:p-8">
            
            {/* Real-time Owner Notification Alert Banner */}
            <div className="mb-6 p-3.5 bg-emerald-50/80 border border-emerald-200 rounded-2xl flex items-start gap-3 text-xs">
              <Bell className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold text-emerald-950 block">
                  {language === 'hi' ? 'मालिक सूचना गारंटी (WhatsApp & Email Alert)' : 'Real-time Owner Alert Integration'}
                </span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Upon clicking Login, an immediate real-time alert is dispatched to Platform Owner <strong>Vikas Yogi</strong> via WhatsApp (<strong>+91 {contactInfo.phone}</strong>) and Email (<strong>{contactInfo.email}</strong>) verifying the session.
                </p>
              </div>
            </div>

            {/* TAB 1: CUSTOMER LOGIN */}
            {activeTab === 'customer' && (
              <form onSubmit={handleCustomerLogin} className="space-y-5">
                
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {language === 'hi' ? 'ग्राहक पोर्टल में प्रवेश करें' : 'Sign in to Book & Dispatch Transport'}
                    </h3>
                    <p className="text-xs text-slate-500">Access instant vehicle pricing, live tracking, and digital wallet.</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleQuickDemoCustomer}
                    className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                  >
                    ⚡ Auto-fill Vikas Yogi (Customer)
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      {language === 'hi' ? 'ग्राहक या कंपनी का नाम' : 'Customer / Company Name'} *
                    </label>
                    <input
                      type="text"
                      value={custName}
                      onChange={(e) => setCustName(e.target.value)}
                      placeholder="e.g. Vikas Yogi (Yogi Trade)"
                      required
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      {language === 'hi' ? 'मोबाइल नंबर (Mobile Number)' : '10-Digit Mobile Number'} *
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="p-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-mono text-slate-600">
                        +91
                      </span>
                      <input
                        type="tel"
                        value={custPhone}
                        onChange={(e) => setCustPhone(e.target.value)}
                        placeholder="10 digit mobile"
                        required
                        className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900 focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      {language === 'hi' ? 'ईमेल पता (Email)' : 'Email Address'}
                    </label>
                    <input
                      type="email"
                      value={custEmail}
                      onChange={(e) => setCustEmail(e.target.value)}
                      placeholder="vikasyogi946169@gmail.com"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  {/* OTP */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-semibold text-slate-700">
                        {language === 'hi' ? 'ओटीपी सत्यापन (OTP)' : '4-Digit OTP Verification'} *
                      </label>
                      <span className="text-[10px] text-emerald-700 font-mono">Demo OTP: 9461</span>
                    </div>
                    <input
                      type="text"
                      value={custOtp}
                      onChange={(e) => setCustOtp(e.target.value)}
                      placeholder="9461"
                      maxLength={4}
                      required
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-center tracking-widest text-slate-900 focus:outline-none focus:border-emerald-600 font-bold"
                    />
                  </div>
                </div>

                {/* Where to go next? */}
                <div className="space-y-1.5 pt-1">
                  <label className="text-xs font-semibold text-slate-700 block">
                    {language === 'hi' ? 'लॉगिन के बाद क्या करना चाहते हैं?' : 'Preferred Destination After Login:'}
                  </label>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <label className={`p-2.5 rounded-xl border flex items-center gap-2 cursor-pointer transition-colors ${
                      postLoginAction === 'book' ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold' : 'border-slate-200 bg-slate-50 text-slate-700'
                    }`}>
                      <input
                        type="radio"
                        name="postAction"
                        checked={postLoginAction === 'book'}
                        onChange={() => setPostLoginAction('book')}
                        className="accent-emerald-600"
                      />
                      <span>Book a Truck</span>
                    </label>

                    <label className={`p-2.5 rounded-xl border flex items-center gap-2 cursor-pointer transition-colors ${
                      postLoginAction === 'wallet' ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold' : 'border-slate-200 bg-slate-50 text-slate-700'
                    }`}>
                      <input
                        type="radio"
                        name="postAction"
                        checked={postLoginAction === 'wallet'}
                        onChange={() => setPostLoginAction('wallet')}
                        className="accent-emerald-600"
                      />
                      <span>Wallet & Profile</span>
                    </label>

                    <label className={`p-2.5 rounded-xl border flex items-center gap-2 cursor-pointer transition-colors ${
                      postLoginAction === 'track' ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold' : 'border-slate-200 bg-slate-50 text-slate-700'
                    }`}>
                      <input
                        type="radio"
                        name="postAction"
                        checked={postLoginAction === 'track'}
                        onChange={() => setPostLoginAction('track')}
                        className="accent-emerald-600"
                      />
                      <span>Track Consignment</span>
                    </label>
                  </div>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{language === 'hi' ? 'ग्राहक के रूप में लॉगिन करें (Login as Customer)' : 'Login as Customer & Alert Owner'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </form>
            )}

            {/* TAB 2: DRIVER PARTNER LOGIN */}
            {activeTab === 'driver' && (
              <form onSubmit={handleDriverLogin} className="space-y-5">
                
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {language === 'hi' ? 'ड्राइवर पार्टनर पोर्टल में प्रवेश करें' : 'Driver Partner Dispatch Console'}
                    </h3>
                    <p className="text-xs text-slate-500">Go online, accept commercial ride requests, and view daily earnings.</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleQuickDemoDriver}
                    className="text-[11px] font-semibold text-orange-700 bg-orange-50 hover:bg-orange-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                  >
                    ⚡ Auto-fill Rajesh Gurjar (Eicher Truck)
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Driver Name */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      {language === 'hi' ? 'ड्राइवर का नाम (Driver Name)' : 'Driver Full Name'} *
                    </label>
                    <input
                      type="text"
                      value={drvName}
                      onChange={(e) => setDrvName(e.target.value)}
                      placeholder="e.g. Rajesh Gurjar"
                      required
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-600"
                    />
                  </div>

                  {/* Driver Mobile */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      {language === 'hi' ? 'पंजीकृत मोबाइल नंबर' : 'Registered Mobile Number'} *
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="p-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-mono text-slate-600">
                        +91
                      </span>
                      <input
                        type="tel"
                        value={drvPhone}
                        onChange={(e) => setDrvPhone(e.target.value)}
                        placeholder="10 digit mobile"
                        required
                        className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900 focus:outline-none focus:border-orange-600"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Vehicle Number */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      {language === 'hi' ? 'गाड़ी का नंबर (Vehicle Registration)' : 'Vehicle Number (RC Plate)'} *
                    </label>
                    <input
                      type="text"
                      value={drvVehicleNo}
                      onChange={(e) => setDrvVehicleNo(e.target.value)}
                      placeholder="e.g. RJ-14-GB-4819"
                      required
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono uppercase text-slate-900 focus:outline-none focus:border-orange-600 font-bold"
                    />
                  </div>

                  {/* Vehicle Category */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      {language === 'hi' ? 'वाहन प्रकार (Vehicle Type)' : 'Vehicle Category'} *
                    </label>
                    <select
                      value={drvVehicleType}
                      onChange={(e) => setDrvVehicleType(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-600"
                    >
                      {VEHICLE_CATEGORIES.map(v => (
                        <option key={v.id} value={v.name}>{v.name} ({v.capacityText})</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-slate-700">
                      {language === 'hi' ? 'ड्राइवर ओटीपी सत्यापन' : 'Driver Mobile OTP'} *
                    </label>
                    <span className="text-[10px] text-orange-700 font-mono">Demo OTP: 9461</span>
                  </div>
                  <input
                    type="text"
                    value={drvOtp}
                    onChange={(e) => setDrvOtp(e.target.value)}
                    placeholder="9461"
                    maxLength={4}
                    required
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-center tracking-widest text-slate-900 focus:outline-none focus:border-orange-600 font-bold"
                  />
                </div>

                {/* Driver Login Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Truck className="w-4 h-4" />
                  <span>{language === 'hi' ? 'ड्राइवर पार्टनर के रूप में लॉगिन करें' : 'Login as Driver & Go Online'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </form>
            )}

            {/* Quick Switch to App Simulators or Registration */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
              <div>
                {language === 'hi' ? 'नया ड्राइवर पार्टनर खाता बनाना चाहते हैं?' : "Don't have a verified driver account?"}{' '}
                <button
                  onClick={() => setActiveView('driver-app')}
                  className="text-emerald-700 font-bold hover:underline cursor-pointer"
                >
                  {language === 'hi' ? 'केवाईसी पंजीकरण करें' : 'Submit Driver KYC Registration'}
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveView('customer-app')}
                  className="text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
                >
                  <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Customer App Simulator</span>
                </button>
                <span>·</span>
                <button
                  onClick={() => setActiveView('admin')}
                  className="text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Admin Portal
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* OWNER NOTIFICATION SUCCESS MODAL */}
      {showNotificationModal && lastDispatchedAlert && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">
                    {language === 'hi' ? 'लॉगिन सफल एवं मालिक को सूचना प्रेषित!' : 'Login Successful & Owner Notified!'}
                  </h4>
                  <p className="text-[10px] text-emerald-300 font-mono">
                    Owner Dispatch ID: {lastDispatchedAlert.id}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4 text-xs">
              
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2">
                <div className="flex items-center justify-between font-bold text-emerald-950 text-xs">
                  <span>Logged in as: {lastDispatchedAlert.userName}</span>
                  <span className="text-[10px] bg-emerald-200/80 text-emerald-900 px-2 py-0.5 rounded uppercase font-mono">
                    {lastDispatchedAlert.role}
                  </span>
                </div>
                <div className="text-[11px] text-slate-600">
                  User Mobile: +91 {lastDispatchedAlert.userPhone} · Time: {lastDispatchedAlert.timestamp}
                </div>
              </div>

              {/* Verified Owner Channels Confirmation */}
              <div className="space-y-2.5">
                <span className="text-slate-500 font-semibold block uppercase tracking-wider text-[10px]">
                  Simultaneous Owner Alerts Dispatched:
                </span>

                {/* WhatsApp Dispatch status */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">WhatsApp Alert to Owner Vikas Yogi</div>
                      <div className="text-[10px] text-slate-500 font-mono">+91 {lastDispatchedAlert.ownerPhone}</div>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded font-mono">
                    DISPATCHED
                  </span>
                </div>

                {/* Email Dispatch status */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">Email Notification Sent to Owner</div>
                      <div className="text-[10px] text-slate-500">{lastDispatchedAlert.ownerEmail}</div>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded font-mono">
                    DISPATCHED
                  </span>
                </div>
              </div>

              {/* Message Preview */}
              <div className="bg-slate-900 text-emerald-300 p-3 rounded-xl font-mono text-[10px] space-y-1 overflow-x-auto">
                <div className="text-slate-400 font-bold uppercase text-[9px]">// Dispatched Payload to Owner:</div>
                <div className="whitespace-pre-line text-slate-200">{lastDispatchedAlert.messageText}</div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={handleContinueAfterAlert}
                  className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>
                    {lastDispatchedAlert.role === 'customer' 
                      ? 'Proceed to Book a Vehicle Now' 
                      : 'Proceed to Driver Partner Dashboard'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => openOwnerWhatsAppAlert(lastDispatchedAlert)}
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Open & View WhatsApp Dispatch (+91 {contactInfo.phone})</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
