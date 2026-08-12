'use client';
import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Mail, MapPin, Phone, Loader2 } from 'lucide-react';
import { sendContactEmail } from '../actions/sendContactEmail';

export default function Contact() {
  const container = useRef(null);
  const formRef = useRef(null);
  const [currency, setCurrency] = useState('USD');
  const [budget, setBudget] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const budgetOptionsUSD = [
    { value: '< $500', label: '< $500', desc: 'Consulting, Audits, or Minor Updates' },
    { value: '$500 - $2,500', label: '$500 - $2,500', desc: 'Landing Pages & Brand Identity' },
    { value: '$2,500 - $5,000', label: '$2,500 - $5,000', desc: 'Full-Stack Applications' },
    { value: '$5,000+', label: '$5,000+', desc: 'Enterprise Solutions & Retainers' }
  ];

  const budgetOptionsPKR = [
    { value: '< 50,000 PKR', label: '< 50,000 PKR', desc: 'Design Tweaks, Audits, Minor Features' },
    { value: '50,000 PKR - 150,000 PKR', label: '50k - 150k PKR', desc: 'Standard Web Projects' },
    { value: '150,000 PKR - 500,000 PKR', label: '150k - 500k PKR', desc: 'Custom Portals & E-commerce' },
    { value: '500,000+ PKR', label: '500,000+ PKR', desc: 'Full-Scale Agency Retainer' }
  ];
  
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

    gsap.from(formRef.current, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 0.8
    });

    const infoBlocks = container.current.querySelectorAll('.info-block');
    gsap.from(infoBlocks, {
      x: -40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out',
      delay: 0.8
    });

    document.documentElement.classList.add('is-white-bg');
    return () => document.documentElement.classList.remove('is-white-bg');
  }, { scope: container });

  async function handleSubmit(e) {
    e.preventDefault();
    if (!budget) {
      alert("Please select a budget range.");
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    const formData = new FormData(e.target);
    formData.append('currency', currency);
    formData.append('budget', budget);
    
    const result = await sendContactEmail(formData);
    
    setIsSubmitting(false);
    if (result.success) {
      setSubmitStatus('success');
      e.target.reset();
    } else {
      setSubmitStatus('error');
    }
  }

  return (
    <main ref={container} className="relative w-full min-h-screen font-aeonik bg-lusion-white text-lusion-black pt-40 pb-20 rounded-b-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.2)] z-10">
      
      {/* Header */}
      <section className="section-padding mb-16 pt-20">
        <h1 className="text-5xl md:text-7xl lg:text-[8vw] leading-none font-bold tracking-tight uppercase flex flex-wrap mb-6">
          {Array.from("Let's Talk").map((char, i) => (
            <span key={i} className="title-char inline-block">{char === ' ' ? '\u00A0' : char}</span>
          ))}
        </h1>
        <p className="font-plex-mono text-sm uppercase tracking-wider text-gray-500 max-w-xl title-char">
          Frictionless onboarding. Tell us about your project and budget, and we'll handle the rest.
        </p>
      </section>

      {/* Form & Info */}
      <section className="section-padding pb-32">
        <div className="max-w-screen-2xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-[32px] shadow-sm border border-gray-100" ref={formRef}>
            <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
              
              <div className="flex flex-col gap-3">
                <label className="font-plex-mono text-xs uppercase tracking-wider text-gray-500 font-bold">Your Name / Company</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  placeholder="John Doe @ TechFlow" 
                  className="w-full bg-lusion-off-white text-lusion-black rounded-[16px] py-5 px-6 focus:outline-none focus:ring-2 focus:ring-lusion-blue transition-shadow text-lg placeholder-gray-400"
                />
              </div>

              <div className="flex flex-col gap-3">
                <label className="font-plex-mono text-xs uppercase tracking-wider text-gray-500 font-bold">Email or Phone Number (Optional)</label>
                <input 
                  type="text" 
                  name="contact"
                  placeholder="name@example.com or +92 3..." 
                  className="w-full bg-lusion-off-white text-lusion-black rounded-[16px] py-5 px-6 focus:outline-none focus:ring-2 focus:ring-lusion-blue transition-shadow text-lg placeholder-gray-400"
                />
              </div>

              <div className="flex flex-col gap-3">
                <label className="font-plex-mono text-xs uppercase tracking-wider text-gray-500 font-bold">Project Scope</label>
                <textarea 
                  name="scope"
                  required
                  placeholder="Tell us what you want to build or grow..." 
                  rows={5}
                  className="w-full bg-lusion-off-white text-lusion-black rounded-[16px] py-5 px-6 focus:outline-none focus:ring-2 focus:ring-lusion-blue transition-shadow text-lg placeholder-gray-400 resize-none"
                ></textarea>
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center mb-1">
                  <label className="font-plex-mono text-xs uppercase tracking-wider text-gray-500 font-bold">Anticipated Budget</label>
                  
                  {/* Currency Toggle */}
                  <div className="flex bg-lusion-off-white p-1 rounded-full border border-gray-100">
                    <button 
                      type="button" 
                      onClick={() => { setCurrency('PKR'); setBudget(''); }}
                      className={`font-plex-mono text-[10px] uppercase tracking-wider px-4 py-2 rounded-full transition-all duration-300 ${currency === 'PKR' ? 'bg-lusion-black text-white shadow-sm' : 'text-gray-500 hover:text-lusion-black'}`}
                    >
                      PKR - Local
                    </button>
                    <button 
                      type="button" 
                      onClick={() => { setCurrency('USD'); setBudget(''); }}
                      className={`font-plex-mono text-[10px] uppercase tracking-wider px-4 py-2 rounded-full transition-all duration-300 ${currency === 'USD' ? 'bg-lusion-black text-white shadow-sm' : 'text-gray-500 hover:text-lusion-black'}`}
                    >
                      USD - Int'l
                    </button>
                  </div>
                </div>
                
                {/* Bento Grid Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(currency === 'USD' ? budgetOptionsUSD : budgetOptionsPKR).map((option) => (
                    <div 
                      key={option.value}
                      onClick={() => setBudget(option.value)}
                      className={`cursor-pointer border p-6 rounded-2xl flex flex-col gap-2 transition-all duration-300 ${budget === option.value ? 'border-lusion-black bg-lusion-black text-white shadow-lg scale-[1.02]' : 'border-gray-200 bg-white text-lusion-black hover:border-gray-400 hover:bg-gray-50'}`}
                    >
                      <h4 className="font-bold text-lg tracking-tight">{option.label}</h4>
                      <p className={`text-sm ${budget === option.value ? 'text-gray-300' : 'text-gray-500'}`}>{option.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="mt-4 w-full bg-lusion-black text-white rounded-full py-6 text-lg font-bold tracking-wide uppercase hover:bg-lusion-green hover:text-black transition-colors duration-300 shadow-md hover:shadow-xl cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? <><Loader2 className="animate-spin" size={20} /> Sending...</> : 'Submit Inquiry'}
              </button>

              {submitStatus === 'success' && (
                <div className="p-4 rounded-xl bg-lusion-green/20 text-lusion-black border border-lusion-green font-medium">
                  Message sent successfully! For instant responses, contact our WhatsApp at +92 333 3479586.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="p-4 rounded-xl bg-red-100 text-red-700 border border-red-200 font-medium">
                  Failed to send message. Please try again or email us directly.
                </div>
              )}
            </form>
          </div>
          
          {/* Contact Info */}
          <div className="lg:col-span-4 lg:col-start-9 flex flex-col gap-12 mt-4 lg:mt-12">
            
            <div className="info-block flex gap-6">
              <div className="w-12 h-12 rounded-full bg-lusion-off-white flex items-center justify-center text-lusion-blue shrink-0">
                <Mail size={20} />
              </div>
              <div>
                <h3 className="font-plex-mono text-xs uppercase tracking-wider text-gray-500 mb-2">Email Us</h3>
                <a href="mailto:arzunoteam@gmail.com" className="text-2xl font-medium hover:text-lusion-blue transition-colors">arzunoteam@gmail.com</a>
              </div>
            </div>

            <div className="info-block flex gap-6">
              <div className="w-12 h-12 rounded-full bg-lusion-off-white flex items-center justify-center text-lusion-green shrink-0">
                <Phone size={20} />
              </div>
              <div>
                <h3 className="font-plex-mono text-xs uppercase tracking-wider text-gray-500 mb-2">Call Us</h3>
                <a href="tel:+923333479586" className="text-2xl font-medium hover:text-lusion-green transition-colors">+92 3333479586</a>
              </div>
            </div>

            <div className="info-block flex gap-6">
              <div className="w-12 h-12 rounded-full bg-lusion-off-white flex items-center justify-center text-[#8832F7] shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <h3 className="font-plex-mono text-xs uppercase tracking-wider text-gray-500 mb-2">Headquarters</h3>
                <address className="text-2xl font-medium not-italic">
                  Sariab Road<br/>
                  Quetta, Pakistan
                </address>
              </div>
            </div>

          </div>
          
        </div>
      </section>
      
    </main>
  );
}
