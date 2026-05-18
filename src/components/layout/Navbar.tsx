'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Brand logo top left */}
      <div className="fixed top-8 left-8 z-[100] font-sans font-bold text-xs tracking-widest uppercase mix-blend-difference pointer-events-none">
        <span className="text-white">SilkByteX</span>
      </div>
      
      {/* Side Pill Toggle - Elevated Z-index so it's always accessible and doesn't get buried! */}
      <div 
        className="hm-pill-track !z-[100] transition-colors duration-500 hover:bg-[#111]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="hm-pill-btn relative flex items-center justify-center w-[24px] h-[20px]">
          <span 
            className={`absolute left-0 w-full h-[2px] bg-white transition-all duration-300 ease-in-out ${
              isOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
            }`}
          />
          <span 
            className={`absolute left-0 w-full h-[2px] bg-white transition-all duration-300 ease-in-out top-1/2 -translate-y-1/2 ${
              isOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
            }`}
          />
          <span 
            className={`absolute left-0 w-full h-[2px] bg-white transition-all duration-300 ease-in-out ${
              isOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'
            }`}
          />
        </div>
      </div>
      
      {/* Optional Top Right text */}
      <Link 
        href="/contact" 
        className={`fixed top-8 right-[90px] z-[100] font-sans text-xs font-semibold uppercase tracking-widest transition-colors duration-300 hover:opacity-100 ${
          isOpen ? 'text-white/50' : 'text-[#999] hover:text-black'
        }`}
      >
        Contact
      </Link>

      {/* Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[90] bg-[#111] text-white flex flex-col justify-center transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="pl-[10vw] flex flex-col gap-6 font-serif text-[clamp(40px,7vw,80px)]">
          <Link href="/" className="hover:text-[#999] transition-colors w-fit block">Home</Link>
          <Link href="/work" className="hover:text-[#999] transition-colors w-fit block">Work</Link>
          <Link href="/about" className="hover:text-[#999] transition-colors w-fit block">About</Link>
          <Link href="/services" className="hover:text-[#999] transition-colors w-fit block">Services</Link>
          <Link href="/contact" className="hover:text-[#999] transition-colors w-fit block">Contact</Link>
          
          <Link href="/admin/login" className="hover:text-white text-[#666] transition-colors text-xs font-sans mt-12 uppercase tracking-widest font-bold w-fit block">
            Admin Panel
          </Link>
        </div>
      </div>
    </>
  );
}
