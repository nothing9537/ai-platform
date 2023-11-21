import { type Metadata } from 'next';
import { ReactNode, type FC } from 'react';

export const metadata: Metadata = {
  title: 'Genius | Conversation',
  description: 'Feel free to ask any question you want and get an answer from AI.',
};

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return children;
};

export default Layout;
