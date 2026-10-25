import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, ShoppingBag, Trash2 } from 'lucide-react';
import { clearCart, decrease, increase, removeFromCart } from '../features/cart/cartSlice';
import { selectCartItems, selectTotalItems } from '../features/cart/cartSelectors';
import QuantityStepper from '../components/QuantityStepper';
import OrderSummary from '../components/OrderSummary';
import { useToast } from '../components/ToastContext';

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const totalItems = useSelector(selectTotalItems);
  const showToast = useToast();

  function checkout() {
    showToast('Demo checkout — no payment has been taken.');
  }

  if (items.length === 0) {
    return (
      <main className="page-container">
        <div className="empty-cart">
          <div className="empty-cart-icon"><ShoppingBag size={34} /></div>
          <p className="eyebrow">Room for something lovely</p>
          <h1>Your cart is empty</h1>
          <p>Looks like you haven't found your next favorite thing yet.</p>
          <Link to="/" className="button button-primary">Browse products</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page-container">
      <div className="cart-heading">
        <div><p className="eyebrow">Almost yours</p><h1>Your cart <span className="muted">({totalItems} {totalItems === 1 ? 'item' : 'items'})</span></h1></div>
        <Link to="/" className="continue-link"><ArrowLeft size={16} /> Continue shopping</Link>
      </div>
      <div className="cart-layout">
        <section className="cart-items-panel">
          <div className="cart-panel-top"><strong>Your items</strong><button className="text-button danger-text" onClick={() => { dispatch(clearCart()); showToast('Your cart has been cleared'); }}>Clear cart</button></div>
          {items.map((item) => (
            <article className="cart-item" key={item.id}>
              <Link to={`/product/${item.id}`} className="cart-item-image"><img src={item.image} alt={item.title} /></Link>
              <div className="cart-item-main">
                <p className="product-category">{item.category}</p>
                <Link className="cart-item-title" to={`/product/${item.id}`}>{item.title}</Link>
                <span className="cart-unit-price">${item.price.toFixed(2)} each</span>
                <div className="cart-item-controls">
                  <QuantityStepper quantity={item.quantity} onDecrease={() => dispatch(decrease(item.id))} onIncrease={() => dispatch(increase(item.id))} />
                  <button className="remove-button" onClick={() => { dispatch(removeFromCart(item.id)); showToast('Item removed from cart'); }}><Trash2 size={15} /> Remove</button>
                </div>
              </div>
              <strong className="line-total">${(item.price * item.quantity).toFixed(2)}</strong>
            </article>
          ))}
        </section>
        <OrderSummary onCheckout={checkout} />
      </div>
    </main>
  );
}
