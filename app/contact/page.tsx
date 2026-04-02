"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { Syne, Cormorant_Garamond, JetBrains_Mono, Inter } from "next/font/google";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import NavBar from "@/components/NavBar";

gsap.registerPlugin(useGSAP, SplitText);

const syne      = Syne({ subsets: ["latin"], weight: ["400","700","800"], variable: "--font-syne" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300","400","500","600"], style: ["normal","italic"], variable: "--font-cormorant" });
const jetmono   = JetBrains_Mono({ subsets: ["latin"], weight: ["400","500","700"], variable: "--font-mono" });
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter" 
});

const AMBER = "#D4A843";
const CREAM = "#F0E9DC";
const INK   = "#08090F";

type Status = "idle" | "sending" | "sent" | "error";

const services = [
  "Web Platform or Website",
  "Full-Stack Application",
  "Performance Optimization & SEO",
  "System Integration (APIs, Payments, etc.)",
  "Custom Web System",
  "Other",
];

export default function ContactPage() {
  const component = useRef<HTMLDivElement>(null);

  const [form, setForm]           = useState({ name: "", email: "", service: "", message: "" });
  const [status, setStatus]       = useState<Status>("idle");
  const [activeService, setActive] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleService = (s: string) => {
    setActive(s);
    setForm((f) => ({ ...f, service: s }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) return;

    setStatus("sending");

    try {
      const response = await fetch("https://formspree.io/f/xgopyoko", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          service: form.service || "Not selected",
          message: form.message,
        }),
      });

      if (response.ok) {
        setStatus("sent");
      } else {
        setStatus("error");
        console.error("Formspree error:", await response.text());
      }
    } catch (err) {
      console.error("Network error:", err);
      setStatus("error");
    }
  };

  useGSAP(() => {
    const heading = document.querySelector<HTMLElement>(".contact-heading");
    if (heading) {
      const split = new SplitText(heading, { type: "chars" });
      gsap.from(split.chars, {
        y: 100, opacity: 0, rotateX: -70, stagger: 0.025,
        duration: 1.2, ease: "power4.out", delay: 0.2,
      });
    }
    gsap.from(".contact-sub",    { y: 25, opacity: 0, duration: 0.8, ease: "expo.out", delay: 1.0 });
    gsap.from(".contact-detail", { y: 20, opacity: 0, stagger: 0.09, duration: 0.7, ease: "power2.out", delay: 1.1 });
    gsap.from(".form-section",   { y: 50, opacity: 0, duration: 1,   ease: "power3.out", delay: 0.4 });
  }, { scope: component });

  return (
    <div
      ref={component}
      className={`${syne.variable} ${cormorant.variable} ${jetmono.variable} min-h-screen`}
      style={{ background: CREAM }}
    >
      {/* Grain */}
      <div className="fixed inset-0 z-[1] pointer-events-none" style={{
        opacity: 0.03,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "150px",
      }} />

      {/* Dot pattern */}
      <div className="fixed inset-0 z-[1] pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle, rgba(8,9,15,0.06) 1px, transparent 1px)`,
        backgroundSize: "36px 36px",
      }} />

      <NavBar />

      {/* ══ HERO (cream, dark text) ══ */}
      <section className="relative pt-40 pb-20 px-6 md:px-14 overflow-hidden" style={{ background: INK }}>
        <span className="contact-sub text-[10px] uppercase tracking-[0.35em]" style={{ fontFamily: "var(--font-mono)", color: "rgba(232, 226, 214, 0.6)" }}>
          004 — Get in Touch
        </span>
        <h1
          className="contact-heading leading-[0.82] uppercase mt-4"
          style={{ fontFamily: "'Inter'", fontWeight: 800, fontSize: "clamp(2rem, 10vw, 7rem)", letterSpacing: "-0.04em", color: CREAM }}
        >
          Let’s work<br />
          <span style={{ color: AMBER }}>together.</span>
        </h1>
        <p
          className="contact-sub max-w-lg mt-6"
          style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(1.25rem, 2.5vw, 1.8rem)", color: "rgba(232, 226, 214, 0.55)", lineHeight: 1.6 }}
        >
          I’m available for full-time roles, freelance projects, and collaborations.
        </p>

        {/* Contact details strip */}
        <div className="flex flex-wrap gap-10 mt-16 pt-10" style={{ borderTop: "1px solid rgba(8,9,15,0.1)" }}>
          {[
            { label: "Email",    value: "nkatsigazi@gmail.com", href: "mailto:nkatsigazi@gmail.com" },
            { label: "Location", value: "Kampala, Uganda · Open to remote roles and relocation", href: undefined },
          ].map(({ label, value, href }) => (
            <div key={label} className="contact-detail">
              <p className="text-[9px] uppercase tracking-[0.3em] mb-1" style={{ fontFamily: "var(--font-mono)", color: `${AMBER}99` }}>{label}</p>
              {href ? (
                <a href={href} className="text-sm hover:opacity-70 transition-opacity" style={{ fontFamily: "var(--font-mono)", color: "rgba(232, 226, 214, 0.6)" }}>{value}</a>
              ) : (
                <p className="text-sm" style={{ fontFamily: "var(--font-mono)", color: "rgba(232, 226, 214, 0.6)" }}>{value}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ══ FORM SECTION ══ */}
      <section className="form-section px-6 md:px-14 pt-20 pb-32" style={{ background: CREAM }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_1.6fr] gap-16 items-start">

          {/* Left — what I can help with */}
          <div className="pt-4">
            <p className="text-[9px] uppercase tracking-[0.35em] mb-6" style={{ fontFamily: "var(--font-mono)", color: "rgba(8,9,15,0.3)" }}>
              What can I help with?
            </p>
            <div className="space-y-2">
              {services.map((s) => (
                <button
                  key={s}
                  onClick={() => handleService(s)}
                  className="w-full text-left px-5 py-4 rounded-xl transition-all duration-300 group"
                  style={{
                    background: activeService === s ? INK : "rgba(8,9,15,0.04)",
                    border: activeService === s ? `1px solid ${INK}` : "1px solid rgba(8,9,15,0.09)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span
                      style={{
                        fontFamily: "var(--font-cormorant)",
                        fontWeight: activeService === s ? 500 : 400,
                        fontSize: "1.1rem",
                        color: activeService === s ? CREAM : "rgba(8,9,15,0.65)",
                        transition: "color 0.3s",
                      }}
                    >
                      {s}
                    </span>
                    <span style={{ color: activeService === s ? AMBER : "rgba(8,9,15,0.2)", transition: "color 0.3s", fontSize: "0.9rem" }}>
                      {activeService === s ? "✓" : "+"}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Social links */}
            <div className="mt-12 pt-10" style={{ borderTop: "1px solid rgba(8,9,15,0.1)" }}>
              <p className="text-[9px] uppercase tracking-[0.35em] mb-5" style={{ fontFamily: "var(--font-mono)", color: "rgba(8,9,15,0.3)" }}>Find me online</p>
              <div className="flex gap-4">
                {[
                  { label: "GitHub",   href: "https://github.com/nkatsigazi" },
                  { label: "LinkedIn", href: "https://linkedin.com/nkatsigazi" },
                  { label: "X (Twitter)",  href: "https://x.com/nkatsigazi" },
                ].map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    className="px-5 py-2.5 rounded-full text-[10px] uppercase tracking-widest transition-all duration-300 hover:scale-105"
                    style={{
                      fontFamily: "var(--font-mono)",
                      background: "rgba(8,9,15,0.06)",
                      border: "1px solid rgba(8,9,15,0.12)",
                      color: "rgba(8,9,15,0.5)",
                    }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = INK; el.style.color = CREAM; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(8,9,15,0.06)"; el.style.color = "rgba(8,9,15,0.5)"; }}
                  >
                    {label} ↗
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div>
            {status === "sent" ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-8 text-3xl"
                  style={{ background: `${AMBER}20`, border: `2px solid ${AMBER}` }}
                >
                  ✓
                </div>
                <h2 style={{ fontFamily: "'Inter'", fontWeight: 800, fontSize: "2.5rem", color: INK, letterSpacing: "-0.03em" }}>
                  Message sent.
                </h2>
                <p className="mt-3 max-w-xs" style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontWeight: 300, fontSize: "1.25rem", color: "rgba(8,9,15,0.5)" }}>
                  I'll be in touch.
                </p>
                <button
                  onClick={() => { setStatus("idle"); setForm({ name:"",email:"",service:"",message:"" }); setActive(""); }}
                  className="mt-10 px-8 py-3 rounded-full text-[10px] uppercase tracking-widest transition-all duration-300"
                  style={{ fontFamily: "var(--font-mono)", background: INK, color: CREAM }}
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                {/* Name + Email row */}
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { name: "name",  label: "Your name",  type: "text",  placeholder: "First & last name" },
                    { name: "email", label: "Email address", type: "email", placeholder: "hello@example.com" },
                  ].map(({ name, label, type, placeholder }) => (
                    <div key={name}>
                      <label className="block mb-2 text-[9px] uppercase tracking-[0.3em]" style={{ fontFamily: "var(--font-mono)", color: "rgba(8,9,15,0.4)" }}>
                        {label} *
                      </label>
                      <input
                        type={type}
                        name={name}
                        value={(form as any)[name]}
                        onChange={handleChange}
                        placeholder={placeholder}
                        required
                        className="w-full px-5 py-4 rounded-xl outline-none transition-all duration-300 placeholder:opacity-30"
                        style={{
                          fontFamily: "var(--font-cormorant)",
                          fontWeight: 400,
                          fontSize: "1.1rem",
                          background: "rgba(8,9,15,0.05)",
                          border: "1px solid rgba(8,9,15,0.1)",
                          color: INK,
                        }}
                        onFocus={e => { e.currentTarget.style.border = `1px solid ${AMBER}70`; e.currentTarget.style.background = "rgba(212,168,67,0.04)"; }}
                        onBlur={e  => { e.currentTarget.style.border = "1px solid rgba(8,9,15,0.1)"; e.currentTarget.style.background = "rgba(8,9,15,0.05)"; }}
                      />
                    </div>
                  ))}
                </div>

                {/* Service echo */}
                {activeService && (
                  <div className="px-5 py-3 rounded-xl flex items-center gap-3" style={{ background: "rgba(8,9,15,0.05)", border: "1px solid rgba(8,9,15,0.08)" }}>
                    <span className="text-[9px] uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)", color: `${AMBER}90` }}>Service:</span>
                    <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.05rem", color: "rgba(8,9,15,0.7)" }}>{activeService}</span>
                  </div>
                )}

                {/* Message */}
                <div>
                  <label className="block mb-2 text-[9px] uppercase tracking-[0.3em]" style={{ fontFamily: "var(--font-mono)", color: "rgba(8,9,15,0.4)" }}>
                    Tell me about your project *
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={6}
                    required
                    placeholder="What are you building? What's the timeline? Any constraints I should know about?"
                    className="w-full px-5 py-4 rounded-xl outline-none resize-none transition-all duration-300 placeholder:opacity-30"
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontWeight: 400,
                      fontSize: "1.1rem",
                      background: "rgba(8,9,15,0.05)",
                      border: "1px solid rgba(8,9,15,0.1)",
                      color: INK,
                      lineHeight: 1.7,
                    }}
                    onFocus={e => { e.currentTarget.style.border = `1px solid ${AMBER}70`; e.currentTarget.style.background = "rgba(212,168,67,0.04)"; }}
                    onBlur={e  => { e.currentTarget.style.border = "1px solid rgba(8,9,15,0.1)"; e.currentTarget.style.background = "rgba(8,9,15,0.05)"; }}
                  />
                </div>

                {/* Submit */}
                <div className="flex items-center justify-between gap-6 pt-2">
                  <p className="text-[9px] uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)", color: "rgba(8,9,15,0.25)" }}>
                    * All Fields Required
                  </p>
                  <button
                    type="submit"
                    disabled={status === "sending" || !form.name || !form.email || !form.message}
                    className="flex items-center gap-4 px-10 py-4 rounded-full text-[11px] uppercase tracking-[0.2em] transition-all duration-500 hover:gap-7 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontWeight: 700,
                      background: INK,
                      color: CREAM,
                      boxShadow: "0 20px 60px rgba(8,9,15,0.15)",
                    }}
                  >
                    {status === "sending" ? (
                      <>
                        <span className="inline-block w-4 h-4 border-2 rounded-full animate-spin" style={{ borderColor: `${CREAM}30`, borderTopColor: CREAM }} />
                        Sending…
                      </>
                    ) : (
                      <>Send message →</>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ══ AVAILABILITY BAND ══ */}
      <section className="py-20 px-6 md:px-14 flex flex-col md:flex-row items-center justify-between gap-10"
        style={{ background: INK, borderTop: `1px solid rgba(212,168,67,0.1)` }}>
        <div>
          <p className="text-[9px] uppercase tracking-[0.35em] mb-2" style={{ fontFamily: "var(--font-mono)", color: `${AMBER}60` }}>Current availability</p>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#4ADE80" }} />
            <span style={{ fontFamily: "'Inter'", fontWeight: 700, fontSize: "1.5rem", color: "#E8E2D6" }}>
              Open to new projects
            </span>
          </div>
          <p className="mt-2" style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontWeight: 300, fontSize: "1.05rem", color: "rgba(232,226,214,0.4)" }}>
            Typical response time: &lt; 24 hours
          </p>
        </div>

        <a
          href="mailto:nkatsigazi@gmail.com"
          className="flex items-center gap-4 px-10 py-4 rounded-full text-[11px] uppercase tracking-[0.2em] transition-all duration-300 hover:gap-7 hover:scale-105"
          style={{ fontFamily: "var(--font-mono)", fontWeight: 700, background: AMBER, color: INK, boxShadow: `0 20px 60px rgba(212,168,67,0.2)` }}
        >
          nkatsigazi@gmail.com →
        </a>
      </section>

      <footer className="py-8 px-6 md:px-14 flex justify-between items-center" style={{ background: "#06070C", borderTop: "1px solid rgba(255,255,255,0.04)", fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.2em", color: "rgba(232,226,214,0.12)" }}>
        <span>© 2025 Norman Katsigazi</span>
        <Link href="/" className="hover:text-white transition-colors">← Back Home</Link>
      </footer>
    </div>
  );
}