// app/page.tsx
'use client';

import { useLayoutEffect, useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { Play, ChevronRight, ArrowUpRight, Mic2, Video, Wifi, Sparkles, Globe, Shield, Clock, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const overlappingSectionRef = useRef<HTMLElement>(null);
  const horizontalScrollRef = useRef<HTMLElement>(null);
  const keyholeRef = useRef<HTMLElement>(null);

  const splitText = (element: HTMLElement) => {
    const text = element.innerText;
    element.innerHTML = text
      .split('')
      .map(char => `<span class="split-char">${char === ' ' ? '&nbsp;' : char}</span>`)
      .join('');
    return element.querySelectorAll('.split-char');
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const heroTitle = document.querySelector('.hero-title');
      if (heroTitle) {
        const chars = splitText(heroTitle as HTMLElement);
        gsap.fromTo(
          chars,
          { y: 100, opacity: 0, rotateX: -90 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            stagger: 0.03,
            duration: 0.8,
            ease: 'back.out(1.2)',
          }
        );
      }

      // --- Hero Stats ---
      gsap.fromTo(
        '.hero-stats > *',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, delay: 0.6 }
      );

      gsap.to('.hero-image', {
        y: 100,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      const videoIframe = document.querySelector('#scroll-video iframe') as HTMLIFrameElement;
      if (videoIframe) {
        // YouTube API: we need to inject the API and get player, but for simplicity we'll use scroll trigger to add class that triggers play.
        // We'll use an Intersection Observer style with ScrollTrigger.
        ScrollTrigger.create({
          trigger: videoRef.current,
          start: 'top 70%',
          onEnter: () => {
            videoIframe.src = videoIframe.src + '&autoplay=1';
          },
          onLeave: () => {
            // Pause by resetting src (not ideal but works)
            videoIframe.src = videoIframe.src.replace('&autoplay=1', '');
          },
        });
      }

      const overlapSection = overlappingSectionRef.current;
      if (overlapSection) {
        ScrollTrigger.create({
          trigger: overlapSection,
          start: 'top 80%',
          end: 'bottom 20%',
          pin: true,
          pinSpacing: true,
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const content = overlapSection.querySelector('.overlap-content');
            if (content) {
              gsap.to(content, {
                y: -progress * 100,
                opacity: 1 - progress,
                duration: 0,
              });
            }
          },
        });
      }

      const projectsTrack = gsap.utils.toArray('.project-card') as HTMLElement[];
      if (projectsTrack.length && horizontalScrollRef.current) {
        let totalWidth = 0;
        projectsTrack.forEach(card => {
          totalWidth += card.offsetWidth + 24;
        });
        const scrollWidth = totalWidth - window.innerWidth + 100;
        ScrollTrigger.create({
          trigger: horizontalScrollRef.current,
          start: 'top top',
          end: () => `+=${scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: self => {
            gsap.to('.projects-track', {
              x: -self.progress * scrollWidth,
              duration: 0,
              overwrite: true,
            });
          },
        });
      }

      const keyholeElement = keyholeRef.current;
      if (keyholeElement) {
        // Initially set clip-path to a small circle
        gsap.set(keyholeElement, { clipPath: 'circle(0% at 50% 50%)' });
        ScrollTrigger.create({
          trigger: keyholeElement,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.to(keyholeElement, {
              clipPath: `circle(${progress * 100}% at 50% 50%)`,
              duration: 0,
            });
          },
        });
      }

      gsap.to('.bg-gradient-animate', {
        backgroundPosition: '100% 50%',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      });

      gsap.fromTo(
        '.value-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          scrollTrigger: {
            trigger: '.values-grid',
            start: 'top 80%',
          },
        }
      );

      const solutionCards = gsap.utils.toArray('.solution-card');
      solutionCards.forEach((card: any) => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, { scale: 1.02, duration: 0.3, ease: 'power2.out' });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { scale: 1, duration: 0.3 });
        });
      });
    }, mainRef);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="bg-gray-950 text-white overflow-x-hidden">
      {/* Hero Section with Dark Gradient */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />

        <div className="container mx-auto px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-blue-400 font-semibold text-sm tracking-wider uppercase bg-blue-500/10 px-3 py-1 rounded-full mb-6">
                East Africa’s Premier AV & ICT Partner
              </span>
              <h1 className="hero-title text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                Powering Intelligent Environments
              </h1>
              <p className="text-lg text-gray-300 mt-6 max-w-lg">
                We design, integrate, and support future-ready audio visual, unified communications, and ICT infrastructure for enterprises that demand excellence.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link
                  href="/contact"
                  className="bg-white text-gray-900 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors shadow-lg"
                >
                  Start a project
                </Link>
                <Link
                  href="#services"
                  className="border border-gray-600 text-gray-200 px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-colors"
                >
                  Explore solutions
                </Link>
              </div>
              <div className="hero-stats grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 pt-6 border-t border-gray-800">
                <div>
                  <div className="text-3xl font-bold text-white">120+</div>
                  <div className="text-gray-400 text-sm">Enterprise Projects</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">6+</div>
                  <div className="text-gray-400 text-sm">Years in East Africa</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">98%</div>
                  <div className="text-gray-400 text-sm">Client Retention</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">24/7</div>
                  <div className="text-gray-400 text-sm">Managed Support</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Modern conference room"
                  width={800}
                  height={600}
                  className="hero-image w-full h-auto object-cover"
                  priority
                />
              </div>
              <div className="absolute -top-6 -right-6 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-indigo-500/20 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Instant Ventures */}
      <section className="py-24 bg-gray-900 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-indigo-900/10" />
        <div className="container mx-auto px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-blue-400 font-semibold text-sm tracking-wider uppercase bg-blue-500/10 px-3 py-1 rounded-full">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4">
              Engineering Complete Environments
            </h2>
            <p className="text-gray-300 text-lg mt-4">
              We don’t just supply equipment. We deliver end-to-end solutions designed specifically for East African conditions, budgets, and growth ambitions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Globe, title: 'Local Expertise', desc: 'Kampala-based team with deep local knowledge and international best practices.' },
              { icon: Shield, title: 'End-to-End', desc: 'From concept through design, installation, training, and lifelong support.' },
              { icon: Clock, title: '24/7 Reliability', desc: 'Technology that works every day, backed by rapid local response.' },
              { icon: Users, title: 'Partnership', desc: 'Long-term relationships with leading global brands and local support.' },
            ].map((item, i) => (
              <div key={i} className="value-card bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all">
                <item.icon className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={overlappingSectionRef} className="relative h-screen">
        <div className="sticky top-0 h-screen flex items-center justify-center bg-gray-950">
          <div className="container mx-auto px-6 lg:px-8 text-center">
            <div className="overlap-content transform translate-y-0 opacity-100">
              <span className="text-blue-400 text-sm uppercase tracking-wider">Our Mission</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-2 max-w-3xl mx-auto">
                To deliver scalable, high-performance technology solutions that empower East African organisations to work smarter, connect better, and achieve more.
              </h2>
              <div className="mt-12">
                <span className="text-blue-400 text-sm uppercase tracking-wider">Our Vision</span>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto mt-2">
                  To be the undisputed leader in premium AV, UCC, ICT, and content technology across East Africa by 2030.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section with Scroll Effect */}
      <section ref={videoRef} className="py-24 bg-gray-900 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent" />
        <div className="container mx-auto px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <span className="text-blue-400 text-sm uppercase tracking-wider">Experience in Motion</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">See How We Transform Spaces</h2>
          </div>
          <div id="scroll-video" className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&mute=1&controls=0&loop=1&playlist=dQw4w9WgXcQ"
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Core Solutions */}
      <section className="py-24 bg-gray-950 relative">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-blue-400 font-semibold text-sm tracking-wider uppercase bg-blue-500/10 px-3 py-1 rounded-full">
              Core Solutions
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4">Technology That Powers Possibility</h2>
            <p className="text-gray-300 text-lg mt-4">
              From boardrooms to broadcast — we engineer environments where technology disappears and productivity thrives.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: Mic2, title: 'Pro Audio Visual', desc: 'Immersive boardrooms, auditoriums, digital signage, and acoustic treatment for flawless communication.', tags: ['Dante', 'Crestron', 'LED Walls'] },
              { icon: Video, title: 'Unified Communications', desc: 'Seamless Microsoft Teams Rooms, Zoom Rooms, and hybrid meeting solutions for effortless collaboration.', tags: ['Teams Rooms', 'Zoom', 'BYOD'] },
              { icon: Wifi, title: 'ICT Infrastructure', desc: 'Enterprise networking, structured cabling, data centres, cybersecurity, and power backup designed for East Africa.', tags: ['SD-WAN', 'Fiber', 'Zero Trust'] },
              { icon: Sparkles, title: 'Content Creation', desc: 'Turnkey broadcast studios, live streaming, corporate video production, and post-production suites.', tags: ['4K/8K', 'Virtual Sets', 'Streaming'] },
            ].map((sol, idx) => (
              <div key={idx} className="solution-card group bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-blue-500/30 transition-all cursor-pointer">
                <div className="flex items-start gap-5">
                  <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 group-hover:scale-110 transition-transform">
                    <sol.icon size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{sol.title}</h3>
                    <p className="text-gray-400 mt-2 leading-relaxed">{sol.desc}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {sol.tags.map(tag => (
                        <span key={tag} className="text-xs font-medium bg-gray-700 text-gray-300 px-2.5 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={horizontalScrollRef} className="relative py-24 overflow-hidden bg-gray-900">
        <div className="container mx-auto px-6 lg:px-8 mb-12">
          <span className="text-blue-400 text-sm uppercase tracking-wider">Selected Projects</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Trusted by East Africa’s Leading Organizations</h2>
        </div>
        <div className="projects-track flex gap-6 pl-6 lg:pl-8 will-change-transform">
          {[
            { title: 'Stanbic Bank HQ', category: 'UCC & AV', image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', desc: 'Full building-wide Microsoft Teams Rooms deployment, digital signage, and interactive lobbies.' },
            { title: 'MTN Innovation Hub', category: 'ICT Infrastructure', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', desc: 'High-density Wi-Fi 6E, SD-WAN, and advanced cybersecurity for 2,000+ concurrent users.' },
            { title: 'Next Media Studios', category: 'Content Creation', image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', desc: '4K broadcast studio, virtual production set, and live streaming infrastructure.' },
            { title: 'Kampala Serena Hotel', category: 'Pro AV', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', desc: 'Immersive conference center with 360° projection, distributed audio, and event automation.' },
          ].map((proj, idx) => (
            <div key={idx} className="project-card w-[300px] md:w-[420px] flex-shrink-0 bg-gray-800 rounded-2xl overflow-hidden border border-gray-700">
              <div className="relative h-56 md:h-64">
                <Image src={proj.image} alt={proj.title} fill className="object-cover" />
              </div>
              <div className="p-6">
                <span className="text-blue-400 text-xs font-semibold uppercase tracking-wide">{proj.category}</span>
                <h3 className="text-xl font-bold mt-2">{proj.title}</h3>
                <p className="text-gray-400 mt-2 text-sm">{proj.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section ref={keyholeRef} className="relative py-24 bg-gray-950 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-8 text-center relative z-10">
          <span className="text-blue-400 text-sm uppercase tracking-wider">Behind the Scenes</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Precision Engineering, Local Expertise</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mt-4">
            Our team of certified engineers, AV specialists, and IT architects combines global standards with deep local knowledge.
          </p>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full relative">
            <Image
              src="https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
              alt="Engineers working"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Client Results / Stats */}
      <section className="py-24 bg-gray-900 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-indigo-900/20" />
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <span className="text-blue-400 text-sm uppercase tracking-wider">Proven Impact</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">What Our Clients Achieve</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-12 max-w-4xl mx-auto">
            <div className="bg-gray-800/50 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-4xl font-bold text-blue-400">↑45%</div>
              <p className="text-gray-300 mt-2">Higher meeting engagement</p>
            </div>
            <div className="bg-gray-800/50 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-4xl font-bold text-blue-400">99.9%</div>
              <p className="text-gray-300 mt-2">Uptime across integrated systems</p>
            </div>
            <div className="bg-gray-800/50 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-4xl font-bold text-blue-400">2.5x</div>
              <p className="text-gray-300 mt-2">ROI on technology investments</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-gray-950 to-gray-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="container mx-auto px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Ready to Transform Your Workspace?</h2>
          <p className="text-gray-300 text-lg mt-4 max-w-2xl mx-auto">
            Let’s discuss your next project. From design to deployment, we deliver enterprise-grade AV and ICT solutions across East Africa.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="bg-white text-gray-900 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors shadow-lg">
              Speak with an expert
            </Link>
            <Link href="#services" className="border border-gray-600 text-gray-200 px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-colors">
              Explore solutions
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-gray-800 py-12">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Instant Ventures. All rights reserved.
            </div>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm">Privacy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm">Terms</Link>
              <Link href="/contact" className="text-gray-400 hover:text-white text-sm">Contact</Link>
              <a href="mailto:sales@ivuganda.com" className="text-gray-400 hover:text-white text-sm">sales@ivuganda.com</a>
              <a href="tel:+256764410041" className="text-gray-400 hover:text-white text-sm">+256 764 410 041</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}