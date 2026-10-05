import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
  Language, 
  AppView, 
  Booking, 
  Driver, 
  WalletTransaction, 
  CustomerProfile, 
  AdminStats,
  LoggedInUser,
  OwnerNotificationAlert
} from '../types';
import { 
  INITIAL_BOOKINGS, 
  INITIAL_DRIVERS, 
  INITIAL_TRANSACTIONS, 
  INITIAL_CUSTOMER_PROFILE, 
  INITIAL_ADMIN_STATS,
  VEHICLE_CATEGORIES
} from '../data/mockData';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  loggedInUser: LoggedInUser | null;
  recentLoginAlerts: OwnerNotificationAlert[];
  loginAsCustomer: (name: string, phone: string, email?: string) => OwnerNotificationAlert;
  loginAsDriver: (name: string, phone: string, vehicleNo: string, vehicleType: string) => OwnerNotificationAlert;
  logoutUser: () => void;
  bookings: Booking[];
  selectedBookingForTrack: Booking | null;
  setSelectedBookingForTrack: (booking: Booking | null) => void;
  createBooking: (bookingData: Partial<Booking>) => Booking;
  updateBookingStatus: (id: string, status: Booking['status']) => void;
  drivers: Driver[];
  currentDriver: Driver;
  approveDriver: (driverId: string) => void;
  rejectDriver: (driverId: string) => void;
  registerDriver: (driverData: Partial<Driver>) => void;
  toggleDriverOnline: (driverId: string) => void;
  customerProfile: CustomerProfile;
  walletTransactions: WalletTransaction[];
  addWalletMoney: (amount: number, paymentMethod: string) => void;
  adminStats: AdminStats;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  contactInfo: {
    name: string;
    phone: string;
    whatsapp: string;
    whatsappUrl: string;
    email: string;
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [activeView, setActiveView] = useState<AppView>('home');
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [selectedBookingForTrack, setSelectedBookingForTrack] = useState<Booking | null>(INITIAL_BOOKINGS[0]);
  const [drivers, setDrivers] = useState<Driver[]>(INITIAL_DRIVERS);
  const [customerProfile, setCustomerProfile] = useState<CustomerProfile>(INITIAL_CUSTOMER_PROFILE);
  const [walletTransactions, setWalletTransactions] = useState<WalletTransaction[]>(INITIAL_TRANSACTIONS);
  const [adminStats, setAdminStats] = useState<AdminStats>(INITIAL_ADMIN_STATS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(null);
  const [recentLoginAlerts, setRecentLoginAlerts] = useState<OwnerNotificationAlert[]>([]);

  const contactInfo = {
    name: 'Vikas Yogi',
    phone: '9461695205',
    whatsapp: '9461695205',
    whatsappUrl: 'https://wa.me/919461695205',
    email: 'vikasyogi946169@gmail.com'
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const loginAsCustomer = (name: string, phone: string, email?: string): OwnerNotificationAlert => {
    const user: LoggedInUser = {
      role: 'customer',
      name: name || 'Valued Customer',
      phone: phone || '9461695205',
      email: email || 'customer@vahansetu.in'
    };
    setLoggedInUser(user);

    // Create notification alert for Owner Vikas Yogi
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', ' + now.toLocaleDateString();
    const alertId = `ALERT-${Date.now()}`;
    const message = `🚨 VAHAN SETU LOGIN ALERT: Customer Logged In!\n• Customer Name: ${user.name}\n• Mobile: +91 ${user.phone}\n• Time: ${timeString}\n• Action: Accessing vehicle booking & freight dispatch.\n• Notification dispatched to Owner: +91 ${contactInfo.phone} & ${contactInfo.email}`;

    const newAlert: OwnerNotificationAlert = {
      id: alertId,
      timestamp: timeString,
      role: 'customer',
      userName: user.name,
      userPhone: user.phone,
      whatsappStatus: 'sent',
      emailStatus: 'sent',
      ownerPhone: contactInfo.phone,
      ownerEmail: contactInfo.email,
      messageText: message
    };

    setRecentLoginAlerts(prev => [newAlert, ...prev]);

    showToast(language === 'hi' 
      ? `स्वागत है ${user.name}! मालिक विकास योगी जी (+91 9461695205) को व्हाट्सएप व ईमेल पर लॉगिन सूचना प्रेषित की गई।`
      : `Welcome ${user.name}! Owner Vikas Yogi (+91 9461695205) notified via WhatsApp & Email.`);

    return newAlert;
  };

  const loginAsDriver = (name: string, phone: string, vehicleNo: string, vehicleType: string): OwnerNotificationAlert => {
    const user: LoggedInUser = {
      role: 'driver',
      name: name || 'Driver Partner',
      phone: phone || '9461695205',
      vehicleNumber: vehicleNo || 'RJ-14-GB-4819',
      vehicleType: vehicleType || 'Eicher Truck (17ft)'
    };
    setLoggedInUser(user);

    // Create notification alert for Owner Vikas Yogi
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', ' + now.toLocaleDateString();
    const alertId = `ALERT-${Date.now()}`;
    const message = `🚛 VAHAN SETU LOGIN ALERT: Commercial Driver Partner Logged In!\n• Driver Name: ${user.name}\n• Vehicle: ${user.vehicleNumber} (${user.vehicleType})\n• Mobile: +91 ${user.phone}\n• Time: ${timeString}\n• Action: Online for dispatch.\n• Notification dispatched to Owner: +91 ${contactInfo.phone} & ${contactInfo.email}`;

    const newAlert: OwnerNotificationAlert = {
      id: alertId,
      timestamp: timeString,
      role: 'driver',
      userName: user.name,
      userPhone: user.phone,
      whatsappStatus: 'sent',
      emailStatus: 'sent',
      ownerPhone: contactInfo.phone,
      ownerEmail: contactInfo.email,
      messageText: message
    };

    setRecentLoginAlerts(prev => [newAlert, ...prev]);

    showToast(language === 'hi'
      ? `ड्राइवर पार्टनर ${user.name} लॉगिन सफल! मालिक विकास योगी जी को व्हाट्सएप व ईमेल अलर्ट भेजा गया।`
      : `Driver ${user.name} logged in! Owner Vikas Yogi notified via WhatsApp & Email.`);

    return newAlert;
  };

  const logoutUser = () => {
    setLoggedInUser(null);
    showToast(language === 'hi' ? 'सफलतापूर्वक लॉगआउट हुए।' : 'Logged out successfully.');
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  const createBooking = (data: Partial<Booking>): Booking => {
    const bookingCount = bookings.length + 1;
    const randomId = `VS-2026-${8940 + bookingCount}`;
    
    // Choose appropriate vehicle category
    const cat = VEHICLE_CATEGORIES.find(v => v.id === data.vehicleCategory) || VEHICLE_CATEGORIES[0];
    const distance = data.distanceKm || 180;
    const estimatedFare = cat.baseFare + (distance * cat.perKmRate);
    const taxFare = Math.round(estimatedFare * 0.05);
    const totalFare = estimatedFare + taxFare;

    // Pick first available verified driver
    const availableDriver = drivers.find(d => d.status === 'verified' && d.isOnline) || drivers[0];

    const newBooking: Booking = {
      id: randomId,
      customerName: data.customerName || customerProfile.name,
      customerPhone: data.customerPhone || customerProfile.phone,
      pickupCity: data.pickupCity || 'Jaipur',
      pickupAddress: data.pickupAddress || 'Jaipur Transport Nagar',
      pickupPin: data.pickupPin || '302004',
      dropCity: data.dropCity || 'Delhi NCR',
      dropAddress: data.dropAddress || 'Delhi Cargo Complex',
      dropPin: data.dropPin || '110037',
      pickupDate: data.pickupDate || new Date().toISOString().split('T')[0],
      pickupTime: data.pickupTime || '02:00 PM',
      materialType: data.materialType || 'Industrial Machinery & Spare Parts',
      materialTypeHi: data.materialTypeHi || 'औद्योगिक मशीनरी और स्पेयर पार्ट्स',
      weightKg: data.weightKg || 3500,
      vehicleCategory: cat.id,
      vehicleName: cat.name,
      distanceKm: distance,
      estimatedFare: estimatedFare,
      taxFare: taxFare,
      totalFare: totalFare,
      status: 'assigned',
      specialInstructions: data.specialInstructions || 'Handle with extreme safety.',
      driverId: availableDriver.id,
      driverName: availableDriver.name,
      driverPhone: availableDriver.phone,
      driverRating: availableDriver.rating,
      vehicleNumber: availableDriver.vehicleNumber,
      currentLocationName: `${data.pickupCity || 'Jaipur'} Loading Depot`,
      currentProgressPercent: 5,
      createdAt: 'Just now',
      eta: 'In 5 hrs'
    };

    setBookings(prev => [newBooking, ...prev]);
    setSelectedBookingForTrack(newBooking);

    // Update admin stats
    setAdminStats(prev => ({
      ...prev,
      totalBookings: prev.totalBookings + 1,
      totalRevenue: prev.totalRevenue + totalFare
    }));

    showToast(language === 'hi' 
      ? `बुकिंग सफल! ट्रैकिंग आईडी: ${newBooking.id}` 
      : `Booking created successfully! Tracking ID: ${newBooking.id}`);

    return newBooking;
  };

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    setBookings(prev => prev.map(b => {
      if (b.id === id) {
        return { 
          ...b, 
          status,
          currentProgressPercent: status === 'delivered' ? 100 : status === 'in_transit' ? 65 : b.currentProgressPercent
        };
      }
      return b;
    }));
    if (selectedBookingForTrack && selectedBookingForTrack.id === id) {
      setSelectedBookingForTrack(prev => prev ? { ...prev, status } : null);
    }
    showToast(language === 'hi' ? `बुकिंग स्थिति अपडेट की गई: ${status}` : `Booking status updated to ${status}`);
  };

  const approveDriver = (driverId: string) => {
    setDrivers(prev => prev.map(d => d.id === driverId ? { ...d, status: 'verified', isOnline: true } : d));
    setAdminStats(prev => ({ ...prev, activeDrivers: prev.activeDrivers + 1 }));
    showToast(language === 'hi' ? 'ड्राइवर दस्तावेज़ स्वीकृत और खाता सक्रिय किया गया!' : 'Driver documents verified and account activated!');
  };

  const rejectDriver = (driverId: string) => {
    setDrivers(prev => prev.map(d => d.id === driverId ? { ...d, status: 'rejected', isOnline: false } : d));
    showToast(language === 'hi' ? 'ड्राइवर आवेदन अस्वीकृत किया गया।' : 'Driver application rejected.');
  };

  const registerDriver = (data: Partial<Driver>) => {
    const newId = `DRV-${100 + drivers.length + 1}`;
    const newDriver: Driver = {
      id: newId,
      name: data.name || 'New Driver Partner',
      phone: data.phone || '9461695205',
      email: data.email || 'driver@vahansetu.in',
      photo: '/src/assets/images/driver_avatar_indian_1791041402147.jpg',
      dlNumber: data.dlNumber || 'DL-PENDING',
      dlExpiry: '2035-12-31',
      vehicleNumber: data.vehicleNumber || 'RJ-14-XX-0000',
      vehicleType: data.vehicleType || 'Tata Ace (Chota Hathi)',
      experienceYears: data.experienceYears || 3,
      currentLocation: data.currentLocation || 'Jaipur Hub',
      status: 'pending',
      isOnline: false,
      rating: 5.0,
      totalTrips: 0,
      todayEarnings: 0,
      walletBalance: 0,
      bankAccount: data.bankAccount || '•••• •••• 9999',
      ifsc: data.ifsc || 'SBIN0001000',
      aadhaarNumber: data.aadhaarNumber || '•••• •••• 1111',
      registeredDate: new Date().toISOString().split('T')[0],
      verificationDocs: {
        dlImage: 'Uploaded DL Copy.pdf',
        rcImage: 'Uploaded RC Copy.pdf',
        insuranceImage: 'Uploaded Insurance.pdf',
        aadhaarImage: 'Uploaded Aadhaar.pdf'
      }
    };

    setDrivers(prev => [newDriver, ...prev]);
    showToast(language === 'hi'
      ? 'ड्राइवर पंजीकरण जमा हो गया! एडमिन सत्यापन के बाद खाता सक्रिय होगा।'
      : 'Driver registration submitted! Awaiting Admin verification & approval.');
  };

  const toggleDriverOnline = (driverId: string) => {
    setDrivers(prev => prev.map(d => {
      if (d.id === driverId) {
        const nextState = !d.isOnline;
        showToast(nextState 
          ? (language === 'hi' ? 'आप अब ऑनलाइन हैं! नई सवारी के अनुरोध प्राप्त होंगे।' : 'You are now Online! Ready to receive ride requests.')
          : (language === 'hi' ? 'आप अब ऑफलाइन हैं।' : 'You are now Offline.'));
        return { ...d, isOnline: nextState };
      }
      return d;
    }));
  };

  const addWalletMoney = (amount: number, paymentMethod: string) => {
    const txnId = `TXN-${Math.floor(10000 + Math.random() * 90000)}`;
    const newTxn: WalletTransaction = {
      id: txnId,
      type: 'credit',
      amount: amount,
      description: `Added ₹${amount.toLocaleString()} via ${paymentMethod}`,
      descriptionHi: `${paymentMethod} द्वारा ₹${amount.toLocaleString()} वॉलेट में जोड़े गए`,
      date: 'Just now',
      referenceId: `pay_RZP_${Math.floor(100000000 + Math.random() * 900000000)}`,
      status: 'success',
      paymentMethod
    };

    setCustomerProfile(prev => ({
      ...prev,
      walletBalance: prev.walletBalance + amount
    }));

    setWalletTransactions(prev => [newTxn, ...prev]);
    showToast(language === 'hi' 
      ? `सफलतापूर्वक ₹${amount.toLocaleString()} जोड़े गए!` 
      : `₹${amount.toLocaleString()} added to wallet successfully!`);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        activeView,
        setActiveView,
        loggedInUser,
        recentLoginAlerts,
        loginAsCustomer,
        loginAsDriver,
        logoutUser,
        bookings,
        selectedBookingForTrack,
        setSelectedBookingForTrack,
        createBooking,
        updateBookingStatus,
        drivers,
        currentDriver: drivers[0],
        approveDriver,
        rejectDriver,
        registerDriver,
        toggleDriverOnline,
        customerProfile,
        walletTransactions,
        addWalletMoney,
        adminStats,
        toastMessage,
        showToast,
        contactInfo
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
