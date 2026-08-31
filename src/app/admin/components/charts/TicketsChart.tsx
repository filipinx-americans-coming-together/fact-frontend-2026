import { BarChart } from "@mui/x-charts/BarChart";

const PLACEHOLDER_DATA = [
    { type: "Bundle", amount: 140 },
    { type: "Variety Show", amount: 37 },
    { type: "Sessions Only", amount: 21 },
];

export default function TicketsChart() {
    return (
        <BarChart
            dataset={PLACEHOLDER_DATA}
            yAxis={[{ scaleType: "band", dataKey: "type" }]}
            series={[{ dataKey: "amount", label: "Sales by Ticket Type" }]}
            width={600}
            height={300}
            layout="horizontal"
            margin={{left: 100}}
        />
    );
}
