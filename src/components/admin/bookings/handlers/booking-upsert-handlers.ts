import {
  Booking,
  BookingDocument,
  CreateBookingPayload,
  UpdateBookingPayload,
} from "@/types";

export interface BookingUpsertFormValues {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  sourceApp: string;
  licensePlate: string;
  startDate: string;
  rentalDays: number;
  pickupDate: string;
  dropoffDate: string;
  totalAmount: string;
  depositAmount: string;
  note: string;
  extensionInfo: string;
  currency: string;
  documents: BookingDocument[];
}

export function getDefaultBookingFormValues(
  booking?: Booking | null,
): BookingUpsertFormValues {
  const now = new Date();
  const fallbackStart = now.toISOString().slice(0, 16);

  if (!booking) {
    return {
      customerName: "",
      customerPhone: "",
      customerEmail: "",
      sourceApp: "manual",
      licensePlate: "",
      startDate: fallbackStart,
      rentalDays: 1,
      pickupDate: fallbackStart,
      dropoffDate: fallbackStart,
      totalAmount: "",
      depositAmount: "0",
      note: "",
      extensionInfo: "",
      currency: "VND",
      documents: [],
    };
  }

  return {
    customerName:
      booking.customerInfo?.fullName ||
      booking.customerSnapshot?.fullName ||
      "",
    customerPhone:
      booking.customerInfo?.phone || booking.customerSnapshot?.phone || "",
    customerEmail:
      booking.customerInfo?.email || booking.customerSnapshot?.email || "",
    sourceApp: booking.sourceApp || "manual",
    licensePlate: booking.licensePlate || "",
    startDate: booking.pickupDate?.slice(0, 16) || fallbackStart,
    rentalDays: booking.rentalDays || 1,
    pickupDate: booking.pickupDate?.slice(0, 16) || fallbackStart,
    dropoffDate: booking.dropoffDate?.slice(0, 16) || fallbackStart,
    totalAmount: String(booking.totalAmount || ""),
    depositAmount: String(booking.depositAmount || "0"),
    note: booking.note || "",
    extensionInfo: booking.extensionInfo || "",
    currency: "VND",
    documents: booking.documents || [],
  };
}

export function buildCreateBookingPayload(
  values: BookingUpsertFormValues,
): CreateBookingPayload {
  return {
    customerName: values.customerName.trim(),
    customerPhone: values.customerPhone.trim(),
    sourceApp: values.sourceApp.trim() || "manual",
    licensePlate: values.licensePlate.trim(),
    startDate: new Date(values.startDate).toISOString(),
    rentalDays: values.rentalDays,
    totalAmount: values.totalAmount.trim(),
    depositAmount: values.depositAmount.trim() || "0",
    extensionInfo: values.extensionInfo.trim() || undefined,
    note: values.note.trim() || undefined,
    documents: values.documents,
  };
}

export function buildUpdateBookingPayload(
  values: BookingUpsertFormValues,
): UpdateBookingPayload {
  return {
    licensePlate: values.licensePlate.trim(),
    pickupDate: new Date(values.pickupDate).toISOString(),
    dropoffDate: new Date(values.dropoffDate).toISOString(),
    totalAmount: values.totalAmount.trim(),
    depositAmount: values.depositAmount.trim() || "0",
    customerSnapshot: {
      fullName: values.customerName.trim(),
      email: values.customerEmail.trim() || undefined,
      phone: values.customerPhone.trim(),
    },
    sourceApp: values.sourceApp.trim() || undefined,
    extensionInfo: values.extensionInfo.trim() || undefined,
    note: values.note.trim() || undefined,
    documents: values.documents,
    currency: values.currency.trim() || "VND",
  };
}
