import { type Metadata } from 'next';
import { ReactNode, type FC } from 'react';

export const metadata: Metadata = {
  title: 'Genius | Code Generation',
  description: 'Generate code using descriptive text.',
};

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return children;
};

export default Layout;
