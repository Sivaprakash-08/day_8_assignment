import { Link, NavLink } from 'react-router-dom';
import { Moon, ShoppingCart, Sun, Gem } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectTotalItems } from '../features/cart/cartSelectors';

export default function Header({ search, onSearch, theme, onToggleTheme }) {
  const totalItems = useSelector(selectTotalItems);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" to="/" aria-label="Jasper home">
          <span className="brand-icon"><Gem size={19} /></span>
          <span>Jas<span className="brand-accent">per</span></span>
        </Link>
        <label className="search-box">
          <span className="sr-only">Search products</span>
          <span className="search-symbol">⌕</span>
          <input value={search} onChange={(event) => onSearch(event.target.value)} placeholder="Search products" />
          {search && <button className="search-clear" onClick={() => onSearch('')} aria-label="Clear search">×</button>}
        </label>
        <nav className="header-nav" aria-label="Main navigation">
          <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Products</NavLink>
          <Link to="/cart" className="cart-link">
            <ShoppingCart size={18} /> <span>Cart</span>
            <span className="cart-badge">{totalItems}</span>
          </Link>
          <button className="theme-toggle" onClick={onToggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`} title="Toggle theme">
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </nav>
      </div>
    </header>
  );
}
