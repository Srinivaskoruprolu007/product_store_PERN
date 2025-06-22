import { PlusCircle, RefreshCcw } from "lucide-react";
import { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useProductStore } from "../store/useProductStore";
import { AddProductModal } from "../components/AddProductModal";

const HomePage = () => {
  const { products, loading, error, fetchProducts } = useProductStore();
  useEffect(() => {
    fetchProducts(); // fetch products when the component mounts
  }, [fetchProducts]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }
  if (error) {
    return (
      <div className="alert alert-error text-center mt-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Error : {error}</span>
      </div>
    );
  }
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-base-content">Our Products</h1>
        <div className="flex space-x-2">
          <button
            className="btn btn-primary tooltip tooltip-bottom"
            data-tip="Add New Product"
            onClick={() =>
              document.getElementById("add_product_modal")?.showModal()
            }
          >
            <PlusCircle size={24} />
            <span className="hidden sm:inline">Add Product</span>
          </button>
          <button
            className="btn btn-ghost tooltip tooltip-bottom"
            data-tip="Refresh Products"
            onClick={fetchProducts}
          >
            <RefreshCcw size={24} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>
      {products.length === 0 ? (
        <div className="alert alert-info text-center mt-8">
          <span>No products found. Add some</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      {/* <AddProductModal /> */}
      <AddProductModal />
    </div>
  );
};

export default HomePage;
