import { type Metadata } from 'next';
import { ReactNode, type FC } from 'react';

export const metadata: Metadata = {
  title: 'Genius | Settings',
  description: 'Customize your subscription plan.',
};

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return children;
};

export default Layout;
