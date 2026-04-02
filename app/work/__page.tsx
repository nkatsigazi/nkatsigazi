"use client";
import { useLayoutEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";
import { projects } from "@/lib/projects";

const N = projects.length;
const ANGLE = 360 / N;

// ~2.5 card-slots either side → ~5 cards clickable at once
const FOV = Math.min(ANGLE * 2.5, 120);

function normalise(deg: number) {
  return ((deg % 360) + 360) % 360;
}
function isFacing(cardIndex: number, carouselRotY: number): boolean {
  const w = normalise(cardIndex * ANGLE + carouselRotY);
  return w <= FOV || w >= 360 - FOV;
}

export default function WorkCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const rotationTweenRef = useRef<gsap.core.Tween | null>(null);
  const rafRef = useRef<number>(0);
  const [facingIds, setFacingIds] = useState<Set<number>>(new Set());

  const syncPointerEvents = useCallback(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const currentRotY = (gsap.getProperty(carousel, "rotationY") as number) ?? 0;
    const next = new Set<number>();
    projects.forEach((p, i) => {
      if (isFacing(i, currentRotY)) next.add(p.id);
    });
    setFacingIds((prev) => {
      if (prev.size === next.size && [...prev].every((id) => next.has(id))) return prev;
      return next;
    });
    rafRef.current = requestAnimationFrame(syncPointerEvents);
  }, []);

  useLayoutEffect(() => {
    const carousel = carouselRef.current;
    const containers = document.querySelectorAll<HTMLElement>(".img-container");
    if (!carousel || containers.length === 0) return;

    const cardWidth = 420;
    const gap = 20;

    // Natural radius from the formula
    const naturalRadius = Math.round(
      (cardWidth / 2 + gap) / Math.tan(Math.PI / N)
    );

    // ── KEY FIX ──────────────────────────────────────────────────────────────
    // With fewer cards the natural radius shrinks dramatically (10 cards → ~523px
    // vs 20 cards → ~1073px), making the carousel look narrow and cramped.
    // Enforce a minimum of 900px so the spread always feels wide on screen.
    const radius = Math.max(naturalRadius, 900);
    // ─────────────────────────────────────────────────────────────────────────

    // Pull the carousel back by the same amount we expanded beyond natural,
    // so the front card stays at the same perceived depth.
    const extraRadius = radius - naturalRadius;
    gsap.set(carousel, { z: -(400 + extraRadius) });

    containers.forEach((container, i) => {
      gsap.set(container, { rotationY: i * ANGLE });
      const card = container.querySelector<HTMLElement>(".card");
      if (card) gsap.set(card, { z: -radius });
    });

    rotationTweenRef.current = gsap.to(carousel, {
      rotationY: -360,
      duration: 25,
      ease: "none",
      repeat: -1,
    });

    rafRef.current = requestAnimationFrame(syncPointerEvents);

    const handleEnter = () => rotationTweenRef.current?.pause();
    const handleLeave = () => rotationTweenRef.current?.resume();
    carousel.addEventListener("mouseenter", handleEnter);
    carousel.addEventListener("mouseleave", handleLeave);

    return () => {
      rotationTweenRef.current?.kill();
      cancelAnimationFrame(rafRef.current);
      carousel.removeEventListener("mouseenter", handleEnter);
      carousel.removeEventListener("mouseleave", handleLeave);
    };
  }, [syncPointerEvents]);

  return (
    <div className="fixed inset-0 bg-[#fdf5f0] overflow-hidden">
      <Link
        href="/"
        className="fixed top-6 left-6 z-20 font-mono text-sm text-black/60 hover:text-black transition-colors"
      >
        ← BACK TO HOME
      </Link>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none">
        <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter text-black/5 whitespace-nowrap">
          PORTFOLIO
        </h1>
      </div>

      {/* 3D Scene */}
      <div
        className="absolute inset-0 grid place-items-center"
        style={{
          perspective: "2000px",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, #000 15%, #000 85%, transparent 100%)",
          maskImage:
            "linear-gradient(90deg, transparent 0%, #000 15%, #000 85%, transparent 100%)",
        }}
      >
        <div
          ref={carouselRef}
          className="relative w-[420px] h-[560px]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {projects.map((project, i) => {
            const canClick = facingIds.has(project.id);
            return (
              <div
                key={project.id}
                className="img-container absolute top-0 left-0 w-full h-full"
                style={{ transformStyle: "preserve-3d", pointerEvents: "none" }}
              >
                <div
                  className="card relative w-full h-full rounded-2xl shadow-2xl overflow-hidden will-change-transform"
                  style={{
                    backgroundImage: `url(${project.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backfaceVisibility: "hidden",
                    pointerEvents: canClick ? "auto" : "none",
                  }}
                >
                  <Link
                    href={`/work/${project.slug}`}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 hover:bg-black/60 transition-colors duration-300"
                    tabIndex={canClick ? 0 : -1}
                    aria-hidden={!canClick}
                  >
                    <span className="text-white text-lg font-bold px-4 text-center drop-shadow">
                      {project.title}
                    </span>
                    <span className="text-white/60 text-xs mt-1 font-mono uppercase tracking-wider">
                      {project.category}
                    </span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}