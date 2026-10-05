import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MAJOR_INDIAN_CITIES, VEHICLE_CATEGORIES, HERO_IMAGE } from '../../data/mockData';
import { ArrowRight, MapPin, Truck, ShieldCheck, Clock, IndianRupee, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { language, setActiveView } = useApp();
  const [pickupCity, setPickupCity] = useState('Jaipur');
  const [dropCity, setDropCity] = useState('Delhi NCR');
  const [vehicleId, setVehicleId] = useState('tata-ace');

  // Estimate distance and price
  const calculateEstimate = () => {
    const selectedVehicle = VEHICLE_CATEGORIES.find(v => v.id === vehicleId) || VEHICLE_CATEGORIES[0];
    let distance = 275;
    if (pickupCity === dropCity) distance = 35;
    else if ((pickupCity === 'Jaipur' && dropCity === 'Delhi NCR') || (pickupCity === 'Delhi NCR' && dropCity === 'Jaipur')) distance = 275;
    else if ((pickupCity === 'Mumbai' && dropCity === 'Pune') || (pickupCity === 'Pune' && dropCity === 'Mumbai')) distance = 150;
    else if ((pickupCity === 'Ahmedabad' && dropCity === 'Surat') || (pickupCity === 'Surat' && dropCity === 'Ahmedabad')) distance = 260;
    else if ((pickupCity === 'Bengaluru' && dropCity === 'Chennai') || (pickupCity === 'Chennai' && dropCity === 'Bengaluru')) distance = 345;
    else distance = 420;

    const baseFare = selectedVehicle.baseFare;
    const estTotal = baseFare + (distance * selectedVehicle.perKmRate);
    return { distance, estTotal, vehicle: selectedVehicle };
  };

  const estimate = calculateEstimate();

  const handleBookNow = () => {
    setActiveView('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative bg-slate-900 text-white overflow-hidden py-12 md:py-20">
      {/* Background Hero Image with measured scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Modern commercial cargo container truck on Indian expressway"
          className="w-full h-full object-cover object-center brightness-45 contrast-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-slate-900/80 to-slate-950/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Vision & Brand Proposition */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Tagline kicker without forbidden pill borders */}
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest">
              <span>VAHAN SETU LOGISTICS</span>
              <span aria-hidden="true">·</span>
              <span>सेवा • भरोसा • सुरक्षा</span>
            </div>

            {/* Display Headline with balanced wrapping */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white font-sans text-balance">
              {language === 'hi' ? (
                <>
                  भारत, Transport का <span className="text-emerald-400">नया सेतु</span> — भरोसेमंद माल ढुलाई नेटवर्क
                </>
              ) : (
                <>
                  India's Smartest <span className="text-emerald-400">Transport & Freight</span> Booking Platform
                </>
              )}
            </h1>

            {/* Sub-prose */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              {language === 'hi'
                ? 'टाटा ऐस से लेकर 14-चक्का टॉरस और 40-फीट ट्रेलर तक। पारदर्शी किराया, सत्यापित ड्राइवर, 24x7 जीपीएस लाइव ट्रैकिंग और त्वरित डिजिटल बिलिंग।'
                : 'From Tata Ace Chota Hathi to 14-Wheeler multi-axle freight trucks and 40ft trailers. Instant transparent rates, verified drivers, live GPS tracking, and complete transport insurance.'}
            </p>

            {/* Quick Proof Metrics adjacent to claim */}
            <div className="grid grid-cols-3 gap-4 pt-2 border-t border-slate-700/60 max-w-xl">
              <div>
                <div className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">28+</div>
                <div className="text-xs text-slate-400">{language === 'hi' ? 'राज्यों में सेवा' : 'States Covered'}</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono text-orange-400 tabular-nums">15,000+</div>
                <div className="text-xs text-slate-400">{language === 'hi' ? 'सत्यापित गाड़ियां' : 'Verified Fleet'}</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono text-white tabular-nums">98.4%</div>
                <div className="text-xs text-slate-400">{language === 'hi' ? 'समय पर डिलीवरी' : 'On-Time Trips'}</div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleBookNow}
                className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-semibold text-sm rounded-xl shadow-lg hover:shadow-emerald-900/40 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>{language === 'hi' ? 'तुरंत गाड़ी बुक करें' : 'Book a Truck Online'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveView('enquiry')}
                className="px-4 py-3.5 bg-emerald-900/80 hover:bg-emerald-800 border border-emerald-500/50 text-emerald-200 font-semibold text-sm rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>🎯 {language === 'hi' ? 'उद्देश्य अनुसार पूछताछ' : 'What is your purpose today?'}</span>
              </button>

              <button
                onClick={() => setActiveView('login')}
                className="px-4 py-3.5 bg-slate-800/80 hover:bg-slate-700 border border-slate-600 text-slate-200 font-semibold text-sm rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Truck className="w-4 h-4 text-orange-400" />
                <span>{language === 'hi' ? 'लॉगिन' : 'Login'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Instant Rate Estimator Card */}
          <div className="lg:col-span-5">
            <div className="bg-white text-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-200">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                    <IndianRupee className="w-4 h-4 text-emerald-700" />
                    {language === 'hi' ? 'त्वरित किराया कैलकुलेटर' : 'Instant Freight Fare Calculator'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {language === 'hi' ? 'वास्तविक दूरी व वाहन अनुसार पारदर्शी दर' : 'Real-time distance-based fair calculation'}
                  </p>
                </div>
                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                  {language === 'hi' ? 'जीएसटी बिलिंग' : 'Tax Invoice'}
                </span>
              </div>

              <div className="space-y-4 pt-4">
                {/* Pickup City */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {language === 'hi' ? 'पिकअप शहर (Pickup Location)' : 'Pickup City'}
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-emerald-600 absolute left-3 top-2.5" />
                    <select
                      value={pickupCity}
                      onChange={(e) => setPickupCity(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:border-emerald-600"
                    >
                      {MAJOR_INDIAN_CITIES.map(c => (
                        <option key={c.name} value={c.name}>
                          {c.name} ({c.state})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Drop City */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {language === 'hi' ? 'डिलीवरी शहर (Destination)' : 'Destination City'}
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-orange-600 absolute left-3 top-2.5" />
                    <select
                      value={dropCity}
                      onChange={(e) => setDropCity(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:border-emerald-600"
                    >
                      {MAJOR_INDIAN_CITIES.map(c => (
                        <option key={c.name} value={c.name}>
                          {c.name} ({c.state})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Vehicle Type */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {language === 'hi' ? 'वाहन प्रकार (Select Vehicle Category)' : 'Vehicle Type'}
                  </label>
                  <div className="relative">
                    <Truck className="w-4 h-4 text-slate-600 absolute left-3 top-2.5" />
                    <select
                      value={vehicleId}
                      onChange={(e) => setVehicleId(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:border-emerald-600"
                    >
                      {VEHICLE_CATEGORIES.map(v => (
                        <option key={v.id} value={v.id}>
                          {v.name} · {v.capacityText}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Calculated Result Box */}
                <div className="p-3.5 bg-emerald-50/70 border border-emerald-200/80 rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-xs text-emerald-950 font-medium">
                    <span>{language === 'hi' ? 'अनुमानित दूरी:' : 'Estimated Distance:'}</span>
                    <span className="font-mono font-bold">{estimate.distance} KM</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-emerald-950 font-medium">
                    <span>{language === 'hi' ? 'क्षमता व आयाम:' : 'Payload Capacity:'}</span>
                    <span>{estimate.vehicle.capacityText}</span>
                  </div>
                  <div className="pt-2 border-t border-emerald-200 flex items-baseline justify-between">
                    <div>
                      <div className="text-[11px] text-slate-500 font-medium">
                        {language === 'hi' ? 'अनुमानित भाड़ा (किराया):' : 'Estimated Freight Fare:'}
                      </div>
                      <div className="text-xl font-bold font-mono text-emerald-800 tabular-nums">
                        ₹{estimate.estTotal.toLocaleString('en-IN')}*
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500">
                      {language === 'hi' ? '+5% जीएसटी' : '+5% GST applies'}
                    </span>
                  </div>
                </div>

                {/* Confirm Book CTA */}
                <button
                  onClick={handleBookNow}
                  className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-semibold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{language === 'hi' ? 'यह गाड़ी अभी बुक करें' : 'Confirm & Proceed to Booking'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 pt-1">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    {language === 'hi' ? 'जीएसटी इनवॉइस' : 'GST Invoice'}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-orange-600" />
                    {language === 'hi' ? '30 मिनट में असाइन' : '30-Min Placement'}
                  </span>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
