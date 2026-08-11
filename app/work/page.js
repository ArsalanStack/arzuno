'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import Link from 'next/link';
import { projects } from '../../data/projects';



export default function Work() {
  const container = useRef(null);
  
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    // Animate Header
    const chars = container.current.querySelectorAll('.title-char');
    gsap.from(chars, {
      y: 100,
      opacity: 0,
      stagger: 0.05,
      duration: 1,
      ease: 'power4.out',
      delay: 0.2
    });

    // Animate Grid Items
    const cards = container.current.querySelectorAll('.project-card');
    cards.forEach(card => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });
    });

    document.documentElement.classList.add('is-white-bg');
    
    return () => {
      document.documentElement.classList.remove('is-white-bg');
    };

  }, { scope: container });

  return (
    <main ref={container} className="relative w-full min-h-screen font-aeonik bg-lusion-white text-lusion-black pt-40 pb-20 rounded-b-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.2)] z-10">
      
      {/* Header Section */}
      <section className="section-padding mb-24 pt-20">
        <h1 className="text-5xl md:text-7xl lg:text-[8vw] leading-none font-bold tracking-tight uppercase flex flex-wrap mb-10">
          {Array.from("Our Work").map((char, i) => (
            <span key={i} className="title-char inline-block">{char === ' ' ? '\u00A0' : char}</span>
          ))}
        </h1>
        <p className="font-plex-mono text-sm uppercase tracking-wider text-gray-500 max-w-xl title-char">
          A collection of our digital engineering and growth platforms.
        </p>
      </section>

      {/* Unified Bento Grid */}
      <section className="px-[max(5vw,40px)] mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {projects.map((project, i) => (
            <Link href={`/work/${project.slug}`} key={i} className="project-card group cursor-pointer flex flex-col">
              
              {/* Image Container */}
              <div 
                className="w-full aspect-[4/3] rounded-[24px] mb-8 overflow-hidden relative shadow-sm border border-gray-200 group-hover:border-lusion-green transition-colors duration-500"
                style={{ backgroundColor: project.color }}
              >
                {project.image ? (
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:scale-105 transition-transform duration-700 ease-out">
                       <span className="font-plex-mono text-[6rem] text-white mix-blend-overlay font-bold">0{i+1}</span>
                    </div>
                  </>
                )}
              </div>
              
              {/* Content Container */}
              <div className="flex flex-col gap-4">
                <h3 className="text-3xl md:text-4xl tracking-tight font-bold flex items-center justify-between group-hover:text-lusion-green transition-colors duration-300">
                  {project.title}
                  <span className="text-lusion-green opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <ArrowRight size={28} />
                  </span>
                </h3>

                {/* Tags Row */}
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="font-plex-mono text-[10px] uppercase tracking-wider bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full border border-gray-200 group-hover:border-gray-300 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Summary / Subtext */}
                <p className="text-lg md:text-xl text-gray-600 font-light mt-2 leading-relaxed">
                  {project.summary}
                </p>
              </div>
              
            </Link>
          ))}
        </div>
      </section>
      
      {/* Improved CTA */}
      <section className="section-padding py-32 mt-20 flex flex-col items-center justify-center text-center border-t border-gray-200 mx-[max(5vw,40px)] mb-20">
        <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight max-w-2xl">
          Seen enough? Let's build something extraordinary together.
        </h2>
        <p className="text-xl text-gray-500 font-light mb-12 max-w-xl">
          Whether you need a cutting-edge web application or a brand overhaul, our team is ready.
        </p>
        <Button variant="primary" size="lg" withArrow={true} href="/contact" className="!w-auto !h-auto py-6 px-10 text-xl rounded-full">
          Let's talk
        </Button>
      </section>
      
    </main>
  );
}
