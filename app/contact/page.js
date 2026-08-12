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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  
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
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    const formData = new FormData(e.target);
    formData.append('currency', currency);
    
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

              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center mb-1">
                  <label className="font-plex-mono text-xs uppercase tracking-wider text-gray-500 font-bold">Estimated Budget</label>
                  <div className="flex gap-2">
                    <button 
                      type="button" 
                      onClick={() => setCurrency('USD')}
                      className={`font-plex-mono text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border transition-colors cursor-pointer ${currency === 'USD' ? 'border-lusion-black bg-lusion-black text-white' : 'border-gray-200 text-gray-400 hover:text-lusion-black'}`}
                    >
                      USD
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setCurrency('PKR')}
                      className={`font-plex-mono text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border transition-colors cursor-pointer ${currency === 'PKR' ? 'border-lusion-black bg-lusion-black text-white' : 'border-gray-200 text-gray-400 hover:text-lusion-black'}`}
                    >
                      PKR
                    </button>
                  </div>
                </div>
                
                <select name="budget" required className="w-full bg-lusion-off-white text-lusion-black rounded-[16px] py-5 px-6 focus:outline-none focus:ring-2 focus:ring-lusion-blue transition-shadow text-lg appearance-none cursor-pointer">
                  <option value="" disabled selected>Select a budget range</option>
                  {currency === 'USD' ? (
                    <>
                      <option value="100-1k">$100 - $1,000</option>
                      <option value="1k-5k">$1,000 - $5,000</option>
                      <option value="5k-10k">$5,000 - $10,000</option>
                      <option value="10k+">$10,000+</option>
                    </>
                  ) : (
                    <>
                      <option value="10k-50k">10,000 PKR - 50,000 PKR</option>
                      <option value="50k-150k">50,000 PKR - 150,000 PKR</option>
                      <option value="150k-500k">150,000 PKR - 500,000 PKR</option>
                      <option value="500k+">500,000 PKR+</option>
                    </>
                  )}
                </select>
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
