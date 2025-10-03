'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const footerLinks = {
  about: [
    { name: '项目介绍', href: '/about' },
    { name: '课程体系', href: '/courses' },
    { name: '公益机制', href: '/about#public-benefit' },
  ],
  resources: [
    { name: '教学资源', href: '/resources' },
    { name: '学校成果', href: '/achievements' },
  ],
  cooperation: [
    { name: '合作申请', href: '/cooperation' },
    { name: '教师登录', href: '/teacher/login' },
  ],
};

export function Footer() {
  const pathname = usePathname();

  // Don't show footer on teacher portal pages
  if (pathname?.startsWith('/teacher')) {
    return null;
  }

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-bold text-white mb-4">
              中国少年茶人
            </h3>
            <p className="text-sm text-gray-400">
              传承中华茶文化，培养新时代少年茶人
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">关于我们</h4>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">资源中心</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">合作与登录</h4>
            <ul className="space-y-2">
              {footerLinks.cooperation.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} 中国少年茶人. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
