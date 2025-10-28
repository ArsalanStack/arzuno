"use client";
import React, { useEffect, useRef } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// --- Setup GSAP ScrollTrigger ---
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ArzunoOnePage() {
  const heroRef = useRef(null);
  const productRef = useRef(null);
  const policiesRef = useRef(null);

  useEffect(() => {
    // Hero parallax/scale on scroll
    if (heroRef.current) {
      gsap.to(heroRef.current, {
        scale: 1.03,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top+=200",
          scrub: 0.8,
        },
      });
    }

    // Product card slide-in
    if (productRef.current) {
      gsap.from(productRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: productRef.current,
          start: "top 80%",
        },
      });
    }

    // Stagger policies appearance
    if (policiesRef.current) {
      gsap.from(policiesRef.current.querySelectorAll('.policy-card'), {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: policiesRef.current,
          start: 'top 85%'
        }
      });
    }
  }, []);

  const chromeUrl = "https://chromewebstore.google.com/detail/arzuno-humanizer-write-li/mcepgjnmffnlonbkmemeppjndacfomhc?hl=en";

  return (
    <>
      <Head>
        <title>Arzuno — Humanized AI for real people</title>
        <meta name="description" content="Arzuno — humanized AI writing assistant. One-page marketing site built with Next.js, GSAP and Framer Motion." />
      </Head>

      <main className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        {/* NAV */}
        <nav className="fixed w-full top-0 left-0 z-50 bg-white/60 backdrop-blur-md border-b border-transparent md:border-gray-200">
          <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
            <div className="font-bold text-lg">arzuno</div>
            <div className="space-x-4 text-sm hidden md:block">
              <a href="#products" className="hover:underline">Products</a>
              <a href="#policies" className="hover:underline">Policies</a>
              <a href="#contact" className="hover:underline">Contact</a>
            </div>
            <a href="#products" className="inline-block rounded-md px-4 py-2 text-sm bg-black text-white">Try Humanizer</a>
          </div>
        </nav>

        {/* HERO */}
        <section ref={heroRef} className="relative pt-24 pb-20 overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-extrabold leading-tight"
              >
                Arzuno Humanizer — AI that sounds like a real person
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.6 }}
                className="mt-6 text-gray-600 max-w-xl"
              >
                Powerful browser extension that rewrites robotic copy into believable, human-sounding content — fast. Perfect for marketing, outreach, and creator workflows.
              </motion.p>

              <motion.div className="mt-8 flex gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                <a href={chromeUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 px-5 py-3 bg-black text-white rounded-md font-medium">Install on Chrome</a>
                <a href="#policies" className="inline-flex items-center gap-2 px-5 py-3 border rounded-md">Privacy & Refunds</a>
              </motion.div>
            </div>

            <div className="relative">
              <div className="w-full h-64 md:h-80 rounded-2xl bg-gradient-to-tr from-indigo-500 to-violet-500 shadow-xl flex items-center justify-center text-white">
                {/* Placeholder for 3D model / mockup */}
                <motion.div initial={{ scale: 0.98 }} animate={{ scale: 1 }} transition={{ yoyo: Infinity, duration: 6 }} className="p-6 text-center">
                  <div className="text-xl font-semibold">Arzuno Extension</div>
                  <div className="mt-3 text-sm opacity-90">Chrome extension mockup / 3D model goes here</div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCTS */}
        <section id="products" ref={productRef} className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold">Products</h2>
            <p className="mt-2 text-gray-600 max-w-2xl">One-page catalog showcasing Arzuno's products and quick actions.</p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product Card */}
              <article className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">Arzuno Humanizer</h3>
                      <p className="text-sm text-gray-500 mt-1">Chrome extension — humanize any text in your browser.</p>
                    </div>
                    <div className="text-sm font-medium text-gray-700">v1.0</div>
                  </div>

                  <p className="mt-4 text-gray-600">Transforms bland, robotic text into natural, persuasive English with configurable tone and length.
                  </p>

                  <ul className="mt-4 text-sm text-gray-600 list-disc ml-5 space-y-1">
                    <li>One-click rewrite</li>
                    <li>Tone presets: casual, professional, persuasive</li>
                    <li>Keyboard shortcuts & context menu</li>
                  </ul>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <a href={chromeUrl} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm">View in Chrome Store</a>
                  <a href={chromeUrl} target="_blank" rel="noreferrer" className="text-sm underline">Get it now</a>
                </div>
              </article>

              {/* Placeholder for future product */}
              <article className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between opacity-90">
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">Coming soon</h3>
                      <p className="text-sm text-gray-500 mt-1">More Arzuno integrations and tools</p>
                    </div>
                    <div className="text-sm font-medium text-gray-700">—</div>
                  </div>

                  <p className="mt-4 text-gray-600">SaaS integrations, API and team features — roadmap is public.</p>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <button disabled className="px-4 py-2 rounded-md border text-sm">Notify me</button>
                  <span className="text-sm text-gray-400">Q4 roadmap</span>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* POLICIES */}
        <section id="policies" ref={policiesRef} className="py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-2xl font-bold">Policies</h2>
            <p className="mt-2 text-gray-600">Important legal and customer-facing policies for Arzuno Humanizer.</p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="policy-card bg-white rounded-2xl p-6 shadow-sm text-left">
                <h3 className="font-semibold text-lg">Privacy Policy</h3>
                <p className="mt-3 text-sm text-gray-600">We respect your privacy. Arzuno collects minimal usage data required to deliver the extension features. We do not sell personal data. Data collected may include anonymized usage metrics and error reports. For any third party services used (analytics, hosting), consult their policies. Contact: arzunoteam@gmail.com</p>
                <details className="mt-3 text-sm text-gray-600">
                  <summary className="cursor-pointer">Read more</summary>
                  <div className="mt-2">
                    <ul className="list-disc ml-5 space-y-1">
                      <li>Data retention: 90 days for logs, unless required longer for support.</li>
                      <li>Third-party integrations: may include analytics & crash reporting.</li>
                      <li>Cookies: only essential cookies used for session/state.</li>
                    </ul>
                  </div>
                </details>
              </div>

              <div className="policy-card bg-white rounded-2xl p-6 shadow-sm text-left">
                <h3 className="font-semibold text-lg">Refund Policy</h3>
                <p className="mt-3 text-sm text-gray-600">Arzuno Humanizer is distributed via the Chrome Web Store. Extension purchases and distribution follow the Chrome Web Store terms. Refunds for purchases should be requested through the Chrome Web Store support within their stated refund window. For any issues with functionality, contact arzunoteam@gmail.com and we'll assist promptly.</p>
                <details className="mt-3 text-sm text-gray-600">
                  <summary className="cursor-pointer">More details</summary>
                  <div className="mt-2">
                    <ul className="list-disc ml-5 space-y-1">
                      <li>Refund requests: handled per Chrome Web Store policy.</li>
                      <li>Complaints: send reproducible steps and screenshots to support.</li>
                      <li>Free tier: extension offers a free tier; paid features are opt-in.</li>
                    </ul>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT / FOOTER */}
        <footer id="contact" className="bg-white border-t mt-12">
          <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="font-bold text-lg">arzuno</div>
              <p className="mt-2 text-sm text-gray-600">Humanized AI tools for creators and teams.</p>
            </div>
            <div>
              <div className="font-semibold">Address</div>
              <div className="mt-2 text-sm text-gray-600">Killi Bangulzai, Saryab Road, Quetta</div>

              <div className="mt-4 font-semibold">Email</div>
              <div className="mt-1 text-sm text-gray-600">arzunoteam@gmail.com</div>
            </div>

            <div>
              <div className="font-semibold">Quick Links</div>
              <ul className="mt-2 text-sm text-gray-600 space-y-1">
                <li><a href={chromeUrl} target="_blank" rel="noreferrer" className="underline">Arzuno Humanizer (Chrome Store)</a></li>
                <li><a href="#policies" className="underline">Privacy & Refunds</a></li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 py-4">
            <div className="max-w-6xl mx-auto px-6 text-sm text-gray-500">© {new Date().getFullYear()} Arzuno — All rights reserved.</div>
          </div>
        </footer>
      </main>
    </>
  );
}
