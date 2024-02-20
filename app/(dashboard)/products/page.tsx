"use client"

import { useEffect, useState } from "react";

import Loader from "@/components/custom ui/Loader";
import ProductDashboard from "@/components/products/ProductDashboard";

const ProductsPage = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductType[]>([]);

  const getProducts = async () => {
    try {
      const res = await fetch(`/api/products`, {
        method: "GET",
      });
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.log("products_GET", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  
  return loading ? <Loader /> : (
    <div className="px-10 py-5">
      <ProductDashboard data={products} />
    </div>
  );
};

export default ProductsPage;
