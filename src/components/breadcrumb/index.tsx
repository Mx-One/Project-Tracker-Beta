import { useBreadcrumb } from "@refinedev/core";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

/**
 * A wrapper around the `Breadcrumb` component that uses the `useBreadcrumb` hook
 * to automatically generate a breadcrumb trail based on the current route.
 *
 * If the `breadcrumbs` array returned by `useBreadcrumb` is empty, the
 * component will return `null`.
 *
 * @returns A `Breadcrumb` component with a list of breadcrumb items,
 *          or `null` if the `breadcrumbs` array is empty.
 */
export const RefineBreadcrumb = () => {
  const { breadcrumbs } = useBreadcrumb();

  if (!breadcrumbs.length) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, idx) => {
          const isLast = idx === breadcrumbs.length - 1;
          return (
            <BreadcrumbItem key={`breadcrumb-${breadcrumb.label}`}>
              {breadcrumb.href && !isLast ? (
                <>
                  <BreadcrumbLink asChild>
                    <Link to={breadcrumb.href}>{breadcrumb.label}</Link>
                  </BreadcrumbLink>
                  <BreadcrumbSeparator />
                </>
              ) : (
                <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
