import { type FC } from 'react';

import { LandingNavbar } from '../landing-navbar/landing-navbar';
import { LandingHero } from '../landing-hero/landing-hero';
import { LandingContent } from '../landing-content/landing-content';

export const LandingPage: FC = () => {
  return (
    <div className="h-full">
      <LandingNavbar />
      <LandingHero />
      <LandingContent />
    </div>
  );
};
