import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  ChevronLeft, 
  ChevronRight,
  Download,
  Upload,
  Bike
} from 'lucide-react';
import { VEHICLES } from '@/data/mockData';
import { formatPrice, cn } from '@/lib/utils';
import { VehicleStatus } from '@/types';

export default function AdminVehiclesPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All Status');
  const [typeFilter, setTypeFilter] = useState<string>('All Types');
  const [locationFilter, setLocationFilter] = useState<string>('All Locations');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredVehicles = useMemo(() => {
    return VEHICLES.filter(v => {
      const matchesSearch = v.name.toLowerCase().includes(search.toLowerCase()) || 
                            v.id.toLowerCase().includes(search.toLowerCase()) ||
                            (v.brand && v.brand.toLowerCase().includes(search.toLowerCase()));
      const matchesStatus = statusFilter === 'All Status' || v.status === statusFilter.toLowerCase();
      const matchesType = typeFilter === 'All Types' || v.type === typeFilter.toLowerCase() || v.category === typeFilter.toLowerCase();
      const matchesLocation = locationFilter === 'All Locations' || (v.location && v.location.includes(locationFilter));
      
      return matchesSearch && matchesStatus && matchesType && matchesLocation;
    });
  }, [search, statusFilter, typeFilter, locationFilter]);

  const statusColors: Record<VehicleStatus, string> = {
    available: 'bg-emerald-100 text-emerald-700',
    rented: 'bg-blue-100 text-blue-700',
    maintenance: 'bg-orange-100 text-orange-700',
    unavailable: 'bg-slate-100 text-slate-700'
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-on-surface">Vehicles</h1>
          <p className="text-secondary">Manage your motorbike fleet and availability.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-outline-variant/20 text-sm font-bold text-secondary hover:bg-surface-container transition-default">
            <Upload size={18} />
            Import CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-outline-variant/20 text-sm font-bold text-secondary hover:bg-surface-container transition-default">
            <Download size={18} />
            Export
          </button>
          <Link 
            to="/admin/vehicles/new"
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-container transition-default shadow-lg shadow-primary/20"
          >
            <Plus size={18} />
            Add Vehicle
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-3xl border border-outline-variant/10 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[300px] relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" />
            <input 
              type="text" 
              placeholder="Search by name, plate, or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-surface-container/50 border border-outline-variant/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-surface-container/50 border border-outline-variant/20 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none"
          >
            <option>All Status</option>
            <option>Available</option>
            <option>Rented</option>
            <option>Maintenance</option>
          </select>

          <select 
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-surface-container/50 border border-outline-variant/20 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none"
          >
            <option>All Types</option>
            <option>Automatic</option>
            <option>Manual</option>
            <option>Electric</option>
          </select>

          <select 
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="bg-surface-container/50 border border-outline-variant/20 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none"
          >
            <option>All Locations</option>
            <option>Ho Chi Minh</option>
            <option>Hanoi</option>
            <option>Da Nang</option>
          </select>

          <button className="p-3 rounded-xl bg-surface-container/50 border border-outline-variant/20 text-secondary hover:text-primary transition-default">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-outline-variant/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container/30 border-b border-outline-variant/10">
                <th className="px-6 py-4 text-[10px] font-bold text-secondary uppercase tracking-widest">
                  <input type="checkbox" className="rounded border-outline-variant/30 text-primary focus:ring-primary" />
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-secondary uppercase tracking-widest">Vehicle</th>
                <th className="px-6 py-4 text-[10px] font-bold text-secondary uppercase tracking-widest">Type</th>
                <th className="px-6 py-4 text-[10px] font-bold text-secondary uppercase tracking-widest">Plate</th>
                <th className="px-6 py-4 text-[10px] font-bold text-secondary uppercase tracking-widest">Location</th>
                <th className="px-6 py-4 text-[10px] font-bold text-secondary uppercase tracking-widest text-right">Daily Price</th>
                <th className="px-6 py-4 text-[10px] font-bold text-secondary uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-secondary uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {filteredVehicles.map((vehicle) => (
                <tr key={vehicle.id} className="hover:bg-surface-container/20 transition-colors group">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded border-outline-variant/30 text-primary focus:ring-primary" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-outline-variant/10 shrink-0">
                        <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <p className="font-bold text-on-surface">{vehicle.name}</p>
                        <p className="text-[10px] text-secondary font-medium uppercase tracking-tighter">ID: {vehicle.id.toUpperCase()}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-md bg-surface-container text-[10px] font-bold text-secondary uppercase tracking-wider">
                      {vehicle.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-on-surface">
                    {/* Mock plate number as it's not in the type */}
                    {Math.floor(Math.random() * 90 + 10)}-{String.fromCharCode(65 + Math.floor(Math.random() * 26))}{Math.floor(Math.random() * 9 + 1)} {Math.floor(Math.random() * 900 + 100)}.{Math.floor(Math.random() * 90 + 10)}
                  </td>
                  <td className="px-6 py-4 text-sm text-secondary">
                    {vehicle.location?.split(',')[0] || 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-on-surface text-right">
                    {formatPrice(vehicle.pricePerDay)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      statusColors[vehicle.status]
                    )}>
                      {vehicle.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link 
                        to={`/admin/vehicles/${vehicle.id}`}
                        className="p-2 rounded-lg text-secondary hover:bg-primary/10 hover:text-primary transition-default"
                      >
                        <MoreVertical size={18} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 bg-surface-container/10 border-t border-outline-variant/10 flex items-center justify-between">
          <p className="text-sm text-secondary">
            Showing <span className="font-bold text-on-surface">1-{filteredVehicles.length}</span> of <span className="font-bold text-on-surface">{filteredVehicles.length}</span>
          </p>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg border border-outline-variant/20 text-secondary hover:bg-white transition-default disabled:opacity-50" disabled>
              <ChevronLeft size={18} />
            </button>
            <button className="w-8 h-8 rounded-lg bg-primary text-white text-sm font-bold">1</button>
            <button className="w-8 h-8 rounded-lg text-sm font-bold text-secondary hover:bg-white transition-default">2</button>
            <button className="w-8 h-8 rounded-lg text-sm font-bold text-secondary hover:bg-white transition-default">3</button>
            <span className="text-secondary">...</span>
            <button className="w-8 h-8 rounded-lg text-sm font-bold text-secondary hover:bg-white transition-default">8</button>
            <button className="p-2 rounded-lg border border-outline-variant/20 text-secondary hover:bg-white transition-default">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
