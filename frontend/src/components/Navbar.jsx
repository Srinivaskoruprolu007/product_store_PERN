import { Package, ShoppingBag } from "lucide-react";
import { Link, useResolvedPath } from "react-router-dom";
import { useProductStore } from "../store/useProductStore";
import ThemeSelector from "./ThemeSelector";

const Navbar = () => {
  const { pathname } = useResolvedPath();
  const { products } = useProductStore();

  //   only show product count badge on home page
  const showProductCount = pathname === "/";
  return (
    <div className="navbar bg-base-100 shadow-md rounded-box m-4 mx-auto max-w-7xl">
      <div className="navbar-start">
        <Link to={"/"} className="btn btn-ghost normal-case text-xl">
          <Package size={24} />
          PERN Store
        </Link>
      </div>
      <div className="navbar-end">
        {showProductCount && (
          <div className="indicator mr-4">
            <span className="indicator-item badge badge-secondary">
              {products.length}
            </span>
            <button className="btn btn-ghost btn-circle">
              <ShoppingBag size={24} />
            </button>
          </div>
        )}
      </div>
      <ThemeSelector />
    </div>
  );
};

export default Navbar;
