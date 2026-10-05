import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { VEHICLE_CATEGORIES } from '../../data/mockData';
import { Truck, ArrowRight, CheckCircle2, Gauge, Scale } from 'lucide-react';
import { VehicleCategory } from '../../types';

export const VehicleFleetShowcase: React.FC = () => {
  const { language, setActiveView } = useApp();
  const [activeFilter, setActiveFilter] = useState<'all' | 'light' | 'medium' | 'heavy'>('all');
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleCategory>(VEHICLE_CATEGORIES[0]);

  const filterVehicles = () => {
    if (activeFilter === 'light') {
      return VEHICLE_CATEGORIES.filter(v => ['tata-ace', 'mini-truck', 'pickup-truck'].includes(v.id));
    }
    if (activeFilter === 'medium') {
      return VEHICLE_CATEGORIES.filter(v => ['eicher-truck', '6-wheeler'].includes(v.id));
    }
    if (activeFilter === 'heavy') {
      return VEHICLE_CATEGORIES.filter(v => ['10-wheeler', '12-wheeler', '14-wheeler', 'trailer', 'container-truck'].includes(v.id));
    }
    return VEHICLE_CATEGORIES;
  };

  const handleBookVehicle = (v: VehicleCategory) => {
    setSelectedVehicle(v);
    setActiveView('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const displayedVehicles = filterVehicles();

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">
              <span>{language === 'hi' ? 'फ्लीट श्रेणियां' : 'Fleet Infrastructure'}</span>
              <span aria-hidden="true">·</span>
              <span>10 Commercial Categories</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {language === 'hi'
                ? 'हर प्रकार के माल के लिए उपयुक्त वाहन'
                : 'Engineered for Every Load Size Across India'}
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              {language === 'hi'
                ? 'स्थानीय शहर डिलीवरी से लेकर अंतर्राज्यीय भारी माल परिवहन तक, हमारे पास प्रमाणित कमर्शियल वाहन उपलब्ध हैं।'
                : 'From agile local intra-city carriers to heavy 32ft multi-axles and 40ft low-bed trailers with standardized per-KM rates.'}
            </p>
          </div>

          {/* Segmented Filter Control */}
          <div className="inline-flex p-1 bg-slate-200/80 rounded-xl self-start md:self-auto">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {language === 'hi' ? 'सभी वाहन (10)' : 'All Vehicles (10)'}
            </button>
            <button
              onClick={() => setActiveFilter('light')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeFilter === 'light'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {language === 'hi' ? 'लाइट (छोटा हाथी/पिकअप)' : 'Light (0.75 - 2T)'}
            </button>
            <button
              onClick={() => setActiveFilter('medium')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeFilter === 'medium'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {language === 'hi' ? 'मीडियम (आयशर/6 चक्का)' : 'Medium (5 - 10T)'}
            </button>
            <button
              onClick={() => setActiveFilter('heavy')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeFilter === 'heavy'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {language === 'hi' ? 'हैवी (टॉरस/कंटेनर/ट्रेलर)' : 'Heavy (16 - 40T)'}
            </button>
          </div>
        </div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              {/* Image banner with graceful fallback */}
              <div className="relative h-44 bg-slate-100 overflow-hidden border-b border-slate-100">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback to container styling
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute top-3 right-3 bg-slate-900/85 backdrop-blur-xs text-white text-[11px] font-mono font-semibold px-2.5 py-1 rounded-md">
                  {vehicle.capacityText}
                </div>
                <div className="absolute bottom-3 left-3 bg-emerald-950/80 backdrop-blur-xs text-emerald-300 text-[10px] font-semibold px-2 py-0.5 rounded">
                  {vehicle.dimensions}
                </div>
              </div>

              {/* Card Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {language === 'hi' ? vehicle.hindiName : vehicle.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                    {language === 'hi' ? vehicle.hindiDescription : vehicle.description}
                  </p>

                  <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <Scale className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span className="font-semibold text-slate-900">
                        {language === 'hi' ? 'उपयुक्त सामग्री:' : 'Best suited for:'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 pl-5">
                      {language === 'hi' ? vehicle.popularForHi : vehicle.popularFor}
                    </p>
                  </div>
                </div>

                {/* Pricing & CTA */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-slate-400">
                      {language === 'hi' ? 'बेस रेट / प्रति किमी:' : 'Base / Rate per KM:'}
                    </div>
                    <div className="text-xs font-bold text-slate-900 font-mono">
                      ₹{vehicle.baseFare} + ₹{vehicle.perKmRate}/KM
                    </div>
                  </div>

                  <button
                    onClick={() => handleBookVehicle(vehicle)}
                    className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>{language === 'hi' ? 'बुक करें' : 'Book Truck'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
