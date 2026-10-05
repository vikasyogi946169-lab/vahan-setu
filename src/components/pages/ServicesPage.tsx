import React from 'react';
import { useApp } from '../../context/AppContext';
import { Truck, Package, ShieldCheck, Clock, Navigation, CheckCircle2, ArrowRight } from 'lucide-react';
import { VEHICLE_CATEGORIES } from '../../data/mockData';

export const ServicesPage: React.FC = () => {
  const { language, setActiveView } = useApp();

  const services = [
    {
      title: 'Full Truckload (FTL) Freight Transport',
      titleHi: 'फुल ट्रकलोड (FTL) माल परिवहन',
      desc: 'Exclusive point-to-point dedicated commercial trucks for inter-city and inter-state heavy cargo with direct nonstop transit.',
      icon: Truck,
      highlight: 'Best for Manufacturing & Industrial Consignments'
    },
    {
      title: 'Intra-City & Local Quick Dispatch',
      titleHi: 'शहरी व स्थानीय त्वरित डिलीवरी',
      desc: 'Tata Ace and Mahindra Bolero pickup trucks for fast local warehouse shifting, retail inventory, and e-commerce distribution.',
      icon: Package,
      highlight: 'Same-day Loading & Rapid Delivery'
    },
    {
      title: 'High-Cube Weatherproof Containers',
      titleHi: 'हाई-क्यूब बंद कंटेनर ट्रक',
      desc: '32ft sealed containerized trucks with digital door seals for high-value electronics, pharmaceuticals, and FMCG merchandise.',
      icon: ShieldCheck,
      highlight: '100% Water & Pilferage Proof'
    },
    {
      title: 'Heavy Project Cargo & Over-Dimensional (ODC)',
      titleHi: 'भारी प्रोजेक्ट व ओडीसी कार्गो',
      desc: '40ft low-bed and multi-axle trailers designed for cranes, industrial transformers, steel coils, and infrastructure hardware.',
      icon: Navigation,
      highlight: 'Up to 45 Tons Capacity'
    },
    {
      title: 'Live Highway AIS-140 GPS Telemetry',
      titleHi: 'लाइव सैटेलाइट जीपीएस ट्रैकिंग',
      desc: 'Continuous real-time satellite tracking with speed alerts, toll booth check-ins, and direct driver calling via WhatsApp.',
      icon: Clock,
      highlight: '24x7 Highway Control Room'
    }
  ];

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-widest">
            <span>COMPREHENSIVE LOGISTICS SOLUTIONS</span>
            <span aria-hidden="true">·</span>
            <span>अखिल भारतीय सेवाएं</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {language === 'hi' ? 'वाहन सेतु संपूर्ण लॉजिस्टिक्स सेवाएं' : 'Vahan Setu Enterprise Freight Solutions'}
          </h1>
          <p className="text-sm text-slate-600">
            Standardized commercial freight services tailored for businesses, SMEs, distributors, and manufacturing enterprises across India.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{language === 'hi' ? s.titleHi : s.title}</h3>
                  <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded mt-1 inline-block">
                    {s.highlight}
                  </span>
                  <p className="text-xs text-slate-600 mt-3 leading-relaxed">{s.desc}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">GST Invoiced</span>
                  <button
                    onClick={() => setActiveView('book')}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Book Service</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
