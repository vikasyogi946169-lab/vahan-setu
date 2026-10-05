import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  MAJOR_INDIAN_CITIES, 
  VEHICLE_CATEGORIES, 
  MATERIAL_TYPES, 
  TATA_ACE_IMAGE, 
  CONTAINER_TRUCK_IMAGE,
  HERO_IMAGE
} from '../../data/mockData';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Truck, 
  Scale, 
  Package, 
  FileText, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Phone, 
  MessageSquare,
  Navigation,
  IndianRupee
} from 'lucide-react';
import { Booking } from '../../types';

export const BookingPage: React.FC = () => {
  const { language, createBooking, customerProfile, setActiveView, setSelectedBookingForTrack } = useApp();

  const [pickupCity, setPickupCity] = useState('Jaipur');
  const [pickupAddress, setPickupAddress] = useState('Plot 45-B, Road 14, Vishwakarma Industrial Area (VKIA)');
  const [pickupPin, setPickupPin] = useState('302013');

  const [dropCity, setDropCity] = useState('Delhi NCR');
  const [dropAddress, setDropAddress] = useState('Phase-II, Okhla Industrial Area');
  const [dropPin, setDropPin] = useState('110020');

  const [pickupDate, setPickupDate] = useState('2026-10-04');
  const [pickupTime, setPickupTime] = useState('10:00 AM');
  const [materialType, setMaterialType] = useState(MATERIAL_TYPES[0].name);
  const [weightKg, setWeightKg] = useState<number>(3500);
  const [vehicleId, setVehicleId] = useState('eicher-truck');
  const [specialInstructions, setSpecialInstructions] = useState('Handle industrial goods with care. Waterproof tarpaulin required.');
  
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Calculate Distance & Pricing
  const calculateDistance = () => {
    if (pickupCity === dropCity) return 35;
    if ((pickupCity === 'Jaipur' && dropCity === 'Delhi NCR') || (pickupCity === 'Delhi NCR' && dropCity === 'Jaipur')) return 275;
    if ((pickupCity === 'Mumbai' && dropCity === 'Pune') || (pickupCity === 'Pune' && dropCity === 'Mumbai')) return 150;
    if ((pickupCity === 'Ahmedabad' && dropCity === 'Surat') || (pickupCity === 'Surat' && dropCity === 'Ahmedabad')) return 260;
    if ((pickupCity === 'Bengaluru' && dropCity === 'Chennai') || (pickupCity === 'Chennai' && dropCity === 'Bengaluru')) return 345;
    return 480;
  };

  const distance = calculateDistance();
  const selectedVehicle = VEHICLE_CATEGORIES.find(v => v.id === vehicleId) || VEHICLE_CATEGORIES[0];
  const estimatedFare = selectedVehicle.baseFare + (distance * selectedVehicle.perKmRate);
  const gstTax = Math.round(estimatedFare * 0.05);
  const totalAmount = estimatedFare + gstTax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const created = createBooking({
      pickupCity,
      pickupAddress,
      pickupPin,
      dropCity,
      dropAddress,
      dropPin,
      pickupDate,
      pickupTime,
      materialType,
      weightKg,
      vehicleCategory: selectedVehicle.id,
      vehicleName: selectedVehicle.name,
      distanceKm: distance,
      specialInstructions,
      customerName: customerProfile.name,
      customerPhone: customerProfile.phone
    });
    setConfirmedBooking(created);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTrackNow = () => {
    if (confirmedBooking) {
      setSelectedBookingForTrack(confirmedBooking);
      setActiveView('track');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // If already booked, show Confirmation Screen (Screen E from specs)
  if (confirmedBooking) {
    return (
      <div className="py-12 bg-slate-50 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8 animate-in zoom-in-95 duration-200">
            
            {/* Header Success Animation */}
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                {language === 'hi' ? 'बुकिंग सफलतापूर्वक दर्ज की गई!' : 'Transport Booking Confirmed!'}
              </h2>
              <p className="text-xs text-slate-500">
                {language === 'hi'
                  ? 'आपकी बुकिंग आईडी जनरेट हो चुकी है और निकटतम सत्यापित ड्राइवर असाइन किया गया है।'
                  : 'Booking created with instant driver assignment and live GPS telemetry.'}
              </p>
              <div className="inline-block px-4 py-1.5 bg-slate-100 rounded-lg text-sm font-mono font-bold text-slate-800">
                Booking ID: {confirmedBooking.id}
              </div>
            </div>

            {/* Driver Match Information */}
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img 
                  src="/src/assets/images/driver_avatar_indian_1791041402147.jpg" 
                  alt="Driver" 
                  className="w-14 h-14 rounded-full object-cover border-2 border-emerald-600"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900">{confirmedBooking.driverName}</h4>
                    <span className="text-[10px] bg-emerald-700 text-white px-2 py-0.5 rounded font-semibold">
                      ★ {confirmedBooking.driverRating}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-mono mt-0.5">
                    Vehicle: {confirmedBooking.vehicleNumber} ({confirmedBooking.vehicleName})
                  </p>
                  <p className="text-[11px] text-emerald-800 font-medium">
                    Verified Driver Partner · 100% Police & DL Verified
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href={`tel:${confirmedBooking.driverPhone}`}
                  className="flex-1 sm:flex-none px-3.5 py-2 bg-white border border-slate-300 hover:border-emerald-600 text-slate-800 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Call Driver</span>
                </a>
                <a
                  href={`https://wa.me/91${confirmedBooking.driverPhone}?text=Namaste%20Ji,%20regarding%20booking%20${confirmedBooking.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-none px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Trip Details Summary */}
            <div className="border border-slate-200 rounded-2xl p-5 space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-slate-100">
                <div className="space-y-1">
                  <span className="text-slate-400 font-medium block">PICKUP POINT</span>
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
                    {confirmedBooking.pickupCity} ({confirmedBooking.pickupPin})
                  </div>
                  <p className="text-slate-600 pl-5">{confirmedBooking.pickupAddress}</p>
                  <p className="text-slate-500 pl-5 text-[11px]">Schedule: {confirmedBooking.pickupDate} at {confirmedBooking.pickupTime}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-400 font-medium block">DESTINATION DROP</span>
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <Navigation className="w-4 h-4 text-orange-600 shrink-0" />
                    {confirmedBooking.dropCity} ({confirmedBooking.dropPin})
                  </div>
                  <p className="text-slate-600 pl-5">{confirmedBooking.dropAddress}</p>
                  <p className="text-slate-500 pl-5 text-[11px]">Est. Distance: {confirmedBooking.distanceKm} KM</p>
                </div>
              </div>

              {/* Cargo & Fare summary */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-2.5 bg-slate-50 rounded-xl">
                  <span className="text-[10px] text-slate-400 block">Cargo Type</span>
                  <span className="font-semibold text-slate-800 text-[11px] truncate block">{confirmedBooking.materialType}</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl">
                  <span className="text-[10px] text-slate-400 block">Declared Weight</span>
                  <span className="font-bold text-slate-800 font-mono">{(confirmedBooking.weightKg / 1000).toFixed(1)} Tons</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl">
                  <span className="text-[10px] text-slate-400 block">Vehicle Chosen</span>
                  <span className="font-semibold text-slate-800 text-[11px] truncate block">{confirmedBooking.vehicleName}</span>
                </div>
                <div className="p-2.5 bg-emerald-50 rounded-xl">
                  <span className="text-[10px] text-emerald-800 block">Total Freight Fare</span>
                  <span className="font-bold text-emerald-800 font-mono text-sm">₹{confirmedBooking.totalFare.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleTrackNow}
                className="flex-1 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Truck className="w-4 h-4" />
                <span>{language === 'hi' ? 'लाइव गाड़ी ट्रैक करें' : 'Track My Vehicle on Live Map'}</span>
              </button>

              <button
                onClick={() => setConfirmedBooking(null)}
                className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl transition-colors cursor-pointer"
              >
                {language === 'hi' ? 'नई बुकिंग करें' : 'Book Another Vehicle'}
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
            <span>{language === 'hi' ? 'ऑनलाइन माल परिवहन बुकिंग' : 'Freight Dispatch Booking'}</span>
            <span aria-hidden="true">·</span>
            <span>All-India Commercial Fleet</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {language === 'hi' ? 'ट्रांसपोर्ट गाड़ी बुक करें' : 'Book Transport Vehicle Online'}
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            {language === 'hi'
              ? 'सटीक वजन, माल का प्रकार और पिकअप-ड्रॉप विवरण दर्ज करें। तुरंत वाहन असाइनमेंट व जीपीएस ट्रैकिंग पाएं।'
              : 'Complete your cargo dispatch request. Select from 10 commercial truck categories with instant fair estimation.'}
          </p>
        </div>

        {/* Booking Form Layout */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Form Details */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Step 1: Pickup & Destination */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                <MapPin className="w-4 h-4 text-emerald-700" />
                <span>1. {language === 'hi' ? 'पिकअप और ड्रॉप विवरण (Locations)' : 'Pickup & Drop Locations'}</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Pickup City */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-700">
                    {language === 'hi' ? 'पिकअप शहर' : 'Pickup City'} *
                  </label>
                  <select
                    value={pickupCity}
                    onChange={(e) => setPickupCity(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-emerald-600"
                    required
                  >
                    {MAJOR_INDIAN_CITIES.map(c => (
                      <option key={c.name} value={c.name}>
                        {c.name} ({c.state}) - {c.pincode}
                      </option>
                    ))}
                  </select>

                  <input
                    type="text"
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                    placeholder="Full pickup street/industrial area address"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-600"
                    required
                  />

                  <input
                    type="text"
                    value={pickupPin}
                    onChange={(e) => setPickupPin(e.target.value)}
                    placeholder="PIN Code (e.g. 302013)"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 font-mono"
                  />
                </div>

                {/* Drop City */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-700">
                    {language === 'hi' ? 'डिलीवरी / ड्रॉप शहर' : 'Drop Destination City'} *
                  </label>
                  <select
                    value={dropCity}
                    onChange={(e) => setDropCity(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-emerald-600"
                    required
                  >
                    {MAJOR_INDIAN_CITIES.map(c => (
                      <option key={c.name} value={c.name}>
                        {c.name} ({c.state}) - {c.pincode}
                      </option>
                    ))}
                  </select>

                  <input
                    type="text"
                    value={dropAddress}
                    onChange={(e) => setDropAddress(e.target.value)}
                    placeholder="Full destination delivery warehouse address"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-600"
                    required
                  />

                  <input
                    type="text"
                    value={dropPin}
                    onChange={(e) => setDropPin(e.target.value)}
                    placeholder="PIN Code (e.g. 110020)"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Schedule & Material Information */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                <Package className="w-4 h-4 text-emerald-700" />
                <span>2. {language === 'hi' ? 'सामग्री और समय निर्धारण (Schedule & Cargo)' : 'Cargo Details & Schedule'}</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {/* Date */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {language === 'hi' ? 'पिकअप तारीख' : 'Pickup Date'} *
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
                      required
                    />
                  </div>
                </div>

                {/* Time */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {language === 'hi' ? 'पिकअप समय' : 'Pickup Time Slot'} *
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <select
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
                    >
                      <option value="08:00 AM">08:00 AM - Morning Early</option>
                      <option value="10:00 AM">10:00 AM - Standard Dispatch</option>
                      <option value="02:00 PM">02:00 PM - Afternoon</option>
                      <option value="06:00 PM">06:00 PM - Evening Loading</option>
                      <option value="10:00 PM">10:00 PM - Night Expressway Trip</option>
                    </select>
                  </div>
                </div>

                {/* Weight */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {language === 'hi' ? 'वजन (KG अथवा टन)' : 'Weight in KG or Tons'} *
                  </label>
                  <div className="relative">
                    <Scale className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="number"
                      value={weightKg}
                      onChange={(e) => setWeightKg(Number(e.target.value))}
                      placeholder="e.g. 3500"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 focus:outline-none focus:border-emerald-600"
                      min={100}
                      max={45000}
                      required
                    />
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    = {(weightKg / 1000).toFixed(2)} Metric Tons
                  </span>
                </div>
              </div>

              {/* Material Type Dropdown */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {language === 'hi' ? 'माल का प्रकार (Material Category)' : 'Material Category'} *
                </label>
                <select
                  value={materialType}
                  onChange={(e) => setMaterialType(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
                >
                  {MATERIAL_TYPES.map(m => (
                    <option key={m.id} value={m.name}>
                      {language === 'hi' ? m.hindiName : m.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Special Instructions */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {language === 'hi' ? 'विशेष निर्देश (Special Instructions)' : 'Special Dispatch Instructions'}
                </label>
                <textarea
                  rows={2}
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="e.g. Loading dock requires hydraulic ramp, delicate consignment..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            {/* Step 3: Vehicle Selection (10 categories) */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-sm font-bold text-slate-900 flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-700" />
                  <span>3. {language === 'hi' ? 'वाहन श्रेणी चुनें (Select Vehicle Category)' : 'Select Vehicle Category'}</span>
                </div>
                <span className="text-xs text-slate-500 font-normal">10 Options Available</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {VEHICLE_CATEGORIES.map((cat) => {
                  const isSelected = vehicleId === cat.id;
                  const fare = cat.baseFare + (distance * cat.perKmRate);
                  return (
                    <div
                      key={cat.id}
                      onClick={() => setVehicleId(cat.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50/70 shadow-xs ring-1 ring-emerald-600'
                          : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/60'
                      }`}
                    >
                      <input
                        type="radio"
                        name="vehicleCategory"
                        checked={isSelected}
                        onChange={() => setVehicleId(cat.id)}
                        className="mt-1 accent-emerald-600 cursor-pointer"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900 truncate">
                            {language === 'hi' ? cat.hindiName : cat.name}
                          </span>
                          <span className="text-xs font-mono font-bold text-emerald-800 shrink-0">
                            ₹{fare.toLocaleString()}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                          {cat.capacityText} · {cat.dimensions}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-1 line-clamp-1">
                          {language === 'hi' ? cat.popularForHi : cat.popularFor}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Order Summary & Fare Calculation */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm sticky top-24 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                {language === 'hi' ? 'किराया व बिलिंग सारांश' : 'Booking Summary & Fare Breakdown'}
              </h3>

              {/* Route snippet */}
              <div className="p-3 bg-slate-50 rounded-xl space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span>{pickupCity} ➔ {dropCity}</span>
                  <span className="font-mono font-bold text-slate-900">{distance} KM</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Vehicle:</span>
                  <span className="font-semibold text-slate-900 truncate max-w-[140px]">{selectedVehicle.name}</span>
                </div>
              </div>

              {/* Price Calculation details */}
              <div className="space-y-2 text-xs text-slate-600 pt-1">
                <div className="flex justify-between">
                  <span>Base Loading Charge</span>
                  <span className="font-mono text-slate-900">₹{selectedVehicle.baseFare.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Distance Freight ({distance} KM @ ₹{selectedVehicle.perKmRate}/KM)</span>
                  <span className="font-mono text-slate-900">₹{(distance * selectedVehicle.perKmRate).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (5% Goods Transport Agency)</span>
                  <span className="font-mono text-slate-900">₹{gstTax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-emerald-700">
                  <span>On-Road Transit Insurance</span>
                  <span className="font-semibold">FREE Included</span>
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Total Payable</span>
                    <span className="text-[10px] text-slate-400">All Taxes & Tolls Included</span>
                  </div>
                  <span className="text-2xl font-extrabold font-mono text-emerald-800">
                    ₹{totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Confirm Booking Button */}
              <button
                type="submit"
                className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-semibold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{language === 'hi' ? 'बुकिंग की पुष्टि करें (Confirm Booking)' : 'Confirm Transport Booking'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="space-y-2 pt-2 text-[11px] text-slate-500 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>100% Verified Commercial Fleet & Drivers</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>GST Tax Invoice provided for input tax credit</span>
                </div>
              </div>

            </div>

          </div>

        </form>

      </div>
    </div>
  );
};
