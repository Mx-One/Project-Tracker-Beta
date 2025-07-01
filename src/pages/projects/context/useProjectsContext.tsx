import { useContext } from "react";
import { ProjectsContext } from "./ProjectsContext";

/**
 * Hook to access the ProjectsContext
 * @returns The ProjectsContextType
 * @throws An error if used outside of a ProjectFiltersProvider
 */
export const useProjectsContext = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error(
      "useProjectsContext must be used within a ProjectsProvider"
    );
  }
  return context;
};
