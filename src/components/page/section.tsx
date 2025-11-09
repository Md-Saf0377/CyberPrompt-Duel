import * as React from 'react';
import { cn } from '@/lib/utils';

const Section = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn('container mx-auto px-4 py-20 sm:py-24 md:py-32', className)}
        {...props}
      />
    );
  }
);
Section.displayName = 'Section';

export { Section };
