import { cookies } from 'next/headers';
import { getUser } from '../lib/auth';
import { redirect } from 'next/navigation';
import AdminDashboard from './dashboard';

export default async function AdminPage() {
  const cookieStore = await cookies(); // ✅ Await cookies()
  const sessionEmail = cookieStore.get('session')?.value;

  if (!sessionEmail) {
    redirect('/login'); // Redirect to login page if not authenticated
  }

  const user = await getUser(sessionEmail);

  if (!user || user.role !== 'ADMIN') {
    redirect('/unauthorized'); // Redirect to unauthorized page if not an admin
  }

  return (
    <div>
      <AdminDashboard />
    </div>
  );
}
