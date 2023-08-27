import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorBoundary";
import React, { Suspense } from "react";
import Loader from "./components/Loader";
import { UserState } from "./context/user-context";
const AuthPage = React.lazy(() => import("./pages/auth"));
const HomePage = React.lazy(() => import("./pages/HomePage"));
const NavBar = React.lazy(() => import("./components/NavBar"));
const ImportsPage = React.lazy(() => import("./pages/ImportsPage"));
const ExportsPage = React.lazy(() => import("./pages/ExportsPage"));
const EmployeePage = React.lazy(() => import("./pages/employee-page"));
const ProductPage = React.lazy(() => import("./pages/product-page"));
const VendorPage = React.lazy(() => import("./pages/vendor-page"));
const CutomerPage = React.lazy(() => import("./pages/customer-page"));
function App() {
  const { user } = UserState();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
      <div className="App">
        <Suspense fallback={<Loader />}>
          {user && (
            <div className="navbar">
              <NavBar />
            </div>
          )}
          <div className="main">
            <Routes>
              <Route path="/" element={<AuthPage />} />
              <Route path="/home" element={<HomePage />} exact />
              <Route path="/home/employee" element={<EmployeePage />} />
              {/* <Route path="/home/daily-expense" element={<ExportsPage />} /> */}
              {/* <Route path="/home/attendance" element={<ExportsPage />} /> */}
              <Route path="/imports" element={<ImportsPage />} />
              <Route path="/imports/vendor" element={<VendorPage />} />
              <Route path="/imports/product" element={<ProductPage />} />
              {/* <Route path="/imports/vehicle" element={<ExportsPage />} /> */}
              {/* <Route path="/imports/row-material-entry" element={<ExportsPage />} /> */}
              <Route path="/exports" element={<ExportsPage />} />
              <Route path="/exports/customer" element={<CutomerPage />} />
              {/* <Route path="/exports/sale" element={<ExportsPage />} /> */}
            </Routes>
          </div>
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}

export default App;
