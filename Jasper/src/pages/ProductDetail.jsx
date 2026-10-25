import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronRight, Star, Truck, RotateCcw } from 'lucide-react';
import { fetchProducts } from '../features/products/productsSlice';
import { addToCart } from '../features/cart/cartSlice';
import { useToast } from '../components/ToastContext';
import ProductCard from '../components/ProductCard';
import QuantityStepper from '../components/QuantityStepper';

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const showToast = useToast();
  const { products, status, error } = useSelector((state) => state.products);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchProducts());
  }, [status, dispatch]);

  useEffect(() => setQuantity(1), [id]);

  const product = products.find((item) => item.id === Number(id));
  const related = useMemo(() => product ? products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4) : [], [products, product]);

  if (status === 'loading' || status === 'idle') return <main className="page-container"><div className="loading-state"><span className="spinner" /><p>Loading product...</p></div></main>;
  if (status === 'failed') return <main className="page-container"><div className="message-card"><h1>Product unavailable</h1><p>{error}</p><button className="button button-primary" onClick={() => dispatch(fetchProducts())}>Try again</button></div></main>;
  if (!product) return <main className="page-container"><div className="message-card"><h1>We couldn't find that product</h1><p>This item may have moved or the link may be incorrect.</p><Link to="/" className="button button-primary">Browse products</Link></div></main>;

  function addProduct() {
    dispatch(addToCart({ product, quantity }));
    showToast(`${quantity} × ${product.title} added to your cart`);
  }

  return (
    <main className="page-container">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">Products</Link><ChevronRight size={15} /><span>{product.category}</span><ChevronRight size={15} /><span className="crumb-current">{product.title}</span>
      </nav>
      <section className="detail-layout">
        <div className="detail-image-panel"><img src={product.image} alt={product.title} /></div>
        <div className="detail-info">
          <p className="product-category">{product.category}</p>
          <h1>{product.title}</h1>
          <div className="rating-row detail-rating"><Star size={16} fill="currentColor" /><strong>{Number(product.rating?.rate || 0).toFixed(1)}</strong><span>{product.rating?.count || 0} reviews</span></div>
          <p className="detail-price">${product.price.toFixed(2)}</p>
          <p className="detail-description">{product.description}</p>
          <div className="detail-actions">
            <span className="field-label">Quantity</span>
            <QuantityStepper quantity={quantity} onDecrease={() => setQuantity((value) => Math.max(1, value - 1))} onIncrease={() => setQuantity((value) => value + 1)} />
            <button className="button button-primary detail-add" onClick={addProduct}>Add to cart · ${(product.price * quantity).toFixed(2)}</button>
            <Link to="/cart" className="button button-outline detail-cart">Go to cart</Link>
          </div>
          <div className="delivery-points">
            <div><Truck size={20} /><span><strong>Simple shipping</strong><small>Free on orders of $100 or more</small></span></div>
            <div><RotateCcw size={20} /><span><strong>Easy returns</strong><small>Returns accepted within 30 days</small></span></div>
          </div>
        </div>
      </section>
      {related.length > 0 && <section className="related-section"><div className="section-heading"><div><p className="eyebrow">Picked for you</p><h2>You may also like</h2></div><Link to="/" className="text-link">View all products →</Link></div><div className="product-grid related-grid">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div></section>}
    </main>
  );
}
