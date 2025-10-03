'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import { useState } from 'react';

const navigation = [
  { name: '首页', href: '/' },
  { name: '项目介绍', href: '/about' },
  { name: '课程体系', href: '/courses' },
  { name: '教学资源', href: '/resources' },
  { name: '学校成果', href: '/achievements' },
  { name: '合作申请', href: '/cooperation' },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Don't show header on teacher portal pages
  if (pathname?.startsWith('/teacher')) {
    return null;
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-brand-700">
                中国少年茶人
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-brand-600',
                  pathname === item.href
                    ? 'text-brand-600'
                    : 'text-gray-700'
                )}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/teacher/login"
              className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
            >
              教师登录
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'block px-3 py-2 text-base font-medium rounded-md',
                  pathname === item.href
                    ? 'bg-brand-50 text-brand-600'
                    : 'text-gray-700 hover:bg-gray-50'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/teacher/login"
              className="block px-3 py-2 text-base font-medium text-brand-600 hover:bg-brand-50 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              教师登录
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
