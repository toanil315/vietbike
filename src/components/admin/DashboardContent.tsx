'use client';

import { 
  TrendingUp, 
  Users, 
  Bike, 
  CalendarCheck, 
  ArrowUpRight, 
  ArrowDownRight
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { REVENUE_DATA } from '@/data/mockFinance';
import { BOOKINGS } from '@/data/mockBookings';
import { formatPrice, cn } from '@/lib/utils';

export default function AdminDashboardContent() {
  const stats = [
    { name: 'Tổng doanh thu', value: '142.5M VND', change: '+12.5%', icon: TrendingUp, color: 'text-primary', bg: 'bg-primary/10' },
    { name: 'Đơn đang hoạt động', value: '24', change: '+4.2%', icon: CalendarCheck, color: 'text-tertiary', bg: 'bg-tertiary/10' },
    { name: 'Tổng khách hàng', value: '1,284', change: '+18.3%', icon: Users, color: 'text-secondary', bg: 'bg-secondary/10' },
    { name: 'Xe sẵn có', value: '42/50', change: '-2.1%', icon: Bike, color: 'text-primary', bg: 'bg-primary/10' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold">Tổng quan hệ thống</h1>
          <p className="text-secondary">Chào mừng bạn trở lại, sau đây là tình hình hoạt động hôm nay.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-outline-variant/15 rounded-xl text-sm font-bold hover:bg-surface-container transition-default">
            Tải báo cáo
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary-container transition-default">
            Quản lý đội xe
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="glass p-6 rounded-3xl space-y-4">
            <div className="flex justify-between items-start">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", stat.bg, stat.color)}>
                <stat.icon size={24} />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
                stat.change.startsWith('+') ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
              )}>
                {stat.change.startsWith('+') ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {stat.change}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-secondary uppercase tracking-wider">{stat.name}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 glass p-8 rounded-3xl space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">Biểu đồ doanh thu</h3>
            <select className="bg-surface-container border-none rounded-lg text-xs font-bold py-1 px-3">
              <option>6 tháng qua</option>
              <option>Năm qua</option>
            </select>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00685f" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00685f" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eaedff" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#505f76'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#505f76'}} tickFormatter={(v) => `${v/1000000}M`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 40px rgba(19, 27, 46, 0.06)' }}
                  formatter={(v: any) => [formatPrice(Number(v)), 'Doanh thu']}
                />
                <Area type="monotone" dataKey="revenue" stroke="#00685f" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="glass p-8 rounded-3xl space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">Đơn đặt xe gần đây</h3>
            <button className="text-primary text-xs font-bold hover:underline">Xem tất cả</button>
          </div>
          <div className="space-y-6">
            {BOOKINGS.slice(0, 5).map((booking) => (
              <div key={booking.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-surface-container rounded-xl flex items-center justify-center text-primary font-bold text-xs">
                    {booking.referenceNumber.split('-')[1]}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{booking.referenceNumber}</p>
                    <p className="text-xs text-secondary">{booking.startDate}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-primary">{formatPrice(booking.totalPrice)}</p>
                  <span className={cn(
                    "text-[10px] font-bold uppercase px-2 py-0.5 rounded-full",
                    booking.status === 'completed' ? "bg-emerald-100 text-emerald-700" : 
                    booking.status === 'active' ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"
                  )}>
                    {booking.status === 'completed' ? 'Hoàn thành' : 
                     booking.status === 'confirmed' ? 'Đã xác nhận' :
                     booking.status === 'active' ? 'Đang thuê' :
                     booking.status === 'pending' ? 'Chờ xác nhận' : 'Đã hủy'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
