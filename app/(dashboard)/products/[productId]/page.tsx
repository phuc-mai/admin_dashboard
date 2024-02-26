import ProductForm from "@/components/products/ProductForm";
import Collection from "@/lib/models/Collection";
import Product from "@/lib/models/Product";

const ProductDetails = async ({ params }: { params: { productId: string } }) => {
  const res = await fetch(
    `http://localhost:3000/api/products/${params.productId}`,
    {
      method: "GET",
    }
  );
  const product = await res.json();

  // const product = await Product.findById(params.productId) as ProductType;

  return <ProductForm initialData={product} />;
};

export default ProductDetails;
