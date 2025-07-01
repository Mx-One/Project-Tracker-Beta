import { format, parseISO, subMonths, isAfter } from "date-fns";
import { useProjectsContext } from "@/pages/projects/context/useProjectsContext";

/**
 * Fetches the sales data and calculates the total sales amount for each month
 * for the last 6 months. It filters out sales that don't belong to the
 * currently selected PM (unless the PM is "all"). It rounds the amount to
 * thousands and sorts the data by month index.
 *
 * The function also returns a helper function to calculate the tranding
 * percentage between two given months.
 *
 * @returns An object containing the padded chart data, a boolean indicating
 *          whether the data is still loading, and a function to calculate
 *          tranding percentage.
 */
export const useSalesData = () => {
  const { state, salesData } = useProjectsContext();

  const sixMonthsAgo = subMonths(new Date(), 6);

  // Filter only the last 6 months
  const recentSales = salesData.filter((item) =>
    isAfter(parseISO(item.date), sixMonthsAgo)
  );

  // Group by month and sum contract_amount
  const grouped = recentSales.reduce(
    (
      acc: Record<
        string,
        {
          idx: number;
          month: string;
          project_id: number;
          project_addresses: string[];
          amount: number;
        }
      >,
      item
    ) => {
      const date = parseISO(item.date);
      const month = format(date, "MMMM");
      const monthIdx = parseInt(format(date, "M"));
      const amount = Number(item.project?.contract_amount || 0);
      const project_id = item.project_id_fk;
      const address = item.project?.project_address || "";

      if (!acc[month]) {
        acc[month] = {
          idx: monthIdx,
          month,
          project_id: project_id,
          project_addresses: [],
          amount: 0,
        };
      }
      if (item.project?.user_profile?.name == state.pm || state.pm == "all") {
        acc[month].amount += amount;

        // Only add address if it's non-empty and not already in the list
        if (address && !acc[month].project_addresses.includes(address)) {
          acc[month].project_addresses.push(address);
        }
      }
      return acc;
    },
    {}
  );

  // Convert to array, round to thousands
  const chartData = Object.values(grouped)
    .map((entry) => ({
      ...entry,
      amount: Math.round(entry.amount / 1000), // convert to thousands
    }))
    .sort((a, b) => a.idx - b.idx);

  const paddedChartData = padChartDataToSixMonths(chartData);

  // Helper function to calculate tranding percentage
  const calculateTrandingPercentage = (
    first_month: number,
    second_month: number
  ) => {
    if (first_month === 0) return 0;
    return Math.round(((first_month - second_month) / first_month) * 100);
  };

  return { paddedChartData, calculateTrandingPercentage };
};

type ChartEntry = {
  idx: number; // month number 1..12
  month: string; // month name like "January"
  amount: number; // amount in thousands
};

// Helper to get month name by month index
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function padChartDataToSixMonths(chartData: ChartEntry[]): ChartEntry[] {
  const desiredLength = 6;

  if (chartData.length >= desiredLength) {
    return chartData;
  }

  // Find the first month idx in current data
  const firstMonthIdx =
    chartData.length > 0 ? chartData[0].idx : new Date().getMonth() + 1;

  // Number of months to add at the front
  const missingCount = desiredLength - chartData.length;

  const paddedEntries: ChartEntry[] = [];

  for (let i = missingCount; i > 0; i--) {
    let monthIdx = firstMonthIdx - i;
    // wrap around if less than 1 (handle year wrap)
    if (monthIdx < 1) {
      monthIdx += 12;
    }
    paddedEntries.push({
      idx: monthIdx,
      month: monthNames[monthIdx - 1],
      amount: 0,
    });
  }

  return [...paddedEntries, ...chartData];
}
