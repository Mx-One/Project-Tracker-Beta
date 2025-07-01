import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import StatsProjectsCountCard from "./stats/StatsProjectsCountCard";
import StatsTotalAmountCard from "./stats/StatsTotalAmountCard";
import StatsProgressCard from "./stats/StatsProgressCard";
import StatsSalesChart from "./stats/StatsSalesChart";
import StatsCoversionRate from "./stats/StatsConversionRate";

/**
 * Renders an accordion containing various stats cards.
 *
 * The accordion is collapsible and defaults to open. It contains
 * a row of stats cards with the project count, total amount, and
 * conversion rate. Below that, it renders a sales chart and a
 * progress bar.
 */
const StatsTable: React.FC = () => {
  return (
    <>
      <Accordion
        type="single"
        collapsible
        className="px-5"
        defaultValue="stats-table"
      >
        <AccordionItem value="stats-table">
          <AccordionTrigger>Stats</AccordionTrigger>
          <AccordionContent className="flex flex-wrap gap-20 items-stretch">
            <div className="flex gap-20 items-center">
              <StatsProjectsCountCard />
              <StatsTotalAmountCard />
              <StatsCoversionRate />
            </div>
            <StatsSalesChart />
            <StatsProgressCard />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default StatsTable;
