import { ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="footer-section" className="bg-[#121416] text-white section-padding pt-32 pb-12 relative z-10 mt-16">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-x-8 max-w-screen-2xl mx-auto">
        <div className="md:col-span-6 lg:col-span-5 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl tracking-tight mb-8">
              Stay in the loop.
            </h2>
            <div className="relative max-w-md">
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full bg-lusion-off-white text-lusion-black rounded-[18px] py-4 pl-6 pr-16 focus:outline-none focus:ring-2 focus:ring-lusion-blue transition-shadow"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-lusion-black text-white rounded-full flex items-center justify-center hover:bg-lusion-blue transition-colors group">
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
          
          <div className="mt-16 md:mt-32 flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-lusion-green"></div>
            <span className="font-plex-mono text-xs font-medium uppercase tracking-wider text-lusion-dark-white">Available for new projects</span>
          </div>
        </div>

        <div className="md:col-span-3 lg:col-start-8 lg:col-span-2 flex flex-col gap-8">
          <div>
            <h3 className="font-plex-mono text-xs uppercase tracking-wider text-gray-500 mb-4">Enquiries</h3>
            <a href="mailto:arzunoteam@gmail.com" className="text-lg hover:text-lusion-green transition-colors">arzunoteam@gmail.com</a>
          </div>
          <div>
            <h3 className="font-plex-mono text-xs uppercase tracking-wider text-gray-500 mb-4">Call Us</h3>
            <a href="tel:+923333479586" className="text-lg hover:text-lusion-green transition-colors">+92 3333479586</a>
          </div>
        </div>

        <div className="md:col-span-3 flex flex-col gap-8">
          <div>
            <h3 className="font-plex-mono text-xs uppercase tracking-wider text-gray-500 mb-4">Location</h3>
            <address className="text-lg not-italic text-lusion-dark-white">
              Sariab Road<br/>
              Quetta, Pakistan
            </address>
          </div>
          <div>
            <h3 className="font-plex-mono text-xs uppercase tracking-wider text-gray-500 mb-4">Socials</h3>
            <div className="flex flex-col gap-2">
              <a href="#" className="text-lg hover:text-lusion-blue transition-colors">Twitter</a>
              <a href="#" className="text-lg hover:text-lusion-blue transition-colors">Instagram</a>
              <a href="#" className="text-lg hover:text-lusion-blue transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-32 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 max-w-screen-2xl mx-auto font-plex-mono text-xs text-gray-500">
        <p>© {new Date().getFullYear()} Arzuno. All rights reserved.</p>
      </div>
    </footer>
  );
}
