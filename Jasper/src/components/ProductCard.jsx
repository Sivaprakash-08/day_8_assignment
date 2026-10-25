import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, increase, decrease } from '../features/cart/cartSlice';
import { useToast } from './ToastContext';
import QuantityStepper from './QuantityStepper';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const showToast = useToast();
  const cartItem = useSelector((state) => state.cart.items.find((item) => item.id === product.id));

  function addProduct() {
    dispatch(addToCart({ product, quantity: 1 }));
    showToast(`${product.title} added to your cart`);
  }

  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-image-wrap" aria-label={`View ${product.title}`}>
        <img className="product-image" src={product.image} alt={product.title} loading="lazy" />
      </Link>
      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <Link to={`/product/${product.id}`} className="product-title">{product.title}</Link>
        <div className="rating-row">
          <Star size={15} fill="currentColor" />
          <strong>{Number(product.rating?.rate || 0).toFixed(1)}</strong>
          <span>({product.rating?.count || 0} reviews)</span>
        </div>
        <div className="product-card-bottom">
          <strong className="price">${product.price.toFixed(2)}</strong>
          {cartItem ? (
            <QuantityStepper quantity={cartItem.quantity}
              onDecrease={() => dispatch(decrease(product.id))}
              onIncrease={() => dispatch(increase(product.id))} />
          ) : (
            <button className="button button-primary add-button" onClick={addProduct}>Add to cart</button>
          )}
        </div>
      </div>
    </article>
  );
}
