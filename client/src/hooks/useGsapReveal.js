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
