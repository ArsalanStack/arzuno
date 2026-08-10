'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Code, Code2, Megaphone, Palette, Target, Cpu } from 'lucide-react';
import Button from '../components/Button';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Services() {
  const container = useRef(null);
  
  useGSAP(() => {
    const chars = container.current.querySelectorAll('.title-char');
    gsap.from(chars, {
      y: 100,
      opacity: 0,
      stagger: 0.05,
      duration: 1,
      ease: 'power4.out',
      delay: 0.2
    });

    const sections = container.current.querySelectorAll('.pillar-section');
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

    const listItems = container.current.querySelectorAll('.service-item');
    listItems.forEach(item => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });
    });

    document.documentElement.classList.add('is-white-bg');
    return () => document.documentElement.classList.remove('is-white-bg');
  }, { scope: container });

  return (
    <main ref={container} className="relative w-full min-h-screen font-aeonik bg-lusion-white text-lusion-black pt-40 pb-20 rounded-b-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.2)] z-10">
      
      <section className="section-padding mb-32 pt-20">
        <h1 className="text-5xl md:text-7xl lg:text-[8vw] leading-none font-bold tracking-tight uppercase flex flex-wrap mb-10">
          {Array.from("Services").map((char, i) => (
            <span key={i} className="title-char inline-block">{char === ' ' ? '\u00A0' : char}</span>
          ))}
        </h1>
        <p className="font-plex-mono text-sm uppercase tracking-wider text-gray-500 max-w-xl title-char">
          Two distinct technical pillars. One cohesive vision. We build, and we grow.
        </p>
      </section>

      {/* Pillar 1: Engineering */}
      <section className="pillar-section section-padding py-32 border-t border-gray-200">
        <div className="max-w-screen-2xl mx-auto w-full flex flex-col lg:flex-row gap-16 lg:gap-32">
          
          <div className="lg:w-1/3 shrink-0">
            <div className="sticky top-40">
              <div className="w-20 h-20 rounded-full border border-gray-200 flex items-center justify-center text-lusion-green mb-10 group-hover:bg-lusion-green transition-colors duration-500">
                <Cpu size={32} />
              </div>
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-8">Engineering</h2>
              <p className="text-xl text-gray-600 font-light mb-10 max-w-sm">
                Robust, scalable, and cutting-edge technical solutions built for the modern web. We engineer products that perform under pressure.
              </p>
              <Button variant="secondary" withArrow={true} href="/work">View Tech Stack</Button>
            </div>
          </div>
          
          <div className="lg:w-2/3 flex flex-col border-t border-gray-200">
            
            <div className="service-item border-b border-gray-200 py-16 px-8 md:px-12 group cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-lusion-green translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
              <div className="relative z-10 flex flex-col md:flex-row gap-8 justify-between md:items-center">
                <div className="flex-1">
                  <h3 className="text-4xl font-bold mb-4 tracking-tight group-hover:text-black transition-colors duration-300">Web Applications</h3>
                  <p className="text-gray-500 font-light text-xl max-w-xl group-hover:text-black transition-colors duration-300">
                    Custom full-stack web applications using React, Next.js, and Node. Built for speed, security, and exceptional user experience.
                  </p>
                </div>
                <div className="shrink-0">
                  <div className="w-16 h-16 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-black group-hover:text-lusion-green group-hover:border-transparent transition-all duration-300">
                    <ArrowRight size={24} />
                  </div>
                </div>
              </div>
            </div>

            <div className="service-item border-b border-gray-200 py-16 px-8 md:px-12 group cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-lusion-green translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
              <div className="relative z-10 flex flex-col md:flex-row gap-8 justify-between md:items-center">
                <div className="flex-1">
                  <h3 className="text-4xl font-bold mb-4 tracking-tight group-hover:text-black transition-colors duration-300">LMS Platforms</h3>
                  <p className="text-gray-500 font-light text-xl max-w-xl group-hover:text-black transition-colors duration-300">
                    Feature-rich Learning Management Systems tailored for creators, institutions, and enterprises to deliver seamless education.
                  </p>
                </div>
                <div className="shrink-0">
                  <div className="w-16 h-16 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-black group-hover:text-lusion-green group-hover:border-transparent transition-all duration-300">
                    <ArrowRight size={24} />
                  </div>
                </div>
              </div>
            </div>

            <div className="service-item border-b border-gray-200 py-16 px-8 md:px-12 group cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-lusion-green translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
              <div className="relative z-10 flex flex-col md:flex-row gap-8 justify-between md:items-center">
                <div className="flex-1">
                  <h3 className="text-4xl font-bold mb-4 tracking-tight group-hover:text-black transition-colors duration-300">Directories</h3>
                  <p className="text-gray-500 font-light text-xl max-w-xl group-hover:text-black transition-colors duration-300">
                    High-performance directory websites with advanced filtering, geolocation, and massive data handling capabilities.
                  </p>
                </div>
                <div className="shrink-0">
                  <div className="w-16 h-16 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-black group-hover:text-lusion-green group-hover:border-transparent transition-all duration-300">
                    <ArrowRight size={24} />
                  </div>
                </div>
              </div>
            </div>

            <div className="service-item border-b border-gray-200 py-16 px-8 md:px-12 group cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-lusion-green translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
              <div className="relative z-10 flex flex-col md:flex-row gap-8 justify-between md:items-center">
                <div className="flex-1">
                  <h3 className="text-4xl font-bold mb-4 tracking-tight group-hover:text-black transition-colors duration-300">Chrome Extensions</h3>
                  <p className="text-gray-500 font-light text-xl max-w-xl group-hover:text-black transition-colors duration-300">
                    Powerful browser extensions that integrate seamlessly with your core product to enhance user workflows and retention.
                  </p>
                </div>
                <div className="shrink-0">
                  <div className="w-16 h-16 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-black group-hover:text-lusion-green group-hover:border-transparent transition-all duration-300">
                    <ArrowRight size={24} />
                  </div>
                </div>
              </div>
            </div>

          </div>
          
        </div>
      </section>

      {/* Pillar 2: Growth & Brand */}
      <section className="pillar-section section-padding py-32 border-t border-gray-200 bg-[#F9F9FB]">
        <div className="max-w-screen-2xl mx-auto w-full flex flex-col lg:flex-row gap-16 lg:gap-32">
          
          <div className="lg:w-1/3 shrink-0 lg:order-2">
            <div className="sticky top-40">
              <div className="w-20 h-20 rounded-full border border-gray-300 flex items-center justify-center text-lusion-green mb-10 group-hover:bg-lusion-green transition-colors duration-500">
                <Target size={32} />
              </div>
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-8">Growth & Brand</h2>
              <p className="text-xl text-gray-600 font-light mb-10 max-w-sm">
                We don't just build products; we make sure people see them. Data-driven growth strategies paired with striking visual identities.
              </p>
              <Button variant="secondary" withArrow={true} href="/contact">Start a Campaign</Button>
            </div>
          </div>
          
          <div className="lg:w-2/3 flex flex-col border-t border-gray-300 lg:order-1">
            
            <div className="service-item border-b border-gray-300 py-16 px-8 md:px-12 group cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-lusion-green translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
              <div className="relative z-10 flex flex-col md:flex-row gap-8 justify-between md:items-center">
                <div className="flex-1">
                  <h3 className="text-4xl font-bold mb-4 tracking-tight group-hover:text-black transition-colors duration-300">Ad Campaigns</h3>
                  <p className="text-gray-500 font-light text-xl max-w-xl group-hover:text-black transition-colors duration-300">
                    High-converting paid advertising strategies across Google, Meta, and LinkedIn to drive immediate and measurable ROI.
                  </p>
                </div>
                <div className="shrink-0">
                  <div className="w-16 h-16 rounded-full border border-gray-300 flex items-center justify-center group-hover:bg-black group-hover:text-lusion-green group-hover:border-transparent transition-all duration-300">
                    <ArrowRight size={24} />
                  </div>
                </div>
              </div>
            </div>

            <div className="service-item border-b border-gray-300 py-16 px-8 md:px-12 group cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-lusion-green translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
              <div className="relative z-10 flex flex-col md:flex-row gap-8 justify-between md:items-center">
                <div className="flex-1">
                  <h3 className="text-4xl font-bold mb-4 tracking-tight group-hover:text-black transition-colors duration-300">Visual Identity</h3>
                  <p className="text-gray-500 font-light text-xl max-w-xl group-hover:text-black transition-colors duration-300">
                    Comprehensive brand guidelines, color palettes, and typography systems that position you as a premium authority in your space.
                  </p>
                </div>
                <div className="shrink-0">
                  <div className="w-16 h-16 rounded-full border border-gray-300 flex items-center justify-center group-hover:bg-black group-hover:text-lusion-green group-hover:border-transparent transition-all duration-300">
                    <ArrowRight size={24} />
                  </div>
                </div>
              </div>
            </div>

            <div className="service-item border-b border-gray-300 py-16 px-8 md:px-12 group cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-lusion-green translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
              <div className="relative z-10 flex flex-col md:flex-row gap-8 justify-between md:items-center">
                <div className="flex-1">
                  <h3 className="text-4xl font-bold mb-4 tracking-tight group-hover:text-black transition-colors duration-300">Vector Logos</h3>
                  <p className="text-gray-500 font-light text-xl max-w-xl group-hover:text-black transition-colors duration-300">
                    Timeless, scalable, and versatile logo designs crafted to leave a lasting impression on your target audience.
                  </p>
                </div>
                <div className="shrink-0">
                  <div className="w-16 h-16 rounded-full border border-gray-300 flex items-center justify-center group-hover:bg-black group-hover:text-lusion-green group-hover:border-transparent transition-all duration-300">
                    <ArrowRight size={24} />
                  </div>
                </div>
              </div>
            </div>

            <div className="service-item border-b border-gray-300 py-16 px-8 md:px-12 group cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-lusion-green translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
              <div className="relative z-10 flex flex-col md:flex-row gap-8 justify-between md:items-center">
                <div className="flex-1">
                  <h3 className="text-4xl font-bold mb-4 tracking-tight group-hover:text-black transition-colors duration-300">SEO Optimization</h3>
                  <p className="text-gray-500 font-light text-xl max-w-xl group-hover:text-black transition-colors duration-300">
                    Technical and content-driven SEO to ensure your custom engineering work ranks organically at the top of search engines.
                  </p>
                </div>
                <div className="shrink-0">
                  <div className="w-16 h-16 rounded-full border border-gray-300 flex items-center justify-center group-hover:bg-black group-hover:text-lusion-green group-hover:border-transparent transition-all duration-300">
                    <ArrowRight size={24} />
                  </div>
                </div>
              </div>
            </div>

          </div>
          
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding py-40 flex flex-col items-center justify-center text-center">
        <div>
          <h2 className="text-4xl md:text-6xl font-bold mb-10 tracking-tight max-w-3xl mx-auto">Ready to combine Engineering with Growth?</h2>
          <Button variant="primary" size="lg" withArrow={true} href="/contact" className="!w-auto !h-auto py-6 px-10 text-xl rounded-full">
            Let's talk
          </Button>
        </div>
      </section>
      
    </main>
  );
}
