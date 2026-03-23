/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * API Endpoints configuration
 * All backend API routes are documented here with their types
 */

// ============================================================================
// PUBLIC VEHICLE ENDPOINTS
// ============================================================================

export const vehicleEndpoints = {
  /**
   * GET /public/vehicles
   * Fetch paginated list of vehicles with optional filtering
   * Query params: page, limit, type, category, priceMin, priceMax, search, sortBy
   */
  list: () => "/public/vehicles",

  /**
   * GET /public/vehicles/:id
   * Fetch single vehicle by ID with full details
   */
  byId: (id: string) => `/public/vehicles/${id}`,

  /**
   * GET /public/vehicles/by-slug/:slug
   * Fetch single vehicle by slug with full details
   */
  bySlug: (slug: string) => `/public/vehicles/by-slug/${slug}`,
};

// ============================================================================
// PUBLIC BOOKING ENDPOINTS
// ============================================================================

export const bookingEndpoints = {
  /**
   * POST /public/bookings
   * Create a new booking with customer info, dates, vehicle, addons
   */
  create: () => "/public/bookings",

  /**
   * GET /public/bookings/:reference
   * Fetch booking details by reference number
   */
  getByReference: (reference: string) => `/public/bookings/${reference}`,

  /**
   * GET /public/bookings/my-bookings/:customerId
   * Fetch bookings for a customer id with pagination query
   */
  myBookings: (customerId: string) =>
    `/public/bookings/my-bookings/${customerId}`,
};

// ============================================================================
// PUBLIC ADDON ENDPOINTS
// ============================================================================

export const addonEndpoints = {
  /**
   * GET /public/addons
   * Fetch all available booking addons (insurance, GPS, helmet, etc)
   */
  list: () => "/public/addons",
};

// ============================================================================
// PUBLIC LOCATION ENDPOINTS
// ============================================================================

export const locationEndpoints = {
  /**
   * GET /public/locations
   * Fetch all pickup/dropoff locations
   */
  list: () => "/public/locations",
};

// ============================================================================
// PUBLIC VOUCHER ENDPOINTS
// ============================================================================

export const voucherEndpoints = {
  /**
   * POST /public/vouchers/validate
   * Validate a voucher code and get discount details
   * Body: { code: string, bookingValue?: number }
   */
  validate: () => "/public/vouchers/validate",
};

// ============================================================================
// ADMIN AUTHENTICATION ENDPOINTS
// ============================================================================

export const adminAuthEndpoints = {
  /**
   * POST /admin/auth/login
   * Admin login with email and password
   * Returns JWT token
   */
  login: () => "/admin/auth/login",

  /**
   * POST /admin/auth/refresh
   * Refresh JWT token
   */
  refresh: () => "/admin/auth/refresh",

  /**
   * POST /admin/auth/logout
   * Admin logout
   */
  logout: () => "/admin/auth/logout",

  /**
   * GET /admin/auth/me
   * Get current admin user info
   */
  me: () => "/admin/auth/me",
};

// ============================================================================
// ADMIN VEHICLE ENDPOINTS
// ============================================================================

export const adminVehicleEndpoints = {
  /**
   * GET /admin/vehicles
   * List all vehicles (admin view, includes unavailable)
   */
  list: () => "/admin/vehicles",

  /**
   * POST /admin/vehicles
   * Create new vehicle
   */
  create: () => "/admin/vehicles",

  /**
   * GET /admin/vehicles/:id
   * Get vehicle details (admin view)
   */
  detail: (id: string) => `/admin/vehicles/${id}`,

  /**
   * PATCH /admin/vehicles/:id
   * Update vehicle details
   */
  update: (id: string) => `/admin/vehicles/${id}`,

  /**
   * POST /admin/vehicles/:id/images
   * Add images to vehicle
   */
  addImages: (id: string) => `/admin/vehicles/${id}/images`,

  /**
   * DELETE /admin/vehicles/:id/images/:imageId
   * Delete vehicle image
   */
  deleteImage: (id: string, imageId: string) =>
    `/admin/vehicles/${id}/images/${imageId}`,

  /**
   * PATCH /admin/vehicles/:id/status
   * Change vehicle status (available, maintenance, etc)
   */
  updateStatus: (id: string) => `/admin/vehicles/${id}/status`,

  /**
   * PATCH /admin/vehicles/:id/images/reorder
   */
  reorderImages: (id: string) => `/admin/vehicles/${id}/images/reorder`,

  /**
   * POST /admin/vehicles/:id/features
   */
  addFeature: (id: string) => `/admin/vehicles/${id}/features`,

  /**
   * DELETE /admin/vehicles/:id/features/:featureId
   */
  deleteFeature: (id: string, featureId: string) =>
    `/admin/vehicles/${id}/features/${featureId}`,
};

