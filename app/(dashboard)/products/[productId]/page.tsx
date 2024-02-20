"use client"

import Loader from "@/components/custom ui/Loader";
import ProductForm from "@/components/products/ProductForm";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProductDetails = ({ params }: { params: { productId: string } }) => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<ProductType>();

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products/${params.productId}`, {
        method: "GET",
      });
      if (res.ok) {
        const data = await res.json();
        setProduct(data);
        setLoading(false);
      }
    } catch (error) {
      console.log("productId_GET", error);
      toast.error("Internal error");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return loading ? <Loader /> : <ProductForm initialData={product} />;
};

export default ProductDetails;
