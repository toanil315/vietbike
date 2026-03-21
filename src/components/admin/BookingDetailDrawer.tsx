'use client';

import { X, Mail, Phone, Bike, ShieldCheck, CheckCircle2, User } from 'lucide-react';
import { Customer, Vehicle, Booking, BookingStatus } from '@/types';
import { ADDONS } from '@/data/mockData';
import { formatPrice, formatDate, cn } from '@/lib/utils';
import Image from 'next/image';

// Replicate the status colors from the page for consistency
const statusColors: Record<BookingStatus, string> = {
  pending: 'bg-orange-100 text-orange-700',
  confirmed: 'bg-blue-100 text-blue-700',
  active: 'bg-emerald-100 text-emerald-700',
  completed: 'bg-slate-100 text-slate-700',
  cancelled: 'bg-error/10 text-error'
};

interface BookingDetailDrawerProps {
  booking: Booking;
  customer: Customer;
  vehicle: Vehicle;
  onClose: () => void;
}

export default function BookingDetailDrawer({ booking, customer, vehicle, onClose }: BookingDetailDrawerProps) {
  return (
    <div className="absolute top-0 right-0 bottom-0 w-[400px] bg-white border-l border-outline-variant/15 shadow-2xl z-20 flex flex-col animate-in slide-in-from-right duration-300">
      <div className="p-6 border-b border-outline-variant/10 flex items-center justify-between">
        <div>
          <h2 className="font-bold text-lg text-on-surface">Chi tiết đặt xe</h2>
          <p className="text-sm font-bold text-primary">{booking.referenceNumber}</p>
        </div>
        <button 
          onClick={onClose}
          className="p-2 rounded-full hover:bg-surface-container transition-default"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Status Section */}
        <div className="flex items-center justify-between bg-surface-container/30 p-4 rounded-2xl">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">Trạng thái</p>
            <span className={cn(
              "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-block",
              statusColors[booking.status]
            )}>
              {booking.status === 'pending' ? 'Chờ xác nhận' : 
               booking.status === 'confirmed' ? 'Đã xác nhận' :
               booking.status === 'active' ? 'Đang thuê' :
               booking.status === 'completed' ? 'Hoàn thành' : 'Đã hủy'}
            </span>
          </div>
          <div className="text-right space-y-1">
            <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">Thanh toán</p>
            <div className="flex items-center gap-1 text-emerald-600 font-bold text-xs">
              <CheckCircle2 size={14} />
              <span>Đã thanh toán</span>
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-[10px] font-bold text-secondary uppercase tracking-widest">
            <User size={12} />
            <span>Thông tin khách hàng</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-surface-container overflow-hidden">
              <Image src={customer.avatar || 'https://i.pravatar.cc/150'} alt={customer.name} className="w-full h-full object-cover" referrerPolicy="no-referrer"  width={800} height={600}/>
            </div>
            <div>
              <p className="font-bold text-on-surface">{customer.name}</p>
              <p className="text-xs text-secondary">{customer.nationality} • {customer.passportNumber}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-surface-container text-xs font-bold text-on-surface hover:bg-outline-variant/10 transition-default">
              <Mail size={14} />
              Nhắn tin
            </button>
            <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-surface-container text-xs font-bold text-on-surface hover:bg-outline-variant/10 transition-default">
              <Phone size={14} />
              Gọi điện
            </button>
          </div>
        </div>

        {/* Vehicle Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-[10px] font-bold text-secondary uppercase tracking-widest">
            <Bike size={12} />
            <span>Thông tin xe thuê</span>
          </div>
          <div className="bg-surface-container/20 border border-outline-variant/10 rounded-2xl p-3 flex items-center gap-4">
            <div className="w-20 h-14 rounded-xl overflow-hidden shrink-0">
              <Image src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover" referrerPolicy="no-referrer"  width={800} height={600}/>
            </div>
            <div>
              <p className="font-bold text-on-surface text-sm">{vehicle.name}</p>
              <p className="text-[10px] text-secondary">Biển số: {vehicle.plate || '29A-123.45'}</p>
              <p className="text-[10px] font-bold text-emerald-500">Có sẵn tại Phố Cổ</p>
            </div>
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">Nhận xe</p>
            <p className="font-bold text-on-surface text-sm">{formatDate(booking.startDate)}</p>
            <p className="text-xs text-secondary">09:00 AM</p>
          </div>
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">Trả xe</p>
            <p className="font-bold text-on-surface text-sm">{formatDate(booking.endDate)}</p>
            <p className="text-xs text-secondary">06:00 PM</p>
          </div>
        </div>

        {/* Add-ons */}
        <div className="space-y-4">
          <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">Dịch vụ thêm</p>
          <div className="space-y-3">
            {booking.addons.map(addonId => {
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
            <span>Giá thuê ngày ({formatPrice(vehicle.pricePerDay)} × 3 ngày)</span>
            <span>{formatPrice(vehicle.pricePerDay * 3)}</span>
          </div>
          <div className="flex justify-between text-sm text-secondary">
            <span>Phụ phí thêm...</span>
            <span>-</span>
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="font-bold text-on-surface">Tổng cộng</span>
            <span className="text-2xl font-bold text-primary">{formatPrice(booking.totalPrice)}</span>
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-outline-variant/10 grid grid-cols-2 gap-4">
        <button className="py-3 rounded-xl border border-outline-variant/30 text-sm font-bold text-on-surface hover:bg-surface-container transition-default">
          Xác nhận
        </button>
        <button className="py-3 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-container transition-default shadow-lg shadow-primary/20">
          Giao xe (Bắt đầu)
        </button>
      </div>
    </div>
  );
}
