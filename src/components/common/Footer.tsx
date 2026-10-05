import React from 'react';
import { useApp } from '../../context/AppContext';
import { Truck, Phone, MessageSquare, Mail, MapPin, ShieldCheck, Award, HeartHandshake } from 'lucide-react';
import { AppView } from '../../types';

export const Footer: React.FC = () => {
  const { language, setActiveView, contactInfo } = useApp();

  const handleNav = (view: AppView) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Trust & Guarantee strip */}
      <div className="border-b border-slate-800/80 bg-slate-950/60 py-6 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-900/60 border border-emerald-700/50 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">
                {language === 'hi' ? '100% सत्यापित फ्लीट' : '100% Verified Fleet'}
              </h4>
              <p className="text-xs text-slate-400">
                {language === 'hi' ? 'ड्राइविंग लाइसेंस, आरसी व पुलिस सत्यापन' : 'DL, RC, fitness & background checks'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-950/60 border border-orange-700/50 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">
                {language === 'hi' ? 'पारदर्शी व उचित दर' : 'Transparent Guaranteed Pricing'}
              </h4>
              <p className="text-xs text-slate-400">
                {language === 'hi' ? 'कोई अप्रत्याशित शुल्क नहीं, सीधा ड्राइवर से जुड़ाव' : 'Zero hidden charges, direct transporter rates'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-900/60 border border-emerald-700/50 flex items-center justify-center shrink-0">
              <HeartHandshake className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">
                {language === 'hi' ? '24x7 ऑन-रोड सहायता' : '24x7 Nationwide Highway Assistance'}
              </h4>
              <p className="text-xs text-slate-400">
                {language === 'hi' ? 'सीधा संपर्क: विकास योगी (+91 9461695205)' : 'Direct founder hotline: +91 9461695205'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center text-white">
                <Truck className="w-5 h-5 text-orange-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white">
                  VAHAN <span className="text-emerald-400">SETU</span>
                </span>
                <span className="text-[11px] font-medium text-orange-400 tracking-wide">
                  भारत – ट्रांसपोर्ट का नया सेतु
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {language === 'hi'
                ? 'वाहन सेतु भारत का आधुनिक डिजिटल लॉजिस्टिक्स प्लेटफॉर्म है, जो व्यापारियों, उद्योगों और ट्रांसपोर्टरों को सीधे जोड़कर माल ढुलाई को सुगम, सुरक्षित और किफायती बनाता है।'
                : 'Vahan Setu is India’s next-generation transport & logistics ecosystem connecting shippers, fleet operators, and certified truck drivers with real-time GPS tracking and guaranteed fair pricing.'}
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-semibold">सेवा • भरोसा • सुरक्षा</span>
              </div>
              <div>Registered under Govt. of India MSME & Logistics Digital Mission.</div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              {language === 'hi' ? 'प्लेटफॉर्म सेवाएं' : 'Platform Services'}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => handleNav('book')} 
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  {language === 'hi' ? 'गाड़ी बुक करें' : 'Book a Vehicle'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('track')} 
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  {language === 'hi' ? 'लाइव गाड़ी ट्रैकिंग' : 'Live GPS Vehicle Tracking'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('customer-app')} 
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  {language === 'hi' ? 'ग्राहक मोबाइल ऐप' : 'Customer Mobile App'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('driver-app')} 
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  {language === 'hi' ? 'ड्राइवर रजिस्ट्रेशन / पोर्टल' : 'Driver Registration & Portal'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('wallet')} 
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  {language === 'hi' ? 'वॉलेट और पेमेंट' : 'Customer Wallet & Ledgers'}
                </button>
              </li>
            </ul>
          </div>

          {/* Vehicle Fleet */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              {language === 'hi' ? 'फ्लीट श्रेणियां' : 'Fleet Categories'}
            </h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="hover:text-slate-200">Tata Ace (Chota Hathi - 750 KG)</li>
              <li className="hover:text-slate-200">Mahindra Bolero Pickup (2.0 Ton)</li>
              <li className="hover:text-slate-200">Eicher 14ft / 17ft (5 - 7 Ton)</li>
              <li className="hover:text-slate-200">6 & 10 Wheeler Trucks (10 - 16 Ton)</li>
              <li className="hover:text-slate-200">12 & 14 Wheeler Taurus (22 - 27 Ton)</li>
              <li className="hover:text-slate-200">32ft High-Cube Container Trucks</li>
              <li className="hover:text-slate-200">40ft Low-Bed & Flatbed Trailers</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              {language === 'hi' ? 'सीधा संपर्क' : 'Direct Contact'}
            </h3>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Central Operations Hub</div>
                  <div className="text-slate-400">Road No. 14, VKIA Transport Nagar, Jaipur, Rajasthan - 302013</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${contactInfo.phone}`} className="hover:text-white font-mono">
                  +91 {contactInfo.phone} ({contactInfo.name})
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a 
                  href={contactInfo.whatsappUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-emerald-400 underline underline-offset-2"
                >
                  WhatsApp: +91 {contactInfo.whatsapp}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`mailto:${contactInfo.email}`} className="hover:text-white">
                  {contactInfo.email}
                </a>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => handleNav('admin')}
                  className="w-full py-1.5 px-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded border border-slate-700 text-center transition-colors cursor-pointer"
                >
                  {language === 'hi' ? 'एडमिन लॉगिन' : 'Admin Operations Login'}
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © 2026 Vahan Setu Logistics Technologies Pvt. Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => handleNav('about')} className="hover:text-slate-300">About Us</button>
            <span>·</span>
            <button onClick={() => handleNav('services')} className="hover:text-slate-300">Services</button>
            <span>·</span>
            <button onClick={() => handleNav('contact')} className="hover:text-slate-300">Contact</button>
            <span>·</span>
            <span className="text-orange-400">Made with pride in India 🇮🇳</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
