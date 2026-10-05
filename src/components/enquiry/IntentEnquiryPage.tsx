import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Truck, 
  Package, 
  Navigation, 
  Phone, 
  MessageSquare, 
  MapPin, 
  Building, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  RotateCcw, 
  Search, 
  IndianRupee, 
  Clock, 
  Sparkles, 
  HelpCircle,
  Mail 
} from 'lucide-react';
import { MAJOR_INDIAN_CITIES, VEHICLE_CATEGORIES, MATERIAL_TYPES, DRIVER_AVATAR_IMAGE } from '../../data/mockData';

type UserIntent = 
  | 'none'
  | 'book_truck'
  | 'attach_driver'
  | 'track_shipment'
  | 'corporate_direct';

export const IntentEnquiryPage: React.FC = () => {
  const { 
    language, 
    contactInfo, 
    setActiveView, 
    showToast, 
    bookings,
    setSelectedBookingForTrack,
    createBooking 
  } = useApp();

  const [selectedIntent, setSelectedIntent] = useState<UserIntent>('none');

  // Purpose 1: Book Truck State
  const [pickupCity, setPickupCity] = useState('Jaipur');
  const [dropCity, setDropCity] = useState('Delhi NCR');
  const [material, setMaterial] = useState('Industrial Machinery & Spare Parts');
  const [weightTons, setWeightTons] = useState('3.5');
  const [vehicleId, setVehicleId] = useState('eicher-truck');

  // Purpose 2: Attach Driver State
  const [driverName, setDriverName] = useState('');
  const [driverPhone, setDriverPhone] = useState('');
  const [driverVehicleNo, setDriverVehicleNo] = useState('');
  const [driverVehicleType, setDriverVehicleType] = useState('Tata Ace (Chota Hathi)');

  // Purpose 3: Track Shipment State
  const [trackQuery, setTrackQuery] = useState('VS-2026-8941');
  const [foundBooking, setFoundBooking] = useState(bookings[0]);

  // Purpose 4: Corporate / Direct
  const [corpName, setCorpName] = useState('');
  const [corpCompany, setCorpCompany] = useState('');
  const [corpPhone, setCorpPhone] = useState('');
  const [corpRoutes, setCorpRoutes] = useState('Delhi-Mumbai / Jaipur-Delhi Expressway');

  // Calculate live estimate for Intent 1
  const selectedVehicle = VEHICLE_CATEGORIES.find(v => v.id === vehicleId) || VEHICLE_CATEGORIES[0];
  const distance = pickupCity === dropCity ? 35 : 275;
  const estimatedFare = selectedVehicle.baseFare + (distance * selectedVehicle.perKmRate);
  const totalAmount = Math.round(estimatedFare * 1.05);

  const handleBookingEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Namaste Vikas ji, I need a truck quote from Vahan Setu website.\n• Purpose: Book Truck\n• Route: ${pickupCity} to ${dropCity}\n• Material: ${material}\n• Weight: ${weightTons} Tons\n• Truck: ${selectedVehicle.name}\n• Est. Fare: ₹${totalAmount.toLocaleString()}`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/91${contactInfo.whatsapp}?text=${encoded}`, '_blank');
    showToast(language === 'hi' ? 'व्हाट्सएप पर रेट कोटेशन अनुरोध भेजा गया!' : 'Rate enquiry sent to Vikas Yogi on WhatsApp!');
  };

  const handleDriverAttachmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!driverPhone) {
      showToast('Please enter your mobile number');
      return;
    }
    const text = `Namaste Vikas ji, I want to attach my truck to Vahan Setu.\n• Purpose: Driver Partner Attachment\n• Driver Name: ${driverName || 'Transporter'}\n• Mobile: +91 ${driverPhone}\n• Vehicle Plate: ${driverVehicleNo}\n• Vehicle Type: ${driverVehicleType}`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/91${contactInfo.whatsapp}?text=${encoded}`, '_blank');
    showToast(language === 'hi' ? 'गाड़ी अटैचमेंट विवरण विकास योगी जी को प्रेषित हुआ!' : 'Truck attachment details sent to Vikas Yogi on WhatsApp!');
  };

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = bookings.find(b => b.id.toLowerCase().includes(trackQuery.trim().toLowerCase()) || b.customerPhone.includes(trackQuery.trim()));
    if (found) {
      setFoundBooking(found);
      setSelectedBookingForTrack(found);
      showToast(`Tracking details loaded for ${found.id}`);
    } else {
      showToast('Shipment not found. Showing active dispatch #VS-2026-8941.');
    }
  };

  const handleCorporateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Namaste Vikas ji, Enterprise transport requirement from ${corpCompany || corpName}.\n• Mobile: +91 ${corpPhone}\n• Major Corridors: ${corpRoutes}`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/91${contactInfo.whatsapp}?text=${encoded}`, '_blank');
    showToast('Corporate requirement dispatched to Vikas Yogi!');
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Top Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-700" />
            <span>VAHAN SETU INTENT-BASED ENQUIRY GATEWAY</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight text-balance">
            {language === 'hi' 
              ? 'आप वाहन सेतु पर किस उद्देश्य से आए हैं?' 
              : 'What is your purpose of visiting Vahan Setu today?'}
          </h1>

          <p className="text-xs sm:text-sm text-slate-600">
            {language === 'hi'
              ? 'अपना प्राथमिक उद्देश्य चुनें। आपको केवल वही फॉर्म और जानकारी दिखाई देगी जो आपके लिए उपयोगी है।'
              : 'Select your exact purpose below. You will be shown only the specific, useful page tailored to your needs without distraction.'}
          </p>
        </div>

        {/* STEP 1: PURPOSE SELECTION (If not yet chosen) */}
        {selectedIntent === 'none' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Option 1: Book Truck */}
              <div 
                onClick={() => setSelectedIntent('book_truck')}
                className="group bg-white p-6 rounded-3xl border-2 border-slate-200 hover:border-emerald-600 transition-all cursor-pointer shadow-xs hover:shadow-md flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                    <Package className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                    {language === 'hi' ? '1. मुझे माल ढुलाई के लिए गाड़ी चाहिए' : '1. I Want to Book a Transport Vehicle'}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {language === 'hi' 
                      ? 'छोटा हाथी से लेकर 14-चक्का और ट्रेलर तक। तुरंत किराया जानें और गाड़ी बुक करें।'
                      : 'Hire commercial trucks (Tata Ace, Eicher, 10/12 Wheeler, Trailer) with upfront rates and instant driver match.'}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                  <span>{language === 'hi' ? 'बुकिंग फॉर्म खोलें' : 'Open Booking Enquiry'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Option 2: Attach Driver / Transporter */}
              <div 
                onClick={() => setSelectedIntent('attach_driver')}
                className="group bg-white p-6 rounded-3xl border-2 border-slate-200 hover:border-orange-600 transition-all cursor-pointer shadow-xs hover:shadow-md flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-colors">
                    <Truck className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-orange-800 transition-colors">
                    {language === 'hi' ? '2. मैं ड्राइवर हूँ / गाड़ी जोड़ना चाहता हूँ' : '2. Attach Truck / Driver Partner'}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {language === 'hi'
                      ? 'अपनी गाड़ी वाहन सेतु से जोड़ें। बिना किसी कमीशन के नियमित फेरे और दैनिक बैंक भुगतान पाएं।'
                      : 'Attach your commercial vehicle, receive direct high-paying freight trips, and get daily automatic payouts.'}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-orange-600">
                  <span>{language === 'hi' ? 'ड्राइवर फॉर्म खोलें' : 'Open Driver Partner Form'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Option 3: Track Shipment */}
              <div 
                onClick={() => setSelectedIntent('track_shipment')}
                className="group bg-white p-6 rounded-3xl border-2 border-slate-200 hover:border-blue-600 transition-all cursor-pointer shadow-xs hover:shadow-md flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Navigation className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-800 transition-colors">
                    {language === 'hi' ? '3. मुझे मेरी गाड़ी या माल लाइव ट्रैक करना है' : '3. Track an Existing Shipment / Vehicle'}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {language === 'hi'
                      ? 'अपनी बुकिंग आईडी या मोबाइल नंबर से गाड़ी की लाइव जीपीएस लोकेशन और स्पीड देखें।'
                      : 'Check real-time satellite GPS waypoints, highway speed, and estimated time of arrival (ETA).'}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                  <span>{language === 'hi' ? 'लाइव ट्रैकिंग खोलें' : 'Open Live Tracker'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Option 4: Corporate / Direct Vikas Yogi */}
              <div 
                onClick={() => setSelectedIntent('corporate_direct')}
                className="group bg-white p-6 rounded-3xl border-2 border-slate-200 hover:border-emerald-600 transition-all cursor-pointer shadow-xs hover:shadow-md flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center group-hover:bg-emerald-800 group-hover:text-white transition-colors">
                    <Building className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                    {language === 'hi' ? '4. कॉर्पोरेट अनुबंध / विकास योगी जी से सीधी बातचीत' : '4. Corporate Logistics / Direct Founder Call'}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {language === 'hi'
                      ? 'मासिक बिलिंग, समर्पित फ्लीट अनुबंध या मालिक विकास योगी (+91 9461695205) से सीधी बात।'
                      : 'Dedicated fleet contracts, monthly invoicing, or direct consultation with Vikas Yogi.'}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-800">
                  <span>{language === 'hi' ? 'कॉर्पोरेट संपर्क खोलें' : 'Open Direct Hotline'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

            </div>

            <div className="text-center pt-4">
              <span className="text-xs text-slate-400">
                {language === 'hi' ? '24x7 ऑन-रोड सहायता हेल्पलाइन:' : '24x7 Central Helpline:'} <strong>+91 {contactInfo.phone}</strong> (Vikas Yogi)
              </span>
            </div>
          </div>
        )}

        {/* STEP 2: TAILORED PURPOSE VIEW (ONLY THIS RELEVANT VIEW IS DISPLAYED) */}
        {selectedIntent !== 'none' && (
          <div className="space-y-6 animate-in zoom-in-95 duration-200">
            
            {/* Top Switcher Bar to reset or choose another purpose */}
            <div className="flex items-center justify-between bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
              <button
                onClick={() => setSelectedIntent('none')}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-emerald-700" />
                <span>{language === 'hi' ? '← दूसरा उद्देश्य चुनें' : '← Change Purpose / Go Back'}</span>
              </button>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400 hidden sm:inline">Active Mode:</span>
                <span className="font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  {selectedIntent === 'book_truck' && 'Cargo Booking Enquiry'}
                  {selectedIntent === 'attach_driver' && 'Driver Attachment'}
                  {selectedIntent === 'track_shipment' && 'Shipment Tracking'}
                  {selectedIntent === 'corporate_direct' && 'Corporate & Direct Support'}
                </span>
              </div>
            </div>

            {/* VIEW 1: ONLY FOR CARGO BOOKING */}
            {selectedIntent === 'book_truck' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Package className="w-5 h-5 text-emerald-700" />
                    <span>Instant Transport Vehicle Booking & Freight Rate</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Fill in your dispatch route to see instant transparent freight pricing and send request directly to Vikas Yogi.
                  </p>
                </div>

                <form onSubmit={handleBookingEnquirySubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Pickup City *</label>
                      <select
                        value={pickupCity}
                        onChange={(e) => setPickupCity(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-emerald-600"
                      >
                        {MAJOR_INDIAN_CITIES.map(c => <option key={c.name} value={c.name}>{c.name} ({c.state})</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Destination City *</label>
                      <select
                        value={dropCity}
                        onChange={(e) => setDropCity(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-emerald-600"
                      >
                        {MAJOR_INDIAN_CITIES.map(c => <option key={c.name} value={c.name}>{c.name} ({c.state})</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Select Commercial Vehicle *</label>
                      <select
                        value={vehicleId}
                        onChange={(e) => setVehicleId(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-emerald-600"
                      >
                        {VEHICLE_CATEGORIES.map(v => (
                          <option key={v.id} value={v.id}>
                            {v.name} ({v.capacityText})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Cargo Weight (Tons) *</label>
                      <input
                        type="number"
                        value={weightTons}
                        onChange={(e) => setWeightTons(e.target.value)}
                        step="0.1"
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900 focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Material / Goods Description</label>
                    <select
                      value={material}
                      onChange={(e) => setMaterial(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-emerald-600"
                    >
                      {MATERIAL_TYPES.map(m => <option key={m.id} value={m.name}>{m.name}</option>)}
                    </select>
                  </div>

                  {/* Calculated summary card */}
                  <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[11px] text-slate-500 block">Calculated Highway Distance:</span>
                      <div className="font-mono font-bold text-slate-900 text-sm">{distance} KM</div>
                      <div className="text-[10px] text-emerald-800 font-medium">Standardized per-KM Rate + 5% GST Included</div>
                    </div>

                    <div className="sm:text-right">
                      <span className="text-[11px] text-slate-500 block">Estimated Fair Fare:</span>
                      <div className="text-2xl font-bold font-mono text-emerald-800">₹{totalAmount.toLocaleString()}</div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <button
                      type="submit"
                      className="py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Get Instant Quote on WhatsApp</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveView('book')}
                      className="py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Proceed to Full Online Booking</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </form>
              </div>
            )}

            {/* VIEW 2: ONLY FOR DRIVER ATTACHMENT */}
            {selectedIntent === 'attach_driver' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-orange-600" />
                    <span>Attach Your Commercial Truck / Join Driver Fleet</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Connect directly with founder Vikas Yogi to attach 1 to 50+ trucks with zero middleman deductions.
                  </p>
                </div>

                <form onSubmit={handleDriverAttachmentSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Driver / Transporter Name *</label>
                      <input
                        type="text"
                        value={driverName}
                        onChange={(e) => setDriverName(e.target.value)}
                        placeholder="e.g. Ramesh Singh"
                        required
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-600"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Contact Mobile Number *</label>
                      <div className="flex items-center gap-2">
                        <span className="p-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-mono text-slate-600">
                          +91
                        </span>
                        <input
                          type="tel"
                          value={driverPhone}
                          onChange={(e) => setDriverPhone(e.target.value)}
                          placeholder="10 digit mobile"
                          required
                          className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900 focus:outline-none focus:border-orange-600"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Vehicle Plate Number (RC) *</label>
                      <input
                        type="text"
                        value={driverVehicleNo}
                        onChange={(e) => setDriverVehicleNo(e.target.value)}
                        placeholder="e.g. RJ-14-GB-4819"
                        required
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono uppercase text-slate-900 focus:outline-none focus:border-orange-600 font-bold"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Vehicle Category *</label>
                      <select
                        value={driverVehicleType}
                        onChange={(e) => setDriverVehicleType(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-orange-600"
                      >
                        {VEHICLE_CATEGORIES.map(v => <option key={v.id} value={v.name}>{v.name}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-2xl text-xs text-orange-950 space-y-1">
                    <div className="font-bold">Driver Partner Guarantee:</div>
                    <p className="text-[11px] text-slate-600">
                      Daily same-day NEFT settlements directly to your bank account with fast customer matching across all major Indian highways.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <button
                      type="submit"
                      className="py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Send Attachment Request on WhatsApp</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveView('driver-app')}
                      className="py-3 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Complete Online KYC Form</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </form>
              </div>
            )}

            {/* VIEW 3: ONLY FOR SHIPMENT TRACKING */}
            {selectedIntent === 'track_shipment' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Navigation className="w-5 h-5 text-blue-600" />
                    <span>Live Consignment & Highway GPS Lookup</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Enter your Vahan Setu Booking ID or registered phone number to view live highway progress immediately.
                  </p>
                </div>

                <form onSubmit={handleTrackSubmit} className="flex gap-2">
                  <input
                    type="text"
                    value={trackQuery}
                    onChange={(e) => setTrackQuery(e.target.value)}
                    placeholder="Enter Booking ID (e.g. VS-2026-8941)"
                    className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    Track Now
                  </button>
                </form>

                {/* Instant Result Box */}
                {foundBooking && (
                  <div className="p-4 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-3 text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <div>
                        <span className="font-mono text-emerald-400 font-bold text-sm">{foundBooking.id}</span>
                        <span className="text-slate-400 ml-2">({foundBooking.pickupCity} ➔ {foundBooking.dropCity})</span>
                      </div>
                      <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded font-mono uppercase">
                        {foundBooking.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                      <div>Current Location: <strong className="text-white">{foundBooking.currentLocationName || 'NH-48 Kotputli'}</strong></div>
                      <div>Vehicle: <strong className="font-mono text-white">{foundBooking.vehicleNumber}</strong></div>
                      <div>Driver: <strong className="text-white">{foundBooking.driverName}</strong></div>
                      <div>Speed: <strong className="font-mono text-emerald-400">58 km/h</strong></div>
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                      <a
                        href={`tel:${foundBooking.driverPhone || contactInfo.phone}`}
                        className="text-emerald-400 hover:underline flex items-center gap-1 font-semibold text-xs"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call Driver</span>
                      </a>

                      <button
                        onClick={() => {
                          setSelectedBookingForTrack(foundBooking);
                          setActiveView('track');
                        }}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                      >
                        Open Full Live Map →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* VIEW 4: ONLY FOR CORPORATE & DIRECT SUPPORT */}
            {selectedIntent === 'corporate_direct' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Building className="w-5 h-5 text-emerald-800" />
                    <span>Corporate Logistics Contract & Direct Founder Consultation</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Connect directly with Operations Head Vikas Yogi for long-term fleet contracts, monthly billing, or high-volume freight.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Direct Founder Hotline Card */}
                  <div className="bg-emerald-950 text-white p-5 rounded-2xl border border-emerald-900 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-emerald-800 flex items-center justify-center font-bold text-base">
                        VY
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-white">Vikas Yogi</h4>
                        <p className="text-[11px] text-emerald-300">Central Operations Head</p>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs text-emerald-100 pt-2 border-t border-emerald-900">
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-orange-400" />
                        <span className="font-mono font-bold">+91 {contactInfo.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                        <span>WhatsApp: +91 {contactInfo.whatsapp}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{contactInfo.email}</span>
                      </div>
                    </div>

                    <div className="pt-2 flex gap-2">
                      <a
                        href={`tel:${contactInfo.phone}`}
                        className="flex-1 py-2 bg-white text-slate-900 font-bold text-xs rounded-xl text-center hover:bg-slate-100 transition-colors"
                      >
                        Call Directly
                      </a>
                      <a
                        href={contactInfo.whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl text-center hover:bg-emerald-500 transition-colors"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>

                  {/* Corporate Request Form */}
                  <form onSubmit={handleCorporateSubmit} className="space-y-3 text-xs">
                    <div>
                      <label className="font-semibold text-slate-700 block mb-0.5">Company / Entity Name *</label>
                      <input
                        type="text"
                        value={corpCompany}
                        onChange={(e) => setCorpCompany(e.target.value)}
                        placeholder="e.g. Reliance Retail / Tata Steel distributor"
                        required
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700 block mb-0.5">Your Mobile Number *</label>
                      <input
                        type="tel"
                        value={corpPhone}
                        onChange={(e) => setCorpPhone(e.target.value)}
                        placeholder="10 digit mobile"
                        required
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700 block mb-0.5">Frequent Freight Corridors</label>
                      <input
                        type="text"
                        value={corpRoutes}
                        onChange={(e) => setCorpRoutes(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                    >
                      Submit Corporate Enquiry to Vikas Yogi
                    </button>
                  </form>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
