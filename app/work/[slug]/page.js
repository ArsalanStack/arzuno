'use client';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../../../data/projects';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';
import Button from '../../components/Button';
import { notFound } from 'next/navigation';



export default function ProjectDetail({ params }) {
  const container = useRef(null);
  
  const [project, setProject] = useState(null);
  const [nextProject, setNextProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchParams() {
      const resolvedParams = await params;
      const index = projects.findIndex(p => p.slug === resolvedParams.slug);
      
      if (index === -1) {
        notFound();
      } else {
        setProject(projects[index]);
        setNextProject(projects[(index + 1) % projects.length]);
      }
      setLoading(false);
    }
    fetchParams();
  }, [params]);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!project || loading) return;

    // Title reveal
    const chars = container.current.querySelectorAll('.title-char');
    gsap.from(chars, {
      y: 100,
      opacity: 0,
      stagger: 0.03,
      duration: 1,
      ease: 'power4.out',
      delay: 0.1
    });

    // Mockup reveal
    gsap.from('.hero-mockup', {
      y: 60,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      delay: 0.4
    });

    // Scroll reveals
    const reveals = container.current.querySelectorAll('.scroll-reveal');
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

    // Media breaks parallax
    const mediaBreaks = container.current.querySelectorAll('.media-break img');
    mediaBreaks.forEach(img => {
      gsap.fromTo(img, 
        { scale: 1.1 },
        { 
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: img.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );
    });

    document.documentElement.classList.add('is-white-bg');
    return () => document.documentElement.classList.remove('is-white-bg');

  }, { scope: container, dependencies: [project, loading] });

  if (loading || !project) return null;

  return (
    <main ref={container} className="relative w-full min-h-screen font-aeonik bg-lusion-white text-lusion-black z-10 pt-32 rounded-b-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
      
      {/* Back Button */}
      <div className="px-[max(5vw,40px)] mb-6 relative z-20 pt-8">
        <Link href="/work" className="inline-flex items-center gap-2 font-plex-mono text-sm uppercase tracking-wider text-gray-500 hover:text-lusion-black transition-colors group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Work
        </Link>
      </div>

      {/* STAGE 1: The Hero Impact */}
      <section className="px-[max(5vw,40px)] pb-16 pt-2">
        <div className="max-w-5xl">
          <h1 className="text-5xl md:text-7xl lg:text-[8vw] leading-[0.9] font-bold tracking-tight uppercase flex flex-wrap mb-8 overflow-hidden">
            {Array.from(project.title || "").map((char, i) => (
              <span key={i} className="title-char inline-block">{char === ' ' ? '\u00A0' : char}</span>
            ))}
          </h1>
          <p className="text-2xl md:text-3xl font-light text-gray-600 max-w-3xl scroll-reveal">
            {project.summary}
          </p>
        </div>
      </section>

      {/* Hero Image */}
      <section className="px-[max(5vw,40px)] mb-32 hero-mockup">
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-[32px] overflow-hidden flex items-center justify-center shadow-lg">
          {project.image ? (
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full" style={{ backgroundColor: project.color, opacity: 0.1 }}></div>
          )}
        </div>
      </section>

      {/* STAGE 2: The Metadata Bar */}
      <section className="section-padding mb-32">
        <div className="border-t border-b border-gray-200 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 scroll-reveal">
            <div>
              <h4 className="font-plex-mono text-[10px] uppercase tracking-widest text-gray-500 mb-3">Client / Industry</h4>
              <p className="font-medium text-lg md:text-xl">{project.metadata?.client}</p>
            </div>
            <div>
              <h4 className="font-plex-mono text-[10px] uppercase tracking-widest text-gray-500 mb-3">Core Scope</h4>
              <p className="font-medium text-lg md:text-xl">{project.metadata?.scope}</p>
            </div>
            <div>
              <h4 className="font-plex-mono text-[10px] uppercase tracking-widest text-gray-500 mb-3">Tech Stack / Tools</h4>
              <p className="font-medium text-lg md:text-xl">{project.metadata?.techStack}</p>
            </div>
            <div>
              <h4 className="font-plex-mono text-[10px] uppercase tracking-widest text-gray-500 mb-3">Key Metric / Result</h4>
              <p className="font-medium text-lg md:text-xl">{project.metadata?.metric}</p>
            </div>
          </div>
        </div>
      </section>

      {/* STAGE 3: The Problem vs. The Strategy */}
      <section className="section-padding mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
          <div className="scroll-reveal">
            <h3 className="font-plex-mono text-sm uppercase tracking-wider text-gray-500 mb-8 flex items-center gap-4">
              <span className="w-8 h-px bg-gray-300 block"></span> The Challenge
            </h3>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">What was broken?</h2>
            <p className="text-xl text-gray-600 leading-relaxed font-light">
              {project.narrative?.problem}
            </p>
          </div>
          
          <div className="scroll-reveal">
            <h3 className="font-plex-mono text-sm uppercase tracking-wider text-gray-500 mb-8 flex items-center gap-4">
              <span className="w-8 h-px bg-gray-300 block"></span> The Execution
            </h3>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">How we solved it.</h2>
            <p className="text-xl text-gray-600 leading-relaxed font-light">
              {project.narrative?.strategy}
            </p>
          </div>
        </div>
      </section>

      {/* STAGE 4: Media Break 1 */}
      {project.mediaBreaks && project.mediaBreaks[0] && (
        <section className="w-full mb-32 media-break overflow-hidden h-[60vh] md:h-[80vh]">
          <img src={project.mediaBreaks[0]} alt="Showcase 1" className="w-full h-full object-cover" />
        </section>
      )}

      {/* STAGE 5: System Deliverables & Architecture */}
      <section className="section-padding mb-32 mx-[max(5vw,40px)] scroll-reveal">
        <div className="mb-16 border-b border-gray-200 pb-8">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">System Architecture</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl">
          {/* Engineering */}
          <div>
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-4">
              <span className="w-3 h-3 rounded-full bg-black"></span> Engineering
            </h3>
            <ul className="flex flex-col gap-6">
              {(project.deliverables?.engineering || []).map((item, idx) => (
                <li key={idx} className="flex items-start gap-4 text-lg text-gray-700">
                  <Check size={20} className="text-gray-400 mt-1 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Growth */}
          <div>
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-4">
              <span className="w-3 h-3 rounded-full bg-black"></span> Growth & Brand
            </h3>
            <ul className="flex flex-col gap-6">
              {(project.deliverables?.growth || []).map((item, idx) => (
                <li key={idx} className="flex items-start gap-4 text-lg text-gray-700">
                  <Check size={20} className="text-gray-400 mt-1 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* STAGE 4: Media Break 2 */}
      {project.mediaBreaks && project.mediaBreaks[1] && (
        <section className="w-full mb-32 media-break overflow-hidden h-[60vh] md:h-[80vh]">
          <img src={project.mediaBreaks[1]} alt="Showcase 2" className="w-full h-full object-cover" />
        </section>
      )}

      {/* STAGE 6: The Continuous Conversion Loop */}
      <section className="section-padding py-32 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-gray-200 pt-16">
          
          {/* Next Project Link */}
          <div className="scroll-reveal group cursor-pointer" onClick={() => window.location.href = `/work/${nextProject?.slug}`}>
            <h4 className="font-plex-mono text-sm uppercase tracking-wider text-gray-500 mb-4">Next Project</h4>
            <div className="flex items-center justify-between">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight group-hover:text-lusion-green transition-colors duration-300">
                {nextProject?.title}
              </h2>
              <div className="w-16 h-16 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-lusion-black group-hover:text-lusion-green group-hover:border-transparent transition-all duration-300">
                <ArrowRight size={28} />
              </div>
            </div>
          </div>
          
          {/* Direct CTA Box */}
          <div className="scroll-reveal flex justify-end">
            <Link href="/contact" className="block w-full md:w-4/5 bg-black text-white p-10 md:p-12 rounded-[24px] hover:bg-lusion-green hover:text-black transition-colors duration-500 group">
              <h3 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">
                Have a similar project in mind?
              </h3>
              <div className="flex items-center gap-4 font-plex-mono text-sm uppercase tracking-wider font-semibold">
                Start a conversation
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </Link>
          </div>
          
        </div>
      </section>

    </main>
  );
}
