/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { FloatingWhatsApp } from './components/common/FloatingWhatsApp';
import { Toast } from './components/common/Toast';

import { HeroSection } from './components/home/HeroSection';
import { VehicleFleetShowcase } from './components/home/VehicleFleetShowcase';
import { AppExperienceShowcase } from './components/home/AppExperienceShowcase';
import { IndiaInteractiveMap } from './components/tracking/IndiaInteractiveMap';

import { BookingPage } from './components/booking/BookingPage';
import { LiveTrackingPage } from './components/tracking/LiveTrackingPage';
import { CustomerAppSimulator } from './components/customer-app/CustomerAppSimulator';
import { DriverAppSimulator } from './components/driver-app/DriverAppSimulator';
import { CustomerProfileWallet } from './components/wallet/CustomerProfileWallet';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ServicesPage } from './components/pages/ServicesPage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';
import { LoginPage } from './components/auth/LoginPage';
import { IntentEnquiryPage } from './components/enquiry/IntentEnquiryPage';
import { ArrowRight, ShieldCheck, Truck, Clock, IndianRupee } from 'lucide-react';

const AppContent: React.FC = () => {
  const { activeView, language, setActiveView } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-emerald-600 selection:text-white">
      {/* Toast Alert */}
      <Toast />

      {/* Floating WhatsApp Quick Contact Button (available on all public views) */}
      {activeView !== 'admin' && <FloatingWhatsApp />}

      {/* Header with Top Bar Contract (hidden when in full Admin mode) */}
      {activeView !== 'admin' && <Header />}

      {/* Main Content Router */}
      <div className="flex-1">
        {activeView === 'home' && (
          <main>
            <HeroSection />
            <VehicleFleetShowcase />
            <AppExperienceShowcase />

            {/* India Wide Network Live Map Spotlight Section */}
            <section className="py-16 bg-slate-900 text-white border-b border-slate-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-1">
                      <span>PAN-INDIA LOGISTICS GRID</span>
                      <span aria-hidden="true">·</span>
                      <span>28 States & 8 UTs</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {language === 'hi' 
                        ? 'राष्ट्रीय राजमार्ग माल गलियारा लाइव जीपीएस' 
                        : 'Real-Time Highway Logistics Network Across India'}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
                      {language === 'hi'
                        ? 'स्वर्ण चतुर्भुज (Golden Quadrilateral) और राष्ट्रीय एक्सप्रेसवे पर सक्रिय मालवाहक वाहनों की वास्तविक लाइव स्थिति।'
                        : 'Interactive highway grid connecting industrial hubs across North, West, South, and East freight corridors with real-time waypoint data.'}
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveView('track')}
                    className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 self-start md:self-auto cursor-pointer"
                  >
                    <span>{language === 'hi' ? 'पूर्ण लाइव ट्रैकर खोलें' : 'Open Full Highway Tracker'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <IndiaInteractiveMap />
              </div>
            </section>

            {/* Testimonials / Social Proof Section */}
            <section className="py-16 bg-white border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                <div className="text-center max-w-2xl mx-auto">
                  <div className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
                    CUSTOMER REVIEWS & SOCIAL PROOF
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    Trusted by 4,800+ Shippers & Transporters
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                    <div className="flex items-center text-amber-500 text-sm">★★★★★</div>
                    <p className="text-xs text-slate-700 leading-relaxed italic">
                      "Moving textile bales from Jaipur to Delhi Okhla used to require endless phone calls to brokers. With Vahan Setu, our truck was placed in 25 minutes with live GPS and a GST tax invoice."
                    </p>
                    <div className="pt-2 border-t border-slate-200">
                      <div className="font-bold text-slate-900 text-xs">Arun Khandelwal</div>
                      <div className="text-[11px] text-slate-500">Managing Director, Khandelwal Fabrics, Jaipur</div>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                    <div className="flex items-center text-amber-500 text-sm">★★★★★</div>
                    <p className="text-xs text-slate-700 leading-relaxed italic">
                      "I registered my 17ft Eicher truck with Vahan Setu. Daily earnings of ₹4,000 to ₹7,000 are settled automatically to my bank account without broker deduction. Very satisfied with Vikas Yogi ji's support."
                    </p>
                    <div className="pt-2 border-t border-slate-200">
                      <div className="font-bold text-slate-900 text-xs">Rajesh Gurjar</div>
                      <div className="text-[11px] text-slate-500">Commercial Driver Partner (RJ-14-GB-4819)</div>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                    <div className="flex items-center text-amber-500 text-sm">★★★★★</div>
                    <p className="text-xs text-slate-700 leading-relaxed italic">
                      "The prepaid wallet with Razorpay integration and instant GST input credit has streamlined our company's multi-city freight operations between Ahmedabad, Surat, and Mumbai."
                    </p>
                    <div className="pt-2 border-t border-slate-200">
                      <div className="font-bold text-slate-900 text-xs">Naveen Shah</div>
                      <div className="text-[11px] text-slate-500">Supply Chain Head, Arihant Electronics Ltd</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

          </main>
        )}

        {activeView === 'book' && <BookingPage />}
        {activeView === 'track' && <LiveTrackingPage />}
        {activeView === 'customer-app' && <CustomerAppSimulator />}
        {activeView === 'driver-app' && <DriverAppSimulator />}
        {activeView === 'wallet' && <CustomerProfileWallet />}
        {activeView === 'admin' && <AdminDashboard />}
        {activeView === 'services' && <ServicesPage />}
        {activeView === 'about' && <AboutPage />}
        {activeView === 'contact' && <ContactPage />}
        {activeView === 'enquiry' && <IntentEnquiryPage />}
        {(activeView === 'login' || activeView === 'customer-login' || activeView === 'driver-login') && <LoginPage />}
      </div>

      {/* Footer (hidden in full Admin mode) */}
      {activeView !== 'admin' && <Footer />}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
