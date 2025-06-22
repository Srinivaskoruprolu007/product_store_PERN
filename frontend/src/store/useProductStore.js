import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

// Determine API base URL based on environment
const API_BASE_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "";

export const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,
  currentProduct: null, // For single product page
  formData: { name: "", price: "", image: "" },

  //   -- Form Actions --
  setFormData: (field, value) => {
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: value,
      },
    }));
  },
  resetForm: () => set({ formData: { name: "", price: "", image: "" } }),

  //   -- Product Actions --
  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_BASE_URL}/api/products`);
      set({ products: response.data, loading: false });
    } catch (error) {
      console.log("Error fetching products:", error);
      set({ error: error.error, loading: false });
      toast.error("Error fetching products");
    }
  },
  fetchProduct: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_BASE_URL}/api/products/${id}`);
      const productData = response.data;
      set({
        currentProduct: productData,
        formData: { ...productData },
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching product:", error);
      set({ error: error.error, loading: false });
      toast.error("Error fetching product");
    }
  },

  //   -- CRUD Actions --
  addProduct: async (e) => {
    e.preventDefault();
    set({ loading: true, error: null });
    const currentFormData = get().formData;
    if (
      !currentFormData.name ||
      !currentFormData.price ||
      !currentFormData.image
    ) {
      toast.error("Missing required fields");
      set({ loading: false });
      return;
    }
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/products`,
        currentFormData
      );
      toast.success("Product added successfully");
      get().resetForm();
      get().fetchProducts();
      document.getElementById("add_product_modal")?.close();
      set({ loading: false });
    } catch (error) {
      console.error("Error adding product:", error);
      set({ error: error.error, loading: false });
      toast.error("Error adding product");
    }
  },
  updateProduct: async (id) => {
    set({ loading: true, error: null });
    const currentFormData = get().formData;
    if (
      !currentFormData.name ||
      !currentFormData.price ||
      !currentFormData.image
    ) {
      toast.error("Missing required fields");
      set({ loading: false });
      return;
    }
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/products/${id}`,
        currentFormData
      );
      toast.success("Product updated successfully");
      get().resetForm();
      get().fetchProducts();
      document.getElementById("update_product_modal")?.close();
      set({ loading: false });
    } catch (error) {
      console.error("Error updating product:", error);
      set({ error: error.error, loading: false });
      toast.error("Error updating product");
    }
  },
  deleteProduct: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${API_BASE_URL}/api/products/${id}`);
      set((state) => ({
        products: state.products.filter((product) => product.id !== id),
        loading: false,
      }));
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      set({ error: error.error, loading: false });
      toast.error("Error deleting product");
    }
  },
}));
