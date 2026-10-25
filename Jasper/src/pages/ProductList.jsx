import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productsSlice';
import CategoryFilter from '../components/CategoryFilter';
import ProductCard from '../components/ProductCard';

export default function ProductList({ search, onSearchChange }) {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('featured');

  useEffect(() => {
    if (status === 'idle') dispatch(fetchProducts());
  }, [status, dispatch]);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => product.title.toLowerCase().includes(search.toLowerCase()));
    if (category !== 'all') result = result.filter((product) => product.category.toLowerCase() === category);
    if (sort === 'low') result = [...result].sort((a, b) => a.price - b.price);
    if (sort === 'high') result = [...result].sort((a, b) => b.price - a.price);
    return result;
  }, [products, category, sort, search]);

  if (status === 'loading' || status === 'idle') {
    return <main className="page-container"><div className="loading-state"><span className="spinner" /><p>Loading products...</p></div></main>;
  }

  if (status === 'failed') {
    return <main className="page-container"><div className="message-card"><h1>We couldn't load the products</h1><p>{error}</p><button className="button button-primary" onClick={() => dispatch(fetchProducts())}>Try again</button></div></main>;
  }

  return (
    <main className="page-container">
      <section className="list-heading">
        <div><p className="eyebrow">A little something for you</p><h1>All products</h1><p className="muted">Showing {filteredProducts.length} products</p></div>
        <label className="sort-control">Sort by
          <select value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="featured">Featured</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </label>
      </section>
      <CategoryFilter selected={category} onChange={setCategory} />
      {filteredProducts.length ? (
        <section className="product-grid" aria-label="Products">
          {filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
        </section>
      ) : (
        <div className="message-card no-results"><h2>No products found</h2><p>Try another search or category filter.</p><button className="button button-outline" onClick={() => { onSearchChange(''); setCategory('all'); }}>Clear filters</button></div>
      )}
      <div className="list-footer-note">Good finds. Easy checkout. ✦</div>
    </main>
  );
}

