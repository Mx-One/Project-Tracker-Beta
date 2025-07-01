import { Authenticated, Refine } from "@refinedev/core";

import routerBindings, { CatchAllNavigate } from "@refinedev/react-router-v6";
import { dataProvider, liveProvider } from "@refinedev/supabase";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import "@/App.css";
import authProvider from "@/providers/authProvider";
import { Layout } from "@/components/layout";
import { supabaseClient } from "@/utility";

import { LoginPage } from "./pages/login";
import { UserProfileProvider } from "@/providers/userProfileProvider";
import ProjectsPage from "./pages/projects/ProjectsPage";
import Dashboard from "./pages/dashboard/Dashboard";

/**
 * The main app component.
 *
 * Wraps the entire app with the UserProfileProvider and BrowserRouter providers.
 *
 * Sets up the Refine app with the dataProvider, liveProvider, and authProvider.
 * Also sets up the resources and options for Refine.
 *
 * Defines the routes for the app, with the login route unauthenticated and the
 * dashboard and projects routes authenticated.
 */
function App() {
  return (
    <UserProfileProvider>
      <BrowserRouter>
        <Refine
          dataProvider={dataProvider(supabaseClient)}
          liveProvider={liveProvider(supabaseClient)}
          authProvider={authProvider}
          routerProvider={routerBindings}
          resources={[
            {
              name: "projects",
              list: "/projects",
            },
            {
              name: "dashboard",
              list: "/dashboard",
            },
          ]}
          options={{
            syncWithLocation: true,
            liveMode: "auto",
            mutationMode: "optimistic",
          }}
        >
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              element={
                <Authenticated
                  key="authenticated-layout"
                  fallback={<CatchAllNavigate to="/login" />}
                >
                  <Layout>
                    <Outlet />
                  </Layout>
                </Authenticated>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="*" element={<CatchAllNavigate to="/" />} />
            </Route>
          </Routes>
        </Refine>
      </BrowserRouter>
    </UserProfileProvider>
  );
}

export default App;
