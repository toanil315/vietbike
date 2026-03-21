import VehicleForm from '@/components/admin/VehicleForm';

// Since the admin form doesn't need SSR for SEO, we can just use the component directly
export default function EditVehiclePage() {
  return <VehicleForm />;
}
