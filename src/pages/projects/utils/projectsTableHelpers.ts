import { ProjectRecord } from "@/types/types";

/**
 * Calculate the total contract amount, total paid, total outstanding, and total progress
 * across all projects.
 *
 * @param {ProjectRecord[]} data - An array of project records
 * @returns {Object} An object containing the total contract amount, total paid, total
 * outstanding, and total progress
 */
export function calculateProjectTotals(data: ProjectRecord[]) {
  let totalContract = 0;
  let totalPaid = 0;

  for (const p of data) {
    totalContract += p.contract_amount;
    totalPaid += p.paid;
  }
  return {
    totalContract: totalContract.toFixed(2),
    totalPaid: totalPaid.toFixed(2),
    totalOutstanding: (totalContract - totalPaid).toFixed(2),
    totalProgress:
      totalContract === 0
        ? 0
        : 100 - Math.round(((totalContract - totalPaid) / totalContract) * 100),
  };
}

/**
 * Calculate the total outstanding amount for a project based on the contract amount and the paid amount.
 *
 * @param {number} contractAmount - The total contract amount for the project
 * @param {number} paidAmount - The total paid amount for the project
 * @returns {string} The total outstanding amount as a string, formatted to two decimal places
 */
export const calculateOutstandingAmount = (
  contractAmount: number,
  paidAmount: number
) => {
  const contractAmountFloat = contractAmount;
  const paidAmountFloat = paidAmount;
  return (contractAmountFloat - paidAmountFloat).toFixed(2);
};

/**
 * Calculate the progress percentage of a project based on the contract amount
 * and the paid amount.
 *
 * The progress percentage is calculated as the percentage of the contract
 * amount that has been paid. If the contract amount is zero, it returns zero
 * to avoid division by zero.
 *
 * @param {number} contractAmount - The total contract amount for the project
 * @param {number} paidAmount - The total paid amount for the project
 * @returns {number} The progress percentage, rounded to the nearest integer
 */

export const calculateProgressPercentage = (
  contractAmount: number,
  paidAmount: number
) => {
  const contractAmountFloat = contractAmount;
  const paidAmountFloat = paidAmount;
  if (contractAmountFloat === 0) return 0;
  return Math.round(
    100 - ((contractAmountFloat - paidAmountFloat) / contractAmountFloat) * 100
  );
};
