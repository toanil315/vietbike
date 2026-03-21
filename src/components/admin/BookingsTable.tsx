'use client';
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
import Link from 'next/link';
import { BOOKINGS, CUSTOMERS, VEHICLES, ADDONS } from '@/data/mockData';
import { cn, formatPrice, formatDate } from '@/lib/utils';
import { Booking, Customer, Vehicle, BookingStatus } from '@/types';
import BookingDetailDrawer from './BookingDetailDrawer';
import Image from 'next/image';

export default function BookingsTable() {
  const [search, setSearch] = useState('');
  const [bikeSearch, setBikeSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('Tất cả trạng thái');
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
      
      const matchesStatus = statusFilter === 'Tất cả trạng thái' || b.status === statusFilter.toLowerCase();
      
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
          <h1 className="text-3xl font-bold text-on-surface">Quản lý đặt xe</h1>
          <p className="text-secondary">Theo dõi và xử lý các yêu cầu thuê xe hệ thống.</p>
        </div>
        <Link 
          href="/admin/bookings/new"
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary-container transition-default"
        >
          <Plus size={18} />
          <span>Tạo đơn mới</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-3xl border border-outline-variant/10 shadow-sm space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" />
            <input 
              type="text" 
              placeholder="Tìm theo Mã đơn hoặc Tên khách..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-surface-container/50 border border-outline-variant/20 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="w-64 relative">
            <Bike size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" />
            <input 
              type="text" 
              placeholder="Tên xe hoặc ID..."
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
            <option>Tất cả trạng thái</option>
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
            <span className="text-sm font-bold text-on-surface">Khoảng ngày:</span>
          </div>
          <div className="flex items-center gap-2">
            <input 
              type="date" 
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-surface-container/50 border border-outline-variant/20 rounded-xl py-2 px-3 text-xs focus:outline-none"
            />
            <span className="text-secondary text-xs">đến</span>
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
                <th className="px-6 py-4 text-[10px] font-bold text-secondary uppercase tracking-widest">Mã đơn</th>
                <th className="px-6 py-4 text-[10px] font-bold text-secondary uppercase tracking-widest">Khách hàng</th>
                <th className="px-6 py-4 text-[10px] font-bold text-secondary uppercase tracking-widest">Xe thuê</th>
                <th className="px-6 py-4 text-[10px] font-bold text-secondary uppercase tracking-widest">Ngày thuê/trả</th>
                <th className="px-6 py-4 text-[10px] font-bold text-secondary uppercase tracking-widest text-right">Thao tác</th>
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
                            <Image src={customer.avatar} alt={customer.name} className="w-full h-full object-cover" referrerPolicy="no-referrer"  width={800} height={600}/>
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
                        <p className="text-xs text-secondary">Biển số: 29A-123.45</p>
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
          <p className="text-xs text-secondary">Đang hiển thị 1 đến {filteredBookings.length} trên tổng số 248 mục</p>
        </div>
      </div>

      {/* Booking Details Drawer */}
      {selectedBooking && selectedCustomer && selectedVehicle && (
        <BookingDetailDrawer
          booking={selectedBooking}
          customer={selectedCustomer}
          vehicle={selectedVehicle}
          onClose={() => setSelectedBookingId(null)}
        />
      )}
    </div>
  );
}
