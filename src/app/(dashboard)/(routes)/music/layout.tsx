import { type Metadata } from 'next';
import { ReactNode, type FC } from 'react';

export const metadata: Metadata = {
  title: 'Genius | Music Generation',
  description: 'Generate music using a text query and various customizations from the AI model.',
};

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return children;
};

export default Layout;
