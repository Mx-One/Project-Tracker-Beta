import { ProjectRecord, SaleRecord } from "@/types/types";
import { useProjectsContext } from "../context/useProjectsContext";

/**
 * Hook to update a project's fields and update the sales data accordingly.
 *
 * Returns an object with two properties: isLoading and handleValueChange.
 * isLoading is a boolean indicating whether the hook is currently loading data.
 * handleValueChange is a function that takes a project id, field, and new value
 * as arguments and updates the project with that id and field to the given
 * value. It also updates the project's status and dates as follows:
 *
 * @returns {{isLoading: boolean, handleValueChange: (projectId: number, field: keyof ProjectRecord, newValue: string) => void}}
 */

export const useEditProject = () => {
  const {
    setProjects,
    salesData: sales,
    setSalesData: setSales,
  } = useProjectsContext();

  /**
   * Sanitizes the input value for the given field by trimming and formatting it
   * appropriately. If the field is a number field (contract_amount or paid),
   * replaces commas with dots, removes any non-numeric characters, and formats
   * the number to two decimal places. If the field is not a number field, trims
   * the value and returns it as is. If the trimmed value is empty, returns a
   * default value based on the field.
   *
   * @param {keyof ProjectRecord} field The field to sanitize the input for
   * @param {string} value The value to sanitize
   * @returns {string|number} The sanitized value
   */
  const sanitizeInput = (field: keyof ProjectRecord, value: string) => {
    const trimmed = value.trim();
    if (trimmed) {
      if (field === "contract_amount" || field === "paid") {
        const withDots = trimmed.replace(/,/g, ".");
        const cleaned = withDots.replace(/[^0-9.]/g, "");
        const parts = cleaned.split(".");
        const normalized =
          parts.length === 1
            ? parts[0]
            : parts.slice(0, -1).join("") + "." + parts[parts.length - 1];
        const num = parseFloat(normalized);
        return isNaN(num) ? 0 : parseFloat(num.toFixed(2));
      } else {
        return trimmed;
      }
    }
    return field === "contract_amount" || field === "paid"
      ? 0
      : field === "client"
        ? "n/a"
        : "New Project";
  };

  /**
   * Updates the salesData state based on the project with the given id. If the
   * project already has a sale record, updates the date of that sale record to
   * the project's date started. If the project does not have a sale record,
   * creates a new sale record with the project's details.
   *
   * @param projectId The id of the project to update
   * @param updated The updated project record
   */
  const updateSales = (projectId: number, updated: ProjectRecord) => {
    const today = new Date().toLocaleDateString("en-CA");

    const existing = sales.find((s) => s.project_id_fk === projectId);
    if (existing) {
      setSales((prevSales) =>
        prevSales.map((s) =>
          s.project_id_fk === projectId
            ? {
                ...s,
                date: updated.date_started ?? today,
              }
            : s
        )
      );
    } else {
      const newSale: SaleRecord = {
        sales_id: sales[sales.length - 1]?.sales_id + 1 || 1,
        date: updated.date_started ?? new Date().toISOString().split("T")[0],
        project_id_fk: projectId,
        project: {
          project_address: updated.project_address,
          contract_amount: Number(updated.contract_amount),
          user_profile: {
            name: updated.userProfile.name,
          },
        },
      };
      setSales((prev) => [...prev, newSale]);
    }
  };

  /**
   * Updates the project with the given id by setting the given field to the
   * given value. Sanitizes the value first using the sanitizeInput function.
   * Also updates the project's status and dates as follows:
   *
   * - If the paid amount is greater than 0 and less than the contract amount,
   *   sets the status to "active", sets the date started to today if it's not
   *   already set, and adds a new sale record with today's date.
   * - If the paid amount is greater than or equal to the contract amount and
   *   the contract amount is not 0, sets the status to "finished", sets the
   *   date finished to today, and sets the paid amount to the contract amount.
   * - Otherwise, sets the status to "quoted", sets the date started and date
   *   finished to null.
   *
   * @param projectId The id of the project to update
   * @param field The field to update
   * @param newValue The new value for the field
   */
  const updateProjects = (
    projectId: number,
    field: keyof ProjectRecord,
    newValue: string
  ) => {
    const sanitizedValue = sanitizeInput(field, newValue);

    setProjects((prev) =>
      prev.map((project) => {
        if (project.id !== projectId) return project;

        const updated: ProjectRecord = {
          ...project,
          [field]: sanitizedValue,
        };

        const paid = field === "paid" ? sanitizedValue : project.paid;
        const contract =
          field === "contract_amount"
            ? sanitizedValue
            : project.contract_amount;

        const paidNum = Number(paid);
        const contractNum = Number(contract);

        const today = new Date().toLocaleDateString("en-CA");

        if (paidNum > 0 && paidNum < contractNum) {
          updated.status = "active";
          updated.date_finished = undefined;
          if (!updated.date_started) updated.date_started = today;

          updateSales(projectId, updated);
        } else if (contractNum !== 0 && paidNum >= contractNum) {
          updated.status = "finished";
          updated.date_finished = today;
          updated.paid = contractNum;
          if (!updated.date_started) updated.date_started = today;
        } else {
          updated.status = "quoted";
          updated.date_started = undefined;
          updated.date_finished = undefined;
        }

        return updated;
      })
    );
  };

  return { handleValueChange: updateProjects, isLoading: false };
};
