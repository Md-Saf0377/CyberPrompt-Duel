
'use client';

import { useState, useEffect } from 'react';

type TypewriterProps = {
  text: string;
  speed?: number;
};

export function Typewriter({ text, speed = 50 }: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText(''); // Reset when text changes
    let i = 0;
    const timeoutId = setTimeout(() => {
        const intervalId = setInterval(() => {
            if (i < text.length) {
                setDisplayedText(prev => prev + text.charAt(i));
                i++;
            } else {
                clearInterval(intervalId);
            }
        }, speed);
        return () => clearInterval(intervalId);
    }, 0);
    return () => clearTimeout(timeoutId);
  }, [text, speed]);

  return <p>{displayedText}<span className="animate-ping">|</span></p>;
}
