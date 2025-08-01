"use client";
import { useCart } from "@/context/CartContext";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/navigation";

const CREATE_ORDER = gql`
  mutation CreateOrder($items: [OrderItemInput!]!, $address: String!) {
    createOrder(items: $items, address: $address) {
      id
      status
    }
  }
`;

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const [createOrder] = useMutation(CREATE_ORDER);

  const handleCheckout = async () => {
    const items = cart.map((item: any) => ({ productId: item.id, quantity: item.quantity }));
    try {
      await createOrder({ variables: { items, address: "123 Main Street" } });
      clearCart();
      router.push("/products");
    } catch (err) {
      console.error("Order failed", err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Order Summary</h2>
      {cart.map((item: any) => (
        <div key={item.id} className="mb-2">
          {item.name} x {item.quantity} = ${item.price * item.quantity}
        </div>
      ))}
      <button onClick={handleCheckout} className="mt-4 bg-blue-500 text-white px-4 py-2">
        Place Order
      </button>
    </div>
  );
}
