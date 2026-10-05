export type Language = 'en' | 'hi';

export type AppView = 
  | 'home'
  | 'book'
  | 'track'
  | 'customer-app'
  | 'driver-app'
  | 'wallet'
  | 'admin'
  | 'services'
  | 'about'
  | 'contact'
  | 'login'
  | 'customer-login'
  | 'driver-login'
  | 'enquiry';

export interface LoggedInUser {
  role: 'customer' | 'driver' | 'admin';
  name: string;
  phone: string;
  email?: string;
  vehicleNumber?: string;
  vehicleType?: string;
}

export interface OwnerNotificationAlert {
  id: string;
  timestamp: string;
  role: 'customer' | 'driver';
  userName: string;
  userPhone: string;
  whatsappStatus: 'sent' | 'pending';
  emailStatus: 'sent' | 'pending';
  ownerPhone: string;
  ownerEmail: string;
  messageText: string;
}

export interface VehicleCategory {
  id: string;
  name: string;
  hindiName: string;
  capacityText: string;
  capacityKg: number;
  dimensions: string;
  baseFare: number;
  perKmRate: number;
  description: string;
  hindiDescription: string;
  image: string;
  popularFor: string;
  popularForHi: string;
}

export interface CityLocation {
  name: string;
  hindiName: string;
  state: string;
  pincode: string;
  lat: number;
  lng: number;
}

export interface Booking {
  id: string;
  customerName: string;
  customerPhone: string;
  pickupCity: string;
  pickupAddress: string;
  pickupPin: string;
  dropCity: string;
  dropAddress: string;
  dropPin: string;
  pickupDate: string;
  pickupTime: string;
  materialType: string;
  materialTypeHi: string;
  weightKg: number;
  vehicleCategory: string;
  vehicleName: string;
  distanceKm: number;
  estimatedFare: number;
  taxFare: number;
  totalFare: number;
  status: 'pending' | 'assigned' | 'in_transit' | 'delivered' | 'cancelled';
  specialInstructions?: string;
  driverId?: string;
  driverName?: string;
  driverPhone?: string;
  driverRating?: number;
  vehicleNumber?: string;
  currentLocationName?: string;
  currentProgressPercent?: number;
  createdAt: string;
  eta: string;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  email: string;
  photo: string;
  dlNumber: string;
  dlExpiry: string;
  vehicleNumber: string;
  vehicleType: string;
  experienceYears: number;
  currentLocation: string;
  status: 'verified' | 'pending' | 'rejected';
  isOnline: boolean;
  rating: number;
  totalTrips: number;
  todayEarnings: number;
  walletBalance: number;
  bankAccount: string;
  ifsc: string;
  aadhaarNumber: string;
  registeredDate: string;
  verificationDocs: {
    dlImage: string;
    rcImage: string;
    insuranceImage: string;
    aadhaarImage: string;
  };
}

export interface WalletTransaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  descriptionHi: string;
  date: string;
  referenceId: string;
  status: 'success' | 'pending' | 'failed';
  paymentMethod: string;
}

export interface CustomerProfile {
  name: string;
  phone: string;
  email: string;
  companyName: string;
  gstin: string;
  walletBalance: number;
  savedAddresses: Array<{
    id: string;
    title: string;
    city: string;
    fullAddress: string;
    pincode: string;
    type: 'pickup' | 'drop' | 'both';
  }>;
}

export interface AdminStats {
  totalBookings: number;
  activeDrivers: number;
  registeredCustomers: number;
  availableVehicles: number;
  totalRevenue: number;
  pendingPayments: number;
  completedTripsToday: number;
  onTimeDeliveryRate: number;
}
