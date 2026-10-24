import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/layout";
import ProtectedRoute from "./auth/ProtectedRoute";

const HomePage = lazy(() => import("./pages/HomePage"));
const AuthCallbackPage = lazy(() => import("./pages/AuthCallbackPage"));
const UserProfilePage = lazy(() => import("./pages/UserProfilePage"));
const MenuPage = lazy(() => import("./pages/MenuPage"));
const ShoppingCartPage = lazy(() => import("./pages/ShoppingCartPage"));
const OrderConfirmationPage = lazy(() => import("./pages/OrderConfirmationPage"));
const OrdersPage = lazy(() => import("./pages/OrdersPage"));

const AppRoutes = () => {
  return (
      <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading…</div>}>
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
          <Route
            path="/order-confirmation"
            element={
              <Layout>
                <OrderConfirmationPage />
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
            <Route
              path="/orders"
              element={
                <Layout>
                  <OrdersPage />
                </Layout>
              }
            />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
  );
};

export default AppRoutes;
