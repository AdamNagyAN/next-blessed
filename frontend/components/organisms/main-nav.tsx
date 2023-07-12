import Link, { LinkProps } from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';
import { ThemeSwitcher } from '@/components/organisms/theme-switcher';
import { ROUTES } from '@/lib/Routes';

type StyledNavLinkProps = LinkProps & { children: React.ReactNode };
function StyledNavLink(props: StyledNavLinkProps) {
  const { children, ...rest } = props;
  return <Link {...rest}>{children}</Link>;
}

const navLinks = [
  { href: ROUTES.HOME, label: 'Home' },
  { href: ROUTES.SHOP, label: 'Shop' },
  { href: '/contact', label: 'Contact' }
];

export function MainNav() {
  return (
    <nav className="w-full mb-10">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4">
        <div className="flex items-center">
          <span className="font-bold py-4 text-lg mr-8">
            BLESSED.
          </span>
          <ul className="flex items-center ">
            {navLinks.map((link) => (
              <li className="py-4 px-4" key={JSON.stringify(link)}>
                <StyledNavLink href={link.href}>
                  {link.label}
                </StyledNavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">Login</Button>
          <Button>Sign Up</Button>
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
}
