'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from './Button';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 pointer-events-none section-padding mix-blend-exclusion">
      <div className="flex justify-between items-center h-full">
        <div className="pointer-events-auto">
          <Link href="/" className="text-white text-3xl md:text-4xl font-bold font-aeonik tracking-tight">
            ARZUNO
          </Link>
        </div>
        
        <div className="flex items-center gap-6 pointer-events-auto mix-blend-normal">
          <div className="flex items-center gap-3 md:gap-6 mr-0 md:mr-2">
            <Link href="/services" className="text-white font-plex-mono text-[10px] sm:text-xs md:text-sm tracking-wider uppercase font-medium">
              Services
            </Link>
            <Link href="/work" className="text-white font-plex-mono text-[10px] sm:text-xs md:text-sm tracking-wider uppercase font-medium">
              Our Work
            </Link>
            <Link href="/about" className="text-white font-plex-mono text-[10px] sm:text-xs md:text-sm tracking-wider uppercase font-medium">
              About
            </Link>
          </div>
          
          <div className="hidden md:block">
            <Button variant="secondary" size="md" href="/contact">
              Let's Talk
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
