import { Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/useProductStore";
const ProductCard = ({ product }) => {
  const { deleteProduct } = useProductStore();

  const handleDelete = async () => {
    // TODO - create a custom modal
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
                await deleteProduct(product.id);
                toast.dismiss(t.id);
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
  return (
    <div className="card bg-base-100 shadow-xl image-full rounded-box">
      <figure className="aspect-video">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://via.placeholder.com/150?text=No+Image+Available";
          }}
        />
      </figure>
      <div className="card-body p-4 sm:p-6 flex flex-col justify-end">
        <h2 className="card-title text-white text-lg sm:text-xl md:text-2xl break-words line-clamp-2">
          {product.name}
        </h2>
        <p className="tex-gray-200 text-sm sm:text-base font-semibold">
          ${parseFloat(product.price).toFixed(2)}
        </p>
        <div className="card-actions justify-end mt-2">
          <Link
            to={`/products/${product.id}`}
            className="btn btn-sm btn-info btn-circle text-white tooltip tooltip-bottom"
            data-tip="Edit"
          >
            <Pencil size={20} />
          </Link>
          <button
            onClick={handleDelete}
            className="btn btn-sm btn-error text-white tooltip tooltip-bottom"
            data-tip="Delete"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
