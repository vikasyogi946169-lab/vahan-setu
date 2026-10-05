import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Truck, 
  Phone, 
  Globe, 
  Menu, 
  X, 
  ShieldCheck, 
  UserCheck, 
  LayoutDashboard, 
  Smartphone,
  User,
  LogOut,
  Lock
} from 'lucide-react';
import { AppView } from '../../types';

export const Header: React.FC = () => {
  const { 
    language, 
    toggleLanguage, 
    activeView, 
    setActiveView, 
    contactInfo,
    loggedInUser,
    logoutUser 
  } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: Array<{ id: AppView; labelEn: string; labelHi: string }> = [
    { id: 'home', labelEn: 'Home', labelHi: 'होम' },
    { id: 'enquiry', labelEn: 'Quick Enquiry', labelHi: 'त्वरित पूछताछ' },
    { id: 'book', labelEn: 'Book Transport', labelHi: 'ट्रांसपोर्ट बुक करें' },
    { id: 'track', labelEn: 'Live Tracking', labelHi: 'लाइव ट्रैकिंग' },
    { id: 'login', labelEn: 'Login / Register', labelHi: 'लॉगिन / पंजीकरण' },
    { id: 'customer-app', labelEn: 'Customer App', labelHi: 'ग्राहक ऐप' },
    { id: 'driver-app', labelEn: 'Driver Partner', labelHi: 'ड्राइवर पार्टनर' },
    { id: 'admin', labelEn: 'Admin Portal', labelHi: 'एडमिन पोर्टल' },
  ];

  const handleNavClick = (view: AppView) => {
    setActiveView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top micro bar for Indian logistics trust banner */}
      <div className="bg-emerald-950 text-white text-xs px-4 py-1.5 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-emerald-200">
            <span className="font-semibold text-white tracking-wide">
              {language === 'hi' ? 'भारत – ट्रांसपोर्ट का नया सेतु' : "VAHAN SETU — India's Smart Logistics Network"}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              {language === 'hi' ? 'सेवा • भरोसा • सुरक्षा | 100% सत्यापित ड्राइवर' : 'Service • Trust • Safety | 100% Verified Fleet'}
            </span>
          </div>
          <div className="flex items-center gap-4 text-emerald-200">
            <a 
              href={`tel:${contactInfo.phone}`} 
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-orange-400" />
              <span>{language === 'hi' ? 'हेल्पलाइन:' : '24x7 Support:'} +91 {contactInfo.phone} ({contactInfo.name})</span>
            </a>
            <span>·</span>
            <button 
              onClick={() => handleNavClick('wallet')}
              className="text-emerald-300 hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
            >
              {language === 'hi' ? 'वॉलेट और प्रोफाइल' : 'Customer Wallet'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Bar adhering strictly to Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark + clean truck insignia */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 cursor-pointer group select-none shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center text-white shadow-sm border border-emerald-700/50 group-hover:bg-emerald-700 transition-colors">
            <Truck className="w-5 h-5 text-orange-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-emerald-800 transition-colors font-sans">
              VAHAN <span className="text-emerald-700">SETU</span>
            </span>
            <span className="text-[10px] font-semibold text-orange-600 -mt-1 tracking-wider uppercase">
              {language === 'hi' ? 'वाहन सेतु' : 'Smart Logistics'}
            </span>
          </div>
        </div>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm font-medium transition-colors relative py-1 cursor-pointer whitespace-nowrap ${
                  isActive 
                    ? 'text-emerald-800 font-semibold' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {language === 'hi' ? item.labelHi : item.labelEn}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions + Language switch */}
        <div className="flex items-center gap-3">
          {/* Bilingual Switcher button */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300 transition-colors cursor-pointer"
            title="Switch Language / भाषा बदलें"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-700" />
            <span className="whitespace-nowrap">{language === 'en' ? 'हिन्दी' : 'English'}</span>
          </button>

          {/* User Account / Login State */}
          {loggedInUser ? (
            <div className="hidden sm:flex items-center gap-2 bg-slate-100 p-1 pl-2.5 rounded-xl border border-slate-200 text-xs">
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${loggedInUser.role === 'customer' ? 'bg-emerald-600' : 'bg-orange-500'}`} />
                <span className="font-semibold text-slate-900 truncate max-w-[120px]">{loggedInUser.name}</span>
                <span className="text-[10px] text-slate-500 uppercase">({loggedInUser.role})</span>
              </div>
              <button
                onClick={logoutUser}
                title="Logout"
                className="p-1 hover:text-rose-600 text-slate-400 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleNavClick('login')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap border border-slate-200"
            >
              <Lock className="w-3.5 h-3.5 text-emerald-700" />
              <span>{language === 'hi' ? 'लॉगिन' : 'Login'}</span>
            </button>
          )}

          {/* Primary CTA */}
          <button
            onClick={() => handleNavClick('book')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 active:bg-emerald-900 transition-colors shadow-sm cursor-pointer whitespace-nowrap"
          >
            {language === 'hi' ? 'तुरंत गाड़ी बुक करें' : 'Book a Truck'}
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg border border-slate-200 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-5 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
            <button
              onClick={() => handleNavClick('customer-app')}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-50 text-emerald-900 text-xs font-semibold"
            >
              <Smartphone className="w-4 h-4 text-emerald-700" />
              <span>{language === 'hi' ? 'ग्राहक ऐप' : 'Customer App'}</span>
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-100 text-slate-900 text-xs font-semibold"
            >
              <LayoutDashboard className="w-4 h-4 text-slate-700" />
              <span>{language === 'hi' ? 'एडमिन पैनल' : 'Admin Panel'}</span>
            </button>
          </div>

          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                  activeView === item.id
                    ? 'bg-emerald-700 text-white font-medium'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {language === 'hi' ? item.labelHi : item.labelEn}
              </button>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('book')}
              className="w-full py-2.5 bg-emerald-700 text-white font-semibold text-xs rounded-lg text-center shadow-sm"
            >
              {language === 'hi' ? 'गाड़ी बुक करें' : 'Book a Truck Now'}
            </button>
            <div className="text-[11px] text-slate-500 text-center pt-1">
              {language === 'hi' ? 'कॉल करें:' : 'Call Vikas Yogi:'} +91 {contactInfo.phone}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
