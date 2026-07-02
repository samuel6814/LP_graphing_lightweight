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

export function useHeroStagger(ref) {
  useEffect(() => {
    if (!ref.current) return undefined;
    const ctx = gsap.context(() => {
      gsap.from(ref.current.querySelectorAll('[data-hero]'), {
        opacity: 0,
        y: 24,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      });
    }, ref);
    return () => ctx.revert();
  }, [ref]);
}

export function useHeroGraph(ref) {
  useEffect(() => {
    if (!ref.current) return undefined;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const visual = ref.current.querySelector('[data-hero-visual]');
    if (!visual) return undefined;

    const ctx = gsap.context(() => {
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
      if (dots.length) gsap.set(dots, { opacity: 0, scale: 0 });

      if (reduce) {
        gsap.set(lines, { strokeDashoffset: 0 });
        gsap.set(axes, { opacity: 0.4 });
        if (region) gsap.set(region, { opacity: 1, scale: 1 });
        if (dots.length) gsap.set(dots, { opacity: 1, scale: 1 });
        return;
      }

      const tl = gsap.timeline({ delay: 0.35 });
      tl.to(axes, { opacity: 0.4, duration: 0.5, ease: 'power2.out' })
        .to(lines, { strokeDashoffset: 0, duration: 1.2, stagger: 0.25, ease: 'power2.out' }, '-=0.2');

      if (region) {
        tl.to(region, { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }, '-=0.5');
      }
      if (dots.length) {
        tl.to(dots, { opacity: 1, scale: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(2)' }, '-=0.35');
      }

      tl.add(() => {
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
      });
    }, ref);

    return () => ctx.revert();
  }, [ref]);
}
