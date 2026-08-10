'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

gsap.registerPlugin(useGSAP);

export default function Button({ children, variant = 'primary', size = 'md', className = '', withArrow = false, href, ...props }) {
  const buttonRef = useRef();
  const dotRef = useRef();
  const arrowRef = useRef();

  const sizeClasses = {
    sm: 'h-[2.6em] px-4 text-xs',
    md: 'h-[3.2em] px-6 text-sm',
    lg: 'h-[6em] w-[9.4em] px-8 text-lg'
  };

  const baseClasses = 'relative inline-flex items-center justify-center font-aeonik font-medium uppercase tracking-tight rounded-full transition-all duration-500 overflow-hidden cursor-pointer';
  
  const variants = {
    primary: 'bg-lusion-grey-blue text-white hover:bg-lusion-green hover:text-lusion-black',
    secondary: 'bg-white text-lusion-black shadow-[0_6px_10px_#0000000A,0_2px_4px_#0000000A] hover:bg-lusion-off-white',
    ghost: 'bg-transparent text-white hover:text-lusion-green'
  };

  useGSAP(() => {
    const button = buttonRef.current;
    if (!button) return;
    
    const onMouseEnter = () => {
      if (dotRef.current) {
        gsap.to(dotRef.current, { scale: 1.15, x: 2, duration: 0.1, ease: "power2.out" });
      }
      if (arrowRef.current) {
        gsap.to(arrowRef.current, { x: 4, duration: 0.3, ease: "power2.out" });
      }
      gsap.to(button, { scale: 0.98, duration: 0.2 });
    };
    
    const onMouseLeave = () => {
      if (dotRef.current) {
        gsap.to(dotRef.current, { scale: 1, x: 0, duration: 0.3, ease: "power2.out" });
      }
      if (arrowRef.current) {
        gsap.to(arrowRef.current, { x: 0, duration: 0.3, ease: "power2.out" });
      }
      gsap.to(button, { scale: 1, duration: 0.3 });
    };

    button.addEventListener('mouseenter', onMouseEnter);
    button.addEventListener('mouseleave', onMouseLeave);
    
    return () => {
      button.removeEventListener('mouseenter', onMouseEnter);
      button.removeEventListener('mouseleave', onMouseLeave);
    };
  }, { scope: buttonRef });

  const InnerContent = () => (
    <>
      {variant === 'primary' && !withArrow && (
        <span ref={dotRef} className="w-1.5 h-1.5 rounded-full bg-lusion-green mr-2 block"></span>
      )}
      {children}
      {withArrow && (
        <span ref={arrowRef} className="ml-3 block flex-shrink-0">
          <ArrowRight size={size === 'sm' ? 14 : size === 'md' ? 16 : 24} />
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        ref={buttonRef}
        className={`${baseClasses} ${variants[variant]} ${sizeClasses[size]} ${className}`}
        style={{ transitionTimingFunction: 'cubic-bezier(.4, 0, .1, 1)' }}
        {...props}
      >
        <InnerContent />
      </Link>
    );
  }

  return (
    <button
      ref={buttonRef}
      className={`${baseClasses} ${variants[variant]} ${sizeClasses[size]} ${className}`}
      style={{ transitionTimingFunction: 'cubic-bezier(.4, 0, .1, 1)' }}
      {...props}
    >
      <InnerContent />
    </button>
  );
}
