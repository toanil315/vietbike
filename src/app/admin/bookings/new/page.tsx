import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Save, 
  X, 
  Upload, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  MessageSquare, 
  Bike, 
  DollarSign, 
  FileText,
  Plus
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

export default function NewBookingPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    sourceApp: 'Zalo',
    licensePlate: '',
    startDate: new Date().toISOString().slice(0, 16),
    durationDays: 1,
    amount: 0,
    deposit: 0,
    endDate: '',
    extension: '',
    notes: '',
    files: [] as File[]
  });

  // Calculate end date based on start date and duration
  useEffect(() => {
    if (formData.startDate && formData.durationDays) {
      const start = new Date(formData.startDate);
      const end = new Date(start.getTime() + formData.durationDays * 24 * 60 * 60 * 1000);
      setFormData(prev => ({ ...prev, endDate: end.toISOString().slice(0, 16) }));
    }
  }, [formData.startDate, formData.durationDays]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would save the data here
    console.log('Saving booking:', formData);
    navigate('/admin/bookings');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link 
            to="/admin/bookings" 
            className="p-2 rounded-xl border border-outline-variant/30 text-secondary hover:bg-surface-container transition-default"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-on-surface">New Manual Booking</h1>
            <p className="text-sm text-secondary">Add a guest rental manually to the system</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={() => navigate('/admin/bookings')}
            className="px-6 py-2.5 rounded-xl border border-outline-variant/30 text-sm font-bold text-secondary hover:bg-surface-container transition-default"
          >
            Discard
          </button>
          <button 
            onClick={handleSubmit}
            className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary-container transition-default"
          >
            <Save size={18} />
            <span>Save Booking</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Customer & Source */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-outline-variant/10 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-secondary uppercase tracking-widest flex items-center gap-2">
              <User size={14} />
              Customer Details
            </h3>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface ml-1">Customer Name *</label>
                <div className="relative">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" />
                  <input 
                    type="text" 
                    required
                    placeholder="Enter customer name"
                    value={formData.customerName}
                    onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
                    className="w-full pl-12 pr-4 py-3 bg-surface-container/30 border border-outline-variant/10 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface ml-1">Phone Number</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" />
                  <input 
                    type="tel" 
                    placeholder="0901234567"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full pl-12 pr-4 py-3 bg-surface-container/30 border border-outline-variant/10 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-outline-variant/10 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-secondary uppercase tracking-widest flex items-center gap-2">
              <MessageSquare size={14} />
              Source & Reference
            </h3>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface ml-1">Source App</label>
                <select 
                  value={formData.sourceApp}
                  onChange={(e) => setFormData(prev => ({ ...prev, sourceApp: e.target.value }))}
                  className="w-full px-4 py-3 bg-surface-container/30 border border-outline-variant/10 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
                >
                  <option>Zalo</option>
                  <option>WhatsApp</option>
                  <option>Facebook</option>
                  <option>Direct Walk-in</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface ml-1">License Plate *</label>
                <div className="relative">
                  <Bike size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" />
                  <input 
                    type="text" 
                    required
                    placeholder="59A1-12345"
                    value={formData.licensePlate}
                    onChange={(e) => setFormData(prev => ({ ...prev, licensePlate: e.target.value }))}
                    className="w-full pl-12 pr-4 py-3 bg-surface-container/30 border border-outline-variant/10 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rental Period */}
        <div className="bg-white p-6 rounded-3xl border border-outline-variant/10 shadow-sm space-y-6">
          <h3 className="text-xs font-bold text-secondary uppercase tracking-widest flex items-center gap-2">
            <Calendar size={14} />
            Rental Period
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-on-surface ml-1">Start Date *</label>
              <div className="relative">
                <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" />
                <input 
                  type="datetime-local" 
                  required
                  value={formData.startDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                  className="w-full pl-12 pr-4 py-3 bg-surface-container/30 border border-outline-variant/10 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-on-surface ml-1">Number of Days</label>
              <div className="relative">
                <Clock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" />
                <input 
                  type="number" 
                  min="1"
                  value={formData.durationDays}
                  onChange={(e) => setFormData(prev => ({ ...prev, durationDays: parseInt(e.target.value) || 1 }))}
                  className="w-full pl-12 pr-4 py-3 bg-surface-container/30 border border-outline-variant/10 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-on-surface ml-1">Return Date</label>
              <div className="relative">
                <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" />
                <input 
                  type="datetime-local" 
                  readOnly
                  value={formData.endDate}
                  className="w-full pl-12 pr-4 py-3 bg-surface-container/10 border border-outline-variant/10 rounded-2xl text-sm text-secondary cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Financials */}
        <div className="bg-white p-6 rounded-3xl border border-outline-variant/10 shadow-sm space-y-6">
          <h3 className="text-xs font-bold text-secondary uppercase tracking-widest flex items-center gap-2">
            <DollarSign size={14} />
            Financials
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-on-surface ml-1">Total Amount (VND)</label>
              <div className="relative">
                <DollarSign size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" />
                <input 
                  type="number" 
                  placeholder="1000000"
                  value={formData.amount}
                  onChange={(e) => setFormData(prev => ({ ...prev, amount: parseInt(e.target.value) || 0 }))}
                  className="w-full pl-12 pr-4 py-3 bg-surface-container/30 border border-outline-variant/10 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 font-mono"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-on-surface ml-1">Deposit Amount (VND)</label>
              <div className="relative">
                <DollarSign size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" />
                <input 
                  type="number" 
                  placeholder="500000"
                  value={formData.deposit}
                  onChange={(e) => setFormData(prev => ({ ...prev, deposit: parseInt(e.target.value) || 0 }))}
                  className="w-full pl-12 pr-4 py-3 bg-surface-container/30 border border-outline-variant/10 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Notes & Documents */}
        <div className="bg-white p-6 rounded-3xl border border-outline-variant/10 shadow-sm space-y-6">
          <h3 className="text-xs font-bold text-secondary uppercase tracking-widest flex items-center gap-2">
            <FileText size={14} />
            Additional Information
          </h3>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-on-surface ml-1">Extension Details</label>
              <input 
                type="text" 
                placeholder="Add extension notes..."
                value={formData.extension}
                onChange={(e) => setFormData(prev => ({ ...prev, extension: e.target.value }))}
                className="w-full px-4 py-3 bg-surface-container/30 border border-outline-variant/10 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-on-surface ml-1">Notes</label>
              <textarea 
                rows={4}
                placeholder="Add any special instructions or notes about the customer..."
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                className="w-full px-4 py-3 bg-surface-container/30 border border-outline-variant/10 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-on-surface ml-1">Documents (ID, License, etc.)</label>
              <div className="border-2 border-dashed border-outline-variant/20 rounded-3xl p-8 flex flex-col items-center justify-center gap-3 bg-surface-container/10 hover:bg-surface-container/20 transition-default cursor-pointer group">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
                  <Upload size={24} />
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-on-surface">Click to upload or drag and drop</p>
                  <p className="text-xs text-secondary">PNG, JPG or PDF (max. 10MB)</p>
                </div>
                <button type="button" className="mt-2 flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-xl text-xs font-bold hover:bg-primary/20 transition-default">
                  <Plus size={14} />
                  Choose Files
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button 
          type="submit"
          className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 hover:bg-primary-container transition-default flex items-center justify-center gap-2"
        >
          <Plus size={24} />
          Create Booking
        </button>
      </form>
    </div>
  );
}
