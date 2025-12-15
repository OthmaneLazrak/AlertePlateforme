import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

interface Props {
    data: { day: string; count: number }[];
}

export default function AlertChart({ data }: Props) {
    const sortedData = [...data].sort(
        (a, b) => new Date(a.day).getTime() - new Date(b.day).getTime()
    );

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sortedData}>
                <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#e74c3c"
                    strokeWidth={3}
                    activeDot={{ r: 8 }}
                />
                <CartesianGrid stroke="#d0d0d0" strokeDasharray="5 5" />
                <XAxis dataKey="day" />
                <YAxis allowDecimals={false} />
                <Tooltip />
            </LineChart>
        </ResponsiveContainer>
    );
}
