import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import AboutPage from './pages/AboutPage';
import ReservationsPage from './pages/ReservationsPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
// Supprimez l'import de ThemeProvider ici s'il n'est plus utilisé ailleurs dans ce fichier après le retrait.
// import { ThemeProvider } from "@/components/theme-provider"; 

function App() {
  return (
    // Le ThemeProvider a été retiré d'ici
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
  );
}

export default App;
