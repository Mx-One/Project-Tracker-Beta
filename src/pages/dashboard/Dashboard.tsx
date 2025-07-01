import ProjectStatusFilter from "../projects/components/projects/ProjectsStatusFilter";
import ProjectsPmFilter from "../projects/components/projects/ProjectsPmFilter";
import ProjectsTable from "../projects/components/ProjectsTable";
import { ProjectsTableContextProvider } from "../projects/context/ProjectsContext";
import { useRestrictedComponents } from "../projects/permissions/projectsPermissions";
import StatsTable from "../projects/components/StatsTable";
import ProjectSearch from "../projects/components/projects/ProjectsSearch";

/**
 * Dashboard
 *
 * This component renders the dashboard page for the app.
 * It includes a stats table, a project status filter, a project search, and a projects table.
 * The projects table is wrapped in a ProjectsTableContextProvider, which provides the projects data to the table.
 * The project status filter, project search, and projects PM filter are conditionally rendered based on the user's role.
 * The project status filter and project search are always rendered.
 * The projects PM filter is only rendered if the user has the admin or pm role.
 *
 * @returns {React.ReactElement} The Dashboard component
 */
const Dashboard = () => {
  const { canAccess } = useRestrictedComponents();

  return (
    <ProjectsTableContextProvider>
      <div className="grid grid-cols-4 gap-4 p-4">
        <div className="col-span-4 flex justify-evenly">
          <StatsTable />
        </div>
        <div className="col-span-1 flex justify-center xl:pl-24">
          <ProjectStatusFilter />
        </div>
        <div className="col-span-2 flex justify-center">
          <ProjectSearch />
        </div>
        {canAccess("ProjectsPmFilter") ? (
          <div className="col-span-1 flex justify-center xl:pr-8">
            <ProjectsPmFilter />
          </div>
        ) : (
          <div className="col-span-1" />
        )}
        <div className="col-span-4">
          <ProjectsTable />
        </div>
      </div>
    </ProjectsTableContextProvider>
  );
};

export default Dashboard;
