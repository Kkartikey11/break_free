import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardRoutes from "./routes/dashboard";
import Login from "./view/auth";
import { PublicRouter } from "./components/customRouters/publicRouter";
import { PrivateRouter } from "./components/customRouters/privateRouter";
import Error404 from "./view/error/404";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route
              path="/"
              element={
                <PublicRouter>
                  <Login />
                </PublicRouter>
              }
            />
            <Route path="/web/*" 
            element={
              <PrivateRouter>
                <DashboardRoutes />
              </PrivateRouter>
            } />
            <Route path="/page-not-found" element={<Error404 /> } />
          </Routes>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
