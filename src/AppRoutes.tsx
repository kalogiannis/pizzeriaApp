

import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/layout";
import HomePage from "./pages/HomePages";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import MenuPage from "./pages/MenuPage";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import { CartProvider } from "./contexts/CartContext";

const AppRoutes = () => {
  return (
    <CartProvider>
      <Routes>
        <Route
          path="/"
          element={
            <Layout showHero>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/menu"
          element={
            <Layout>
              <MenuPage />
            </Layout>
          }
        />
        <Route
          path="/cart"
          element={
            <Layout>
              <ShoppingCartPage />
            </Layout>
          }
        />
        <Route path="/auth-callback" element={<AuthCallbackPage />} />
        <Route element={<ProtectedRoute />}>
          <Route
            path="/user-profile"
            element={
              <Layout>
                <UserProfilePage />
              </Layout>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </CartProvider>
  );
};

export default AppRoutes;
