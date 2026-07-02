import { useEffect } from 'react';

let scriptIdCounter = 0;

export default function JsonLd({ data }) {
  useEffect(() => {
    if (!data) return undefined;
    const id = `jsonld-${++scriptIdCounter}`;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
    return () => {
      document.getElementById(id)?.remove();
    };
  }, [data]);

  return null;
}

export function JsonLdMulti({ graphs = [] }) {
  useEffect(() => {
    if (!graphs.length) return undefined;
    const ids = graphs.map(() => `jsonld-${++scriptIdCounter}`);
    graphs.forEach((graph, i) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = ids[i];
      script.text = JSON.stringify(graph);
      document.head.appendChild(script);
    });
    return () => {
      ids.forEach((id) => document.getElementById(id)?.remove());
    };
  }, [graphs]);

  return null;
}
