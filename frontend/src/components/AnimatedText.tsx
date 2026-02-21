'use client';

import { useEffect, useRef } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export function AnimatedText({
  text,
  className = '',
  delay = 0,
  stagger = 45,
}: AnimatedTextProps) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Character animation - displayed with CSS classes
  }, [delay, stagger]);

  return (
    <div ref={textRef} className={className}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="char inline-block"
          style={{ display: char === ' ' ? 'inline' : 'inline-block', minWidth: char === ' ' ? 'auto' : undefined }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
}
