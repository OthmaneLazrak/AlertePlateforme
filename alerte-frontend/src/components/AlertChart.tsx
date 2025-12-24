import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

interface Props {
    data: { day: string; count: number }[];
}

export default function AlertChart({ data }: Props) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                data={data}
                margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
            >
                <CartesianGrid
                    stroke="#0f172a"
                    strokeDasharray="3 3"
                />

                <XAxis
                    dataKey="day"
                    stroke="#64748b"
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                />

                <YAxis
                    allowDecimals={false}
                    stroke="#64748b"
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                />

                <Tooltip
                    contentStyle={{
                        backgroundColor: "#020617",
                        border: "1px solid #22d3ee",
                        borderRadius: 8,
                        color: "#e5e7eb",
                    }}
                />

                <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#22d3ee"
                    strokeWidth={3}
                    dot={{ r: 5, stroke: "#22d3ee", strokeWidth: 2 }}
                    activeDot={{
                        r: 8,
                        stroke: "#22d3ee",
                        strokeWidth: 3,
                        fill: "#020617",
                    }}
                    isAnimationActive
                    animationDuration={600}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}
