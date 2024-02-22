import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./router/PrivateRoute";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./router/routes";
import Container from "./components/Container";

function App() {
  return (
    <div className="App">
      <Container>
        <Routes>
          {PUBLIC_ROUTES.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.element />}
            />
          ))}
          <Route element={<PrivateRoute />}>
            {PRIVATE_ROUTES.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.element />}
              />
            ))}
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
