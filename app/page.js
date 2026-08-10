'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Star } from 'lucide-react';
import Button from './components/Button';
import Link from 'next/link';
import ThreeScene from './components/ThreeScene';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const reviews = [
  { text: "Arzuno completely transformed our digital presence. Their attention to detail and design aesthetics are unmatched.", author: "Sarah Jenkins", role: "CMO, TechFlow" },
  { text: "The team delivered a world-class platform ahead of schedule. The engineering quality is simply outstanding.", author: "Marcus Thorne", role: "Founder, Quantum Startups" },
  { text: "From brand identity to the final web application, Arzuno's cohesive vision drove a 200% increase in our conversions.", author: "Elena Rostova", role: "Director, Global Reach" }
];

export default function Home() {
  const container = useRef(null);
  const heroText = useRef(null);
  const featureSection = useRef(null);
  const projectsSection = useRef(null);
  const reviewsSection = useRef(null);
  const endSection = useRef(null);
  
  useGSAP(() => {
    const chars = heroText.current.querySelectorAll('.char');
    gsap.from(chars, {
      y: 100,
      opacity: 0,
      stagger: 0.05,
      duration: 1,
      ease: 'power4.out',
      delay: 0.5
    });

    const reveals = container.current.querySelectorAll('.feature-reveal');
    reveals.forEach(el => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });
    });
    
    gsap.from('.project-card', {
      scrollTrigger: {
        trigger: projectsSection.current,
        start: 'top 70%',
      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'expo.out'
    });

    gsap.from('.review-card', {
      scrollTrigger: {
        trigger: reviewsSection.current,
        start: 'top 85%',
      },
      y: 40,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out'
    });
    
    ScrollTrigger.create({
      trigger: featureSection.current,
      start: 'top 50%',
      endTrigger: endSection.current,
      end: 'top 80%',
      onEnter: () => document.documentElement.classList.add('is-white-bg'),
      onLeave: () => document.documentElement.classList.remove('is-white-bg'),
      onEnterBack: () => document.documentElement.classList.add('is-white-bg'),
      onLeaveBack: () => document.documentElement.classList.remove('is-white-bg'),
    });

  }, { scope: container });

  const projects = [
    { title: 'Spatial Fusion', category: 'Web App', color: '#1A2FFB' },
    { title: 'Oryzo AI', category: 'AI Platform', color: '#8832F7' },
    { title: 'Devin Clone', category: 'SaaS', color: '#FF4C41' },
    { title: 'Dream Machine', category: 'E-Commerce', color: '#C1FF00' },
    { title: 'Neon Nights', category: 'Event Platform', color: '#00E5FF' },
    { title: 'Quantum Build', category: 'Fintech', color: '#000000' }
  ];

  return (
    <main ref={container} className="relative w-full min-h-screen font-aeonik">
      
      {/* Hero Section */}
      <section className="relative w-full h-screen flex flex-col justify-end section-padding pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <ThreeScene />
        </div>
        
        <h1 ref={heroText} className="text-[10vw] leading-none font-bold tracking-tight uppercase flex flex-wrap mix-blend-difference relative z-10 pointer-events-none">
          {Array.from("Arzuno").map((char, i) => (
            <span key={i} className="char inline-block">{char}</span>
          ))}
        </h1>
        <div className="absolute right-10 bottom-32 hidden md:block z-10 pointer-events-none">
          <p className="font-plex-mono text-xs uppercase tracking-wider text-lusion-dark-white max-w-[200px]">
            We turn bold ideas into immersive digital experiences.
          </p>
        </div>
      </section>
      
      {/* Feature / Approach Section - Added extra mt-20 and pt-40 for spacing */}
      <section ref={featureSection} className="relative z-10 w-full section-padding py-40 mt-10 bg-lusion-white text-lusion-black min-h-screen flex flex-col justify-center rounded-t-[40px] shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
        <div className="max-w-screen-2xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8 md:col-start-3 feature-reveal">
            <h2 className="text-5xl md:text-7xl lg:text-[5rem] font-bold leading-[1.1] mb-16 tracking-tight">
              Bold Ideas,<br/>Brought to Life.
            </h2>
            <p className="text-xl md:text-3xl leading-relaxed mb-16 max-w-3xl font-light text-gray-700">
              Arzuno is a premium agency specializing in web development, marketing, and SEO. We blend high-end aesthetics with cutting-edge technology to build digital products that stand out.
            </p>
            
            <Link href="/about">
              <button className="group inline-flex items-center gap-4 bg-white shadow-[0_6px_10px_#0000000A,0_2px_4px_#0000000A] px-8 py-5 rounded-full border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="w-1.5 h-1.5 rounded-full bg-lusion-black group-hover:bg-lusion-green transition-colors"></div>
                <span className="font-aeonik font-medium uppercase tracking-tight text-sm">Our Approach</span>
                <span className="text-lusion-black group-hover:text-lusion-green group-hover:translate-x-2 transition-all duration-300 flex items-center">
                  <ArrowRight size={16} />
                </span>
              </button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Projects List - Added extra pt-32 spacing */}
      <section ref={projectsSection} className="relative z-10 w-full section-padding pt-32 pb-40 bg-lusion-white text-lusion-black">
        <div className="max-w-screen-2xl mx-auto w-full">
          <div className="flex justify-between items-end mb-16 feature-reveal border-b border-gray-200 pb-8">
            <h3 className="text-4xl md:text-6xl font-bold tracking-tight">Recent Projects</h3>
            <Link href="/work" className="hidden md:flex items-center gap-2 font-plex-mono text-sm uppercase tracking-wider text-gray-500 hover:text-lusion-green transition-colors group">
              View all <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
            {projects.map((project, i) => (
              <div key={i} className="project-card group cursor-pointer flex flex-col">
                <div 
                  className="w-full aspect-[4/3] rounded-[15px] mb-6 overflow-hidden relative shadow-sm border border-gray-200 group-hover:border-lusion-green transition-colors duration-300"
                  style={{ backgroundColor: project.color }}
                >
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:scale-105 transition-transform duration-700 ease-out">
                    <span className="font-plex-mono text-[6rem] text-white mix-blend-overlay font-bold">0{i+1}</span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <p className="font-plex-mono text-[10px] uppercase tracking-widest text-lusion-black font-semibold">{project.category}</p>
                  <h4 className="text-2xl md:text-3xl tracking-tight font-medium flex items-center justify-between group-hover:text-lusion-green transition-colors duration-300">
                    {project.title}
                    <span className="text-lusion-green opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      <ArrowRight size={20} />
                    </span>
                  </h4>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-20 md:hidden flex justify-center">
            <Button variant="secondary" withArrow={true} href="/work">View all work</Button>
          </div>
        </div>
      </section>

      {/* Reviews Section - Sleek Redesign */}
      <section ref={reviewsSection} className="relative z-10 w-full section-padding pb-64 md:pb-80 bg-lusion-white text-lusion-black pt-32">
        <div className="max-w-screen-2xl mx-auto w-full border-t border-gray-200 pt-16">
          <div className="mb-16 feature-reveal">
             <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">What Our Clients Say</h3>
             <p className="font-plex-mono text-sm uppercase tracking-wider text-gray-500">Don't just take our word for it.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 gap-y-8 mb-35">
            {reviews.map((review, i) => (
              <div key={i} className="review-card bg-transparent border border-gray-300 rounded-[24px] p-10 flex flex-col justify-between hover:border-lusion-green hover:shadow-[0_10px_40px_rgba(193,255,0,0.1)] transition-all duration-300 group cursor-pointer">
                <div>
                  <div className="flex gap-1 mb-8 text-gray-300 group-hover:text-lusion-green transition-colors duration-300">
                    {[...Array(5)].map((_, j) => <Star key={j} size={20} fill="currentColor" />)}
                  </div>
                  <p className="text-xl md:text-2xl leading-relaxed font-light mb-10 text-gray-800 group-hover:text-black transition-colors duration-300">
                    "{review.text}"
                  </p>
                </div>
                <div className="border-t border-gray-200 pt-6 group-hover:border-lusion-green transition-colors duration-300">
                  <p className="font-bold text-lg">{review.author}</p>
                  <p className="font-plex-mono text-xs uppercase tracking-wider text-gray-500 mt-2">{review.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* End Section / Goal */}
      <section ref={endSection} className="relative z-20 w-full bg-lusion-black text-white flex flex-col items-center justify-center section-padding py-32 md:py-48 text-center rounded-t-[40px] shadow-[0_-20px_50px_rgba(0,0,0,0.5)] mb-32 -mt-10 overflow-hidden">
        
        {/* Background Text for aesthetics */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] text-[15vw] font-bold uppercase whitespace-nowrap opacity-[0.03] pointer-events-none tracking-tighter mix-blend-overlay flex justify-center">
          ARZUNO AGENCY
        </div>

        <div className="relative z-10 flex flex-col items-center w-full max-w-6xl mx-auto">
          <p className="font-plex-mono text-xs md:text-sm uppercase tracking-[0.3em] text-lusion-green mb-10 feature-reveal font-semibold">
            Let's build something extraordinary
          </p>
          <h2 className="text-5xl md:text-7xl lg:text-[8vw] font-bold tracking-tight leading-[0.9] mb-16 feature-reveal">
            IS YOUR BIG IDEA READY TO GO <span className="text-lusion-green italic pr-2">WILD?</span>
          </h2>
          <div className="feature-reveal">
            <Button variant="primary" size="lg" className="!w-auto !h-auto py-6 px-10 md:py-8 md:px-14 text-xl md:text-2xl rounded-full shadow-[0_0_40px_rgba(193,255,0,0.2)] hover:shadow-[0_0_60px_rgba(193,255,0,0.4)] transition-shadow duration-500" withArrow={true} href="/contact">
              Start a project
            </Button>
          </div>
        </div>
      </section>
      
    </main>
  );
}
