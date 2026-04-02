"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AMBER = "#D4A843";
const INK   = "#08090F";

const NAV_LINKS = [
  { label: "Work",  href: "/work"  },
  { label: "About", href: "/about" },
];

/* ─── Full-screen mobile menu ──────────────────────── */
function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const links = [
    { label: "Home",    href: "/"        },
    { label: "Work",    href: "/work"    },
    { label: "About",   href: "/about"   },
    { label: "Hire Me", href: "/contact" },
  ];

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col"
      style={{
        background: "rgba(4,5,10,0.98)",
        backdropFilter: "blur(28px)",
        pointerEvents: open ? "all" : "none",
        opacity: open ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
    >
      {/* Top row */}
      <div
        className="flex justify-between items-center px-6 py-5"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden border" style={{ borderColor: "rgba(212,168,67,0.35)" }}>
            <img src="/nkatsigazi.jpg" className="w-full h-full object-cover" alt="Norman" />
          </div>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", letterSpacing: "0.25em", color: `${AMBER}70`, textTransform: "uppercase" }}>
            Norman Katsigazi
          </span>
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(232,226,214,0.6)", fontSize: "1.3rem", lineHeight: 1 }}
          aria-label="Close menu"
        >
          ×
        </button>
      </div>

      {/* Links */}
      <nav className="flex-1 flex flex-col justify-center px-8">
        {links.map(({ label, href }, i) => {
          const isCurrent = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={label}
              href={href}
              onClick={onClose}
              className="block py-5 group"
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(16px)",
                transition: `opacity 0.4s ease ${0.07 + i * 0.065}s, transform 0.4s ease ${0.07 + i * 0.065}s`,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontWeight: 600,
                  fontStyle: "italic",
                  fontSize: "clamp(2.6rem, 12vw, 4.8rem)",
                  letterSpacing: "-0.03em",
                  color: isCurrent ? AMBER : href === "/contact" ? AMBER : "#E8E2D6",
                  opacity: isCurrent ? 1 : href === "/contact" ? 0.85 : 0.7,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                }}
              >
                {label}
                {isCurrent && (
                  <span style={{ fontSize: "1rem", opacity: 0.6 }}>← here</span>
                )}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-8 py-6" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.57rem", letterSpacing: "0.25em", color: "rgba(232,226,214,0.18)", textTransform: "uppercase" }}>
          Kampala, Uganda · Open to UAE & remote
        </p>
      </div>
    </div>
  );
}

/* ─── NavBar ────────────────────────────────────────── */
interface NavBarProps {
  /**
   * "dark"  → gradient from near-black (default, used on dark INK pages)
   * "light" → gradient from near-cream (used on CREAM pages like /contact)
   */
  variant?: "dark" | "light";
}

export default function NavBar({ variant = "dark" }: NavBarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <MobileMenu open={open} onClose={() => setOpen(false)} />

      <nav
        className="fixed top-0 w-full z-[100] flex justify-between items-center px-6 md:px-14 py-5"
        style={{
          background:
            variant === "light"
              ? "linear-gradient(180deg, rgba(240,233,220,0.96) 0%, transparent 100%)"
              : "linear-gradient(180deg, rgba(8,9,15,0.95) 0%, transparent 100%)",
          backdropFilter: "blur(14px)",
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div
            className="relative w-8 h-8 rounded-full overflow-hidden border flex-shrink-0"
            style={{ borderColor: "rgba(212,168,67,0.35)" }}
          >
            <img
              src="/nkatsigazi.jpg"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              alt="Norman"
            />
          </div>
          <span
            className="text-[11px] tracking-[0.25em] uppercase transition-all duration-500 group-hover:tracking-[0.35em]"
            style={{ fontFamily: "var(--font-mono)", color: "rgba(212,168,67,0.8)" }}
          >
            Norman Katsigazi.
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map(({ label, href }) => {
            const isCurrent = pathname.startsWith(href);
            return (
              <Link
                key={label}
                href={href}
                className="relative text-[10px] uppercase tracking-[0.22em] transition-all duration-300 hover:opacity-100 pb-1"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: isCurrent
                    ? AMBER
                    : variant === "light"
                    ? "rgba(8,9,15,0.5)"
                    : "rgba(232,226,214,0.45)",
                }}
              >
                {label}
                {/* Active underline */}
                <span
                  className="absolute bottom-0 left-0 right-0 h-px transition-all duration-300"
                  style={{
                    background: AMBER,
                    opacity: isCurrent ? 0.55 : 0,
                    transform: isCurrent ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "left",
                  }}
                />
              </Link>
            );
          })}

          {/* Hire Me CTA */}
          <Link
            href="/contact"
            className="px-5 py-2 rounded-full text-[10px] uppercase tracking-widest transition-all duration-300 hover:scale-105"
            style={{
              fontFamily: "var(--font-mono)",
              background: pathname.startsWith("/contact") ? AMBER : `${AMBER}15`,
              border: `1px solid ${AMBER}${pathname.startsWith("/contact") ? "FF" : "35"}`,
              color: pathname.startsWith("/contact") ? INK : AMBER,
              fontWeight: pathname.startsWith("/contact") ? 700 : 400,
            }}
          >
            {pathname.startsWith("/contact") ? "Talking now" : "Hire Me ↗"}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10 rounded-full transition-all duration-200 hover:scale-105"
          style={{
            border: "1px solid rgba(212,168,67,0.28)",
            background: "rgba(212,168,67,0.07)",
          }}
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <span className="block w-4 h-[1.5px] rounded-full" style={{ background: AMBER }} />
          <span className="block w-[10px] h-[1.5px] rounded-full" style={{ background: AMBER, opacity: 0.5 }} />
        </button>
      </nav>
    </>
  );
}