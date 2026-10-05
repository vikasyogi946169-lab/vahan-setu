import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Truck, Award, Users, HeartHandshake, MapPin, Phone } from 'lucide-react';
import { HERO_IMAGE } from '../../data/mockData';

export const AboutPage: React.FC = () => {
  const { language, contactInfo, setActiveView } = useApp();

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-widest">
            <span>ABOUT VAHAN SETU</span>
            <span aria-hidden="true">·</span>
            <span>भारत का डिजिटल ट्रांसपोर्ट मिशन</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            {language === 'hi'
              ? 'भारत के ट्रांसपोर्ट और लॉजिस्टिक्स का आधुनिक डिजिटल सेतु'
              : "Bridging India's Freight Infrastructure with Technology & Trust"}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {language === 'hi'
              ? 'वाहन सेतु की स्थापना भारतीय व्यापारियों, विनिर्माताओं और ट्रक ड्राइवरों को पारदर्शी दरों और सुरक्षित जीपीएस तकनीक से जोड़ने के लिए की गई है।'
              : 'Founded by Vikas Yogi, Vahan Setu unites shippers and commercial fleet drivers under a single high-efficiency tech ecosystem governed by our three guiding pillars: Seva (Service), Bharosa (Trust), and Suraksha (Safety).'}
          </p>
        </div>

        {/* Founder & Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">सेवा (Service First)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              24x7 committed on-road dispatch support with guaranteed 30-minute truck placement across major logistics corridors.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-800 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">भरोसा (Transparent Trust)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Standardized distance-based rates, zero hidden broker commissions, and daily automated bank settlements for transporters.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">सुरक्षा (Complete Safety)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              100% verified commercial drivers with DL, RC, insurance verification, and satellite AIS-140 GPS real-time route tracing.
            </p>
          </div>
        </div>

        {/* Operational Excellence */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">
                Empowering India's Highway Backbone
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Indian transport moves millions of tons of goods every hour. Historically, small fleet operators and shippers suffered from opaque brokerage, unpredictable empty return trips, and a lack of live transit tracking.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Vahan Setu replaces the middlemen with a verified digital bridge: customers get transparent truck prices and instant tracking, while drivers get guaranteed rides and fast payments directly to their bank accounts.
              </p>

              <div className="pt-2 flex items-center gap-4 text-xs font-semibold">
                <button
                  onClick={() => setActiveView('book')}
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl cursor-pointer"
                >
                  Book a Truck
                </button>
                <button
                  onClick={() => setActiveView('driver-app')}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl cursor-pointer"
                >
                  Attach Truck
                </button>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-md">
              <img
                src={HERO_IMAGE}
                alt="Vahan Setu Express Transport"
                className="w-full h-72 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-3 left-3 bg-slate-900/90 text-white text-xs px-3 py-1.5 rounded-lg">
                Vikas Yogi · Central Operations Head (+91 {contactInfo.phone})
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
