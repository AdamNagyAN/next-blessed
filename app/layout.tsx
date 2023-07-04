import React from 'react';
import { Montserrat } from 'next/font/google';
import { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/siteConfig';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { MainNav } from '@/components/main-nav';

const fontMont = Montserrat({ subsets: ['latin'], variable: '--font-mont' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL),
  title: {
    default: siteConfig.name,
    template: '%s | ' + siteConfig.name
  },
  keywords: ['Next.js', 'React', 'Tailwind CSS', 'Server Components'],
  authors: [
    {
      name: 'Adam Nagy',
      url: 'https://github.com/AdamNagyAN'
    }
  ],
  creator: 'Adam Nagy',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ],
  icons: {
    icon: '/favicon.ico'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn('min-h-screen bg-background antialiased font-mont', fontMont.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <MainNav />
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
