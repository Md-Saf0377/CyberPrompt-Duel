
'use client';

import { useState, useEffect } from 'react';

type TypewriterProps = {
  text: string;
  speed?: number;
};

export function Typewriter({ text, speed = 50 }: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText(''); 
    if (text) {
      let i = 0;
      const intervalId = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(prev => prev + text.charAt(i));
          i++;
        } else {
          clearInterval(intervalId);
        }
      }, speed);
      return () => clearInterval(intervalId);
    }
  }, [text, speed]);

  // The component was missing a key on the root element.
  // When the text prop changed, React would try to re-use the old component instance
  // which caused state issues with the useEffect hook, leading to the text being sliced incorrectly.
  // Adding a key that changes with the text ensures a fresh component instance is created.
  return <p key={text}>{displayedText}<span className="animate-ping">|</span></p>;
}
