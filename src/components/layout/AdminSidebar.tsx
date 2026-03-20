import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Bike, 
  CalendarCheck, 
  Users, 
  Ticket, 
  BarChart3, 
  Settings,
  LogOut,
  ChevronRight,
  Plus,
  HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminSidebar() {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
    { name: 'Bookings', icon: CalendarCheck, href: '/admin/bookings' },
    { name: 'Inventory', icon: Bike, href: '/admin/vehicles' },
    { name: 'Customers', icon: Users, href: '/admin/customers' },
    { name: 'Revenue', icon: BarChart3, href: '/admin/finance' },
    { name: 'Settings', icon: Settings, href: '/admin/settings' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-outline-variant/15 flex flex-col h-screen sticky top-0">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
            <Bike size={20} />
          </div>
          <span className="font-bold text-lg text-on-surface">VietBike Admin</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.href || (item.href !== '/admin' && location.pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-default group",
                isActive 
                  ? "bg-emerald-50 text-emerald-700" 
                  : "text-secondary hover:bg-surface-container"
              )}
            >
              <item.icon size={20} className={cn(isActive ? "text-emerald-600" : "text-secondary")} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 space-y-4">
        <Link 
          to="/admin/bookings/new"
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#006D5B] text-white font-bold text-sm shadow-lg shadow-emerald-900/10 hover:bg-[#005a4b] transition-default"
        >
          <Plus size={18} />
          <span>New Booking</span>
        </Link>

        <div className="space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-secondary hover:bg-surface-container transition-default">
            <HelpCircle size={20} />
            <span className="font-medium">Support</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-secondary hover:bg-surface-container transition-default">
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
