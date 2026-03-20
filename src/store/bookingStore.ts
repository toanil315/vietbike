import { create } from 'zustand';
import { Vehicle, BookingAddon } from '../types';

interface BookingState {
  step: number;
  vehicle: Vehicle | null;
  startDate: string;
  endDate: string;
  pickupLocation: string;
  dropoffLocation: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    nationality: string;
    licenseNumber: string;
  };
  selectedAddons: string[];
  paymentMethod: string;
  voucherCode: string;
  
  setStep: (step: number) => void;
  setVehicle: (vehicle: Vehicle) => void;
  setDates: (start: string, end: string) => void;
  setLocations: (pickup: string, dropoff: string) => void;
  setCustomerInfo: (info: Partial<BookingState['customerInfo']>) => void;
  toggleAddon: (addonId: string) => void;
  setPaymentMethod: (method: string) => void;
  setVoucherCode: (code: string) => void;
  resetBooking: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  step: 1,
  vehicle: null,
  startDate: '',
  endDate: '',
  pickupLocation: '',
  dropoffLocation: '',
  customerInfo: {
    name: '',
    email: '',
    phone: '',
    nationality: '',
    licenseNumber: '',
  },
  selectedAddons: [],
  paymentMethod: '',
  voucherCode: '',

  setStep: (step) => set({ step }),
  setVehicle: (vehicle) => set({ vehicle }),
  setDates: (startDate, endDate) => set({ startDate, endDate }),
  setLocations: (pickupLocation, dropoffLocation) => set({ pickupLocation, dropoffLocation }),
  setCustomerInfo: (info) => set((state) => ({ customerInfo: { ...state.customerInfo, ...info } })),
  toggleAddon: (addonId) => set((state) => ({
    selectedAddons: state.selectedAddons.includes(addonId)
      ? state.selectedAddons.filter((id) => id !== addonId)
      : [...state.selectedAddons, addonId]
  })),
  setPaymentMethod: (paymentMethod) => set({ paymentMethod }),
  setVoucherCode: (voucherCode) => set({ voucherCode }),
  resetBooking: () => set({
    step: 1,
    vehicle: null,
    startDate: '',
    endDate: '',
    pickupLocation: '',
    dropoffLocation: '',
    customerInfo: { name: '', email: '', phone: '', nationality: '', licenseNumber: '' },
    selectedAddons: [],
    paymentMethod: '',
    voucherCode: '',
  }),
}));
