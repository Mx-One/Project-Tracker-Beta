import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { SidebarPageLinks } from "@/types/types";

/**
 * Renders a list of links to the pages as a sidebar menu.
 *
 * @param pages - An array of page links.
 * @returns A SidebarGroup component with a SidebarGroupLabel and a SidebarMenu of SidebarMenuItems.
 */
export function NavMenu({ pages }: { pages: SidebarPageLinks[] }) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="lg:text-sm mb-2">Pages</SidebarGroupLabel>
      <SidebarMenu>
        {pages.map((page) => (
          <SidebarMenuItem className="lg:text-md" key={page.name}>
            <SidebarMenuButton asChild>
              <Link to={page.url}>
                <page.icon />
                <span>{page.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
