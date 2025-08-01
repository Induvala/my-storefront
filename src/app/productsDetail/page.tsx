"use client";
import { useParams } from "next/navigation";
import { gql, useQuery } from "@apollo/client";
import { useCart } from "@/context/CartContext";

const GET_PRODUCT = gql`
  query GetProductById($id: ID!) {
    product(id: $id) {
      id
      name
      price
      image
      description
    }
  }
`;

export default function ProductDetailPage() {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_PRODUCT, { variables: { id } });
  const { addToCart } = useCart();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching product</p>;

  const product = data.product;

  return (
    <div className="p-4">
      <img src={product.image} alt={product.name} className="w-full h-60 object-cover" />
      <h1 className="text-2xl mt-2">{product.name}</h1>
      <p className="text-gray-700">{product.description}</p>
      <p className="text-xl">${product.price}</p>
      <button
        onClick={() => addToCart(product)}
        className="mt-4 bg-green-500 text-white py-2 px-4"
      >
        Add to Cart
      </button>
    </div>
  );
}