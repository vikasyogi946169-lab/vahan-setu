import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Smartphone, 
  Truck, 
  Wallet, 
  LayoutDashboard, 
  ArrowRight, 
  ShieldCheck, 
  MapPin, 
  CheckCircle2, 
  IndianRupee,
  Navigation,
  FileCheck
} from 'lucide-react';
import { DRIVER_AVATAR_IMAGE, TATA_ACE_IMAGE, CONTAINER_TRUCK_IMAGE } from '../../data/mockData';

export const AppExperienceShowcase: React.FC = () => {
  const { language, setActiveView } = useApp();

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-widest mb-2">
            <span>UNIFIED PLATFORM ECOSYSTEM</span>
            <span aria-hidden="true">·</span>
            <span>भारत का भरोसेमंद ट्रांसपोर्ट नेटवर्क</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight text-balance">
            {language === 'hi' 
              ? 'ग्राहक, ड्राइवर और एडमिन के लिए सम्पूर्ण डिजिटल समाधान'
              : 'Complete End-to-End Suite for Customers, Drivers & Transporters'}
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            {language === 'hi'
              ? 'सटीक जीपीएस ट्रैकिंग, त्वरित दस्तावेज सत्यापन, पारदर्शी डिजिटल वॉलेट और केंद्रीय एडमिन मैनेजमेंट सिस्टम।'
              : 'Explore the 4 key pillars of Vahan Setu: Customer Mobile App, Driver Partner Portal, Customer Profile & Wallet, and Enterprise Admin TMS.'}
          </p>
        </div>

        {/* 4 Pillars Layout corresponding directly to reference image concept */}
        <div className="space-y-12">
          
          {/* 1. Customer Mobile Application */}
          <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md">
                  <Smartphone className="w-4 h-4" />
                  <span>SECTION 1 · CUSTOMER MOBILE APP</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {language === 'hi' ? 'ग्राहक मोबाइल एप्लिकेशन' : 'Customer Mobile Booking App'}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {language === 'hi'
                    ? 'आसानी से पिकअप व ड्रॉप लोकेशन चुनें, 10 श्रेणियों में से उपयुक्त वाहन का चयन करें, दूरी व किराया देखें और रियल-टाइम में गाड़ी ट्रैक करें।'
                    : 'Effortless on-demand goods transport booking with OTP mobile login, upfront fair estimates, verified driver match, and live GPS map tracking.'}
                </p>

                <div className="space-y-2 text-xs text-slate-700 pt-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{language === 'hi' ? 'स्प्लैश स्क्रीन और त्वरित मोबाइल ओटीपी लॉगिन' : 'Animated Splash & Fast Mobile OTP Login'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{language === 'hi' ? '10 प्रकार के कमर्शियल वाहनों का चयन' : '10 Vehicle Categories with Payload Specs'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{language === 'hi' ? 'लाइव गाड़ी लोकेशन व ड्राइवर को सीधा कॉल / व्हाट्सएप' : 'Live Vehicle Location, ETA & Direct WhatsApp/Call Driver'}</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-2">
                  <button
                    onClick={() => setActiveView('login')}
                    className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <span>{language === 'hi' ? 'ग्राहक लॉगिन व बुकिंग' : 'Customer Login & Book Truck'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveView('customer-app')}
                    className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                  >
                    <span>{language === 'hi' ? 'ग्राहक ऐप सिम्युलेटर' : 'App Simulator'}</span>
                  </button>
                </div>
              </div>

              {/* Customer App Visual Mock Cards */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Screen 1: Home Booking */}
                <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
                      <span className="text-[11px] font-bold text-emerald-800">VAHAN SETU</span>
                      <span className="text-[10px] text-slate-400">Jaipur Hub</span>
                    </div>
                    <div className="text-xs font-bold text-slate-900 mb-1">
                      {language === 'hi' ? 'गाड़ी बुक करें' : 'Select Vehicle'}
                    </div>
                    <div className="p-2 bg-slate-50 rounded-lg text-[11px] text-slate-600 space-y-1 mb-3">
                      <div className="flex items-center gap-1 text-emerald-800 font-semibold">
                        <MapPin className="w-3 h-3" /> Jaipur (VKIA)
                      </div>
                      <div className="flex items-center gap-1 text-orange-700 font-semibold">
                        <Navigation className="w-3 h-3" /> Delhi NCR (Okhla)
                      </div>
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Tata Ace · 750 KG · ₹450 Base
                    </div>
                  </div>
                  <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-bold text-emerald-700">₹6,500</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">Booked</span>
                  </div>
                </div>

                {/* Screen 2: Tracking preview */}
                <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
                      <span className="text-[11px] font-bold text-slate-900">Live GPS</span>
                      <span className="text-[10px] text-emerald-600 font-bold">58 km/h</span>
                    </div>
                    <div className="relative h-20 bg-emerald-950/90 rounded-lg overflow-hidden flex items-center justify-center text-white mb-2">
                      <Truck className="w-7 h-7 text-orange-400 animate-truck-drive" />
                      <div className="absolute bottom-1 right-2 text-[9px] text-emerald-300">NH-48 Kotputli</div>
                    </div>
                    <div className="text-[11px] font-semibold text-slate-900">RJ-14-GB-4819</div>
                    <div className="text-[10px] text-slate-500">ETA: 3 hrs 15 mins</div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-100 text-center">
                    <span className="text-[11px] font-semibold text-emerald-700">Call / WhatsApp Driver</span>
                  </div>
                </div>

                {/* Screen 3: Instant Fare Confirmation */}
                <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
                      <span className="text-[11px] font-bold text-emerald-700">#VS-2026-8941</span>
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-mono">Assigned</span>
                    </div>
                    <div className="text-xs font-bold text-slate-900 mb-1">
                      {language === 'hi' ? 'ड्राइवर नियुक्त' : 'Driver Matched'}
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg mb-2">
                      <img 
                        src={DRIVER_AVATAR_IMAGE} 
                        alt="Driver" 
                        className="w-8 h-8 rounded-full object-cover" 
                      />
                      <div>
                        <div className="text-[11px] font-bold text-slate-900">Rajesh Gurjar</div>
                        <div className="text-[10px] text-emerald-700">★ 4.9 · 428 Trips</div>
                      </div>
                    </div>
                    <div className="text-[10px] text-slate-500">Contact: +91 9461695205</div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-100 text-[11px] font-bold text-slate-900 text-right">
                    Paid via Wallet
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* 2. Driver Partner Application */}
          <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left visual representation */}
              <div className="lg:col-span-7 order-2 lg:order-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Driver Portal</span>
                    <span className="text-[11px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                      ● ONLINE
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-center py-2 bg-slate-50 rounded-xl">
                    <div>
                      <div className="text-xs text-slate-500">Today's Earnings</div>
                      <div className="text-base font-bold text-slate-900 font-mono">₹4,850</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500">Completed Trips</div>
                      <div className="text-base font-bold text-slate-900 font-mono">3 Trips</div>
                    </div>
                  </div>
                  <div className="p-2.5 border border-emerald-200 bg-emerald-50/70 rounded-xl text-xs space-y-1">
                    <div className="font-semibold text-emerald-900">🔔 New Booking Request</div>
                    <div className="text-[11px] text-slate-600">Jaipur VKIA ➔ Delhi Okhla (275 KM)</div>
                    <div className="font-bold text-emerald-700">₹15,050 Freight Fare</div>
                    <div className="flex gap-2 pt-1">
                      <span className="flex-1 py-1 bg-emerald-700 text-white rounded text-center text-[10px] font-semibold">Accept</span>
                      <span className="py-1 px-3 bg-slate-200 text-slate-700 rounded text-[10px]">Decline</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">KYC Verification</span>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.5 rounded">
                      VERIFIED
                    </span>
                  </div>
                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center justify-between py-1 border-b border-slate-100">
                      <span>Driving Licence:</span>
                      <span className="font-mono text-slate-900 font-medium">RJ-14-2018...</span>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-slate-100">
                      <span>Vehicle RC:</span>
                      <span className="font-mono text-slate-900 font-medium">RJ-14-GB-4819</span>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-slate-100">
                      <span>Aadhaar Identity:</span>
                      <span className="font-mono text-slate-900 font-medium">•••• 7419</span>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span>Bank Payout:</span>
                      <span className="font-mono text-slate-900 font-medium">SBI Direct NEFT</span>
                    </div>
                  </div>
                  <div className="pt-1 text-[11px] text-slate-500">
                    Same-day payment settlement directly to driver bank account.
                  </div>
                </div>
              </div>

              {/* Right text description */}
              <div className="lg:col-span-5 order-1 lg:order-2 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-orange-700 bg-orange-50 px-3 py-1 rounded-md">
                  <Truck className="w-4 h-4" />
                  <span>SECTION 2 · DRIVER PARTNER APP</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {language === 'hi' ? 'ड्राइवर पार्टनर पोर्टल व पंजीकरण' : 'Driver Partner Dashboard & Onboarding'}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {language === 'hi'
                    ? 'ड्राइवर पंजीकरण, ऑनलाइन/ऑफलाइन टॉगल, नई बुकिंग के अलर्ट, टर्न-बाय-टर्न नेविगेशन और रोजाना की कमाई का पारदर्शी ब्यौरा।'
                    : 'Dedicated driver mobile workflow with ride request dispatch, live GPS route navigation, customer direct calling, and instant daily payout settlements.'}
                </p>

                <div className="space-y-2 text-xs text-slate-700 pt-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{language === 'hi' ? 'ड्राइविंग लाइसेंस, आरसी व आधार का डिजिटल सत्यापन' : 'Complete DL, RC, Insurance & Aadhaar KYC submission'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{language === 'hi' ? 'सवारी स्वीकार / अस्वीकार करने की सुविधा' : 'Ride Request Accept / Reject with fare details'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{language === 'hi' ? 'दैनिक कमाई व ट्रिप इतिहास' : 'Daily earnings tracker with fast bank withdrawals'}</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-2">
                  <button
                    onClick={() => setActiveView('login')}
                    className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <span>{language === 'hi' ? 'ड्राइवर पार्टनर लॉगिन' : 'Driver Partner Login'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveView('driver-app')}
                    className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                  >
                    <span>{language === 'hi' ? 'ड्राइवर पंजीकरण' : 'Driver KYC'}</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* 3. Customer Profile & Wallet */}
          <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md">
                  <Wallet className="w-4 h-4" />
                  <span>SECTION 3 · PROFILE & DIGITAL WALLET</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {language === 'hi' ? 'ग्राहक प्रोफाइल और डिजिटल वॉलेट' : 'Customer Profile & Prepaid Wallet'}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {language === 'hi'
                    ? 'रेज़रपे द्वारा सुरक्षित वॉलेट रीचार्ज, जीएसटी इनवॉइस, पसंदीदा गोदाम पते और पूर्ण ट्रांजैक्शन लेजर।'
                    : 'Manage corporate logistics expenditure, save recurring pickup/drop factory warehouses, reload wallet instantly via Razorpay UPI, and download GST tax receipts.'}
                </p>

                <div className="space-y-2 text-xs text-slate-700 pt-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{language === 'hi' ? 'तत्काल वॉलेट टॉप-अप (UPI, नेटबैंकिंग, कार्ड)' : 'Instant Razorpay top-ups (UPI, Netbanking, Cards)'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{language === 'hi' ? 'जीएसटी इनवॉइस व क्रेडिट/डेबिट ट्रांजैक्शन विवरण' : 'Compliant GST Invoices & automated debit ledgers'}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setActiveView('wallet')}
                    className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <span>{language === 'hi' ? 'वॉलेट और प्रोफाइल खोलें' : 'Open Wallet & Profile'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Wallet Visual Card */}
              <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-xs text-slate-500 font-medium">Available Wallet Balance</span>
                    <div className="text-3xl font-extrabold font-mono text-emerald-800 tabular-nums">
                      ₹18,450.00
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveView('wallet')}
                    className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 transition-colors self-start sm:self-auto cursor-pointer"
                  >
                    + Add Money (Razorpay)
                  </button>
                </div>

                <div className="mt-4 space-y-2.5">
                  <div className="text-xs font-bold text-slate-900">Recent Ledger Activity</div>
                  <div className="flex items-center justify-between text-xs p-2 bg-slate-50 rounded-lg">
                    <div>
                      <div className="font-semibold text-slate-800">Added Money via Razorpay UPI</div>
                      <div className="text-[10px] text-slate-500">02 Oct 2026 · pay_RZP901827419</div>
                    </div>
                    <span className="font-mono font-bold text-emerald-700">+₹25,000.00</span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-2 bg-slate-50 rounded-lg">
                    <div>
                      <div className="font-semibold text-slate-800">Freight Booking #VS-2026-8941</div>
                      <div className="text-[10px] text-slate-500">03 Oct 2026 · Jaipur to Delhi</div>
                    </div>
                    <span className="font-mono font-bold text-slate-700">-₹15,802.50</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* 4. Large Admin Web Dashboard */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950 px-3 py-1 rounded-md border border-emerald-800/60">
                  <LayoutDashboard className="w-4 h-4 text-emerald-400" />
                  <span>SECTION 4 · ADMIN CONTROL ROOM (TMS)</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {language === 'hi' ? 'केंद्रीय एडमिन वेब डैशबोर्ड' : 'Central Admin Management Dashboard'}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {language === 'hi'
                    ? 'संपूर्ण लॉजिस्टिक्स संचालन की निगरानी: नई बुकिंग्स, सत्यापित व लंबित ड्राइवर, वाहनों की उपलब्धता, राजस्व पाई चार्ट और शिकायत निवारण।'
                    : 'The master operational hub for transport managers with real-time KPI metrics, driver KYC approval queues, live vehicle allocation, and revenue analytics.'}
                </p>

                <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                  <div className="p-3 bg-slate-800/90 rounded-xl border border-slate-700">
                    <div className="text-slate-400">Total Bookings</div>
                    <div className="text-xl font-bold font-mono text-emerald-400 tabular-nums">1,482</div>
                  </div>
                  <div className="p-3 bg-slate-800/90 rounded-xl border border-slate-700">
                    <div className="text-slate-400">Active Drivers</div>
                    <div className="text-xl font-bold font-mono text-orange-400 tabular-nums">348</div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setActiveView('admin')}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <span>{language === 'hi' ? 'एडमिन डैशबोर्ड में प्रवेश करें' : 'Launch Master Admin Dashboard'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Admin Dashboard Mock Preview */}
              <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-5 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                    <span className="text-xs font-bold text-white">Vahan Setu TMS Operations Console</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">Live Sync</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 bg-slate-900 rounded-lg">
                    <div className="text-[10px] text-slate-400">Revenue (MTD)</div>
                    <div className="font-bold font-mono text-emerald-400">₹84.6 L</div>
                  </div>
                  <div className="p-2 bg-slate-900 rounded-lg">
                    <div className="text-[10px] text-slate-400">Registered Users</div>
                    <div className="font-bold font-mono text-white">4,820</div>
                  </div>
                  <div className="p-2 bg-slate-900 rounded-lg">
                    <div className="text-[10px] text-slate-400">On-Time Rate</div>
                    <div className="font-bold font-mono text-orange-400">98.4%</div>
                  </div>
                </div>

                {/* Table snapshot */}
                <div className="text-xs border border-slate-800 rounded-xl overflow-hidden">
                  <div className="bg-slate-900 px-3 py-2 text-[11px] font-semibold text-slate-300 flex justify-between">
                    <span>Active Dispatches</span>
                    <span>Status</span>
                  </div>
                  <div className="divide-y divide-slate-800 text-[11px]">
                    <div className="px-3 py-2 flex justify-between items-center bg-slate-950">
                      <div>
                        <span className="font-mono text-emerald-400">#VS-2026-8941</span>
                        <span className="text-slate-400 ml-2">Jaipur ➔ Delhi</span>
                      </div>
                      <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded">In Transit</span>
                    </div>
                    <div className="px-3 py-2 flex justify-between items-center bg-slate-950">
                      <div>
                        <span className="font-mono text-white">#VS-2026-8939</span>
                        <span className="text-slate-400 ml-2">Chandigarh ➔ Delhi</span>
                      </div>
                      <span className="text-[10px] text-orange-400 bg-orange-950/80 px-2 py-0.5 rounded">Assigned</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
