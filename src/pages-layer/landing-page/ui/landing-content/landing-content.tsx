'use client';

import { useCallback, type FC } from 'react';

import { cn } from '@/shared/lib/cn';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Testimonial } from '../../model/types/testimonial';
import { Testimonials } from '../../model/consts/testimonials';

interface LandingContentProps {
  className?: string;
}

export const LandingContent: FC<LandingContentProps> = ({ className }) => {
  const renderTestimonial = useCallback((testimonial: Testimonial) => (
    <Card key={testimonial.description} className="bg-[#192339] border-none text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-x-2">
          <div>
            <p className="text-lg">{testimonial.name}</p>
            <p className="text-zinc-400 text-sm">{testimonial.title}</p>
          </div>
        </CardTitle>
        <CardContent className="pt-4 px-0">
          <p>{testimonial.description}</p>
        </CardContent>
      </CardHeader>
    </Card>
  ), []);

  return (
    <div className={cn('px-10 pb-20', className)}>
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">
        Testimonials
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Testimonials.map(renderTestimonial)}
      </div>
    </div>
  );
};
