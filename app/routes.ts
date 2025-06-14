import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("./layout.tsx", [
    index("routes/home.tsx"),
    route("transactions", "routes/transactions.tsx"),
    route("budget-plan", "routes/budget-plan.tsx"),
  ]),

] satisfies RouteConfig;
