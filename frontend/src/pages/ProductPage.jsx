import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useProductStore } from "../store/useProductStore";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    currentProduct,
    formData,
    loading,
    error,
    fetchProduct,
    updateProduct,
    deleteProduct,
    setFormData,
  } = useProductStore();
  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id, fetchProduct]);

  // Sync formData with currentProduct when it changes
  useEffect(() => {
    if (currentProduct) {
      setFormData("name", currentProduct.name || "");
      setFormData("price", currentProduct.price || "");
      setFormData("image", currentProduct.image || "");
    }
    // eslint-disable-next-line
  }, [currentProduct]);

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    await updateProduct(id);
  };
  const handleDeleteProduct = async () => {
    // TODO : create a custom modal
    toast(
      (t) => (
        <div className="card-body">
          <p>Are you sure you want to delete this product?</p>
          <div className="card-actions justify-end">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="btn btn-sm btn-ghost"
            >
              Cancel
            </button>
            <button
              className="btn btn-sm btn-error"
              onClick={async () => {
                await deleteProduct(id);
                toast.dismiss(t.id);
                navigate("/");
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  };
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
  if (!currentProduct && !loading) {
    return (
      <div className="alert alert-error text-center mt-8">
        <span>Product not found</span>
        <button
          onClick={() => navigate("/")}
          className="btn btn-sm btn-info ml-4"
        >
          Go to Homepage
        </button>
      </div>
    );
  }
  return (
    <div className="p-4">
      <button onClick={() => navigate(-1)} className="btn btn-ghost mb-6">
        <ArrowLeft className="w-6 h-6" />
        <span>Go Back</span>
      </button>
      <div className="card lg:card-side bg-base-100 shadow-xl rounded-box">
        <figure className="lg:w-1/2 p-6">
          <img
            src={formData.image}
            alt={formData.name}
            className="rounded-lg object-contain w-full h-auto max-h-96"
            onError={(e) => (
              (e.target.onerror = null),
              (e.target.src =
                "https://placehold.co/600x400/CCCCCC/333333?text=No+Image")
            )}
          />
        </figure>
        <div className="card-body lg:w-1/2 p-6">
          <h2 className="card-title text-3xl mb-4">Edit Product</h2>
          <form onSubmit={handleUpdateSubmit} className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text">Product Name</span>
              </label>
              <input
                type="text"
                placeholder="Product Name"
                className="input input-bordered w-full"
                value={formData.name}
                onChange={(e) => setFormData("name", e.target.value)}
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Product Price</span>
              </label>
              <input
                type="number"
                placeholder="Product Price"
                className="input input-bordered w-full"
                value={formData.price}
                onChange={(e) => setFormData("price", e.target.value)}
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Product Image</span>
              </label>
              <input
                type="text"
                placeholder="Product Image"
                className="input input-bordered w-full"
                value={formData.image}
                onChange={(e) => setFormData("image", e.target.value)}
              />
            </div>
            <div className="card-actions justify-end mt-6">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  <>
                    <Save size={20} />
                    Save Changes
                  </>
                )}
              </button>
              <button
                onClick={handleDeleteProduct}
                className="btn btn-error ml-4"
                type="button"
                disabled={loading}
              >
                <Trash2 size={20} />
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