// ============================================================================
// ADMIN BOOKING ENDPOINTS
// ============================================================================

export const adminBookingEndpoints = {
  /**
   * GET /admin/bookings
   * List all bookings with filters
   */
  list: () => "/admin/bookings",

  /**
   * GET /admin/bookings/:reference
   * Get booking details by reference
   */
  detail: (reference: string) => `/admin/bookings/${reference}`,

  /**
   * PATCH /admin/bookings/:id/status
   * Update booking status
   */
  updateStatus: (id: string) => `/admin/bookings/${id}/status`,
};

// ============================================================================
// ADMIN CUSTOMER ENDPOINTS
// ============================================================================

export const adminCustomerEndpoints = {
  /**
   * GET /admin/customers
   * List all customers
   */
  list: () => "/admin/customers",

  /**
   * GET /admin/customers/:id
   * Get customer details
   */
  detail: (id: string) => `/admin/customers/${id}`,

  /**
   * POST /admin/customers
   * Create new customer
   */
  create: () => "/admin/customers",

  /**
   * PUT /admin/customers/:id
   * Update customer
   */
  update: (id: string) => `/admin/customers/${id}`,

  /**
   * PATCH /admin/customers/:id/status
   * Update customer status (active, flagged, blocked)
   */
  updateStatus: (id: string) => `/admin/customers/${id}/status`,
};

// ============================================================================
// ADMIN VOUCHER ENDPOINTS
// ============================================================================

export const adminVoucherEndpoints = {
  /**
   * GET /admin/vouchers
   * List all vouchers
   */
  list: () => "/admin/vouchers",

  /**
   * POST /admin/vouchers
   * Create new voucher
   */
  create: () => "/admin/vouchers",

  /**
   * PUT /admin/vouchers/:id
   * Update voucher
   */
  update: (id: string) => `/admin/vouchers/${id}`,

  /**
   * DELETE /admin/vouchers/:id
   * Delete voucher
   */
  delete: (id: string) => `/admin/vouchers/${id}`,
};

// ============================================================================
// ADMIN FINANCE ENDPOINTS
// ============================================================================

export const adminFinanceEndpoints = {
  /**
   * GET /admin/finance/dashboard
   * Get finance dashboard KPIs
   */
  dashboard: () => "/admin/finance/dashboard",

  /**
   * GET /admin/finance/records
   * Get finance records with filters
   */
  records: () => "/admin/finance/records",

  /**
   * GET /admin/finance/revenue
   * Get revenue report
   */
  revenue: () => "/admin/finance/revenue",
};

// ============================================================================
// DEFAULT EXPORT - All endpoints grouped
// ============================================================================

export const apiEndpoints = {
  vehicle: vehicleEndpoints,
  booking: bookingEndpoints,
  addon: addonEndpoints,
  location: locationEndpoints,
  voucher: voucherEndpoints,
  adminAuth: adminAuthEndpoints,
  adminVehicle: adminVehicleEndpoints,
  adminBooking: adminBookingEndpoints,
  adminCustomer: adminCustomerEndpoints,
  adminVoucher: adminVoucherEndpoints,
  adminFinance: adminFinanceEndpoints,
};

export default apiEndpoints;
