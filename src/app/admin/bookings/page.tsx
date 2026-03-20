import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ChevronRight, 
  X, 
  Mail, 
  Phone, 
  Bike, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Play,
  MoreVertical,
  User,
  MapPin,
  CreditCard,
  Banknote,
  Plus,
  CalendarDays
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { BOOKINGS, CUSTOMERS, VEHICLES, ADDONS } from '@/data/mockData';
import { cn, formatPrice, formatDate } from '@/lib/utils';
import { Booking, Customer, Vehicle, BookingStatus } from '@/types';

export default function AdminBookingsPage() {
  const [search, setSearch] = useState('');
  const [bikeSearch, setBikeSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All Status');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);

  const filteredBookings = useMemo(() => {
    return BOOKINGS.filter(b => {
      const customer = CUSTOMERS.find(c => c.id === b.customerId);
      const vehicle = VEHICLES.find(v => v.id === b.vehicleId);
      
      const matchesSearch = b.referenceNumber.toLowerCase().includes(search.toLowerCase()) || 
                            customer?.name.toLowerCase().includes(search.toLowerCase());
      
      const matchesBike = !bikeSearch || 
                          vehicle?.name.toLowerCase().includes(bikeSearch.toLowerCase()) ||
                          vehicle?.id.toLowerCase().includes(bikeSearch.toLowerCase());
      
      const matchesStatus = statusFilter === 'All Status' || b.status === statusFilter.toLowerCase();
      
      const matchesDate = (!startDate || b.startDate >= startDate) && 
                          (!endDate || b.startDate <= endDate);

      return matchesSearch && matchesBike && matchesStatus && matchesDate;
    });
  }, [search, bikeSearch, statusFilter, startDate, endDate]);

  const selectedBooking = useMemo(() => 
    BOOKINGS.find(b => b.id === selectedBookingId), 
    [selectedBookingId]
  );

  const selectedCustomer = useMemo(() => 
    selectedBooking ? CUSTOMERS.find(c => c.id === selectedBooking.customerId) : null,
    [selectedBooking]
  );

  const selectedVehicle = useMemo(() => 
    selectedBooking ? VEHICLES.find(v => v.id === selectedBooking.vehicleId) : null,
    [selectedBooking]
  );

  const statusColors: Record<BookingStatus, string> = {
    pending: 'bg-orange-100 text-orange-700',
    confirmed: 'bg-blue-100 text-blue-700',
    active: 'bg-emerald-100 text-emerald-700',
    completed: 'bg-slate-100 text-slate-700',
    cancelled: 'bg-error/10 text-error'
  };

  return (
    <div className="relative h-full flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-on-surface">Booking Management</h1>
          <p className="text-secondary">Monitor and process rental reservations</p>
        </div>
        <Link 
          to="/admin/bookings/new"
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary-container transition-default"
        >
          <Plus size={18} />
          <span>New Booking</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-3xl border border-outline-variant/10 shadow-sm space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" />
            <input 
              type="text" 
              placeholder="Search by Ref or Customer Name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-surface-container/50 border border-outline-variant/20 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="w-64 relative">
            <Bike size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" />
            <input 
              type="text" 
              placeholder="Bike Name or ID..."
              value={bikeSearch}
              onChange={(e) => setBikeSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-surface-container/50 border border-outline-variant/20 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-surface-container/50 border border-outline-variant/20 rounded-2xl py-3 px-4 text-sm font-medium focus:outline-none"
          >
            <option>All Status</option>
            <option>Pending</option>
            <option>Confirmed</option>
            <option>Active</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
        </div>

        <div className="flex items-center gap-4 pt-2 border-t border-outline-variant/10">
          <div className="flex items-center gap-3">
            <CalendarDays size={18} className="text-secondary" />
            <span className="text-sm font-bold text-on-surface">Date Range:</span>
          </div>
          <div className="flex items-center gap-2">
            <input 
              type="date" 
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-surface-container/50 border border-outline-variant/20 rounded-xl py-2 px-3 text-xs focus:outline-none"
            />
            <span className="text-secondary text-xs">to</span>
            <input 
              type="date" 
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-surface-container/50 border border-outline-variant/20 rounded-xl py-2 px-3 text-xs focus:outline-none"
            />
          </div>
          {(startDate || endDate || search || bikeSearch || statusFilter !== 'All Status') && (
            <button 
              onClick={() => {
                setSearch('');
                setBikeSearch('');
                setStatusFilter('All Status');
                setStartDate('');
                setEndDate('');
              }}
              className="ml-auto text-xs font-bold text-primary hover:underline"
            >
              Clear All Filters
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-outline-variant/10 shadow-sm overflow-hidden flex-1">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container/30 border-b border-outline-variant/10">
                <th className="px-6 py-4 text-[10px] font-bold text-secondary uppercase tracking-widest">Ref</th>
                <th className="px-6 py-4 text-[10px] font-bold text-secondary uppercase tracking-widest">Customer</th>
                <th className="px-6 py-4 text-[10px] font-bold text-secondary uppercase tracking-widest">Vehicle</th>
                <th className="px-6 py-4 text-[10px] font-bold text-secondary uppercase tracking-widest">Dates</th>
                <th className="px-6 py-4 text-[10px] font-bold text-secondary uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {filteredBookings.map((booking) => {
                const customer = CUSTOMERS.find(c => c.id === booking.customerId);
                const vehicle = VEHICLES.find(v => v.id === booking.vehicleId);
                return (
                  <tr 
                    key={booking.id} 
                    className={cn(
                      "hover:bg-surface-container/20 transition-colors cursor-pointer group",
                      selectedBookingId === booking.id && "bg-primary/5"
                    )}
                    onClick={() => setSelectedBookingId(booking.id)}
                  >
                    <td className="px-6 py-6">
                      <span className="font-bold text-primary">{booking.referenceNumber}</span>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-secondary font-bold text-xs overflow-hidden">
                          {customer?.avatar ? (
                            <img src={customer.avatar} alt={customer.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          ) : (
                            customer?.name.split(' ').map(n => n[0]).join('')
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-on-surface text-sm">{customer?.name}</p>
                          <p className="text-xs text-secondary">{customer?.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div>
                        <p className="font-bold text-on-surface text-sm">{vehicle?.name}</p>
                        <p className="text-xs text-secondary">Plate: 29A-123.45</p>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-secondary">
                          <Play size={10} className="text-emerald-500 rotate-[-45deg]" />
                          <span>{formatDate(booking.startDate)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-secondary">
                          <Play size={10} className="text-error rotate-[135deg]" />
                          <span>{formatDate(booking.endDate)}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-right">
                      <button className="p-2 rounded-lg text-secondary hover:bg-surface-container transition-default">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-outline-variant/10">
          <p className="text-xs text-secondary">Showing 1 to {filteredBookings.length} of 248 entries</p>
        </div>
      </div>

      {/* Booking Details Drawer */}
      {selectedBooking && selectedCustomer && selectedVehicle && (
        <div className="absolute top-0 right-0 bottom-0 w-[400px] bg-white border-l border-outline-variant/15 shadow-2xl z-20 flex flex-col animate-in slide-in-from-right duration-300">
          <div className="p-6 border-b border-outline-variant/10 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-lg text-on-surface">Booking Details</h2>
              <p className="text-sm font-bold text-primary">{selectedBooking.referenceNumber}</p>
            </div>
            <button 
              onClick={() => setSelectedBookingId(null)}
              className="p-2 rounded-full hover:bg-surface-container transition-default"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {/* Status Section */}
            <div className="flex items-center justify-between bg-surface-container/30 p-4 rounded-2xl">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">Status</p>
                <span className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-block",
                  statusColors[selectedBooking.status]
                )}>
                  {selectedBooking.status}
                </span>
              </div>
              <div className="text-right space-y-1">
                <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">Payment</p>
                <div className="flex items-center gap-1 text-emerald-600 font-bold text-xs">
                  <CheckCircle2 size={14} />
                  <span>Fully Paid</span>
                </div>
              </div>
            </div>

            {/* Customer Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[10px] font-bold text-secondary uppercase tracking-widest">
                <User size={12} />
                <span>Customer Information</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-surface-container overflow-hidden">
                  <img src={selectedCustomer.avatar} alt={selectedCustomer.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <p className="font-bold text-on-surface">{selectedCustomer.name}</p>
                  <p className="text-xs text-secondary">{selectedCustomer.nationality} • {selectedCustomer.passportNumber}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-surface-container text-xs font-bold text-on-surface hover:bg-outline-variant/10 transition-default">
                  <Mail size={14} />
                  Message
                </button>
                <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-surface-container text-xs font-bold text-on-surface hover:bg-outline-variant/10 transition-default">
                  <Phone size={14} />
                  Call
                </button>
              </div>
            </div>

            {/* Vehicle Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[10px] font-bold text-secondary uppercase tracking-widest">
                <Bike size={12} />
                <span>Vehicle Information</span>
              </div>
              <div className="bg-surface-container/20 border border-outline-variant/10 rounded-2xl p-3 flex items-center gap-4">
                <div className="w-20 h-14 rounded-xl overflow-hidden shrink-0">
                  <img src={selectedVehicle.image} alt={selectedVehicle.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <p className="font-bold text-on-surface text-sm">{selectedVehicle.name}</p>
                  <p className="text-[10px] text-secondary">License: 29A-123.45</p>
                  <p className="text-[10px] font-bold text-emerald-500">Available at Old Quarter</p>
                </div>
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">Pick-up</p>
                <p className="font-bold text-on-surface text-sm">{formatDate(selectedBooking.startDate)}</p>
                <p className="text-xs text-secondary">09:00 AM</p>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">Return</p>
                <p className="font-bold text-on-surface text-sm">{formatDate(selectedBooking.endDate)}</p>
                <p className="text-xs text-secondary">06:00 PM</p>
              </div>
            </div>

            {/* Add-ons */}
            <div className="space-y-4">
              <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">Add-ons</p>
              <div className="space-y-3">
                {selectedBooking.addons.map(addonId => {
                  const addon = ADDONS.find(a => a.id === addonId);
                  return (
                    <div key={addonId} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-secondary">
                        <ShieldCheck size={14} />
                        <span>{addon?.name}</span>
                      </div>
                      <span className="font-bold text-on-surface">{formatPrice(addon?.price || 0)}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="pt-6 border-t border-outline-variant/10 space-y-3">
              <div className="flex justify-between text-sm text-secondary">
                <span>Daily Rate ($40 × 3 days)</span>
                <span>$120.00</span>
              </div>
              <div className="flex justify-between text-sm text-secondary">
                <span>Insurance</span>
                <span>$25.00</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="font-bold text-on-surface">Total Amount</span>
                <span className="text-2xl font-bold text-primary">$145.00</span>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-outline-variant/10 grid grid-cols-2 gap-4">
            <button className="py-3 rounded-xl border border-outline-variant/30 text-sm font-bold text-on-surface hover:bg-surface-container transition-default">
              Confirm
            </button>
            <button className="py-3 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-container transition-default shadow-lg shadow-primary/20">
              Start Rental
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
