import { AuthBindings } from "@refinedev/core";

import { supabaseClient } from "../utility";

const authProvider: AuthBindings = {
  login: async ({ email, password, providerName }) => {
    // sign in with oauth

    try {
      if (providerName) {
        const { data, error } = await supabaseClient.auth.signInWithOAuth({
          provider: providerName,
        });

        if (error) {
          return {
            success: false,
            error,
          };
        }

        if (data?.url) {
          return {
            success: true,
            redirectTo: "/dashboard",
          };
        }
      }

      // sign in with email and password
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return {
          success: false,
          error,
        };
      }

      if (data?.user) {
        return {
          success: true,
          redirectTo: "/dashboard",
        };
      }
    } catch (error: any) {
      return {
        success: false,
        error,
      };
    }

    return {
      success: false,
      error: {
        message: "Login failed",
        name: "Invalid email or password",
      },
    };
  },
  logout: async () => {
    // Clear cached permissions
    sessionStorage.removeItem("permissions");

    // Sign out from Supabase
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      return {
        success: false,
        error,
      };
    }

    return {
      success: true,
      redirectTo: "/",
    };
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
  check: async () => {
    try {
      const { data } = await supabaseClient.auth.getSession();
      const { session } = data;

      if (!session) {
        return {
          authenticated: false,
          error: {
            message: "Check failed",
            name: "Session not found",
          },
          logout: true,
          redirectTo: "/login",
        };
      }
    } catch (error: any) {
      return {
        authenticated: false,
        error: error || {
          message: "Check failed",
          name: "Not authenticated",
        },
        logout: true,
        redirectTo: "/login",
      };
    }

    return {
      authenticated: true,
    };
  },
  getPermissions: async () => {
    // 1. Try to read from sessionStorage first
    const cached = sessionStorage.getItem("permissions");
    if (cached) {
      return JSON.parse(cached); // Return cached role
    }

    // 2. Fetch current user
    const { data, error: userError } = await supabaseClient.auth.getUser();
    if (userError) {
      console.error("Error fetching user:", userError);
      return null;
    }

    const user = data?.user;
    if (!user?.id) {
      return null;
    }

    // 3. Query user_profile for role
    const { data: roleData, error } = await supabaseClient
      .from("user_profile")
      .select("role")
      .eq("user_id", user.id)
      .single();

    if (error) {
      console.error("Error fetching role:", error);
      return null;
    }

    const role = roleData?.role;

    // 4. Cache the role in sessionStorage
    if (role) {
      sessionStorage.setItem("permissions", JSON.stringify(role));
    }

    return role;
  },

  getIdentity: async () => {
    const { data } = await supabaseClient.auth.getUser();

    if (data?.user) {
      return {
        ...data.user,
        name: data.user.email,
      };
    }

    return null;
  },
};

export default authProvider;
