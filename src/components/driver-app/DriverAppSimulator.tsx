import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Truck, 
  MapPin, 
  Navigation, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  Upload, 
  IndianRupee, 
  Star, 
  X, 
  Bell, 
  Power,
  RotateCcw,
  Clock,
  UserCheck
} from 'lucide-react';
import { VEHICLE_CATEGORIES, DRIVER_AVATAR_IMAGE } from '../../data/mockData';

type DriverScreen = 'dashboard' | 'registration' | 'request' | 'on_way' | 'trip_complete';

export const DriverAppSimulator: React.FC = () => {
  const { 
    language, 
    currentDriver, 
    toggleDriverOnline, 
    registerDriver, 
    showToast,
    contactInfo 
  } = useApp();

  const [activeDriverScreen, setActiveDriverScreen] = useState<DriverScreen>('dashboard');
  const [hasNewRequest, setHasNewRequest] = useState(true);
  const [tripStarted, setTripStarted] = useState(false);
  const [ratingGiven, setRatingGiven] = useState(5);

  // Registration form state
  const [regName, setRegName] = useState('Dinesh Meena');
  const [regPhone, setRegPhone] = useState('9461695205');
  const [regDlNumber, setRegDlNumber] = useState('RJ-14-2021-0098412');
  const [regVehicleNumber, setRegVehicleNumber] = useState('RJ-14-GB-9912');
  const [regVehicleType, setRegVehicleType] = useState('Tata Ace (Chota Hathi)');
  const [regExperience, setRegExperience] = useState(5);
  const [regLocation, setRegLocation] = useState('Jaipur Transport Hub');
  const [regBank, setRegBank] = useState('State Bank of India (9012)');
  const [regIfsc, setRegIfsc] = useState('SBIN0001245');
  const [regAadhaar, setRegAadhaar] = useState('7812 4410 9901');

  const [uploadedDl, setUploadedDl] = useState(true);
  const [uploadedRc, setUploadedRc] = useState(true);
  const [uploadedInsurance, setUploadedInsurance] = useState(true);
  const [uploadedAadhaar, setUploadedAadhaar] = useState(true);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerDriver({
      name: regName,
      phone: regPhone,
      dlNumber: regDlNumber,
      vehicleNumber: regVehicleNumber,
      vehicleType: regVehicleType,
      experienceYears: regExperience,
      currentLocation: regLocation,
      bankAccount: regBank,
      ifsc: regIfsc,
      aadhaarNumber: regAadhaar
    });
    setActiveDriverScreen('dashboard');
  };

  const handleAcceptRide = () => {
    setHasNewRequest(false);
    setActiveDriverScreen('on_way');
    showToast(language === 'hi' ? 'सवारी स्वीकार की गई! पिकअप बिंदु की ओर नेविगेट करें।' : 'Ride accepted! Navigating to customer pickup location.');
  };

  const handleRejectRide = () => {
    setHasNewRequest(false);
    showToast(language === 'hi' ? 'सवारी अस्वीकार की गई।' : 'Ride request rejected.');
  };

  const handleStartTrip = () => {
    setTripStarted(true);
    showToast(language === 'hi' ? 'यात्रा शुरू हुई! सुरक्षित गति बनाए रखें।' : 'Trip started! Maintain safe highway speed.');
  };

  const handleFinishTrip = () => {
    setActiveDriverScreen('trip_complete');
    showToast(language === 'hi' ? 'यात्रा सफलतापूर्वक पूरी हुई!' : 'Trip completed successfully! Freight fare credited.');
  };

  return (
    <div className="py-12 bg-slate-100 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Module Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-orange-700 uppercase tracking-widest mb-1">
            <Truck className="w-4 h-4" />
            <span>DRIVER PARTNER PORTAL</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {language === 'hi' ? 'ड्राइवर पार्टनर एप्लिकेशन और पोर्टल' : 'Driver Partner Mobile App & Dashboard'}
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            {language === 'hi'
              ? 'केवाईसी पंजीकरण, ऑनलाइन टॉगल, सवारी अनुरोध, जीपीएस नेविगेशन और ट्रिप पूर्ण करने की सुविधा।'
              : 'Complete driver journey: Registration & KYC, online/offline toggle, ride requests, turn-by-turn navigation & instant payouts.'}
          </p>
        </div>

        {/* Screen Controller */}
        <div className="flex items-center justify-center gap-1.5 flex-wrap mb-8">
          <button
            onClick={() => setActiveDriverScreen('dashboard')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeDriverScreen === 'dashboard' ? 'bg-orange-600 text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            B. Driver Dashboard
          </button>
          <button
            onClick={() => {
              setHasNewRequest(true);
              setActiveDriverScreen('request');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeDriverScreen === 'request' ? 'bg-orange-600 text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            C. New Ride Request (Alert)
          </button>
          <button
            onClick={() => setActiveDriverScreen('on_way')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeDriverScreen === 'on_way' ? 'bg-orange-600 text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            D. Driver On The Way
          </button>
          <button
            onClick={() => setActiveDriverScreen('trip_complete')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeDriverScreen === 'trip_complete' ? 'bg-orange-600 text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            E. Trip Complete
          </button>
          <button
            onClick={() => setActiveDriverScreen('registration')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeDriverScreen === 'registration' ? 'bg-orange-600 text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            A. Driver Registration (KYC)
          </button>
        </div>

        {/* Mobile Mockup Device */}
        <div className="max-w-[390px] mx-auto bg-slate-900 rounded-[44px] p-3.5 shadow-2xl border-4 border-slate-800">
          
          <div className="bg-slate-50 w-full rounded-[34px] overflow-hidden min-h-[640px] max-h-[720px] flex flex-col justify-between relative shadow-inner">
            
            {/* Status Bar */}
            <div className="bg-slate-900 text-white px-6 py-2 flex items-center justify-between text-[11px] font-mono shrink-0 select-none">
              <span>10:15</span>
              <div className="w-16 h-3.5 bg-black rounded-full mx-auto" />
              <div className="flex items-center gap-1.5 text-[10px]">
                <span className="text-emerald-400 font-bold">ONLINE</span>
                <span>98%</span>
              </div>
            </div>

            {/* SCREEN B: DRIVER DASHBOARD */}
            {activeDriverScreen === 'dashboard' && (
              <div className="flex-1 bg-slate-50 p-4 space-y-3.5 overflow-y-auto max-h-[580px] animate-in fade-in duration-200 text-xs">
                
                {/* Driver Profile Header */}
                <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={DRIVER_AVATAR_IMAGE}
                      alt="Driver"
                      className="w-12 h-12 rounded-full object-cover border-2 border-emerald-600"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-slate-900 text-sm">{currentDriver.name}</h4>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 rounded">
                          ★ {currentDriver.rating}
                        </span>
                      </div>
                      <p className="text-[11px] font-mono text-slate-500">{currentDriver.vehicleNumber}</p>
                      <p className="text-[10px] text-slate-400">{currentDriver.vehicleType}</p>
                    </div>
                  </div>

                  {/* Online / Offline Toggle Button */}
                  <button
                    onClick={() => toggleDriverOnline(currentDriver.id)}
                    className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      currentDriver.isOnline
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                        : 'bg-slate-100 border-slate-300 text-slate-500'
                    }`}
                  >
                    <Power className={`w-4 h-4 ${currentDriver.isOnline ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <span className="text-[9px] font-bold">
                      {currentDriver.isOnline ? 'ONLINE' : 'OFFLINE'}
                    </span>
                  </button>
                </div>

                {/* Today's Earnings & Trips */}
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
                    <span className="text-[10px] text-slate-400 block uppercase font-medium">Today's Earnings</span>
                    <span className="text-lg font-bold font-mono text-emerald-800">
                      ₹{currentDriver.todayEarnings.toLocaleString()}
                    </span>
                    <span className="text-[9px] text-emerald-600 block mt-0.5">+₹1,200 vs yesterday</span>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
                    <span className="text-[10px] text-slate-400 block uppercase font-medium">Completed Trips</span>
                    <span className="text-lg font-bold font-mono text-slate-900">
                      3 Trips
                    </span>
                    <span className="text-[9px] text-slate-500 block mt-0.5">148 KM driven</span>
                  </div>
                </div>

                {/* Wallet Balance Card */}
                <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white p-3.5 rounded-2xl shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-emerald-200 block">Driver Wallet Balance</span>
                    <span className="text-xl font-bold font-mono text-white">
                      ₹{currentDriver.walletBalance.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-300 block mt-0.5">
                      Auto-transfers daily to SBI ({currentDriver.bankAccount.slice(-4)})
                    </span>
                  </div>
                  <button 
                    onClick={() => showToast('Payout requested! Settling to bank account...')}
                    className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-[10px] rounded-lg cursor-pointer"
                  >
                    Withdraw
                  </button>
                </div>

                {/* New Ride Request Alert Banner */}
                {hasNewRequest && (
                  <div className="bg-orange-50 border border-orange-300 p-3.5 rounded-2xl shadow-xs space-y-2 animate-in zoom-in-95">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-orange-950 text-xs flex items-center gap-1.5">
                        <Bell className="w-3.5 h-3.5 text-orange-600 animate-bounce" />
                        NEW RIDE REQUEST #VS-8941
                      </span>
                      <span className="text-[10px] bg-orange-200 text-orange-900 px-1.5 py-0.5 rounded font-bold font-mono">
                        Expires in 45s
                      </span>
                    </div>

                    <div className="space-y-1 text-[11px] text-slate-700 bg-white p-2.5 rounded-xl border border-orange-100">
                      <div className="flex items-center gap-1 font-semibold text-emerald-800">
                        <MapPin className="w-3 h-3" /> Pickup: Jaipur VKIA Road 14
                      </div>
                      <div className="flex items-center gap-1 font-semibold text-orange-800">
                        <Navigation className="w-3 h-3" /> Drop: Delhi Okhla Phase II (275 KM)
                      </div>
                      <div className="text-[10px] text-slate-500 pt-0.5">
                        Cargo: Textiles & Fabrics · Weight: 5.2 Tons
                      </div>
                    </div>

                    <div className="flex items-baseline justify-between pt-1">
                      <span className="text-slate-600 text-[11px]">Net Driver Fare:</span>
                      <span className="text-base font-bold font-mono text-emerald-800">₹15,050</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={handleAcceptRide}
                        className="py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs cursor-pointer shadow-xs"
                      >
                        Accept Ride
                      </button>
                      <button
                        onClick={handleRejectRide}
                        className="py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-xl text-xs cursor-pointer"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                )}

                {/* Notifications & Highway Advisory */}
                <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Highway Traffic & Toll Advisory
                  </span>
                  <p className="text-[11px] text-slate-700">
                    🟢 NH-48 Jaipur-Delhi Expressway smooth flow at Kotputli. FASTag lanes active.
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Helpline for breakdowns: +91 9461695205 (Vikas Yogi)
                  </p>
                </div>

              </div>
            )}

            {/* SCREEN C: NEW RIDE REQUEST FULL SCREEN MODAL */}
            {activeDriverScreen === 'request' && (
              <div className="flex-1 bg-white p-5 flex flex-col justify-between space-y-4 animate-in fade-in duration-200 text-xs">
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-bold text-slate-900 text-sm">New Consignment Dispatch</span>
                    <span className="text-emerald-700 font-mono font-bold text-xs">₹15,050</span>
                  </div>

                  {/* Route details */}
                  <div className="p-3 bg-slate-50 rounded-xl space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-3 h-3 rounded-full bg-emerald-600 mt-0.5 shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-400 block">PICKUP (2.4 KM away)</span>
                        <div className="font-bold text-slate-900">VKIA Industrial Area, Road 14, Jaipur</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-3 h-3 rounded-full bg-orange-600 mt-0.5 shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-400 block">DESTINATION DROP</span>
                        <div className="font-bold text-slate-900">Okhla Industrial Area Phase-II, New Delhi</div>
                      </div>
                    </div>
                  </div>

                  {/* Cargo specs */}
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="p-2 bg-slate-50 rounded-lg">
                      <span className="text-[10px] text-slate-400 block">Distance</span>
                      <span className="font-mono font-bold text-slate-800">275 KM</span>
                    </div>
                    <div className="p-2 bg-slate-50 rounded-lg">
                      <span className="text-[10px] text-slate-400 block">Material</span>
                      <span className="font-semibold text-slate-800 truncate block">Textiles & Yarn</span>
                    </div>
                  </div>

                  <div className="p-2.5 bg-emerald-50 rounded-xl text-[11px] text-emerald-950 space-y-0.5">
                    <div className="font-semibold">Customer: Yogi Logistics & Trade</div>
                    <div>Payment Mode: Prepaid Vahan Setu Wallet (Guaranteed)</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={handleAcceptRide}
                    className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
                  >
                    Accept Consignment Trip
                  </button>
                  <button
                    onClick={() => setActiveDriverScreen('dashboard')}
                    className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs rounded-xl cursor-pointer"
                  >
                    Pass to Next Driver
                  </button>
                </div>
              </div>
            )}

            {/* SCREEN D: DRIVER ON THE WAY */}
            {activeDriverScreen === 'on_way' && (
              <div className="flex-1 bg-slate-900 text-white p-4 flex flex-col justify-between space-y-3 animate-in fade-in duration-200 text-xs">
                
                {/* Header */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-emerald-400 animate-spin" />
                    <div>
                      <h4 className="font-bold text-white text-xs">Turn-by-Turn GPS Navigation</h4>
                      <p className="text-[10px] text-slate-400">Head North on NH-48 towards Shahjahanpur</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded">
                    58 km/h
                  </span>
                </div>

                {/* Navigation visual map style */}
                <div className="relative h-44 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center">
                  <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:12px_12px] opacity-50" />
                  
                  {/* Road arrow */}
                  <div className="w-16 h-32 border-l-4 border-dashed border-emerald-400/80 -rotate-12" />
                  
                  <div className="absolute top-4 left-4 bg-slate-900/90 p-2 rounded-xl border border-slate-700">
                    <div className="text-[11px] font-bold text-white flex items-center gap-1.5">
                      <span className="text-emerald-400">⬆ 400m</span> In 400m, keep right for Kotputli Flyover
                    </div>
                  </div>

                  <div className="absolute bottom-2 left-2 bg-slate-900/90 px-2 py-1 rounded text-[10px] text-slate-300">
                    Pickup: VKIA Road 14 · Customer waiting
                  </div>
                </div>

                {/* Customer Contact Card */}
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white text-[11px]">Customer: Vikas Yogi</div>
                      <div className="text-[10px] text-slate-400">Yogi Logistics & Trade · Verified</div>
                    </div>
                    <span className="text-[10px] text-emerald-400">₹15,050 Secured</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <a
                      href={`tel:${contactInfo.phone}`}
                      className="py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded text-center text-[10px] font-semibold flex items-center justify-center gap-1"
                    >
                      <Phone className="w-3 h-3 text-emerald-400" />
                      <span>Call Customer</span>
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

                {/* Start or Complete Trip Button */}
                {!tripStarted ? (
                  <button
                    onClick={handleStartTrip}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
                  >
                    Cargo Loaded ➔ Start Trip
                  </button>
                ) : (
                  <button
                    onClick={handleFinishTrip}
                    className="w-full py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
                  >
                    Arrived at Drop ➔ Complete Trip
                  </button>
                )}

              </div>
            )}

            {/* SCREEN E: TRIP COMPLETE */}
            {activeDriverScreen === 'trip_complete' && (
              <div className="flex-1 bg-white p-5 flex flex-col justify-between space-y-4 animate-in fade-in duration-200 text-xs">
                <div className="text-center space-y-2 pt-2">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">Trip Completed!</h3>
                  <p className="text-[11px] text-slate-500">Unloading verified by receiver. Payment credited.</p>
                </div>

                {/* Total Fare & Payout Card */}
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider">Net Amount Credited</span>
                  <div className="text-2xl font-bold font-mono text-emerald-900">₹15,050.00</div>
                  <span className="text-[10px] text-emerald-700 block font-semibold">Payment Status: Settled</span>
                </div>

                {/* Rating to customer */}
                <div className="text-center space-y-2 p-3 bg-slate-50 rounded-xl">
                  <span className="text-[11px] font-semibold text-slate-700 block">Rate Customer Experience</span>
                  <div className="flex items-center justify-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        onClick={() => setRatingGiven(star)}
                        className={`w-5 h-5 cursor-pointer ${
                          star <= ratingGiven ? 'text-amber-400 fill-amber-400' : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setTripStarted(false);
                    setActiveDriverScreen('dashboard');
                  }}
                  className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Return to Driver Dashboard
                </button>
              </div>
            )}

            {/* SCREEN A: DRIVER REGISTRATION (KYC) */}
            {activeDriverScreen === 'registration' && (
              <form 
                onSubmit={handleRegisterSubmit} 
                className="flex-1 bg-white p-4 space-y-3 overflow-y-auto max-h-[580px] animate-in fade-in duration-200 text-xs"
              >
                <div className="border-b border-slate-100 pb-2">
                  <h3 className="font-bold text-slate-900 text-sm">Driver Partner Registration</h3>
                  <p className="text-[10px] text-slate-500">Attach your commercial vehicle to Vahan Setu network</p>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-0.5">Full Name</label>
                  <input
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    required
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block mb-0.5">Mobile (OTP)</label>
                    <input
                      type="tel"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      required
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block mb-0.5">Experience (Yrs)</label>
                    <input
                      type="number"
                      value={regExperience}
                      onChange={(e) => setRegExperience(Number(e.target.value))}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-0.5">Commercial Vehicle Type</label>
                  <select
                    value={regVehicleType}
                    onChange={(e) => setRegVehicleType(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  >
                    {VEHICLE_CATEGORIES.map(v => (
                      <option key={v.id} value={v.name}>{v.name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block mb-0.5">Driving Licence No.</label>
                    <input
                      type="text"
                      value={regDlNumber}
                      onChange={(e) => setRegDlNumber(e.target.value)}
                      required
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono uppercase"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block mb-0.5">Vehicle RC Number</label>
                    <input
                      type="text"
                      value={regVehicleNumber}
                      onChange={(e) => setRegVehicleNumber(e.target.value)}
                      required
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono uppercase"
                    />
                  </div>
                </div>

                {/* Document Uploads Preview */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-bold text-slate-600 block uppercase">KYC Document Uploads</span>
                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <div className="p-2 border border-emerald-300 bg-emerald-50 rounded-lg flex items-center justify-between">
                      <span>DL Copy.jpg</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <div className="p-2 border border-emerald-300 bg-emerald-50 rounded-lg flex items-center justify-between">
                      <span>RC Book.pdf</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <div className="p-2 border border-emerald-300 bg-emerald-50 rounded-lg flex items-center justify-between">
                      <span>Insurance.pdf</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <div className="p-2 border border-emerald-300 bg-emerald-50 rounded-lg flex items-center justify-between">
                      <span>Aadhaar.pdf</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-0.5">Bank Payout Account</label>
                  <input
                    type="text"
                    value={regBank}
                    onChange={(e) => setRegBank(e.target.value)}
                    placeholder="Account Number & Bank Name"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>

                <div className="p-2 bg-amber-50 border border-amber-200 rounded-lg text-[10px] text-amber-900">
                  All documents undergo verification by Vahan Setu Admin before dispatch activation.
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Submit for Admin Verification
                </button>
              </form>
            )}

            {/* Bottom mini bar */}
            <div className="bg-white border-t border-slate-200 px-4 py-2 flex items-center justify-between text-[11px] text-slate-500 shrink-0">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                Vahan Setu Transporter
              </span>
              <span>Hotline: +91 {contactInfo.phone}</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
