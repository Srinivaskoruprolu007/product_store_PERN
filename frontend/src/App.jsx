import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import { useThemeStore } from "./store/useThemeStore";
const App = () => {
  const { theme } = useThemeStore();
  return (
    <div data-theme={theme} className="min-h-screen bg-base-200">
      <Toaster position="top-right" />
      <Navbar />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:id" element={<ProductPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
