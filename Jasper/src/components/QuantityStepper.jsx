import { Minus, Plus } from 'lucide-react';

export default function QuantityStepper({ quantity, onDecrease, onIncrease, label = 'Quantity' }) {
  return (
    <div className="quantity-stepper" aria-label={label}>
      <button onClick={onDecrease} aria-label="Decrease quantity"><Minus size={15} /></button>
      <span aria-live="polite">{quantity}</span>
      <button onClick={onIncrease} aria-label="Increase quantity"><Plus size={15} /></button>
    </div>
  );
}
