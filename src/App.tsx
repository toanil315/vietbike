import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate 
} from 'react-router-dom';
import PublicLayout from './app/(public)/layout';
import AdminLayout from './app/admin/layout';
import HomePage from './app/(public)/page';
import BikesPage from './app/(public)/bikes/page';
import BikeDetailPage from './app/(public)/bikes/[slug]/page';
import BookingPage from './app/(public)/booking/page';
import ConfirmationPage from './app/(public)/booking/confirmation/page';
import AdminDashboard from './app/admin/page';
import AdminVehiclesPage from './app/admin/vehicles/page';
import AddVehiclePage from './app/admin/vehicles/new/page';
import AdminBookingsPage from './app/admin/bookings/page';
import NewBookingPage from './app/admin/bookings/new/page';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/bikes" element={<BikesPage />} />
          <Route path="/bikes/:slug" element={<BikeDetailPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/booking/confirmation" element={<ConfirmationPage />} />
          <Route path="/contact" element={
            <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-8">
              <h1 className="text-4xl font-bold">Contact VietBike</h1>
              <p className="text-secondary">Have questions? We're here to help you plan your perfect ride.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                <div className="glass p-8 rounded-3xl space-y-4">
                  <h3 className="font-bold text-lg">Hanoi Office</h3>
                  <p className="text-sm text-secondary">123 Old Quarter, Hoan Kiem, Hanoi</p>
                  <p className="text-sm font-bold text-primary">+84 90 123 4567</p>
                </div>
                <div className="glass p-8 rounded-3xl space-y-4">
                  <h3 className="font-bold text-lg">Support Hours</h3>
                  <p className="text-sm text-secondary">Monday - Sunday</p>
                  <p className="text-sm font-bold text-primary">08:00 AM - 08:00 PM</p>
                </div>
              </div>
              <form className="glass p-8 rounded-3xl space-y-4 text-left">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondary uppercase">Your Name</label>
                  <input type="text" className="w-full bg-surface-container border-none rounded-xl py-3 px-4" placeholder="Enter your name" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondary uppercase">Message</label>
                  <textarea className="w-full bg-surface-container border-none rounded-xl py-3 px-4 h-32" placeholder="How can we help?"></textarea>
                </div>
                <button type="button" className="w-full bg-primary text-white py-4 rounded-2xl font-bold">Send Message</button>
              </form>
            </div>
          } />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="vehicles" element={<AdminVehiclesPage />} />
          <Route path="vehicles/new" element={<AddVehiclePage />} />
          <Route path="vehicles/:id" element={<AddVehiclePage />} /> {/* Reusing AddVehiclePage for Edit for now */}
          <Route path="bookings" element={<AdminBookingsPage />} />
          <Route path="bookings/new" element={<NewBookingPage />} />
          <Route path="customers" element={<div className="p-10 bg-white rounded-3xl ambient-shadow">Customer Management (Coming Soon)</div>} />
          <Route path="vouchers" element={<div className="p-10 bg-white rounded-3xl ambient-shadow">Voucher Management (Coming Soon)</div>} />
          <Route path="finance" element={<div className="p-10 bg-white rounded-3xl ambient-shadow">Financial Management (Coming Soon)</div>} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
