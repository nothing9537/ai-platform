import type { ReactNode, FC } from 'react';

interface LandingPageLayoutProps {
  children: ReactNode;
}

export const LandingPageLayout: FC<LandingPageLayoutProps> = ({ children }) => {
  return (
    <main className="h-full bg-[#111827] overflow-auto">
      <div className="mx-auto max-w-screen-xl h-full w-full">
        {children}
      </div>
    </main>
  );
};
