import { TrendingDown, TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { useProjectsContext } from "../../context/useProjectsContext";
import { useSalesData } from "./hooks/useSalesData";

const chartConfig = {
  amount: {
    label: "total",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

/**
 * Renders a card component displaying the sales chart using an area chart.
 * The chart visualizes the total sales amount for the last 6 months.
 * It includes a header with the title "Sales", a content section with
 * an area chart, and a footer indicating the trend in sales and the
 * period covered.
 *
 * The chart is only rendered if the current status is "active". If sales
 * data is still loading, a loading message is displayed.
 *
 * The footer shows whether the sales are trending up or down compared to
 * the previous month, and the percentage of the change is calculated
 * using a helper function. The chart's tooltip displays the sales amount
 * and the corresponding month.
 *
 * @returns A JSX element representing the sales chart card or null if
 *          the status is not "active".
 */

const StatsSalesChart = () => {
  const { paddedChartData, calculateTrandingPercentage } = useSalesData();
  const { state } = useProjectsContext();

  if (state.status !== "active") return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={paddedChartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const value = payload[0].value;
                const label = payload[0].payload?.month;
                return (
                  <div className="rounded-md border bg-background px-3 py-2 text-sm shadow-sm">
                    <div className="font-medium">{label}</div>
                    <div className="text-muted-foreground">${value}K</div>
                  </div>
                );
              }}
            />
            <Area
              dataKey="amount"
              type="natural"
              fill="#bfdbfe"
              fillOpacity={0.4}
              stroke="#93c5fd"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          {paddedChartData[paddedChartData.length - 1].amount >
          paddedChartData[paddedChartData.length - 2].amount ? (
            <>
              Trending up by{" "}
              {calculateTrandingPercentage(
                paddedChartData[paddedChartData.length - 1].amount,
                paddedChartData[paddedChartData.length - 2].amount
              )}
              % this month
              <TrendingUp className="h-4 w-4" />
            </>
          ) : (
            <>
              Trending down by{" "}
              {calculateTrandingPercentage(
                paddedChartData[paddedChartData.length - 2].amount,
                paddedChartData[paddedChartData.length - 1].amount
              )}
              % this month
              <TrendingDown className="h-4 w-4" />
            </>
          )}
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total sales for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
};

export default StatsSalesChart;
