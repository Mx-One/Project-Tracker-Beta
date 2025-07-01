import ProjectStatusFilter from "./components/projects/ProjectsStatusFilter";
import ProjectsPmFilter from "./components/projects/ProjectsPmFilter";
import ProjectsTable from "./components/ProjectsTable";
import ProjectSearch from "./components/projects/ProjectsSearch";
import { ProjectsTableContextProvider } from "./context/ProjectsContext";
import { useRestrictedComponents } from "./permissions/projectsPermissions";

/**
 * ProjectPage
 *
 * This component renders the project page, which includes filters and a table for managing and viewing projects.
 * It utilizes a context provider to supply the necessary project data and state management.
 * The page includes a project status filter, a search bar, and a PM filter that is conditionally rendered based on user permissions.
 * It displays a table of projects that can be filtered and searched based on the selected criteria.
 *
 * @returns {JSX.Element} The ProjectPage component.
 */

const ProjectPage = () => {
  const { canAccess } = useRestrictedComponents();

  return (
    <ProjectsTableContextProvider>
      <div className="flex-col">
        <div className={`flex justify-around mb-6`}>
          <ProjectStatusFilter />
          <ProjectSearch />
          {canAccess("ProjectsPmFilter") && <ProjectsPmFilter />}
        </div>

        <ProjectsTable />
      </div>
    </ProjectsTableContextProvider>
  );
};

export default ProjectPage;
