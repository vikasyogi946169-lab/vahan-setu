import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Wallet, 
  User, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft, 
  CreditCard, 
  Phone, 
  Mail, 
  Building, 
  FileText, 
  Download, 
  CheckCircle2, 
  X,
  IndianRupee,
  MessageSquare
} from 'lucide-react';

export const CustomerProfileWallet: React.FC = () => {
  const { 
    language, 
    customerProfile, 
    walletTransactions, 
    addWalletMoney, 
    bookings, 
    showToast,
    contactInfo 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'wallet' | 'profile' | 'addresses' | 'history'>('wallet');
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);
  const [addAmount, setAddAmount] = useState(10000);
  const [selectedMethod, setSelectedMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('vikas@okhdfcbank');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const handleCompletePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (addAmount < 100) {
      showToast('Minimum deposit is ₹100');
      return;
    }

    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setShowAddMoneyModal(false);
      addWalletMoney(addAmount, selectedMethod === 'upi' ? `Razorpay UPI (${upiId})` : 'Razorpay Secure NetBanking');
    }, 1000);
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Profile Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-800 text-white flex items-center justify-center font-bold text-xl shadow-md border-2 border-emerald-600">
              VY
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{customerProfile.name}</h1>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                  VERIFIED TRADER
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{customerProfile.companyName} · GSTIN: {customerProfile.gstin}</p>
              <div className="flex items-center gap-4 text-xs text-slate-600 mt-2">
                <span className="flex items-center gap-1 font-mono">
                  <Phone className="w-3.5 h-3.5 text-emerald-700" />
                  +91 {customerProfile.phone}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-emerald-700" />
                  {customerProfile.email}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-right">
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Wallet Balance</span>
              <span className="text-2xl font-extrabold font-mono text-emerald-800 tabular-nums">
                ₹{customerProfile.walletBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <button
              onClick={() => setShowAddMoneyModal(true)}
              className="px-4 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{language === 'hi' ? 'पैसे जोड़ें' : 'Add Money'}</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab('wallet')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'wallet' ? 'bg-emerald-800 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            Digital Wallet & Razorpay
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'history' ? 'bg-emerald-800 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            Transaction History ({walletTransactions.length})
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'addresses' ? 'bg-emerald-800 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            Saved Hub Addresses ({customerProfile.savedAddresses.length})
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'profile' ? 'bg-emerald-800 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            Business KYC & Profile
          </button>
        </div>

        {/* TAB 1: WALLET & RAZORPAY SECTION */}
        {activeTab === 'wallet' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Card details & quick recharge presets */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="flex items-center justify-between pb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center">
                      <Wallet className="w-4 h-4 text-orange-400" />
                    </div>
                    <span className="font-bold text-sm tracking-wider">VAHAN SETU COMMERCIAL WALLET</span>
                  </div>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-mono px-2 py-0.5 rounded border border-emerald-400/30">
                    INSTANT FREIGHT SETTLEMENT
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-xs text-slate-400 font-medium">Available Balance</span>
                  <div className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight text-white tabular-nums">
                    ₹{customerProfile.walletBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Linked Account: {customerProfile.companyName}</span>
                  <span>GST-Credit Eligible</span>
                </div>
              </div>

              {/* Quick Recharge Amount Presets */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900">
                  {language === 'hi' ? 'त्वरित रीचार्ज राशि' : 'Quick Wallet Recharge Presets'}
                </h3>
                <p className="text-xs text-slate-500">
                  Preload wallet balance to enjoy automated one-click dispatch and priority truck allocation.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[5000, 10000, 25000, 50000].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => {
                        setAddAmount(amt);
                        setShowAddMoneyModal(true);
                      }}
                      className="p-3 border border-slate-200 hover:border-emerald-600 rounded-xl text-center transition-all bg-slate-50 hover:bg-emerald-50/50 cursor-pointer"
                    >
                      <span className="text-xs text-slate-500 block">Add</span>
                      <span className="text-sm font-bold font-mono text-slate-900">₹{amt.toLocaleString()}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right: Security & Payment gateway guarantees */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4 text-xs">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Razorpay PCI-DSS Level 1 Security</span>
                </h3>

                <p className="text-slate-600 leading-relaxed">
                  All payment transactions on Vahan Setu are processed via encrypted 256-bit SSL banking rails with instant GST tax receipts.
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>UPI Auto-Pay & Instant QR Code processing</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Zero convenience fee on UPI & RuPay transfers</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Automated refund if vehicle dispatch is cancelled</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setShowAddMoneyModal(true)}
                    className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl text-xs shadow-xs transition-colors cursor-pointer"
                  >
                    + Open Razorpay Top-Up Modal
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: TRANSACTION HISTORY */}
        {activeTab === 'history' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Wallet Passbook & Invoices</h3>
              <span className="text-xs text-slate-500 font-mono">Showing {walletTransactions.length} items</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-900 border-b border-slate-200 font-semibold">
                  <tr>
                    <th className="p-3.5">Transaction ID</th>
                    <th className="p-3.5">Description</th>
                    <th className="p-3.5">Payment Rail</th>
                    <th className="p-3.5">Date & Time</th>
                    <th className="p-3.5 text-right">Amount (₹)</th>
                    <th className="p-3.5 text-center">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {walletTransactions.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-slate-900">{t.id}</td>
                      <td className="p-3.5 font-medium text-slate-800">{t.description}</td>
                      <td className="p-3.5 text-slate-500">{t.paymentMethod}</td>
                      <td className="p-3.5 text-slate-400 font-mono text-[11px]">{t.date}</td>
                      <td className="p-3.5 text-right font-mono font-bold">
                        <span className={t.type === 'credit' ? 'text-emerald-700' : 'text-slate-900'}>
                          {t.type === 'credit' ? '+' : '-'}₹{t.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </span>
                      </td>
                      <td className="p-3.5 text-center">
                        <button
                          onClick={() => showToast(`Invoice downloaded for ${t.id}`)}
                          className="p-1 text-slate-400 hover:text-emerald-700 transition-colors cursor-pointer"
                          title="Download GST Receipt"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: SAVED ADDRESSES */}
        {activeTab === 'addresses' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {customerProfile.savedAddresses.map((addr) => (
              <div key={addr.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                    <span className="font-bold text-sm text-slate-900">{addr.title}</span>
                    <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono uppercase">
                      {addr.type}
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-slate-600 mt-2">
                    <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-800">{addr.city} - {addr.pincode}</div>
                      <p className="text-slate-500 mt-0.5">{addr.fullAddress}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-emerald-700 font-semibold cursor-pointer">Default Dispatch Hub</span>
                  <button 
                    onClick={() => showToast('Address copied to booking form')}
                    className="text-slate-400 hover:text-slate-700"
                  >
                    Select
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: PROFILE & KYC */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs max-w-2xl space-y-4 text-xs">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              Commercial Shipper Profile
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-slate-400 block font-medium">Primary Contact</label>
                <div className="text-slate-900 font-bold text-sm mt-0.5">{customerProfile.name}</div>
              </div>
              <div>
                <label className="text-slate-400 block font-medium">Business / Trade Entity</label>
                <div className="text-slate-900 font-bold text-sm mt-0.5">{customerProfile.companyName}</div>
              </div>
              <div>
                <label className="text-slate-400 block font-medium">Verified Phone</label>
                <div className="text-slate-900 font-mono mt-0.5">+91 {customerProfile.phone}</div>
              </div>
              <div>
                <label className="text-slate-400 block font-medium">Email Address</label>
                <div className="text-slate-900 mt-0.5">{customerProfile.email}</div>
              </div>
              <div>
                <label className="text-slate-400 block font-medium">GSTIN</label>
                <div className="text-slate-900 font-mono font-bold mt-0.5">{customerProfile.gstin}</div>
              </div>
              <div>
                <label className="text-slate-400 block font-medium">Account Status</label>
                <div className="text-emerald-700 font-bold mt-0.5">Active & Verified</div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* RAZORPAY ADD MONEY MODAL SIMULATOR */}
      {showAddMoneyModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-white text-xs">
                  RZP
                </div>
                <div>
                  <h4 className="font-bold text-sm">Razorpay Secure Payment Gateway</h4>
                  <p className="text-[10px] text-slate-400">Vahan Setu Logistics Technologies</p>
                </div>
              </div>
              <button 
                onClick={() => setShowAddMoneyModal(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleCompletePayment} className="p-6 space-y-4 text-xs">
              
              <div>
                <label className="text-slate-700 font-semibold block mb-1">
                  Enter Recharge Amount (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 font-bold text-slate-500 text-sm">₹</span>
                  <input
                    type="number"
                    value={addAmount}
                    onChange={(e) => setAddAmount(Number(e.target.value))}
                    min={100}
                    max={500000}
                    className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-base font-mono font-bold text-slate-900 focus:outline-none focus:border-emerald-600"
                    required
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-2">
                <label className="text-slate-700 font-semibold block">Select Payment Rail</label>
                
                <div className="space-y-1.5">
                  <label className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer ${
                    selectedMethod === 'upi' ? 'border-emerald-600 bg-emerald-50/60' : 'border-slate-200 hover:bg-slate-50'
                  }`}>
                    <input
                      type="radio"
                      name="paymentRail"
                      checked={selectedMethod === 'upi'}
                      onChange={() => setSelectedMethod('upi')}
                      className="accent-emerald-600"
                    />
                    <div className="flex-1">
                      <div className="font-bold text-slate-900">UPI (Google Pay, PhonePe, Paytm)</div>
                      <div className="text-[10px] text-slate-500">Instant approval, zero transaction fee</div>
                    </div>
                  </label>

                  <label className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer ${
                    selectedMethod === 'netbanking' ? 'border-emerald-600 bg-emerald-50/60' : 'border-slate-200 hover:bg-slate-50'
                  }`}>
                    <input
                      type="radio"
                      name="paymentRail"
                      checked={selectedMethod === 'netbanking'}
                      onChange={() => setSelectedMethod('netbanking')}
                      className="accent-emerald-600"
                    />
                    <div className="flex-1">
                      <div className="font-bold text-slate-900">Corporate NetBanking</div>
                      <div className="text-[10px] text-slate-500">SBI, HDFC, ICICI, Axis Bank</div>
                    </div>
                  </label>
                </div>
              </div>

              {selectedMethod === 'upi' && (
                <div>
                  <label className="text-slate-600 text-[11px] block mb-1">Enter UPI VPA ID</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="mobile@upi or user@okhdfcbank"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono"
                    required
                  />
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProcessingPayment}
                  className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isProcessingPayment ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Processing with Razorpay...</span>
                    </>
                  ) : (
                    <span>Pay ₹{addAmount.toLocaleString()} via Razorpay</span>
                  )}
                </button>
              </div>

              <div className="text-center text-[10px] text-slate-400">
                🔒 256-Bit SSL Encrypted · RBI Approved Payment Gateway
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
