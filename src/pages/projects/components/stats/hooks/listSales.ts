import { useList } from "@refinedev/core";
import { SaleRecord } from "@/types/types";

/**
 * Fetches all sales records from the server, including the project and user profile they belong to.
 *
 * @returns An object containing the sales records and a boolean indicating whether the data is still loading.
 *          The sales records are an array of objects with the following properties:
 *          - sales_id: The primary key for the sales record
 *          - date: The date the sale was made
 *          - project_id_fk: The foreign key pointing to the project the sale belongs to
 *          - project: An object with the following properties:
 *            - project_address: The address of the project
 *            - contract_amount: The total value of the project
 *            - user_profile: An object with the following properties:
 *              - name: The name of the user profile
 */
export const useListSales = () => {
  const { data, isLoading, error } = useList<SaleRecord>({
    resource: "sales",
    pagination: {
      mode: "off",
    },
    meta: {
      select: `
        sales_id,
        date, 
        project_id_fk,
        project (
          project_address,
          contract_amount,
          user_profile (
            name
          )
        )
      `,
    },
  });

  if (error) {
    console.error("Sales fetch error:", error);
  }

  return { salesListData: data?.data ?? [], isLoading };
};
