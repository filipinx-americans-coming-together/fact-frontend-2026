import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

export default function RegistrationChart({ dates }: { dates: Date[] }) {
    const data: { date: Date; value: number }[] = React.useMemo(() => {
        const days: { [date: string]: number } = {};

        dates.forEach((date) => {
            const asString = date.toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
            });

            if (days[asString] === undefined) {
                days[asString] = 1;
            } else {
                days[asString] += 1;
            }
        });

        const result = [];

        for (const [key, value] of Object.entries(days)) {
            result.push({ date: new Date(key), value: value });
        }

        return result;
    }, [dates]);

    return (
        <LineChart
            width={600}
            height={300}
            dataset={data}
            xAxis={[
                {
                    dataKey: "date",
                    valueFormatter: (timestamp) =>
                        new Date(timestamp).toDateString(),
                },
            ]}
            series={[{ dataKey: "value", label: "Recent Registrations" }]}
        />
    );
}
