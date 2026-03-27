import { Bike, CalendarCheck, TrendingUp, Users } from "lucide-react";
import { Booking, Vehicle } from "@/types";
import { cn, formatDate, formatPrice } from "@/lib/utils";

interface DashboardContentProps {
  vehicles: Vehicle[];
  vehicleTotal: number;
  bookings: Booking[];
  bookingTotal: number;
}

export default function AdminDashboardContent({
  vehicles,
  vehicleTotal,
  bookings,
  bookingTotal,
}: DashboardContentProps) {
  const availableVehicles = vehicles.filter(
    (vehicle) => vehicle.status === "available",
  ).length;
  const activeBookings = bookings.filter(
    (booking) => booking.status === "confirmed" || booking.status === "active",
  ).length;
  const totalRevenue = bookings.reduce(
    (sum, booking) => sum + Number(booking.totalAmount || 0),
    0,
  );

  const stats = [
    {
      name: "Doanh thu (trang hiện tại)",
      value: formatPrice(totalRevenue),
      icon: TrendingUp,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      name: "Đơn đang hoạt động",
      value: String(activeBookings),
      icon: CalendarCheck,
      color: "text-tertiary",
      bg: "bg-tertiary/10",
    },
    {
      name: "Tổng booking",
      value: String(bookingTotal),
      icon: Users,
      color: "text-secondary",
      bg: "bg-secondary/10",
    },
    {
      name: "Xe sẵn có",
      value: `${availableVehicles}/${vehicleTotal}`,
      icon: Bike,
      color: "text-primary",
      bg: "bg-primary/10",
    },
  ];

  const recentBookings = [...bookings]
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold">Tổng quan hệ thống</h1>
          <p className="text-secondary">
            Số liệu được đồng bộ từ backend theo dữ liệu hiện có.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            className="px-4 py-2 bg-white border border-outline-variant/15 rounded-xl text-sm font-bold hover:bg-surface-container transition-default"
          >
            Tải báo cáo
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary-container transition-default"
          >
            Quản lý đội xe
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="glass p-6 rounded-3xl space-y-4">
            <div className="flex justify-between items-start">
              <div
                className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center",
                  stat.bg,
                  stat.color,
                )}
              >
                <stat.icon size={24} />
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-secondary uppercase tracking-wider">
                {stat.name}
              </p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass p-8 rounded-3xl space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">Hiệu suất đơn đặt xe</h3>
            <span className="text-xs text-secondary">Nguồn: backend</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl p-5 bg-surface-container/40 border border-outline-variant/10">
              <p className="text-xs text-secondary uppercase tracking-wider">
                Cho xac nhan
              </p>
              <p className="text-2xl font-bold mt-2">
                {
                  bookings.filter((booking) => booking.status === "pending")
                    .length
                }
              </p>
            </div>
            <div className="rounded-2xl p-5 bg-surface-container/40 border border-outline-variant/10">
              <p className="text-xs text-secondary uppercase tracking-wider">
                Da xac nhan hoac dang thue
              </p>
              <p className="text-2xl font-bold mt-2">{activeBookings}</p>
            </div>
            <div className="rounded-2xl p-5 bg-surface-container/40 border border-outline-variant/10">
              <p className="text-xs text-secondary uppercase tracking-wider">
                Hoan thanh
              </p>
              <p className="text-2xl font-bold mt-2">
                {
                  bookings.filter((booking) => booking.status === "completed")
                    .length
                }
              </p>
            </div>
          </div>
        </div>

        <div className="glass p-8 rounded-3xl space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">Đơn đặt xe gần đây</h3>
            <button
              type="button"
              className="text-primary text-xs font-bold hover:underline"
            >
              Xem tất cả
            </button>
          </div>
          <div className="space-y-6">
            {recentBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-surface-container rounded-xl flex items-center justify-center text-primary font-bold text-xs">
                    {booking.reference.slice(-4)}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{booking.reference}</p>
                    <p className="text-xs text-secondary">
                      {formatDate(booking.pickupDate)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-primary">
                    {formatPrice(booking.totalAmount)}
                  </p>
                  <span
                    className={cn(
                      "text-[10px] font-bold uppercase px-2 py-0.5 rounded-full",
                      booking.status === "completed"
                        ? "bg-emerald-100 text-emerald-700"
                        : booking.status === "active" ||
                            booking.status === "confirmed"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-amber-100 text-amber-700",
                    )}
                  >
                    {booking.status === "completed"
                      ? "Hoàn thành"
                      : booking.status === "confirmed"
                        ? "Đã xác nhận"
                        : booking.status === "active"
                          ? "Đang thuê"
                          : booking.status === "pending"
                            ? "Chờ xác nhận"
                            : "Đã hủy"}
                  </span>
                </div>
              </div>
            ))}
            {recentBookings.length === 0 && (
              <p className="text-sm text-secondary">
                Chưa có dữ liệu booking gần đây.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
