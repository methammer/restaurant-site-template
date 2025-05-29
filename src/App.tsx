import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import AboutPage from './pages/AboutPage';
import ReservationsPage from './pages/ReservationsPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import { ThemeProvider } from "@/components/theme-provider"; // Import ThemeProvider

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/reservations" element={<ReservationsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* Add other routes here */}
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
