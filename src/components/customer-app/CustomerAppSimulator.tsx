import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Truck, 
  MapPin, 
  Navigation, 
  Search, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  Calendar, 
  Clock, 
  Scale, 
  Package, 
  CheckCircle2, 
  Wallet, 
  User, 
  HelpCircle, 
  ArrowRight, 
  RefreshCw,
  LogOut,
  IndianRupee,
  Smartphone
} from 'lucide-react';
import { 
  VEHICLE_CATEGORIES, 
  MAJOR_INDIAN_CITIES, 
  MATERIAL_TYPES, 
  TATA_ACE_IMAGE, 
  HERO_IMAGE,
  DRIVER_AVATAR_IMAGE 
} from '../../data/mockData';

type CustomerScreen = 'splash' | 'login' | 'home' | 'booking' | 'confirmation' | 'tracking';

export const CustomerAppSimulator: React.FC = () => {
  const { 
    language, 
    customerProfile, 
    bookings, 
    createBooking, 
    showToast,
    contactInfo 
  } = useApp();

  const [currentScreen, setCurrentScreen] = useState<CustomerScreen>('home');
  const [mobileNumber, setMobileNumber] = useState('9461695205');
  const [otp, setOtp] = useState('9461');
  const [isOtpSent, setIsOtpSent] = useState(false);

  // Booking state within app
  const [appPickupCity, setAppPickupCity] = useState('Jaipur');
  const [appDropCity, setAppDropCity] = useState('Delhi NCR');
  const [appVehicleId, setAppVehicleId] = useState('tata-ace');
  const [appMaterial, setAppMaterial] = useState(MATERIAL_TYPES[0].name);
  const [appWeightKg, setAppWeightKg] = useState(750);
  const [appSpecial, setAppSpecial] = useState('Urgent delivery required');
  const [createdBookingId, setCreatedBookingId] = useState('VS-2026-8941');

  // Tracking state within app
  const [isRefreshingGps, setIsRefreshingGps] = useState(false);
  const [gpsProgress, setGpsProgress] = useState(54);

  const selectedVehicle = VEHICLE_CATEGORIES.find(v => v.id === appVehicleId) || VEHICLE_CATEGORIES[0];
  const distance = 275;
  const estimatedFare = selectedVehicle.baseFare + (distance * selectedVehicle.perKmRate);
  const totalWithTax = Math.round(estimatedFare * 1.05);

  const handleSendOtp = () => {
    if (!mobileNumber || mobileNumber.length < 10) {
      showToast('Please enter a valid 10-digit Indian mobile number');
      return;
    }
    setIsOtpSent(true);
    showToast('OTP sent to ' + mobileNumber + ': [9461]');
  };

  const handleVerifyOtp = () => {
    if (otp === '9461' || otp.length === 4) {
      showToast('Login successful! Welcome to Vahan Setu.');
      setCurrentScreen('home');
    } else {
      showToast('Invalid OTP. Use 9461 for testing.');
    }
  };

  const handleConfirmBookingInApp = () => {
    const newBooking = createBooking({
      pickupCity: appPickupCity,
      pickupAddress: `${appPickupCity} Industrial Transport Yard`,
      dropCity: appDropCity,
      dropAddress: `${appDropCity} Logistics Warehouse`,
      vehicleCategory: appVehicleId,
      vehicleName: selectedVehicle.name,
      materialType: appMaterial,
      weightKg: appWeightKg,
      specialInstructions: appSpecial,
      distanceKm: distance
    });
    setCreatedBookingId(newBooking.id);
    setCurrentScreen('confirmation');
  };

  const handleRefreshAppGps = () => {
    setIsRefreshingGps(true);
    setTimeout(() => {
      setIsRefreshingGps(false);
      setGpsProgress(prev => Math.min(95, prev + 10));
      showToast('Vehicle GPS refreshed on NH-48');
    }, 600);
  };

  return (
    <div className="py-12 bg-slate-100 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Module Title */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-widest mb-1">
            <Smartphone className="w-4 h-4" />
            <span>CUSTOMER MOBILE APPLICATION</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {language === 'hi' ? 'ग्राहक मोबाइल ऐप सिम्युलेटर' : 'Customer Mobile App Experience'}
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            {language === 'hi'
              ? 'स्प्लैश स्क्रीन, ओटीपी लॉगिन, होम स्क्रीन, बुकिंग पिकअप, पुष्टिकरण और लाइव ट्रैकिंग का परीक्षण करें।'
              : 'Test all 6 mobile screens: Splash, Mobile Login/OTP, Customer Home, Pickup Booking, Confirmation & Live GPS Tracking.'}
          </p>
        </div>

        {/* Screen Controller Pills */}
        <div className="flex items-center justify-center gap-1.5 flex-wrap mb-8">
          <button
            onClick={() => setCurrentScreen('splash')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              currentScreen === 'splash' ? 'bg-emerald-800 text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            A. Splash Screen
          </button>
          <button
            onClick={() => setCurrentScreen('login')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              currentScreen === 'login' ? 'bg-emerald-800 text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            B. Login / OTP
          </button>
          <button
            onClick={() => setCurrentScreen('home')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              currentScreen === 'home' ? 'bg-emerald-800 text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            C. Customer Home
          </button>
          <button
            onClick={() => setCurrentScreen('booking')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              currentScreen === 'booking' ? 'bg-emerald-800 text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            D. Booking Pickup
          </button>
          <button
            onClick={() => setCurrentScreen('confirmation')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              currentScreen === 'confirmation' ? 'bg-emerald-800 text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            E. Confirmation
          </button>
          <button
            onClick={() => setCurrentScreen('tracking')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              currentScreen === 'tracking' ? 'bg-emerald-800 text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            F. Live Tracking
          </button>
        </div>

        {/* Mobile Device Frame */}
        <div className="max-w-[390px] mx-auto bg-slate-900 rounded-[44px] p-3.5 shadow-2xl border-4 border-slate-800">
          
          {/* Inner Phone Screen */}
          <div className="bg-slate-50 w-full rounded-[34px] overflow-hidden min-h-[640px] max-h-[720px] flex flex-col justify-between relative shadow-inner">
            
            {/* Phone Top Notch / Status Bar */}
            <div className="bg-slate-900 text-white px-6 py-2 flex items-center justify-between text-[11px] font-mono shrink-0 select-none">
              <span>09:41</span>
              <div className="w-16 h-3.5 bg-black rounded-full mx-auto" />
              <div className="flex items-center gap-1.5 text-[10px]">
                <span>5G</span>
                <span>100%</span>
              </div>
            </div>

            {/* SCREEN A: SPLASH SCREEN */}
            {currentScreen === 'splash' && (
              <div className="flex-1 bg-gradient-to-b from-emerald-950 via-slate-900 to-emerald-950 text-white p-6 flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in duration-300">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-emerald-800 border-2 border-emerald-500/50 flex items-center justify-center shadow-2xl">
                    <Truck className="w-10 h-10 text-orange-400 animate-truck-drive" />
                  </div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400 absolute -bottom-1 -right-1 ring-4 ring-emerald-950" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl font-extrabold tracking-tight font-sans">
                    VAHAN <span className="text-emerald-400">SETU</span>
                  </h3>
                  <p className="text-xs text-orange-400 font-semibold tracking-wide">
                    भारत – ट्रांसपोर्ट का नया सेतु
                  </p>
                  <p className="text-[11px] text-emerald-200">
                    सेवा • भरोसा • सुरक्षा
                  </p>
                </div>

                {/* Animated loading road */}
                <div className="w-48 space-y-2">
                  <div className="h-1.5 bg-emerald-900 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-400 to-orange-400 w-3/4 animate-pulse rounded-full" />
                  </div>
                  <span className="text-[10px] text-slate-400 block font-mono">
                    Connecting to Transport Network...
                  </span>
                </div>

                <button
                  onClick={() => setCurrentScreen('home')}
                  className="mt-4 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-full shadow-lg cursor-pointer"
                >
                  Enter App →
                </button>
              </div>
            )}

            {/* SCREEN B: LOGIN / REGISTER */}
            {currentScreen === 'login' && (
              <div className="flex-1 bg-white p-6 flex flex-col justify-between space-y-4 animate-in fade-in duration-200">
                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-800 flex items-center justify-center text-white">
                      <Truck className="w-4 h-4 text-orange-400" />
                    </div>
                    <span className="text-base font-bold text-slate-900">Vahan Setu</span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Customer Login</h3>
                    <p className="text-xs text-slate-500">Sign in to book trucks and track live consignments</p>
                  </div>

                  {/* Mobile input */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-700 block">Mobile Number</label>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-2 bg-slate-100 border border-slate-200 rounded-lg text-xs font-mono text-slate-700">
                        +91
                      </span>
                      <input
                        type="tel"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        placeholder="10 digit mobile"
                        className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-800 focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                  </div>

                  {/* OTP input if sent */}
                  {isOtpSent && (
                    <div className="space-y-1.5 animate-in fade-in">
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold text-slate-700">Enter 4-Digit OTP</span>
                        <span className="text-[10px] text-emerald-700">Demo OTP: 9461</span>
                      </div>
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="• • • •"
                        maxLength={4}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-center tracking-widest text-sm font-mono font-bold text-slate-900"
                      />
                    </div>
                  )}

                  {!isOtpSent ? (
                    <button
                      onClick={handleSendOtp}
                      className="w-full py-2.5 bg-emerald-700 text-white text-xs font-semibold rounded-xl hover:bg-emerald-800 transition-colors cursor-pointer"
                    >
                      Get OTP
                    </button>
                  ) : (
                    <button
                      onClick={handleVerifyOtp}
                      className="w-full py-2.5 bg-emerald-700 text-white text-xs font-semibold rounded-xl hover:bg-emerald-800 transition-colors cursor-pointer"
                    >
                      Verify & Proceed
                    </button>
                  )}

                  <div className="relative py-2 text-center">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
                    <span className="relative bg-white px-2 text-[10px] text-slate-400">OR</span>
                  </div>

                  <button
                    onClick={() => {
                      showToast('Google Authenticated as vikasyogi946169@gmail.com');
                      setCurrentScreen('home');
                    }}
                    className="w-full py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                    <span>Continue with Google</span>
                  </button>
                </div>

                <div className="text-[10px] text-slate-400 text-center pb-2">
                  By continuing, you agree to Vahan Setu Terms of Transport & Privacy Policy.
                </div>
              </div>
            )}

            {/* SCREEN C: CUSTOMER HOME SCREEN */}
            {currentScreen === 'home' && (
              <div className="flex-1 bg-slate-50 p-4 space-y-3.5 overflow-y-auto max-h-[580px] animate-in fade-in duration-200">
                {/* Header Welcome */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-500 font-medium">
                      {language === 'hi' ? 'नमस्ते 🙏' : 'Welcome back,'}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900">{customerProfile.name}</h3>
                  </div>
                  <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-lg">
                    <Wallet className="w-3.5 h-3.5 text-emerald-700" />
                    <span className="text-[11px] font-mono font-bold text-emerald-800">₹{customerProfile.walletBalance.toLocaleString()}</span>
                  </div>
                </div>

                {/* Promotional banner with truck image */}
                <div className="relative rounded-2xl overflow-hidden shadow-xs border border-emerald-900/40 h-28 bg-emerald-950 text-white flex items-center p-3">
                  <img
                    src={HERO_IMAGE}
                    alt="Truck Promo"
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                    referrerPolicy="no-referrer"
                  />
                  <div className="relative z-10 space-y-1">
                    <span className="text-[9px] bg-orange-500 text-white px-1.5 py-0.5 rounded font-bold uppercase">
                      Interstate Freight
                    </span>
                    <h4 className="text-xs font-bold leading-tight">
                      Flat 10% Off on Jaipur ➔ Delhi Freight
                    </h4>
                    <p className="text-[10px] text-emerald-200">
                      Code: SETUFAST · Valid this week
                    </p>
                  </div>
                </div>

                {/* Search Service / Instant Pickup & Drop */}
                <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1">
                    <Search className="w-3.5 h-3.5 text-emerald-700" />
                    Quick Dispatch Route
                  </span>
                  
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <input
                        type="text"
                        value={appPickupCity}
                        onChange={(e) => setAppPickupCity(e.target.value)}
                        placeholder="Pickup City"
                        className="w-full bg-transparent text-xs text-slate-800 focus:outline-none"
                      />
                    </div>
                    <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <Navigation className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                      <input
                        type="text"
                        value={appDropCity}
                        onChange={(e) => setAppDropCity(e.target.value)}
                        placeholder="Drop City"
                        className="w-full bg-transparent text-xs text-slate-800 focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => setCurrentScreen('booking')}
                    className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Proceed to Book Truck</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                {/* Quick Access Cards */}
                <div>
                  <span className="text-[11px] font-bold text-slate-700 mb-2 block uppercase tracking-wider">
                    Quick Services
                  </span>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <button
                      onClick={() => setCurrentScreen('booking')}
                      className="p-2.5 bg-white rounded-xl border border-slate-200 hover:border-emerald-500 transition-colors shadow-xs flex flex-col items-center gap-1 cursor-pointer"
                    >
                      <Truck className="w-5 h-5 text-emerald-700" />
                      <span className="text-[10px] font-semibold text-slate-800">Book Vehicle</span>
                    </button>
                    <button
                      onClick={() => setCurrentScreen('tracking')}
                      className="p-2.5 bg-white rounded-xl border border-slate-200 hover:border-emerald-500 transition-colors shadow-xs flex flex-col items-center gap-1 cursor-pointer"
                    >
                      <Navigation className="w-5 h-5 text-orange-600" />
                      <span className="text-[10px] font-semibold text-slate-800">Track Vehicle</span>
                    </button>
                    <button
                      onClick={() => {
                        showToast(`Wallet Balance: ₹${customerProfile.walletBalance.toLocaleString()}`);
                      }}
                      className="p-2.5 bg-white rounded-xl border border-slate-200 hover:border-emerald-500 transition-colors shadow-xs flex flex-col items-center gap-1 cursor-pointer"
                    >
                      <Wallet className="w-5 h-5 text-emerald-800" />
                      <span className="text-[10px] font-semibold text-slate-800">My Wallet</span>
                    </button>
                  </div>
                </div>

                {/* Ongoing trip preview banner */}
                <div 
                  onClick={() => setCurrentScreen('tracking')}
                  className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl cursor-pointer hover:bg-emerald-100/70 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-emerald-900">Live Trip: #VS-2026-8941</span>
                    <span className="text-[9px] bg-emerald-700 text-white px-1.5 py-0.5 rounded">In-Transit</span>
                  </div>
                  <div className="text-[11px] text-slate-600 mt-1">Jaipur VKIA ➔ Delhi Okhla (58 km/h)</div>
                  <div className="text-[10px] text-emerald-700 font-semibold mt-1">Tap to track live on map →</div>
                </div>

              </div>
            )}

            {/* SCREEN D: BOOKING PICKUP SCREEN */}
            {currentScreen === 'booking' && (
              <div className="flex-1 bg-white p-4 space-y-3 overflow-y-auto max-h-[580px] animate-in fade-in duration-200 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="font-bold text-slate-900 text-sm">Transport Booking Form</h3>
                  <button onClick={() => setCurrentScreen('home')} className="text-slate-400 text-xs">Cancel</button>
                </div>

                <div className="space-y-2">
                  <label className="font-semibold text-slate-700 block text-[11px]">Select Vehicle</label>
                  <select
                    value={appVehicleId}
                    onChange={(e) => setAppVehicleId(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  >
                    {VEHICLE_CATEGORIES.map(v => (
                      <option key={v.id} value={v.id}>
                        {v.name} ({v.capacityText})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-semibold text-slate-700 block text-[11px]">Pickup City</label>
                    <input
                      type="text"
                      value={appPickupCity}
                      onChange={(e) => setAppPickupCity(e.target.value)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block text-[11px]">Destination</label>
                    <input
                      type="text"
                      value={appDropCity}
                      onChange={(e) => setAppDropCity(e.target.value)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block text-[11px]">Material Type</label>
                  <select
                    value={appMaterial}
                    onChange={(e) => setAppMaterial(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  >
                    {MATERIAL_TYPES.map(m => (
                      <option key={m.id} value={m.name}>{m.name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-semibold text-slate-700 block text-[11px]">Weight (KG)</label>
                    <input
                      type="number"
                      value={appWeightKg}
                      onChange={(e) => setAppWeightKg(Number(e.target.value))}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block text-[11px]">Distance</label>
                    <div className="p-2 bg-slate-100 rounded-lg font-mono font-bold text-slate-800 text-xs">
                      {distance} KM
                    </div>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block text-[11px]">Special Instructions</label>
                  <input
                    type="text"
                    value={appSpecial}
                    onChange={(e) => setAppSpecial(e.target.value)}
                    placeholder="e.g. Tarpaulin cover, handle with care"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>

                <div className="p-2.5 bg-emerald-50 rounded-xl space-y-1">
                  <div className="flex justify-between text-slate-700 text-[11px]">
                    <span>Base + Freight</span>
                    <span className="font-mono">₹{estimatedFare.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-700 text-[11px]">
                    <span>GST (5%)</span>
                    <span className="font-mono">₹{Math.round(estimatedFare * 0.05).toLocaleString()}</span>
                  </div>
                  <div className="pt-1 border-t border-emerald-200 flex justify-between font-bold text-emerald-900 text-xs">
                    <span>Total Fare</span>
                    <span className="font-mono">₹{totalWithTax.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={handleConfirmBookingInApp}
                  className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Confirm Transport Booking
                </button>
              </div>
            )}

            {/* SCREEN E: BOOKING CONFIRMATION */}
            {currentScreen === 'confirmation' && (
              <div className="flex-1 bg-white p-5 flex flex-col justify-between space-y-4 animate-in fade-in duration-200 text-xs">
                <div className="text-center space-y-2 pt-2">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">Booking Confirmed!</h3>
                  <p className="text-[11px] text-slate-500">Your truck has been reserved with verified driver match.</p>
                  <div className="inline-block px-3 py-1 bg-slate-100 font-mono font-bold text-xs text-slate-800 rounded">
                    {createdBookingId}
                  </div>
                </div>

                {/* Driver information */}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center gap-3">
                    <img 
                      src={DRIVER_AVATAR_IMAGE} 
                      alt="Driver" 
                      className="w-10 h-10 rounded-full object-cover border border-emerald-600" 
                    />
                    <div>
                      <div className="font-bold text-slate-900">Rajesh Gurjar</div>
                      <div className="text-[10px] text-emerald-700">★ 4.9 · Verified Partner</div>
                      <div className="font-mono text-[10px] text-slate-700">RJ-14-GB-4819</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200">
                    <a 
                      href={`tel:${contactInfo.phone}`}
                      className="p-1.5 bg-white border border-slate-200 text-center rounded text-[11px] font-semibold flex items-center justify-center gap-1"
                    >
                      <Phone className="w-3 h-3 text-emerald-700" />
                      <span>Call Driver</span>
                    </a>
                    <a 
                      href={contactInfo.whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 bg-emerald-600 text-white text-center rounded text-[11px] font-semibold flex items-center justify-center gap-1"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>

                <div className="space-y-1 text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-lg">
                  <div className="flex justify-between">
                    <span>Route:</span>
                    <span className="font-semibold text-slate-900">{appPickupCity} ➔ {appDropCity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Fare:</span>
                    <span className="font-mono font-bold text-emerald-800">₹{totalWithTax.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={() => setCurrentScreen('tracking')}
                  className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Track My Vehicle Now →
                </button>
              </div>
            )}

            {/* SCREEN F: LIVE VEHICLE TRACKING */}
            {currentScreen === 'tracking' && (
              <div className="flex-1 bg-slate-900 text-white p-4 flex flex-col justify-between space-y-3 animate-in fade-in duration-200 text-xs">
                
                {/* Header */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-400">Tracking: {createdBookingId}</span>
                    <h4 className="text-xs font-bold text-emerald-400">Live GPS Highway Telemetry</h4>
                  </div>
                  <button
                    onClick={handleRefreshAppGps}
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-emerald-400 flex items-center gap-1 text-[10px]"
                  >
                    <RefreshCw className={`w-3 h-3 ${isRefreshingGps ? 'animate-spin' : ''}`} />
                    <span>Refresh</span>
                  </button>
                </div>

                {/* Simulated GPS Navigation View */}
                <div className="relative h-44 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center">
                  {/* Grid lines */}
                  <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:12px_12px] opacity-40" />

                  {/* Highway line */}
                  <div className="absolute w-full h-1 bg-emerald-900/60 top-1/2 -translate-y-1/2" />
                  <div 
                    className="absolute h-1 bg-emerald-400 top-1/2 -translate-y-1/2 transition-all duration-500" 
                    style={{ width: `${gpsProgress}%` }}
                  />

                  {/* Moving truck marker */}
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-500"
                    style={{ left: `${gpsProgress}%` }}
                  >
                    <div className="w-8 h-8 rounded-full bg-emerald-600 border-2 border-white flex items-center justify-center shadow-lg animate-pulse">
                      <Truck className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  <div className="absolute top-2 left-2 bg-slate-900/90 px-2 py-0.5 rounded text-[10px] font-mono text-emerald-400">
                    NH-48 Expressway · 58 km/h
                  </div>

                  <div className="absolute bottom-2 right-2 bg-slate-900/90 px-2 py-0.5 rounded text-[10px] text-slate-300">
                    ETA: 3 hrs 15 mins
                  </div>
                </div>

                {/* Driver information & quick contacts */}
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img 
                        src={DRIVER_AVATAR_IMAGE} 
                        alt="Driver" 
                        className="w-8 h-8 rounded-full object-cover" 
                      />
                      <div>
                        <div className="font-bold text-white text-[11px]">Rajesh Gurjar</div>
                        <div className="text-[10px] font-mono text-emerald-400">RJ-14-GB-4819</div>
                      </div>
                    </div>
                    <span className="text-[10px] bg-emerald-900/80 text-emerald-300 px-1.5 py-0.5 rounded">
                      On The Way
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800">
                    <a
                      href={`tel:${contactInfo.phone}`}
                      className="py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded text-center text-[10px] font-semibold flex items-center justify-center gap-1"
                    >
                      <Phone className="w-3 h-3 text-emerald-400" />
                      <span>Call Driver</span>
                    </a>
                    <a
                      href={contactInfo.whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-center text-[10px] font-semibold flex items-center justify-center gap-1"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => setCurrentScreen('home')}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-xl cursor-pointer"
                >
                  Back to Home
                </button>

              </div>
            )}

            {/* Bottom App Navigation Bar (Standard mobile footer) */}
            <div className="bg-white border-t border-slate-200 px-4 py-2.5 flex items-center justify-around text-slate-500 shrink-0">
              <button
                onClick={() => setCurrentScreen('home')}
                className={`flex flex-col items-center gap-0.5 cursor-pointer ${
                  currentScreen === 'home' ? 'text-emerald-700 font-bold' : 'hover:text-slate-800'
                }`}
              >
                <Truck className="w-4 h-4" />
                <span className="text-[9px]">Home</span>
              </button>
              <button
                onClick={() => setCurrentScreen('booking')}
                className={`flex flex-col items-center gap-0.5 cursor-pointer ${
                  currentScreen === 'booking' ? 'text-emerald-700 font-bold' : 'hover:text-slate-800'
                }`}
              >
                <Package className="w-4 h-4" />
                <span className="text-[9px]">Book</span>
              </button>
              <button
                onClick={() => setCurrentScreen('tracking')}
                className={`flex flex-col items-center gap-0.5 cursor-pointer ${
                  currentScreen === 'tracking' ? 'text-emerald-700 font-bold' : 'hover:text-slate-800'
                }`}
              >
                <Navigation className="w-4 h-4" />
                <span className="text-[9px]">Track</span>
              </button>
              <button
                onClick={() => {
                  showToast('Wallet balance: ₹18,450.00');
                }}
                className="flex flex-col items-center gap-0.5 cursor-pointer hover:text-slate-800"
              >
                <Wallet className="w-4 h-4" />
                <span className="text-[9px]">Wallet</span>
              </button>
              <button
                onClick={() => setCurrentScreen('login')}
                className={`flex flex-col items-center gap-0.5 cursor-pointer ${
                  currentScreen === 'login' ? 'text-emerald-700 font-bold' : 'hover:text-slate-800'
                }`}
              >
                <User className="w-4 h-4" />
                <span className="text-[9px]">Account</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
