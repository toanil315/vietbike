import { Search, Bell, User } from 'lucide-react';

export default function AdminHeader() {
  return (
    <header className="h-16 glass border-b border-outline-variant/15 flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex items-center gap-4 w-96">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={18} />
          <input 
            type="text" 
            placeholder="Search anything..." 
            className="w-full bg-surface-container border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-default"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-default">
          <Bell size={20} className="text-secondary" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-tertiary rounded-full border-2 border-white"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-6 border-l border-outline-variant/15">
          <div className="text-right">
            <p className="text-sm font-semibold text-on-surface">Admin User</p>
            <p className="text-xs text-secondary">Super Admin</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
}
