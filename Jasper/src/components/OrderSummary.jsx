import { selectTotalItems, selectTotalPrice } from '../features/cart/cartSelectors';
import { useSelector } from 'react-redux';

export default function OrderSummary({ onCheckout }) {
  const totalItems = useSelector(selectTotalItems);
  const subtotal = useSelector(selectTotalPrice);
  const shipping = subtotal === 0 || subtotal >= 100 ? 0 : 5;
  const total = subtotal + shipping;

  return (
    <aside className="summary-card">
      <h2>Order summary</h2>
      <div className="summary-line"><span>Items ({totalItems})</span><span>${subtotal.toFixed(2)}</span></div>
      <div className="summary-line">
        <span>Shipping</span>
        {shipping === 0 ? <span className="free-shipping">FREE</span> : <span>${shipping.toFixed(2)}</span>}
      </div>
      {subtotal > 0 && subtotal < 100 && <p className="shipping-hint">Add ${(100 - subtotal).toFixed(2)} more for free shipping.</p>}
      {subtotal >= 100 && <p className="shipping-hint free-shipping">You've unlocked free shipping!</p>}
      <div className="summary-total"><span>Total</span><strong>${total.toFixed(2)}</strong></div>
      <button className="button button-primary checkout-button" onClick={onCheckout} disabled={totalItems === 0}>Proceed to checkout</button>
      <p className="secure-note">Demo checkout · No payment will be taken</p>
    </aside>
  );
}
