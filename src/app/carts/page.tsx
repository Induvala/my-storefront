"use client";

import { useCart } from '../../context/CartContext';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();

  return (
    <div className="p-4 space-y-4">
      {cart.map((item: any) => (
        <div key={item.id} className="border p-4">
          <h2>{item.name}</h2>
          <p>${item.price}</p>
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
            className="w-16 border p-1"
          />
          <button onClick={() => removeFromCart(item.id)} className="text-red-500 ml-4">
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}