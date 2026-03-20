import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { 
  ChevronLeft, 
  Upload, 
  Plus, 
  X, 
  Info, 
  DollarSign, 
  MapPin, 
  Image as ImageIcon, 
  Zap, 
  FileText,
  CheckCircle2,
  Save
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { VehicleType, VehicleCategory, Vehicle } from '@/types';
import { VEHICLES } from '@/data/mockData';

export default function AddVehiclePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    type: 'automatic' as VehicleType,
    category: 'scooter' as VehicleCategory,
    engineSize: '',
    pricePerDay: 0,
    weeklyRate: 0,
    monthlyRate: 0,
    location: '',
    status: 'available',
    description: '',
    features: [] as string[],
    images: [] as string[],
  });

  useEffect(() => {
    if (isEdit) {
      const vehicle = VEHICLES.find(v => v.id === id);
      if (vehicle) {
        setFormData({
          name: vehicle.name,
          brand: vehicle.brand,
          model: vehicle.model,
          year: vehicle.year,
          type: vehicle.type,
          category: vehicle.category,
          engineSize: vehicle.engineSize,
          pricePerDay: vehicle.pricePerDay,
          weeklyRate: vehicle.pricePerDay * 6, // Mocking rates
          monthlyRate: vehicle.pricePerDay * 20,
          location: vehicle.location || '',
          status: vehicle.status,
          description: vehicle.description,
          features: vehicle.features,
          images: vehicle.images,
        });
      }
    }
  }, [id, isEdit]);

  const categories: VehicleCategory[] = ['scooter', 'sport', 'touring', 'off-road', 'classic'];
  const types: VehicleType[] = ['automatic', 'manual', 'semi-automatic', 'electric'];
  const commonFeatures = [
    'ABS Braking', 'Phone Holder', 'USB Port', 'Top Box', 
    'Side Panniers', 'Heated Grips', 'LED Headlight', 'Smart Key'
  ];

  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature) 
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    navigate('/admin/vehicles');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/admin/vehicles')}
            className="w-10 h-10 rounded-xl bg-white border border-outline-variant/20 flex items-center justify-center text-secondary hover:bg-surface-container transition-default"
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <nav className="flex items-center gap-2 text-xs font-medium text-secondary mb-1">
              <Link to="/admin" className="hover:text-primary transition-colors">Fleet</Link>
              <ChevronLeft size={10} className="rotate-180" />
              <span className="text-on-surface">{isEdit ? 'Edit Vehicle' : 'Add New Vehicle'}</span>
            </nav>
            <h1 className="text-3xl font-bold text-on-surface">{isEdit ? 'Edit Vehicle' : 'Add New Vehicle'}</h1>
            <p className="text-secondary text-sm">{isEdit ? `Updating ${formData.name}` : 'Enter the essential specifications and pricing to list a new motorbike in the fleet.'}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-2.5 rounded-xl bg-white border border-outline-variant/20 text-sm font-bold text-secondary hover:bg-surface-container transition-default">
            {isEdit ? 'Reset Changes' : 'Save as Draft'}
          </button>
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-8 py-2.5 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-container transition-default shadow-lg shadow-primary/20 flex items-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <CheckCircle2 size={18} />
            )}
            {isEdit ? 'Update Vehicle' : 'Register Vehicle'}
          </button>
        </div>
      </div>

      <form className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Basic Information */}
          <section className="bg-white rounded-[2rem] p-8 border border-outline-variant/10 shadow-sm space-y-8">
            <div className="flex items-center gap-3 pb-6 border-b border-outline-variant/10">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Info size={20} />
              </div>
              <div>
                <h2 className="font-bold text-on-surface">Basic Information</h2>
                <p className="text-xs text-secondary uppercase font-bold tracking-widest">Section 01</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary">Vehicle Display Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Honda XR 150L Dual Sport"
                  className="w-full bg-surface-container/50 border border-outline-variant/20 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-secondary">Brand</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Honda"
                    className="w-full bg-surface-container/50 border border-outline-variant/20 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    value={formData.brand}
                    onChange={(e) => setFormData({...formData, brand: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-secondary">Model</label>
                  <input 
                    type="text" 
                    placeholder="e.g. XR 150"
                    className="w-full bg-surface-container/50 border border-outline-variant/20 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    value={formData.model}
                    onChange={(e) => setFormData({...formData, model: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-secondary">Year</label>
                  <input 
                    type="number" 
                    placeholder="2024"
                    className="w-full bg-surface-container/50 border border-outline-variant/20 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    value={formData.year}
                    onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-secondary">Vehicle Type</label>
                  <select 
                    className="w-full bg-surface-container/50 border border-outline-variant/20 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value as VehicleCategory})}
                  >
                    {categories.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-secondary">Transmission</label>
                  <select 
                    className="w-full bg-surface-container/50 border border-outline-variant/20 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value as VehicleType})}
                  >
                    {types.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-secondary">Engine Capacity</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="e.g. 150"
                      className="w-full bg-surface-container/50 border border-outline-variant/20 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 pr-12"
                      value={formData.engineSize}
                      onChange={(e) => setFormData({...formData, engineSize: e.target.value})}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-secondary">cc</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Vehicle Gallery */}
          <section className="bg-white rounded-[2rem] p-8 border border-outline-variant/10 shadow-sm space-y-8">
            <div className="flex items-center gap-3 pb-6 border-b border-outline-variant/10">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <ImageIcon size={20} />
              </div>
              <div>
                <h2 className="font-bold text-on-surface">Vehicle Gallery</h2>
                <p className="text-xs text-secondary uppercase font-bold tracking-widest">Section 02</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="border-2 border-dashed border-outline-variant/30 rounded-3xl p-12 text-center space-y-4 hover:border-primary/50 transition-colors cursor-pointer group">
                <div className="w-16 h-16 bg-surface-container rounded-2xl flex items-center justify-center mx-auto group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <Upload size={32} />
                </div>
                <div>
                  <p className="font-bold text-on-surface">Upload high-res photos</p>
                  <p className="text-xs text-secondary">Drag and drop PNG or JPG files here (Max 5MB each)</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="relative aspect-square rounded-2xl overflow-hidden border border-outline-variant/10 group">
                  <img src="https://picsum.photos/seed/bike-add/400/400" alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 bg-primary text-white text-[8px] font-bold uppercase tracking-widest px-2 py-1 rounded-md">Cover Photo</div>
                  <button className="absolute top-2 right-2 w-6 h-6 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-error opacity-0 group-hover:opacity-100 transition-opacity">
                    <X size={14} />
                  </button>
                </div>
                <button className="aspect-square rounded-2xl border-2 border-dashed border-outline-variant/20 flex flex-col items-center justify-center gap-2 text-secondary hover:border-primary/30 hover:text-primary transition-all">
                  <Plus size={24} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Add Media</span>
                </button>
              </div>
            </div>
          </section>

          {/* Key Features & Description */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="bg-white rounded-[2rem] p-8 border border-outline-variant/10 shadow-sm space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-outline-variant/10">
                <Zap size={18} className="text-primary" />
                <h2 className="font-bold text-on-surface">Key Features</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {commonFeatures.map(feature => (
                  <button
                    key={feature}
                    type="button"
                    onClick={() => handleFeatureToggle(feature)}
                    className={cn(
                      "px-4 py-2 rounded-xl text-xs font-bold transition-all border",
                      formData.features.includes(feature)
                        ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                        : "bg-surface-container/50 text-secondary border-outline-variant/20 hover:border-primary/30"
                    )}
                  >
                    {feature}
                  </button>
                ))}
                <button className="px-4 py-2 rounded-xl text-xs font-bold bg-white text-primary border border-dashed border-primary/30 flex items-center gap-1">
                  <Plus size={14} />
                  Custom
                </button>
              </div>
            </section>

            <section className="bg-white rounded-[2rem] p-8 border border-outline-variant/10 shadow-sm space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-outline-variant/10">
                <FileText size={18} className="text-primary" />
                <h2 className="font-bold text-on-surface">Vehicle Description</h2>
              </div>
              <textarea 
                placeholder="Craft a compelling description for potential renters..."
                className="w-full bg-surface-container/50 border border-outline-variant/20 rounded-2xl py-4 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 h-40 resize-none"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
              <div className="flex items-center gap-2 text-[10px] font-bold text-secondary uppercase tracking-widest">
                <Info size={12} />
                Visible to customers on the public booking portal
              </div>
            </section>
          </div>
        </div>

        <div className="space-y-8">
          {/* Rental Pricing */}
          <section className="bg-white rounded-[2rem] p-8 border border-outline-variant/10 shadow-sm space-y-8">
            <div className="flex items-center gap-3 pb-6 border-b border-outline-variant/10">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <DollarSign size={20} />
              </div>
              <h2 className="font-bold text-on-surface">Rental Pricing (VND)</h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary">Daily Rate</label>
                <div className="relative">
                  <input 
                    type="number" 
                    placeholder="250,000"
                    className="w-full bg-surface-container/50 border border-outline-variant/20 rounded-xl py-3 px-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 pr-16"
                    value={formData.pricePerDay}
                    onChange={(e) => setFormData({...formData, pricePerDay: parseInt(e.target.value)})}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-secondary uppercase">VND/D</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary">Weekly Rate</label>
                <div className="relative">
                  <input 
                    type="number" 
                    placeholder="1,500,000"
                    className="w-full bg-surface-container/50 border border-outline-variant/20 rounded-xl py-3 px-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 pr-16"
                    value={formData.weeklyRate}
                    onChange={(e) => setFormData({...formData, weeklyRate: parseInt(e.target.value)})}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-secondary uppercase">VND/W</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary">Monthly Rate</label>
                <div className="relative">
                  <input 
                    type="number" 
                    placeholder="5,500,000"
                    className="w-full bg-surface-container/50 border border-outline-variant/20 rounded-xl py-3 px-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 pr-16"
                    value={formData.monthlyRate}
                    onChange={(e) => setFormData({...formData, monthlyRate: parseInt(e.target.value)})}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-secondary uppercase">VND/M</span>
                </div>
              </div>
            </div>
          </section>

          {/* Location & Status */}
          <section className="bg-white rounded-[2rem] p-8 border border-outline-variant/10 shadow-sm space-y-8">
            <div className="flex items-center gap-3 pb-6 border-b border-outline-variant/10">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <MapPin size={20} />
              </div>
              <h2 className="font-bold text-on-surface">Location & Status</h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary">Assigned Rental Hub</label>
                <select 
                  className="w-full bg-surface-container/50 border border-outline-variant/20 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                >
                  <option value="">Select Branch</option>
                  <option value="Hanoi Old Quarter">Hanoi Old Quarter</option>
                  <option value="Da Nang Beach">Da Nang Beach</option>
                  <option value="HCM District 1">HCM District 1</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-secondary">Inventory Status</label>
                <select 
                  className="w-full bg-surface-container/50 border border-outline-variant/20 rounded-xl py-3 px-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="available">Available for Rent</option>
                  <option value="maintenance">Under Maintenance</option>
                  <option value="unavailable">Out of Service</option>
                </select>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <input type="checkbox" id="featured" className="w-5 h-5 rounded border-outline-variant/30 text-primary focus:ring-primary" />
                <label htmlFor="featured" className="text-sm font-bold text-on-surface">Mark as Featured Vehicle</label>
              </div>
            </div>
          </section>
        </div>
      </form>

      {/* Footer Actions */}
      <div className="fixed bottom-0 left-64 right-0 bg-white/80 backdrop-blur-md border-t border-outline-variant/10 p-4 flex items-center justify-between z-10 px-12">
        <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Systems Ready • 14:42
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/admin/vehicles')}
            className="text-sm font-bold text-secondary hover:text-on-surface transition-colors"
          >
            Discard Changes
          </button>
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-10 py-3 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-container transition-default shadow-lg shadow-primary/20 disabled:opacity-50"
          >
            {isSubmitting ? "Processing..." : (isEdit ? "Update Vehicle" : "Register Vehicle")}
          </button>
        </div>
      </div>
    </div>
  );
}
