import { Fragment, useState } from "react";
import { useEditProject } from "../hooks/edit";
import { ProjectRecord } from "../../../types/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteDialog from "./projects/DeleteProjectDialog";
import {
  getTableColumnDef,
  getTableFooterDef,
} from "../utils/projectsTableDef";
import {
  columnAccessByState,
  useAccessibleColumns,
} from "../permissions/projectsPermissions";
import { useProjectsContext } from "../context/useProjectsContext";

/**
 * @function
 * @description A table component for displaying the list of projects filtered by
 *   the current status and PM. The component also handles the deletion of a
 *   selected project.
 *
 * @returns {JSX.Element} A table element containing the list of projects.
 */
const ProjectsTable = () => {
  const { state, filteredProjects, tableFooterValues } = useProjectsContext();

  const tableFooter = getTableFooterDef(tableFooterValues);
  const accessibleColumns = useAccessibleColumns();
  const filteredColumns = accessibleColumns.filter(({ key }) => {
    return columnAccessByState[state.status]?.has(key);
  });
  const { handleValueChange } = useEditProject();

  const [selectedProject, setSelectedProject] = useState<ProjectRecord | null>(
    null
  );

  const openDialog = (project: ProjectRecord | null) =>
    setSelectedProject(project);
  const closeDialog = () => setSelectedProject(null);

  return (
    <Fragment>
      <Table>
        <TableCaption className="font-bold my-8">Projects List</TableCaption>
        <TableHeader>
          <TableRow>
            {filteredColumns.map(({ key, label, width }) => (
              <TableHead
                key={key}
                className={`text-center pt-4 pb-4 ${width ?? ""}`}
              >
                {label}
              </TableHead>
            ))}

            <TableHead className="text-center"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProjects.map((project, idx) => {
            return (
              <TableRow key={project.id}>
                {filteredColumns.map(
                  ({ key }) =>
                    getTableColumnDef({
                      project,
                      idx,
                      handleValueChange,
                      openDialog,
                    })[key]
                )}
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            {filteredColumns.map(({ key }) => tableFooter[key])}
          </TableRow>
        </TableFooter>
      </Table>

      {selectedProject && (
        <DeleteDialog project={selectedProject} onClose={closeDialog} />
      )}
    </Fragment>
  );
};

export default ProjectsTable;
