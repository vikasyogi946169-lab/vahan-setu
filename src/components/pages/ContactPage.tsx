import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Phone, 
  MessageSquare, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  Building,
  Truck,
  ShieldCheck
} from 'lucide-react';
import { MAJOR_INDIAN_CITIES, VEHICLE_CATEGORIES } from '../../data/mockData';

export const ContactPage: React.FC = () => {
  const { language, contactInfo, showToast } = useApp();
  const [formTab, setFormTab] = useState<'contact' | 'booking_enquiry' | 'driver_enquiry'>('contact');

  // Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  // Booking Enquiry State
  const [enqPickup, setEnqPickup] = useState('Jaipur');
  const [enqDrop, setEnqDrop] = useState('Delhi NCR');
  const [enqVehicle, setEnqVehicle] = useState('Tata Ace');
  const [enqTonnage, setEnqTonnage] = useState('2.5');

  // Driver Registration Enquiry State
  const [drvName, setDrvName] = useState('');
  const [drvPhone, setDrvPhone] = useState('');
  const [drvVehicleNo, setDrvVehicleNo] = useState('');

  const handleGeneralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(language === 'hi'
      ? 'आपका संदेश प्राप्त हुआ! विकास योगी जी शीघ्र ही संपर्क करेंगे।'
      : 'Message received! Vikas Yogi or our transport team will contact you shortly.');
    setContactName('');
    setContactPhone('');
    setContactEmail('');
    setContactMessage('');
  };

  const handleBookingEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const encoded = encodeURIComponent(`Hello Vikas ji, I need rate quote for ${enqVehicle} from ${enqPickup} to ${enqDrop} (${enqTonnage} Tons).`);
    window.open(`https://wa.me/91${contactInfo.whatsapp}?text=${encoded}`, '_blank');
    showToast('Redirecting to WhatsApp for instant freight quote...');
  };

  const handleDriverEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const encoded = encodeURIComponent(`Hello Vikas ji, I want to attach my truck (${drvVehicleNo}) to Vahan Setu. Driver Name: ${drvName}, Phone: ${drvPhone}.`);
    window.open(`https://wa.me/91${contactInfo.whatsapp}?text=${encoded}`, '_blank');
    showToast('Sending driver registration details on WhatsApp...');
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-widest">
            <span>GET IN TOUCH WITH VAHAN SETU</span>
            <span aria-hidden="true">·</span>
            <span>24x7 ऑन-रोड सहायता</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {language === 'hi' ? 'संपर्क करें एवं तुरंत सहायता प्राप्त करें' : 'Contact Us & Transport Enquiry'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Directly connect with Vikas Yogi for enterprise transport tie-ups, truck bookings, or driver onboarding across India.
          </p>
        </div>

        {/* Contact Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Phone card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Direct Phone Call</h3>
                <p className="text-xs text-slate-500">24x7 Dedicated Hotline</p>
              </div>
            </div>
            <div>
              <div className="text-lg font-bold font-mono text-slate-900">+91 {contactInfo.phone}</div>
              <div className="text-xs text-slate-500 mt-0.5">Contact: {contactInfo.name}</div>
            </div>
            <a
              href={`tel:${contactInfo.phone}`}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl text-center transition-colors"
            >
              Call Vikas Yogi Now →
            </a>
          </div>

          {/* WhatsApp card */}
          <div className="bg-white p-6 rounded-2xl border border-emerald-300 shadow-xs flex flex-col justify-between space-y-4 ring-1 ring-emerald-400/40">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Instant WhatsApp</h3>
                <p className="text-xs text-emerald-700 font-semibold">Replies within 5 minutes</p>
              </div>
            </div>
            <div>
              <div className="text-lg font-bold font-mono text-slate-900">+91 {contactInfo.whatsapp}</div>
              <div className="text-xs text-slate-500 mt-0.5">Rates, Tracking & Truck Attaching</div>
            </div>
            <a
              href={contactInfo.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl text-center transition-colors shadow-xs"
            >
              Open WhatsApp Chat →
            </a>
          </div>

          {/* Email card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Official Email</h3>
                <p className="text-xs text-slate-500">Corporate & GST Billing</p>
              </div>
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 truncate">{contactInfo.email}</div>
              <div className="text-xs text-slate-500 mt-0.5">Support & Enterprise Inquiries</div>
            </div>
            <a
              href={`mailto:${contactInfo.email}`}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl text-center transition-colors"
            >
              Send Email →
            </a>
          </div>

        </div>

        {/* 3 Interactive Forms Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          
          {/* Form Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
            <button
              onClick={() => setFormTab('contact')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                formTab === 'contact' ? 'bg-emerald-800 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              1. General Contact Form
            </button>
            <button
              onClick={() => setFormTab('booking_enquiry')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                formTab === 'booking_enquiry' ? 'bg-emerald-800 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              2. Booking Rate Enquiry Form
            </button>
            <button
              onClick={() => setFormTab('driver_enquiry')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                formTab === 'driver_enquiry' ? 'bg-emerald-800 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              3. Driver Registration Enquiry
            </button>
          </div>

          {/* FORM 1: GENERAL CONTACT */}
          {formTab === 'contact' && (
            <form onSubmit={handleGeneralSubmit} className="space-y-4 text-xs max-w-2xl">
              <h3 className="font-bold text-sm text-slate-900">Send us a direct message</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Your Name *</label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    required
                    placeholder="Enter your full name"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    required
                    placeholder="10 digit mobile"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="your.email@company.com"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Your Message / Requirement *</label>
                <textarea
                  rows={4}
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  required
                  placeholder="Describe your cargo transport routes, frequency, or driver inquiry..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Message</span>
              </button>
            </form>
          )}

          {/* FORM 2: BOOKING ENQUIRY */}
          {formTab === 'booking_enquiry' && (
            <form onSubmit={handleBookingEnquirySubmit} className="space-y-4 text-xs max-w-2xl">
              <h3 className="font-bold text-sm text-slate-900">Instant Freight Rate Enquiry via WhatsApp</h3>
              <p className="text-slate-500">Submit this quick form to receive an official rate quotation on WhatsApp immediately.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Pickup City</label>
                  <select
                    value={enqPickup}
                    onChange={(e) => setEnqPickup(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  >
                    {MAJOR_INDIAN_CITIES.map(c => <option key={c.name} value={c.name}>{c.name} ({c.state})</option>)}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Destination City</label>
                  <select
                    value={enqDrop}
                    onChange={(e) => setEnqDrop(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  >
                    {MAJOR_INDIAN_CITIES.map(c => <option key={c.name} value={c.name}>{c.name} ({c.state})</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Required Truck Type</label>
                  <select
                    value={enqVehicle}
                    onChange={(e) => setEnqVehicle(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  >
                    {VEHICLE_CATEGORIES.map(v => <option key={v.id} value={v.name}>{v.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Estimated Load (Tons)</label>
                  <input
                    type="number"
                    value={enqTonnage}
                    onChange={(e) => setEnqTonnage(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Get Instant Quote on WhatsApp (+91 {contactInfo.whatsapp})</span>
              </button>
            </form>
          )}

          {/* FORM 3: DRIVER ENQUIRY */}
          {formTab === 'driver_enquiry' && (
            <form onSubmit={handleDriverEnquirySubmit} className="space-y-4 text-xs max-w-2xl">
              <h3 className="font-bold text-sm text-slate-900">Attach Truck / Driver Partner Inquiry</h3>
              <p className="text-slate-500">Connect with founder Vikas Yogi directly to attach 1 to 50+ trucks to Vahan Setu.</p>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Driver / Transporter Name *</label>
                <input
                  type="text"
                  value={drvName}
                  onChange={(e) => setDrvName(e.target.value)}
                  placeholder="e.g. Ramesh Singh"
                  required
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Contact Mobile Number *</label>
                  <input
                    type="tel"
                    value={drvPhone}
                    onChange={(e) => setDrvPhone(e.target.value)}
                    placeholder="10 digit mobile"
                    required
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Vehicle Registration Number *</label>
                  <input
                    type="text"
                    value={drvVehicleNo}
                    onChange={(e) => setDrvVehicleNo(e.target.value)}
                    placeholder="e.g. RJ-14-GA-9921"
                    required
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono uppercase"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Truck className="w-4 h-4" />
                <span>Submit Vehicle Attachment to Vikas Yogi</span>
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
