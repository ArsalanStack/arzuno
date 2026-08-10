'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Button from '../components/Button';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const categories = [
  {
    id: 'web-dev',
    name: 'Website Development',
    projects: [
      { title: 'Spatial Fusion', client: 'Tech Corp', color: '#1A2FFB' },
      { title: 'Devin Clone', client: 'AI Startup', color: '#FF4C41' },
      { title: 'Quantum Build', client: 'Quantum Labs', color: '#000000' },
      { title: 'Nexus Dashboard', client: 'Fintech Inc', color: '#071BDF' },
      { title: 'Cloud CRM', client: 'Enterprise LLC', color: '#C1FF00' }
    ]
  },
  {
    id: 'web-design',
    name: 'Website Design',
    projects: [
      { title: 'Dream Machine', client: 'Porsche', color: '#C1FF00' },
      { title: 'Neon Nights', client: 'Event Co', color: '#8832F7' },
      { title: 'Minimal Flow', client: 'Studio X', color: '#1A2FFB' },
      { title: 'Aura Aesthetics', client: 'Beauty Brand', color: '#FF00FF' },
      { title: 'Grid Architecture', client: 'Studio Y', color: '#4b9cd3' }
    ]
  },
  {
    id: 'digital-marketing',
    name: 'Digital Marketing & SEO',
    projects: [
      { title: 'Oryzo AI Growth', client: 'Oryzo', color: '#071BDF' },
      { title: 'Global Reach SEO', client: 'Fintech Inc', color: '#FF00FF' },
      { title: 'Viral Campaign', client: 'FastFood', color: '#FF4C41' },
      { title: 'Conversion Master', client: 'E-Comm Pro', color: '#000000' },
      { title: 'Brand Dominance', client: 'Agency Z', color: '#8832F7' }
    ]
  }
];

export default function Work() {
  const container = useRef(null);
  
  // Create refs for each scroll container
  const scrollRefs = useRef([]);

  const scrollLeft = (index) => {
    if (scrollRefs.current[index]) {
      const scrollAmount = window.innerWidth > 768 ? window.innerWidth * 0.45 : window.innerWidth * 0.85;
      scrollRefs.current[index].scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = (index) => {
    if (scrollRefs.current[index]) {
      const scrollAmount = window.innerWidth > 768 ? window.innerWidth * 0.45 : window.innerWidth * 0.85;
      scrollRefs.current[index].scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  
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

    const sections = container.current.querySelectorAll('.category-section');
    sections.forEach(sec => {
      gsap.from(sec, {
        scrollTrigger: {
          trigger: sec,
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
      
      <section className="section-padding mb-24 pt-20">
        <h1 className="text-5xl md:text-7xl lg:text-[8vw] leading-none font-bold tracking-tight uppercase flex flex-wrap mb-10">
          {Array.from("Our Work").map((char, i) => (
            <span key={i} className="title-char inline-block">{char === ' ' ? '\u00A0' : char}</span>
          ))}
        </h1>
        <p className="font-plex-mono text-sm uppercase tracking-wider text-gray-500 max-w-xl title-char">
          A collection of our finest digital experiences across development, design, and marketing.
        </p>
      </section>

      {categories.map((cat, index) => (
        <section key={cat.id} className="category-section py-20 border-t border-gray-200">
          <div className="section-padding pb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{cat.name}</h2>
            <div className="flex gap-4">
              <button 
                onClick={() => scrollLeft(index)}
                className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center hover:bg-lusion-black hover:text-lusion-green hover:border-transparent transition-all duration-300 cursor-pointer"
              >
                <ArrowLeft size={24} />
              </button>
              <button 
                onClick={() => scrollRight(index)}
                className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center hover:bg-lusion-black hover:text-lusion-green hover:border-transparent transition-all duration-300 cursor-pointer"
              >
                <ArrowRight size={24} />
              </button>
            </div>
          </div>
          
          <div 
            ref={el => scrollRefs.current[index] = el}
            className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pl-[max(5vw,40px)] pr-[max(5vw,40px)] gap-6 md:gap-10 pb-8 scroll-smooth"
          >
            {cat.projects.map((project, i) => (
              <div key={i} className="project-card group cursor-pointer flex flex-col flex-none w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[30vw] snap-start">
                <div 
                  className="w-full aspect-[4/3] rounded-[16px] mb-6 overflow-hidden relative shadow-sm border border-gray-200 group-hover:border-lusion-green transition-colors duration-300"
                  style={{ backgroundColor: project.color }}
                >
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:scale-105 transition-transform duration-700 ease-out">
                     <span className="font-plex-mono text-[6rem] text-white mix-blend-overlay font-bold">0{i+1}</span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <p className="font-plex-mono text-[10px] uppercase tracking-widest text-lusion-black font-semibold">Client: {project.client}</p>
                  <h3 className="text-2xl md:text-3xl tracking-tight font-medium flex items-center justify-between group-hover:text-lusion-green transition-colors duration-300">
                    {project.title}
                    <span className="text-lusion-green opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      <ArrowRight size={24} />
                    </span>
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
      
      {/* Improved CTA */}
      <section className="section-padding py-40 mt-20 flex flex-col items-center justify-center text-center border-t border-gray-200 mx-[max(5vw,40px)] mb-20">
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
      
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      
    </main>
  );
}
