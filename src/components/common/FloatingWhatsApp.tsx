import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MessageSquare, Phone, X, Send, CheckCircle2 } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const { language, contactInfo, showToast } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const sendWhatsApp = (msgText?: string) => {
    const textToSend = msgText || customMsg || 'Namaste Vikas ji, I want to book transport / hire truck on Vahan Setu.';
    const encoded = encodeURIComponent(textToSend);
    window.open(`https://wa.me/91${contactInfo.whatsapp}?text=${encoded}`, '_blank');
    setIsOpen(false);
    setCustomMsg('');
    showToast(language === 'hi' ? 'व्हाट्सएप चैट खुल रही है...' : 'Opening WhatsApp chat...');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Quick message popup */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-92 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-emerald-800 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-700 border-2 border-emerald-500/50 flex items-center justify-center font-bold text-sm">
                VY
              </div>
              <div>
                <h4 className="text-sm font-semibold">{contactInfo.name}</h4>
                <p className="text-[11px] text-emerald-200 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  {language === 'hi' ? 'ऑनलाइन · 5 मिनट में जवाब' : 'Online · Replies in 5 mins'}
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-slate-50 space-y-3">
            <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs text-slate-700 shadow-xs">
              <p className="font-medium text-slate-900 mb-1">
                {language === 'hi' ? 'नमस्ते! वाहन सेतु में आपका स्वागत है 🙏' : 'Namaste! Welcome to Vahan Setu 🙏'}
              </p>
              <p className="text-slate-600">
                {language === 'hi'
                  ? 'माल ढुलाई, रेट कोटेशन, या ड्राइवर सहायता के लिए सीधा संपर्क करें:'
                  : 'Get instant freight rate quotes, vehicle booking, or 24/7 highway support:'}
              </p>
              <div className="mt-2 text-xs font-semibold text-emerald-800 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" />
                <span>+91 {contactInfo.phone}</span>
              </div>
            </div>

            {/* Quick action chips */}
            <div className="space-y-1.5">
              <button
                onClick={() => sendWhatsApp('Hello Vikas ji, I need freight rate for truck booking.')}
                className="w-full text-left text-xs bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 p-2 rounded-lg text-slate-700 transition-colors flex items-center justify-between"
              >
                <span>📦 {language === 'hi' ? 'गाड़ी का तुरंत रेट पता करें' : 'Get instant truck freight quote'}</span>
                <span className="text-[10px] text-emerald-600">Send →</span>
              </button>
              <button
                onClick={() => sendWhatsApp('Hello Vikas ji, I want to attach my truck as Driver Partner.')}
                className="w-full text-left text-xs bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 p-2 rounded-lg text-slate-700 transition-colors flex items-center justify-between"
              >
                <span>🚛 {language === 'hi' ? 'अपनी गाड़ी वाहन सेतु से जोड़ें' : 'Attach truck as driver partner'}</span>
                <span className="text-[10px] text-emerald-600">Send →</span>
              </button>
            </div>

            {/* Custom input */}
            <div className="flex items-center gap-1.5 pt-1">
              <input
                type="text"
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendWhatsApp()}
                placeholder={language === 'hi' ? 'अपना संदेश यहाँ लिखें...' : 'Type message here...'}
                className="flex-1 bg-white text-xs border border-slate-200 rounded-lg px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-600"
              />
              <button
                onClick={() => sendWhatsApp()}
                className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors cursor-pointer"
                title="Send"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer border border-emerald-400/40"
        aria-label="Chat on WhatsApp with Vikas Yogi"
      >
        <div className="relative">
          <MessageSquare className="w-5 h-5 fill-current" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-orange-400 border-2 border-emerald-600"></span>
        </div>
        <span className="text-xs font-semibold tracking-wide hidden sm:inline-block">
          {language === 'hi' ? 'व्हाट्सएप चैट' : 'Chat on WhatsApp'}
        </span>
      </button>
    </div>
  );
};
