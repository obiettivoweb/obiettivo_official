"use client";

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Eye } from "lucide-react";

// Safe layout effect hook to prevent SSR warning in Next.js
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const useMedia = (queries: string[], values: number[], defaultValue: number): number => {
  const get = () => {
    if (typeof window === 'undefined') return defaultValue;
    return values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue;
  };

  const [value, setValue] = useState<number>(get);

  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach(q => matchMedia(q).addEventListener('change', handler));
    return () => queries.forEach(q => matchMedia(q).removeEventListener('change', handler));
  }, [queries]);

  return value;
};

const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useIsomorphicLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size] as const;
};

const preloadImages = async (urls: string[]): Promise<void> => {
  await Promise.all(
    urls.map(
      src =>
        new Promise<void>(resolve => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        })
    )
  );
};

export interface Item {
  id: string;
  img: string;
  url: string;
  height: number;
  title?: string;
  category?: string;
  photographer?: string;
}

interface GridItem extends Item {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface MasonryProps {
  items: Item[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: 'bottom' | 'top' | 'left' | 'right' | 'center' | 'random';
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
  onItemClick?: (item: Item) => void;
}

const Masonry: React.FC<MasonryProps> = ({
  items,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.96,
  blurToFocus = true,
  colorShiftOnHover = false,
  onItemClick
}) => {
  const columns = useMedia(
    ['(min-width:1500px)', '(min-width:1000px)', '(min-width:640px)', '(min-width:340px)'],
    [5, 4, 3, 2],
    1
  );

  const [containerRef, { width }] = useMeasure<HTMLDivElement>();
  const [imagesReady, setImagesReady] = useState(false);

  const getInitialPosition = (item: GridItem) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y };

    let direction = animateFrom;
    if (animateFrom === 'random') {
      const dirs = ['top', 'bottom', 'left', 'right'];
      direction = dirs[Math.floor(Math.random() * dirs.length)] as typeof animateFrom;
    }

    switch (direction) {
      case 'top':
        return { x: item.x, y: -200 };
      case 'bottom':
        return { x: item.x, y: window.innerHeight + 200 };
      case 'left':
        return { x: -200, y: item.y };
      case 'right':
        return { x: window.innerWidth + 200, y: item.y };
      case 'center':
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2
        };
      default:
        return { x: item.x, y: item.y + 100 };
    }
  };

  useEffect(() => {
    preloadImages(items.map(i => i.img)).then(() => setImagesReady(true));
  }, [items]);

  const grid = useMemo<GridItem[]>(() => {
    if (!width) return [];
    const colHeights = new Array(columns).fill(0);
    const gap = 16;
    const totalGaps = (columns - 1) * gap;
    const columnWidth = (width - totalGaps) / columns;

    return items.map(child => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = col * (columnWidth + gap);
      // Derive height scale (we divide height by 2 to present nicely, or keep as is)
      const height = child.height;
      const y = colHeights[col];

      colHeights[col] += height + gap;
      return { ...child, x, y, w: columnWidth, h: height };
    });
  }, [columns, items, width]);

  const hasMounted = useRef(false);

  // Re-run whenever grid changes or images are ready
  useIsomorphicLayoutEffect(() => {
    if (!imagesReady || !width) return;

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animProps = { x: item.x, y: item.y, width: item.w, height: item.h };

      if (!hasMounted.current) {
        const start = getInitialPosition(item);
        gsap.fromTo(
          selector,
          {
            opacity: 0,
            x: start.x,
            y: start.y,
            width: item.w,
            height: item.h,
            ...(blurToFocus && { filter: 'blur(10px)' })
          },
          {
            opacity: 1,
            ...animProps,
            ...(blurToFocus && { filter: 'blur(0px)' }),
            duration: 0.8,
            ease: 'power3.out',
            delay: index * stagger
          }
        );
      } else {
        gsap.to(selector, {
          ...animProps,
          duration,
          ease,
          overwrite: 'auto'
        });
      }
    });

    if (grid.length > 0) {
      hasMounted.current = true;
    }
  }, [grid, imagesReady, width]);

  // Reset mounted status if items list length changes, to re-trigger reveal animations
  useEffect(() => {
    hasMounted.current = false;
  }, [items]);

  const handleMouseEnter = (id: string, element: HTMLElement) => {
    if (scaleOnHover) {
      gsap.to(`[data-key="${id}"]`, {
        scale: hoverScale,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay') as HTMLElement;
      if (overlay) gsap.to(overlay, { opacity: 0.3, duration: 0.3 });
    }
  };

  const handleMouseLeave = (id: string, element: HTMLElement) => {
    if (scaleOnHover) {
      gsap.to(`[data-key="${id}"]`, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay') as HTMLElement;
      if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.3 });
    }
  };

  // Find max grid height to size the container
  const containerHeight = useMemo(() => {
    if (grid.length === 0) return 300;
    const maxVal = grid.reduce((acc, current) => Math.max(acc, current.y + current.h), 0);
    return maxVal;
  }, [grid]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full transition-all duration-300"
      style={{ height: `${containerHeight}px` }}
    >
      {grid.map(item => (
        <div
          key={item.id}
          data-key={item.id}
          className="absolute box-content select-none rounded-[16px] overflow-hidden"
          style={{ willChange: 'transform, width, height, opacity' }}
          onClick={() => onItemClick ? onItemClick(item) : window.open(item.url, '_blank', 'noopener')}
          onMouseEnter={e => handleMouseEnter(item.id, e.currentTarget)}
          onMouseLeave={e => handleMouseLeave(item.id, e.currentTarget)}
        >
          <div
            className="group/card relative w-full h-full bg-cover bg-center rounded-[16px] border border-white/5 bg-zinc-950/30 flex flex-col justify-end text-left cursor-pointer overflow-hidden"
            style={{ backgroundImage: `url(${item.img})` }}
          >
            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-95 transition-opacity duration-300 pointer-events-none" />

            {/* Hover Eye Action */}
            <div className="absolute top-4 right-4 p-2 rounded-full bg-black/60 border border-white/10 text-white/70 opacity-0 group-hover/card:opacity-100 transition-all duration-300 transform translate-y-[-8px] group-hover/card:translate-y-0 pointer-events-none">
              <Eye size={12} />
            </div>

            {/* Caption Block */}
            <div className="relative z-10 p-5 transition-transform duration-500 translate-y-3 group-hover/card:translate-y-0 pointer-events-none">
              {item.category && (
                <span className="text-[8px] font-bold uppercase tracking-widest text-blue-400 font-[family-name:var(--font-syncopate)] px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">
                  {item.category}
                </span>
              )}
              
              {item.title && (
                <h3 className="mt-2 text-xs md:text-sm font-semibold text-white tracking-tight leading-snug font-[family-name:var(--font-sora)]">
                  {item.title}
                </h3>
              )}

              
            </div>

            {colorShiftOnHover && (
              <div className="color-overlay absolute inset-0 rounded-[16px] bg-gradient-to-tr from-pink-500/50 to-sky-500/50 opacity-0 pointer-events-none" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Masonry;
