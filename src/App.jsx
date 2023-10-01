import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorBoundary";
import React, { Suspense, useEffect } from "react";
import Loader from "./components/Loader";
import { UserState } from "./context/user-context";
import ProfitPage from "./pages/ProfitPage";
const AuthPage = React.lazy(() => import("./pages/auth"));
const HomePage = React.lazy(() => import("./pages/HomePage"));
const NavBar = React.lazy(() => import("./components/NavBar"));
const ImportsPage = React.lazy(() => import("./pages/ImportsPage"));
const ExportsPage = React.lazy(() => import("./pages/ExportsPage"));
function App() {
  const { user } = UserState();
  const navigate = useNavigate();
  const {pathname} = useLocation();
  useEffect(()=>{
    if(user && pathname == "/"){
      navigate('/profit')
    }
  },[navigate, pathname, user])

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
              <Route path="/profit" element={<ProfitPage />} exact />
              <Route path="/home" element={<HomePage />}  />
              <Route path="/imports" element={<ImportsPage />} />
              <Route path="/exports" element={<ExportsPage />} />
            </Routes>
          </div>
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}

export default App;
