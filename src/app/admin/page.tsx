import AdminDashboard from '../../components/AdminDashboard';
import ProtectedRoute from '../../components/ProtectedRoute';

export default function Admin() {
  return (
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  );
}
