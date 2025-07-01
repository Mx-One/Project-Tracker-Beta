import { useList } from "@refinedev/core";
import { ProjectRecord } from "../../../types/types";

/**
 * Fetches all projects from the server, including the project and user profile they belong to.
 * The projects are sorted by ascending project id and then by ascending user profile name.
 *
 * @returns An object containing the project records and a boolean indicating whether the data is still loading.
 *          The projects records are an array of objects with the following properties:
 *          - id: The primary key for the project
 *          - project_address: The address of the project
 *          - client: The client of the project
 *          - contract_amount: The total value of the project
 *          - paid: The amount of money paid
 *          - user_id_fk: The foreign key pointing to the user profile
 *          - status: The current status of the project
 *          - date_quoted: The date the project was quoted
 *          - date_started: The date the project was started
 *          - date_finished: The date the project was finished
 *          - userProfile: An object with the following properties:
 *            - name: The name of the user profile
 */

export const useListProjects = () => {
  const { data, isLoading, error } = useList<ProjectRecord>({
    resource: "project",
    sorters: [
      { field: "id", order: "asc" },
      { field: "userProfile.name", order: "asc" },
    ],
    pagination: {
      mode: "off",
    },
    meta: {
      select: `
          id,
          project_address,
          client,
          contract_amount,
          paid,
          user_id_fk,
          status,
          date_quoted,
          date_started,
          date_finished,
          userProfile: user_profile(name)
      `,
    },
  });

  if (error) {
    console.log(error);
  }

  return { projectListData: data?.data ?? [], isLoading };
};
