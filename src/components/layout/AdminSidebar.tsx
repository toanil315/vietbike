"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Bike,
  CalendarCheck,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Plus,
  HelpCircle,
  Tags,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);

    try {
      await fetch("/api/admin/auth/logout", {
        method: "POST",
      });
    } finally {
      router.replace("/admin/login");
      router.refresh();
      setIsLoggingOut(false);
    }
  }

  const menuItems = [
    { name: "Tổng quan", icon: LayoutDashboard, href: "/admin" },
    { name: "Đặt xe", icon: CalendarCheck, href: "/admin/bookings" },
    { name: "Kho xe", icon: Bike, href: "/admin/vehicles" },
    { name: "Danh mục xe", icon: Tags, href: "/admin/categories" },
    { name: "Khách hàng", icon: Users, href: "/admin/customers" },
    { name: "Doanh thu", icon: BarChart3, href: "/admin/finance" },
    { name: "Cài đặt", icon: Settings, href: "/admin/settings" },
  ];

  return (
    <aside className="w-64 bg-white border-r border-outline-variant/15 flex flex-col h-screen sticky top-0">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
            <Bike size={20} />
          </div>
          <span className="font-bold text-lg text-on-surface">
            VietBike Admin
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-default group",
                isActive
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-secondary hover:bg-surface-container",
              )}
            >
              <item.icon
                size={20}
                className={cn(isActive ? "text-emerald-600" : "text-secondary")}
              />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 space-y-4">
        <Link
          href="/admin/bookings/new"
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#006D5B] text-white font-bold text-sm shadow-lg shadow-emerald-900/10 hover:bg-[#005a4b] transition-default"
        >
          <Plus size={18} />
          <span>Tạo đơn đặt xe</span>
        </Link>

        <div className="space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-secondary hover:bg-surface-container transition-default">
            <HelpCircle size={20} />
            <span className="font-medium">Hỗ trợ</span>
          </button>
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-secondary hover:bg-surface-container transition-default disabled:opacity-60"
          >
            <LogOut size={20} />
            <span className="font-medium">
              {isLoggingOut ? "Đang đăng xuất..." : "Đăng xuất"}
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
}
