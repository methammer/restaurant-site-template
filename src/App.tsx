import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/Layout'; // Corrected import path
import HomePage from '@/pages/HomePage';
import MenuPage from '@/pages/MenuPage';
import AboutPage from '@/pages/AboutPage';
import ReservationsPage from '@/pages/ReservationsPage';
import GalleryPage from '@/pages/GalleryPage';
import ContactPage from '@/pages/ContactPage';
import NotFoundPage from '@/pages/NotFoundPage.tsx';
import { useEffect } from 'react';
import { initializeTheme, listenToOSPreferenceChanges } from './lib/theme';


function App() {
  useEffect(() => {
    console.log('[App.tsx] Initializing theme system.');
    initializeTheme();
    
    const removeListener = listenToOSPreferenceChanges(() => {
      console.log('[App.tsx] OS preference change detected and current preference is "system". Theme was re-applied by lib.');
      // The listener in theme.ts already calls applyTheme('system'),
      // which dispatches 'themechange'. ThemeSwitcher will pick this up.
    });

    return () => {
      console.log('[App.tsx] Cleaning up OS preference listener.');
      removeListener();
    };
  }, []);

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/reservations" element={<ReservationsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
