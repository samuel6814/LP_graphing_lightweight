import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useGsapReveal(selector, deps = []) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const targets = el.querySelectorAll(selector);
    const ctx = gsap.context(() => {
      gsap.from(targets, {
        opacity: 0,
        y: 32,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, el);

    return () => ctx.revert();
  }, deps);

  return ref;
}

function startFloatLoop(lines, region, dots) {
  gsap.to(lines, {
    y: -6,
    duration: 2.5,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
    stagger: 0.3,
  });
  if (region) {
    gsap.to(region, {
      opacity: 0.75,
      duration: 3,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });
  }
  if (dots.length) {
    gsap.to(dots, {
      y: -4,
      duration: 2.8,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      stagger: 0.2,
    });
  }
}

/** Plot-first hero: axes → dots → lines → region → copy → float loop */
export function useHeroAnimation(ref) {
  useEffect(() => {
    if (!ref.current) return undefined;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const visual = ref.current.querySelector('[data-hero-visual]');
    const copyTargets = ref.current.querySelectorAll('[data-hero-copy]');

    const ctx = gsap.context(() => {
      if (!visual) return;

      const lines = visual.querySelectorAll('[data-hero-line]');
      const axes = visual.querySelectorAll('[data-hero-axis]');
      const region = visual.querySelector('[data-hero-region]');
      const dots = visual.querySelectorAll('[data-hero-dot]');

      lines.forEach((line) => {
        const len = line.getTotalLength();
        gsap.set(line, { strokeDasharray: len, strokeDashoffset: len, opacity: 1 });
      });

      gsap.set(axes, { opacity: 0 });
      if (region) gsap.set(region, { opacity: 0, scale: 0.92, transformOrigin: 'center center' });
      if (dots.length) gsap.set(dots, { opacity: 0, scale: 0, transformOrigin: 'center center' });
      gsap.set(copyTargets, { opacity: 0, y: 20 });

      if (reduce) {
        gsap.set(lines, { strokeDashoffset: 0 });
        gsap.set(axes, { opacity: 0.4 });
        if (region) gsap.set(region, { opacity: 1, scale: 1 });
        if (dots.length) gsap.set(dots, { opacity: 1, scale: 1 });
        gsap.set(copyTargets, { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({ delay: 0.2 });
      tl.to(axes, { opacity: 0.4, duration: 0.5, ease: 'power2.out' });

      if (dots.length) {
        tl.to(dots, {
          opacity: 1,
          scale: 1,
          duration: 0.35,
          stagger: 0.2,
          ease: 'back.out(2)',
        });
      }

      tl.to(lines, { strokeDashoffset: 0, duration: 1.0, stagger: 0.2, ease: 'power2.out' });

      if (region) {
        tl.to(region, { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }, '-=0.3');
      }

      tl.from(copyTargets, {
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
      });

      tl.add(() => startFloatLoop(lines, region, dots));
    }, ref);

    return () => ctx.revert();
  }, [ref]);
}
