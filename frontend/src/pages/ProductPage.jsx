import { useEffect } from "react";
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
  
  return <div>ProductPage</div>;
};

export default ProductPage;
