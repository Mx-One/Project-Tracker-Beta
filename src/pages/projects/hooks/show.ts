import { useOne } from "@refinedev/core";
import { ProjectRecord } from "../../../types/types";

/**
 * Fetches a project by its ID.
 *
 * @param {string} id - The ID of the project to be fetched.
 * @returns {object} An object containing the project data and a boolean indicating whether the data is still loading.
 *                   If the project is not found, the data will be an empty array.
 *                   If an error occurs, the error will be logged to the console.
 */
export const useShowProject = (id: string) => {
  const { data, isLoading, error } = useOne<ProjectRecord>({
    resource: "projects",
    id,
  });
  if (error) {
    console.log(error);
  }
  return { projectData: data?.data ?? [], isLoading };
};
