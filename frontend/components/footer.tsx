import React from 'react';
import { siteConfig } from '@/config/siteConfig';

function Footer() {
  return (
    <footer className="bg-black mt-32">
      <div className="container min-h-[300px] py-8">
        <h3 className="font-bold text-lg uppercase">{siteConfig.siteName}</h3>
      </div>
    </footer>
  );
}

export default Footer;
