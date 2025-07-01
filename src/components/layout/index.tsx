import { LayoutProps } from "@refinedev/core";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { RefineBreadcrumb } from "@/components/breadcrumb";

/**
 * The default layout component for the refine app.
 *
 * @param {LayoutProps} props The props for the layout component.
 * @returns {React.ReactNode} The layout component.
 */
export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex justify-between mt-2 mb-4 h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <RefineBreadcrumb />
          </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
        <footer className="flex h-12 items-center justify-center">
          <div className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by{" "}
            <a
              href="https://github.com/Mx-One"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Max Olatoye
            </a>
          </div>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
};
