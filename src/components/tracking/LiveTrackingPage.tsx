import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { IndiaInteractiveMap } from './IndiaInteractiveMap';
import { 
  Truck, 
  MapPin, 
  Navigation, 
  Phone, 
  MessageSquare, 
  RefreshCw, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Search,
  AlertCircle
} from 'lucide-react';
import { Booking } from '../../types';

export const LiveTrackingPage: React.FC = () => {
  const { 
    language, 
    bookings, 
    selectedBookingForTrack, 
    setSelectedBookingForTrack,
    showToast,
    contactInfo 
  } = useApp();

  const [searchId, setSearchId] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(selectedBookingForTrack?.currentProgressPercent || 54);

  const activeBooking = selectedBookingForTrack || bookings[0];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setCurrentProgress(prev => Math.min(95, prev + 6));
      showToast(language === 'hi' 
        ? 'जीपीएस लोकेशन अपडेट की गई: वाहन वर्तमान में NH-48 पर गतिशील है।' 
        : 'GPS Telemetry refreshed: Vehicle moving smoothly on NH-48.');
    }, 700);
  };

  const handleSearchBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const found = bookings.find(b => b.id.toLowerCase() === searchId.trim().toLowerCase());
    if (found) {
      setSelectedBookingForTrack(found);
      setCurrentProgress(found.currentProgressPercent || 50);
      showToast(language === 'hi' ? `बुकिंग मिली: ${found.id}` : `Booking loaded: ${found.id}`);
    } else {
      showToast(language === 'hi' ? 'बुकिंग आईडी नहीं मिली।' : 'Booking ID not found. Displaying active dispatch.');
    }
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Header & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
              <span>{language === 'hi' ? 'लाइव वाहन ट्रैकिंग' : 'Real-Time Highway Telemetry'}</span>
              <span aria-hidden="true">·</span>
              <span>AIS-140 GPS Connected</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {language === 'hi' ? 'लाइव गाड़ी ट्रैकिंग सिस्टम' : 'Live Vehicle GPS Tracking'}
            </h1>
            <p className="text-xs text-slate-600">
              {language === 'hi' 
                ? 'राष्ट्रीय राजमार्गों पर अपने मालवाहक वाहन की सटीक लाइव लोकेशन, ड्राइवर संपर्क व ईटीए देखें।' 
                : 'Monitor continuous waypoint telemetry, speed, route checkpoints, and direct transporter contact.'}
            </p>
          </div>

          {/* Quick Booking ID Search */}
          <form onSubmit={handleSearchBooking} className="flex items-center gap-2 max-w-sm w-full">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Enter Booking ID (e.g. VS-2026-8941)"
                className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-600"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-xl transition-colors shrink-0 cursor-pointer"
            >
              Track
            </button>
          </form>
        </div>

        {/* Booking Tabs selector if multiple exist */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
          <span className="text-xs font-semibold text-slate-500 shrink-0">Recent Shipments:</span>
          {bookings.map(b => (
            <button
              key={b.id}
              onClick={() => {
                setSelectedBookingForTrack(b);
                setCurrentProgress(b.currentProgressPercent || 50);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all shrink-0 cursor-pointer ${
                activeBooking.id === b.id
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {b.id} · {b.pickupCity} ➔ {b.dropCity}
            </button>
          ))}
        </div>

        {/* Main Grid: Interactive Map + Driver & Dispatch Telemetry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Interactive India Map */}
          <div className="lg:col-span-8 space-y-4">
            <IndiaInteractiveMap
              selectedPickup={activeBooking.pickupCity}
              selectedDrop={activeBooking.dropCity}
              currentProgress={currentProgress}
              truckPlate={activeBooking.vehicleNumber}
              showSearch={false}
            />

            {/* Refresh & Status bar */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                    <span>{activeBooking.currentLocationName || 'NH-48 Kotputli Highway'}</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono">
                      {activeBooking.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Last satellite ping: Just now · Speed: 58 km/h · Heading: North-East
                  </div>
                </div>
              </div>

              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="w-full sm:w-auto px-4 py-2 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-emerald-700 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>{language === 'hi' ? 'लोकेशन रिफ्रेश करें' : 'Refresh GPS Location'}</span>
              </button>
            </div>

            {/* Milestones Transit Timeline */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                {language === 'hi' ? 'मार्ग और चेकपॉइंट प्रोग्रेस' : 'Trip Waypoint Checkpoints & Timeline'}
              </h3>

              <div className="space-y-4 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-200">
                
                {/* Milestone 1 */}
                <div className="relative flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 z-10">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="flex-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">Loading Completed & Dispatched</span>
                      <span className="text-slate-400 font-mono text-[11px]">07:15 AM</span>
                    </div>
                    <p className="text-slate-600 mt-0.5">{activeBooking.pickupAddress} ({activeBooking.pickupCity})</p>
                  </div>
                </div>

                {/* Milestone 2 */}
                <div className="relative flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 z-10">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="flex-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">Crossed Shahpura Toll Plaza</span>
                      <span className="text-slate-400 font-mono text-[11px]">09:30 AM</span>
                    </div>
                    <p className="text-slate-600 mt-0.5">FASTag Toll cleared · Vehicle inspection nominal</p>
                  </div>
                </div>

                {/* Milestone 3 - Current Active */}
                <div className="relative flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0 z-10 animate-pulse">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div className="flex-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-orange-600">On Highway NH-48 (Kotputli Bypass)</span>
                      <span className="text-emerald-700 font-bold text-[11px]">Active Now</span>
                    </div>
                    <p className="text-slate-600 mt-0.5">Distance covered: 148 KM · 127 KM remaining to drop</p>
                  </div>
                </div>

                {/* Milestone 4 - Pending Drop */}
                <div className="relative flex items-start gap-4 opacity-60">
                  <div className="w-7 h-7 rounded-full bg-slate-300 text-slate-600 flex items-center justify-center shrink-0 z-10">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="flex-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-700">Estimated Unloading at {activeBooking.dropCity}</span>
                      <span className="text-slate-500 font-mono text-[11px]">{activeBooking.eta}</span>
                    </div>
                    <p className="text-slate-500 mt-0.5">{activeBooking.dropAddress}</p>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Right Column: Driver Card & Consignment specs */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Driver Profile Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-bold text-slate-900">Assigned Driver Partner</span>
                <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded">
                  VERIFIED
                </span>
              </div>

              <div className="flex items-center gap-3.5">
                <img
                  src="/src/assets/images/driver_avatar_indian_1791041402147.jpg"
                  alt="Driver"
                  className="w-16 h-16 rounded-full object-cover border-2 border-emerald-600 shadow-xs"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{activeBooking.driverName || 'Rajesh Gurjar'}</h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-semibold text-emerald-800">★ {activeBooking.driverRating || 4.9}</span>
                    <span className="text-[11px] text-slate-400">· 420+ successful trips</span>
                  </div>
                  <div className="text-[11px] font-mono font-bold text-slate-800 mt-1">
                    {activeBooking.vehicleNumber || 'RJ-14-GB-4819'}
                  </div>
                </div>
              </div>

              {/* Call & WhatsApp buttons as explicitly requested */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <a
                  href={`tel:${activeBooking.driverPhone || contactInfo.phone}`}
                  className="py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Call Driver</span>
                </a>
                <a
                  href={`https://wa.me/91${activeBooking.driverPhone || contactInfo.whatsapp}?text=Namaste%20Ji,%20I%20am%20tracking%20booking%20${activeBooking.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>

              <div className="text-[11px] text-slate-500 pt-1 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Commercial DL Verified · Background Verified</span>
              </div>
            </div>

            {/* Consignment & Fare Details */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 text-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3">
                Consignment Specification
              </h3>

              <div className="space-y-2.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Booking ID:</span>
                  <span className="font-mono font-bold text-slate-900">{activeBooking.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Material Type:</span>
                  <span className="font-medium text-slate-900 truncate max-w-[160px] text-right">
                    {activeBooking.materialType}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Vehicle Category:</span>
                  <span className="font-medium text-slate-900">{activeBooking.vehicleName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Payload Weight:</span>
                  <span className="font-mono font-semibold text-slate-900">{(activeBooking.weightKg / 1000).toFixed(2)} Tons</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Distance:</span>
                  <span className="font-mono font-semibold text-slate-900">{activeBooking.distanceKm} KM</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-100">
                  <span className="text-slate-700 font-semibold">Total Fare:</span>
                  <span className="font-mono font-bold text-emerald-800 text-sm">
                    ₹{activeBooking.totalFare.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Helpline / Vikas Yogi contact box */}
            <div className="bg-emerald-950 text-white rounded-2xl p-5 border border-emerald-900 space-y-2 text-xs">
              <div className="font-bold flex items-center gap-1.5 text-emerald-300">
                <Phone className="w-3.5 h-3.5" />
                <span>Emergency Highway Support</span>
              </div>
              <p className="text-emerald-100 text-[11px] leading-relaxed">
                Need priority cargo assistance or route detour approval? Contact Vahan Setu Operations head Vikas Yogi:
              </p>
              <div className="pt-1">
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="font-mono font-bold text-sm text-white hover:text-orange-400 transition-colors"
                >
                  +91 {contactInfo.phone}
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
