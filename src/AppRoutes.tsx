// import { Routes, Route, Navigate } from "react-router-dom";
// import Layout from "./layouts/layout";
// import HomePage from "./pages/HomePage";
// import AuthCallbackPage from "./pages/AuthCallbackPage";
// import UserProfilePage from "./pages/UserProfilePage";
// import ProtectedRoute from "./auth/ProtectedRoute";
// import MenuPage from "./pages/MenuPage";
// import ShoppingCartPage from "./pages/ShoppingCartPage";
// import { CartProvider } from "./contexts/CartContext";

// const AppRoutes = () => {
//   return (
//     <CartProvider>
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <Layout showHero>
//               <HomePage />
//             </Layout>
//           }
//         />
//         <Route
//           path="/menu"
//           element={
//             <Layout>
//               <MenuPage />
//             </Layout>
//           }
//         />
//         <Route
//           path="/cart"
//           element={
//             <Layout>
//               <ShoppingCartPage />
//             </Layout>
//           }
//         />
//         <Route path="/auth-callback" element={<AuthCallbackPage />} />
//         <Route element={<ProtectedRoute />}>
//           <Route
//             path="/user-profile"
//             element={
//               <Layout>
//                 <UserProfilePage />
//               </Layout>
//             }
//           />
//         </Route>
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </CartProvider>
//   );
// };

// export default AppRoutes;




import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/layout";
import ProtectedRoute from "./auth/ProtectedRoute";
// import { CartProvider } from "./contexts/CartContext";

// Lazy-loaded pages
const HomePage = lazy(() => import("./pages/HomePage"));
const AuthCallbackPage = lazy(() => import("./pages/AuthCallbackPage"));
const UserProfilePage = lazy(() => import("./pages/UserProfilePage"));
const MenuPage = lazy(() => import("./pages/MenuPage"));
const ShoppingCartPage = lazy(() => import("./pages/ShoppingCartPage"));

const AppRoutes = () => {
  return (
    // <CartProvider>
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
      </Suspense>
    // </CartProvider>
  );
};

export default AppRoutes;