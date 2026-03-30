'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { cn } from '@/lib/utils';

const NavLink = ({ label, href }: { label: string; href: string }) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (href !== '/' && pathname.startsWith(href + '/'));

  return (
    <Link
      href={href}
      className={cn(
        'border-b-2 border-transparent px-2 py-1 text-sm transition-colors',
        isActive
          ? 'text-primary font-semibold'
          : 'text-muted-foreground font-medium hover:text-foreground',
      )}
    >
      {label}
    </Link>
  );
};

export default NavLink;
