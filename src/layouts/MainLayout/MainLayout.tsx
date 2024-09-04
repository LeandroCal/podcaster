import React from 'react';
import Header from '../../components/Header/Header';
import type { IMainLayoutProps } from '../../types';

const MainLayout: React.FC<IMainLayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="container mx-auto p-4">{children}</main>
    </div>
  );
};

export default MainLayout;
