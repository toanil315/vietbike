import { create } from "zustand";
import { Vehicle } from "../types";

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
  bookingReference: string | null;
  bookingId: string | null;
  calculatedPrice: number | null;
  taxAmount: number | null;
  discountAmount: number | null;
  totalAmount: number | null;
  error: string | null;
  apiError: { code: string; message: string } | null;

  setStep: (step: number) => void;
  setVehicle: (vehicle: Vehicle) => void;
  setDates: (start: string, end: string) => void;
  setLocations: (pickup: string, dropoff: string) => void;
  setCustomerInfo: (info: Partial<BookingState["customerInfo"]>) => void;
  toggleAddon: (addonId: string) => void;
  setPaymentMethod: (method: string) => void;
  setVoucherCode: (code: string) => void;
  setPricing: (pricing: Record<string, number | null>) => void;
  setBookingReference: (reference: string, id: string) => void;
  setError: (error: string | null) => void;
  setApiError: (error: { code: string; message: string } | null) => void;
  resetBooking: () => void;
  clearError: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  step: 1,
  vehicle: null,
  startDate: "",
  endDate: "",
  pickupLocation: "",
  dropoffLocation: "",
  customerInfo: {
    name: "",
    email: "",
    phone: "",
    nationality: "",
    licenseNumber: "",
  },
  selectedAddons: [],
  paymentMethod: "",
  voucherCode: "",
  bookingReference: null,
  bookingId: null,
  calculatedPrice: null,
  taxAmount: null,
  discountAmount: null,
  totalAmount: null,
  error: null,
  apiError: null,

  setStep: (step) => set({ step }),
  setVehicle: (vehicle) => set({ vehicle }),
  setDates: (startDate, endDate) => set({ startDate, endDate }),
  setLocations: (pickupLocation, dropoffLocation) =>
    set({ pickupLocation, dropoffLocation }),
  setCustomerInfo: (info) =>
    set((state) => ({
      customerInfo: { ...state.customerInfo, ...info },
    })),
  toggleAddon: (addonId) =>
    set((state) => ({
      selectedAddons: state.selectedAddons.includes(addonId)
        ? state.selectedAddons.filter((id) => id !== addonId)
        : [...state.selectedAddons, addonId],
    })),
  setPaymentMethod: (paymentMethod) => set({ paymentMethod }),
  setVoucherCode: (voucherCode) => set({ voucherCode }),
  setPricing: (pricing) => set(pricing),
  setBookingReference: (reference, id) =>
    set({
      bookingReference: reference,
      bookingId: id,
      error: null,
      apiError: null,
    }),
  setError: (error) => set({ error }),
  setApiError: (apiError) => set({ apiError }),
  clearError: () => set({ error: null, apiError: null }),
  resetBooking: () =>
    set({
      step: 1,
      vehicle: null,
      startDate: "",
      endDate: "",
      pickupLocation: "",
      dropoffLocation: "",
      customerInfo: {
        name: "",
        email: "",
        phone: "",
        nationality: "",
        licenseNumber: "",
      },
      selectedAddons: [],
      paymentMethod: "",
      voucherCode: "",
      bookingReference: null,
      bookingId: null,
      calculatedPrice: null,
      taxAmount: null,
      discountAmount: null,
      totalAmount: null,
      error: null,
      apiError: null,
    }),
}));
