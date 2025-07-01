import { useGetIdentity, useLogout } from "@refinedev/core";
import { Folders, LayoutDashboard } from "lucide-react";
import { NavMenu } from "./nav-menu";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";

import { ClipboardType } from "lucide-react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { User, SidebarPageLinks } from "@/types/types";
import { useEffect } from "react";

// Sidebar Options
const defaultPages: SidebarPageLinks[] = [
  { name: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { name: "Projects", url: "/projects", icon: Folders },
];

/**
 * AppSidebar
 *
 * This component renders the sidebar for the app.
 * It includes a dashboard button, a projects button, and a logout button.
 * The dashboard button and projects button are conditionally rendered based on the user's role.
 * The logout button is rendered if the user is logged in.
 *
 * @prop {React.ComponentProps<typeof Sidebar>} ...props - The props to pass to the Sidebar component
 * @returns {React.ReactElement} The AppSidebar component
 */
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: user } = useGetIdentity<User>(); // get email from authenticated user
  const { userProfile, setUserProfile } = useUserProfile(); // get user profile data from user_profile table
  const { mutate: logoutMutate } = useLogout(); //  Handle Logout in Refine and erase stored user profile in the app
  const { setOpen } = useSidebar(); // Sidebar context to control sidebar state

  const handleLogout = async () => {
    // Clear the user profile data on logout
    setUserProfile({
      user_id: "",
      name: "",
      role: [],
      avatar: "",
    });
    logoutMutate();
  };

  useEffect(() => {
    if (window.innerWidth < 1366) {
      setOpen(false);
    }
  }, []);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton size="lg" asChild>
          <a href="/dashboard">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <ClipboardType className="size-5" />
            </div>
            <div className="flex flex-col gap-0.5 leading-none ">
              <span className="font-semibold">Project Tracker</span>
            </div>
          </a>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent className="mt-8">
        <NavMenu pages={defaultPages} />
      </SidebarContent>
      <SidebarFooter>
        {user && userProfile && (
          <NavUser
            user={{
              name: userProfile.name,
              email: user.email,
              avatar: userProfile.avatar,
              handleLogout: handleLogout,
            }}
          />
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
