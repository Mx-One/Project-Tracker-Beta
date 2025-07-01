import { useMemo } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { ColumnDef, ColumnAccessByRoleProps } from "@/types/types";

const columnAccessByRole: ColumnAccessByRoleProps = {
  admin: [
    {
      key: "date_quoted",
      label: "Date Quoted",
      width: "lg:min-w-[140px]",
    },
    {
      key: "date_started",
      label: "Date Started",
      width: "lg:min-w-[140px]",
    },
    {
      key: "date_finished",
      label: "Date Finished",
      width: "lg:min-w-[140px]",
    },
    {
      key: "project_address",
      label: "Project Address",
      width: "lg:min-w-[240px]",
    },
    { key: "client", label: "Client", width: "lg:min-w-[120px]" },

    {
      key: "contract_amount",
      label: "Contract Amount",
      width: "lg:min-w-[140px]",
    },
    { key: "paid", label: "Paid", width: "lg:min-w-[140px]" },
    { key: "outstanding", label: "Outstanding", width: "lg:min-w-[140px]" },
    { key: "progress", label: "Progress", width: "lg:min-w-[180px]" },
    { key: "pm", label: "PM", width: "lg:min-w-[140px]" },
    { key: "actions", label: "", width: "lg:min-w-[60px]" },
  ],
  pm: [
    {
      key: "date_quoted",
      label: "Date Quoted",
      width: "lg:min-w-[140px]",
    },
    {
      key: "date_started",
      label: "Date Started",
      width: "lg:min-w-[140px]",
    },
    {
      key: "date_finished",
      label: "Date Finished",
      width: "lg:min-w-[140px]",
    },
    {
      key: "project_address",
      label: "Project Address",
      width: "lg:min-w-[240px]",
    },
    { key: "client", label: "Client", width: "lg:min-w-[120px]" },

    {
      key: "contract_amount",
      label: "Contract Amount",
      width: "lg:min-w-[140px]",
    },
    { key: "paid", label: "Paid", width: "lg:min-w-[140px]" },
    { key: "outstanding", label: "Outstanding", width: "lg:min-w-[140px]" },
    { key: "progress", label: "Progress", width: "lg:min-w-[180px]" },
    { key: "actions", label: "", width: "lg:min-w-[60px]" },
  ],
};

export const columnAccessByState: Record<string, Set<string>> = {
  all: new Set([
    "id",
    "date_quoted",
    "date_started",
    "date_finished",
    "project_address",
    "client",
    "contract_amount",
    "paid",
    "outstanding",
    "progress",
    "pm",
    "actions",
  ]),
  quoted: new Set([
    "id",
    "date_quoted",
    "project_address",
    "client",
    "contract_amount",
    "paid",
    "outstanding",
    "progress",
    "pm",
    "actions",
  ]),
  active: new Set([
    "id",
    "date_started",
    "project_address",
    "client",
    "contract_amount",
    "paid",
    "outstanding",
    "progress",
    "pm",
    "actions",
  ]),
  finished: new Set([
    "id",
    "date_finished",
    "project_address",
    "client",
    "contract_amount",
    "paid",
    "outstanding",
    "progress",
    "pm",
    "actions",
  ]),
};

/**
 * Custom hook that returns a list of accessible column definitions based on the user's roles.
 * It utilizes the user's profile to determine which columns are accessible, ensuring that
 * only authorized columns are available for viewing or interaction.
 *
 * @returns {ColumnDef[]} An array of column definitions accessible to the current user.
 * If the user's profile or roles are not available, it returns an empty array.
 */

export const useAccessibleColumns = (): ColumnDef[] => {
  const { userProfile } = useUserProfile();

  return useMemo(() => {
    if (!userProfile || !Array.isArray(userProfile.role)) {
      return [];
    }

    const columnsMap = new Map<string, ColumnDef>();

    for (const role of userProfile.role) {
      const defs = columnAccessByRole[role] || [];
      defs.forEach((col) => columnsMap.set(col.key, col));
    }

    return Array.from(columnsMap.values());
  }, [userProfile]);
};

const restrictedComponents: Record<string, string[]> = {
  admin: ["ProjectsPmFilter", "Stats"],
  pm: [],
};

/**
 * Custom hook that returns a function `canAccess` which can be used to determine
 * whether the current user has access to a specific component based on their roles.
 *
 * @returns {{ canAccess: (componentName: string) => boolean }} - An object with a
 * single property `canAccess` which is a function that takes the name of a
 * component as an argument and returns a boolean indicating whether the current
 * user has access to that component.
 */
export const useRestrictedComponents = () => {
  const { userProfile } = useUserProfile();

  const canAccess = (componentName: string): boolean => {
    if (!userProfile || !Array.isArray(userProfile.role)) return false;

    return userProfile.role.some((role) =>
      restrictedComponents[role]?.includes(componentName)
    );
  };

  return { canAccess };
};
