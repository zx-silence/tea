'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Home,
  BookOpen,
  Users,
  BarChart3,
  FileText,
  Heart,
  Settings,
  LogOut,
} from 'lucide-react';

const navigation = [
  { name: '工作台', href: '/teacher/dashboard', icon: Home },
  { name: '课程管理', href: '/teacher/courses', icon: BookOpen },
  { name: '班级管理', href: '/teacher/classes', icon: Users },
  { name: '学习数据', href: '/teacher/analytics', icon: BarChart3 },
  { name: '教学资源', href: '/teacher/resources', icon: FileText },
  { name: '公益进度', href: '/teacher/public-benefit', icon: Heart },
  { name: '设置', href: '/teacher/settings', icon: Settings },
];

export function TeacherSidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/teacher/login';
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      <div className="p-6">
        <h2 className="text-xl font-bold">中国少年茶人</h2>
        <p className="text-sm text-gray-400">教师工作台</p>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-brand-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              )}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-3">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <LogOut className="h-5 w-5" />
          退出登录
        </button>
      </div>
    </div>
  );
}
