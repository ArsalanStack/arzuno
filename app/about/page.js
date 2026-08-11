'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';
import Button from '../components/Button';



export default function About() {
  const container = useRef(null);
  
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const chars = container.current.querySelectorAll('.title-char');
    gsap.from(chars, {
      y: 100,
      opacity: 0,
      stagger: 0.05,
      duration: 1,
      ease: 'power4.out',
      delay: 0.2
    });

    const sections = container.current.querySelectorAll('.reveal-section');
    sections.forEach(sec => {
      gsap.from(sec, {
        scrollTrigger: {
          trigger: sec,
          start: 'top 80%',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });
    });
    
    const listItems = container.current.querySelectorAll('.phil-item');
    gsap.from(listItems, {
      scrollTrigger: {
        trigger: '.phil-container',
        start: 'top 75%',
      },
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out'
    });

    document.documentElement.classList.add('is-white-bg');
    return () => document.documentElement.classList.remove('is-white-bg');
  }, { scope: container });

  return (
    <main ref={container} className="relative w-full min-h-screen font-aeonik bg-lusion-white text-lusion-black pt-40 pb-20 rounded-b-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.2)] z-10">
      
      {/* Hero */}
      <section className="section-padding mb-20 pt-20">
        <h1 className="text-5xl md:text-7xl lg:text-[8vw] leading-none font-bold tracking-tight uppercase flex flex-wrap mb-10">
          {Array.from("The Authority").map((char, i) => (
            <span key={i} className="title-char inline-block">{char === ' ' ? '\u00A0' : char}</span>
          ))}
        </h1>
        <p className="font-plex-mono text-sm uppercase tracking-wider text-gray-500 max-w-xl title-char">
          Who is the Arzuno Team? We are not a faceless template agency.
        </p>
      </section>

      {/* Intro Section */}
      <section className="reveal-section section-padding py-24 border-t border-gray-200">
        <div className="max-w-screen-2xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-10 md:col-start-2">
            <h2 className="text-4xl md:text-6xl font-bold leading-[1.1] mb-12 tracking-tight max-w-4xl">
              When you hire Arzuno, you hire a dedicated team of experts invested in your success.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20">
              <div>
                <p className="text-xl md:text-2xl leading-relaxed font-light text-gray-700">
                  Most agencies pass your project down to junior developers or offshore teams using pre-built templates. Not us. We build from the ground up, engineering custom solutions that are performant, scalable, and tailored strictly to your business logic.
                </p>
              </div>
              <div>
                <p className="text-xl md:text-2xl leading-relaxed font-light text-gray-700">
                  We are a boutique collective of senior software engineers, visionary designers, and data-driven growth marketers. We limit our client roster intentionally so we can integrate deeply into your business and operate as an extension of your own team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values - Sleek Typography Layout */}
      <section className="reveal-section section-padding py-32 border-t border-gray-200 bg-white">
        <div className="max-w-screen-2xl mx-auto w-full flex flex-col md:flex-row gap-16 md:gap-32 phil-container">
          
          <div className="md:w-1/3 shrink-0">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight sticky top-40">Our Philosophy</h2>
          </div>
          
          <div className="md:w-2/3 flex flex-col">
            
            <div className="phil-item border-b border-gray-300 py-12 flex flex-col md:flex-row gap-8 group">
              <span className="font-plex-mono text-5xl text-gray-300 group-hover:text-lusion-green transition-colors duration-500">01</span>
              <div>
                <h3 className="text-3xl font-bold mb-6 tracking-tight">Direct Access</h3>
                <p className="text-gray-600 font-light leading-relaxed text-xl max-w-2xl">
                  No middle-men or account managers. You speak directly to the engineers and designers building your product, ensuring nothing is lost in translation.
                </p>
              </div>
            </div>

            <div className="phil-item border-b border-gray-300 py-12 flex flex-col md:flex-row gap-8 group">
              <span className="font-plex-mono text-5xl text-gray-300 group-hover:text-lusion-green transition-colors duration-500">02</span>
              <div>
                <h3 className="text-3xl font-bold mb-6 tracking-tight">Uncompromising Quality</h3>
                <p className="text-gray-600 font-light leading-relaxed text-xl max-w-2xl">
                  We refuse to cut corners. Every line of code, every pixel, and every ad campaign is heavily scrutinized against the highest industry standards.
                </p>
              </div>
            </div>

            <div className="phil-item border-b border-gray-300 py-12 flex flex-col md:flex-row gap-8 group">
              <span className="font-plex-mono text-5xl text-gray-300 group-hover:text-lusion-green transition-colors duration-500">03</span>
              <div>
                <h3 className="text-3xl font-bold mb-6 tracking-tight">Long-Term Partnership</h3>
                <p className="text-gray-600 font-light leading-relaxed text-xl max-w-2xl">
                  We aren't here for a quick flip. We are here to scale your infrastructure and brand over the next decade. Your growth is our growth.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="reveal-section section-padding py-40 flex flex-col items-center justify-center text-center">
        <div>
          <h2 className="text-4xl md:text-6xl font-bold mb-10 max-w-3xl mx-auto tracking-tight">Stop settling for templates. Work with the experts.</h2>
          <Button variant="primary" size="lg" withArrow={true} href="/contact" className="!w-auto !h-auto py-6 px-10 text-xl rounded-full">
            Hire the team
          </Button>
        </div>
      </section>
      
    </main>
  );
}
