import { type Metadata } from 'next';
import { ReactNode, type FC } from 'react';

export const metadata: Metadata = {
  title: 'Genius | Image Generation',
  description: 'Generate an image using a text query.',
};

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return children;
};

export default Layout;
