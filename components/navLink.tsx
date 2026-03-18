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
        'rounded-md px-2 py-1 text-sm font-medium transition-colors',
        isActive
          ? 'bg-primary text-primary-foreground'
          : 'text-muted-foreground hover:bg-primary/10 hover:text-foreground',
      )}
    >
      {label}
    </Link>
  );
};

export default NavLink;
