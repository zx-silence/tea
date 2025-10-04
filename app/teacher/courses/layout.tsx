import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { TeacherSidebar } from '@/components/teacher/sidebar';

export default async function CoursesLayout({ children }: { children: ReactNode }) {
  const session = await getSession();

  if (!session) {
    redirect('/teacher/login');
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 flex-shrink-0">
        <TeacherSidebar />
      </aside>
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
