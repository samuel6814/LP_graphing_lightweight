import { useEffect, useRef, useState } from 'react';

export function useResizeObserver() {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 600, height: 400 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) {
        setSize({ width: Math.round(width), height: Math.round(height) });
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, size];
}
