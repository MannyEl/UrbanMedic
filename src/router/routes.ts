import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

interface RouteConfig {
  path: string;
  element: React.ComponentType<any>;
}

export const ROUTES = {
  DASHBOARD: "/dashboard",
  LOGIN: "/",
};

export const PUBLIC_ROUTES: RouteConfig[] = [
  {
    path: ROUTES.LOGIN,
    element: Login,
  },
];

export const PRIVATE_ROUTES: RouteConfig[] = [
  {
    path: ROUTES.DASHBOARD,
    element: Dashboard,
  },
];
