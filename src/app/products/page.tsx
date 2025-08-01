"use client";
import Link from "next/link";
import { useQuery, gql } from "@apollo/client";

const GET_PRODUCTS = gql`
  query GetAllProducts {
    products {
      id
      name
      price
      image
    }
  }
`;

export default function ProductListingPage() {
  const { data, loading, error } = useQuery(GET_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching products</p>;

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {data.products.map((product: any) => (
        <Link key={product.id} href={`/products/${product.id}`} className="border p-4 block">
          <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
          <h2>{product.name}</h2>
          <p>${product.price}</p>
        </Link>
      ))}
    </div>
  );
}