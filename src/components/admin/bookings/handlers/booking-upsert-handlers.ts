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
  pickupDate: string;
  dropoffDate: string;
  totalAmount: string;
  depositAmount: string;
  note: string;
  extensionInfo: string;
  currency: string;
  documents: BookingDocument[];
}

const DAY_MS = 24 * 60 * 60 * 1000;

export function calculateRentalDays(pickupDate: string, dropoffDate: string) {
  const pickupMs = new Date(pickupDate).getTime();
  const dropoffMs = new Date(dropoffDate).getTime();

  if (!Number.isFinite(pickupMs) || !Number.isFinite(dropoffMs)) {
    return 1;
  }

  const diff = dropoffMs - pickupMs;
  if (diff <= 0) {
    return 1;
  }

  return Math.max(1, Math.ceil(diff / DAY_MS));
}

function normalizeDocuments(documents: BookingDocument[]) {
  return documents
    .map((document) => ({
      name: (document.name || "").trim(),
      url: (document.url || "").trim(),
    }))
    .filter((document) => document.name && document.url);
}

export function getDefaultBookingFormValues(
  booking?: Booking | null,
): BookingUpsertFormValues {
  const now = new Date();
  const fallbackStart = now.toISOString().slice(0, 16);

  if (!booking) {
    const pickupDate = fallbackStart;
    const dropoffDate = new Date(Date.now() + DAY_MS)
      .toISOString()
      .slice(0, 16);

    return {
      customerName: "",
      customerPhone: "",
      customerEmail: "",
      sourceApp: "manual",
      licensePlate: "",
      pickupDate,
      dropoffDate,
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
    pickupDate: booking.pickupDate?.slice(0, 16) || fallbackStart,
    dropoffDate: booking.dropoffDate?.slice(0, 16) || fallbackStart,
    totalAmount: String(booking.totalAmount || ""),
    depositAmount: String(booking.depositAmount || "0"),
    note: booking.note || "",
    extensionInfo: booking.extensionInfo || "",
    currency: "VND",
    documents:
      booking.documents?.map((document) => ({
        name: document.name || "",
        url: document.url || "",
      })) || [],
  };
}

export function buildCreateBookingPayload(
  values: BookingUpsertFormValues,
): CreateBookingPayload {
  const rentalDays = calculateRentalDays(values.pickupDate, values.dropoffDate);

  return {
    customerName: values.customerName.trim(),
    customerPhone: values.customerPhone.trim(),
    sourceApp: values.sourceApp.trim() || "manual",
    licensePlate: values.licensePlate.trim(),
    startDate: new Date(values.pickupDate).toISOString(),
    rentalDays,
    totalAmount: values.totalAmount.trim(),
    depositAmount: values.depositAmount.trim() || "0",
    extensionInfo: values.extensionInfo.trim() || undefined,
    note: values.note.trim() || undefined,
    documents: normalizeDocuments(values.documents),
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
    documents: normalizeDocuments(values.documents),
    currency: values.currency.trim() || "VND",
  };
}
