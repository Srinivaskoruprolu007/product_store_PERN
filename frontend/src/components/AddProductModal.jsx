import { XCircle } from "lucide-react";
import { useProductStore } from "../store/useProductStore";

export const AddProductModal = () => {
  const { formData, setFormData, addProduct, loading } = useProductStore();
  return (
    <dialog
      id="add_product_modal"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box rounded-xl p-6 relative">
        <h3 className="font-bold text-2xl mb-4 text-center">Add New product</h3>
        <form onSubmit={addProduct} className="space-y-4">
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
              <span className="label-text">Product Image URL</span>
            </label>
            <input
              type="url"
              placeholder="Product Image URL"
              className="input input-bordered w-full"
              value={formData.image}
              onChange={(e) => setFormData("image", e.target.value)}
            />
          </div>
          <div className="modal-action flex justify-between">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() =>
                document.getElementById("add_product_modal").close()
              }
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Add Product"
              )}
            </button>
          </div>
        </form>
        <div className="modal-action absolute top-2 right-2 m-0 p-0">
          <button
            className="btn btn-sm btn-circle btn-ghost"
            onClick={() => document.getElementById("add_product_modal").close()}
          >
            <XCircle size={24} />
          </button>
        </div>
      </div>
      {/* click outside to close */}
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};
