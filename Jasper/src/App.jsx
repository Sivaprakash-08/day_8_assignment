import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import { ToastProvider } from './components/ToastContext';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';

export default function App() {
  const [search, setSearch] = useState('');
  const [theme, setTheme] = useState(() => localStorage.getItem('jasper-theme') || 'light');
  const location = useLocation();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('jasper-theme', theme);
  }, [theme]);


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <ToastProvider>
      <div className="app-shell">
        <Header search={search} onSearch={setSearch} theme={theme} onToggleTheme={() => setTheme((value) => value === 'light' ? 'dark' : 'light')} />
        <Routes>
          <Route path="/" element={<ProductList search={search} onSearchChange={setSearch} />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <footer className="site-footer"><span>Jasper · A frontend learning project</span><span>Product data: fakestoreapi.com</span></footer>
      </div>
    </ToastProvider>
  );
}
