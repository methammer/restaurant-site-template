import React from 'react';
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 md:px-6 lg:px-8 py-8"> {/* Added responsive padding */}
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
